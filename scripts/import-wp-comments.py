#!/usr/bin/env python3
"""
Import WordPress comments from XML export into 11ty comment markdown files.
Following the data model from .claude/plan-comments.md
"""

import xml.etree.ElementTree as ET
import difflib
import hashlib
import os
import re
from datetime import datetime, timezone

# Namespaces
NS = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
    'dc': 'http://purl.org/dc/elements/1.1/',
    'excerpt': 'http://wordpress.org/export/1.2/excerpt/'
}

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XML_PATH = os.path.join(BASE_DIR, 'relativwenigbartwuchs.WordPress.2023-03-06.xml')
POSTS_DIR = os.path.join(BASE_DIR, 'blog', 'posts')


def resolve_post_folder(wp_slug: str) -> str | None:
    """Find the actual post folder for a WP slug, using fuzzy matching as fallback."""
    if os.path.isdir(os.path.join(POSTS_DIR, wp_slug)):
        return wp_slug
    candidates = [
        d for d in os.listdir(POSTS_DIR)
        if os.path.isdir(os.path.join(POSTS_DIR, d)) and not d.endswith('.js') and not d.endswith('.njk')
    ]
    matches = difflib.get_close_matches(wp_slug, candidates, n=1, cutoff=0.7)
    return matches[0] if matches else None


def make_id_from_wp_id(wp_comment_id: str) -> str:
    """Generate a stable 8-char hex ID from a WordPress comment ID."""
    return hashlib.sha256(f"wp-comment-{wp_comment_id}".encode()).hexdigest()[:8]


def hash_email(email: str) -> str | None:
    """SHA-256 hash of an email address (lowercase, stripped)."""
    if not email or email.strip() == '':
        return None
    normalized = email.strip().lower()
    return "sha256:" + hashlib.sha256(normalized.encode()).hexdigest()


def parse_date_gmt(date_str: str) -> datetime | None:
    """Parse a WordPress GMT date string to a UTC datetime."""
    if not date_str or date_str.startswith('0000'):
        return None
    try:
        return datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S').replace(tzinfo=timezone.utc)
    except ValueError:
        return None


def url_to_slug(url: str) -> str:
    """
    Convert a page URL to a directory slug.
    /my-post/ -> my-post
    /blog/my-post/ -> blog-my-post
    """
    # Strip leading/trailing slashes, replace internal slashes with dashes
    stripped = url.strip('/')
    return stripped.replace('/', '-')


def html_to_text(html: str) -> str:
    """Simple HTML-to-markdown conversion for WordPress comment bodies."""
    if not html:
        return ''
    # Replace <br>, <br/>, <br /> with newline
    text = re.sub(r'<br\s*/?>', '\n', html, flags=re.IGNORECASE)
    # Replace closing </p> with double newline
    text = re.sub(r'</p>', '\n\n', text, flags=re.IGNORECASE)
    # Replace <p> with nothing (content follows)
    text = re.sub(r'<p[^>]*>', '', text, flags=re.IGNORECASE)
    # Convert <a href="url">text</a> to [text](url)
    text = re.sub(
        r'<a\s+(?:[^>]*?\s+)?href=["\']([^"\']*)["\'][^>]*>(.*?)</a>',
        r'[\2](\1)',
        text,
        flags=re.IGNORECASE | re.DOTALL
    )
    # Remove remaining HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Collapse more than 2 consecutive newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def escape_yaml_string(s: str) -> str:
    """Escape a string for YAML frontmatter."""
    if not s:
        return '""'
    # If it contains special chars, quote it
    if any(c in s for c in [':', '#', '{', '}', '[', ']', ',', '&', '*', '?', '|', '-', '<', '>', '=', '!', '%', '@', '`', '"', "'"]):
        # Use double quotes, escaping internal double quotes
        escaped = s.replace('\\', '\\\\').replace('"', '\\"')
        return f'"{escaped}"'
    return s


def main():
    tree = ET.parse(XML_PATH)
    root = tree.getroot()
    channel = root.find('channel')
    items = channel.findall('item')

    total_comments = 0
    total_files = 0
    skipped_no_date = 0
    skipped_not_approved = 0
    skipped_pingback = 0

    for item in items:
        post_type = item.findtext('wp:post_type', namespaces=NS)
        if post_type != 'post':
            continue

        post_slug = item.findtext('wp:post_name', namespaces=NS)
        post_status = item.findtext('wp:status', namespaces=NS)
        if post_status not in ('publish', 'inherit'):
            # Skip draft/private posts
            continue

        post_url = f'/{post_slug}/'
        folder = resolve_post_folder(post_slug)
        if folder is None:
            print(f"  SKIP (no matching post folder): {post_slug}")
            continue
        if folder != post_slug:
            print(f"  Slug resolved: {post_slug} -> {folder}")
        post_url = f'/{folder}/'
        out_dir = os.path.join(POSTS_DIR, folder, 'comments')

        all_comments = item.findall('wp:comment', NS)
        if not all_comments:
            continue

        # Build WP-ID → new hex ID map for threading
        wp_id_to_hex = {}
        for c in all_comments:
            wp_id = c.findtext('wp:comment_id', namespaces=NS)
            approved = c.findtext('wp:comment_approved', namespaces=NS)
            comment_type = c.findtext('wp:comment_type', namespaces=NS) or 'comment'
            if approved == '1' and comment_type == 'comment':
                wp_id_to_hex[wp_id] = make_id_from_wp_id(wp_id)

        for c in all_comments:
            wp_id = c.findtext('wp:comment_id', namespaces=NS)
            approved = c.findtext('wp:comment_approved', namespaces=NS)
            comment_type = c.findtext('wp:comment_type', namespaces=NS) or 'comment'

            total_comments += 1

            if comment_type != 'comment':
                skipped_pingback += 1
                continue

            if approved != '1':
                skipped_not_approved += 1
                continue

            author = c.findtext('wp:comment_author', namespaces=NS) or 'Anonym'
            email = c.findtext('wp:comment_author_email', namespaces=NS) or ''
            author_url = c.findtext('wp:comment_author_url', namespaces=NS) or ''
            date_gmt = c.findtext('wp:comment_date_gmt', namespaces=NS) or ''
            date_local = c.findtext('wp:comment_date', namespaces=NS) or ''
            content_raw = c.findtext('wp:comment_content', namespaces=NS) or ''
            wp_parent = c.findtext('wp:comment_parent', namespaces=NS) or '0'

            # Parse date
            dt = parse_date_gmt(date_gmt)
            if dt is None:
                # Try local date as fallback
                dt = parse_date_gmt(date_local)
            if dt is None:
                print(f"  SKIP (no valid date): comment {wp_id} on {post_slug}")
                skipped_no_date += 1
                continue

            hex_id = make_id_from_wp_id(wp_id)
            iso_timestamp = dt.strftime('%Y-%m-%dT%H:%M:%SZ')
            file_timestamp = dt.strftime('%Y-%m-%dT%H-%M-%SZ')
            filename = f"{file_timestamp}-{hex_id}.md"

            # Threading: resolve parent
            parent_hex = None
            if wp_parent != '0':
                parent_hex = wp_id_to_hex.get(wp_parent)
                # Per spec: only 1 level deep. If parent doesn't exist in
                # approved comments, treat as root.
                if parent_hex is None:
                    parent_hex = None

            email_hash = hash_email(email)
            author_url_yaml = f'"{author_url}"' if author_url.strip() else 'null'

            # Build frontmatter
            author_yaml = escape_yaml_string(author)
            parent_yaml = f'"{parent_hex}"' if parent_hex else 'null'
            email_yaml = f'"{email_hash}"' if email_hash else 'null'

            # Convert body
            body = html_to_text(content_raw)

            # Build markdown content
            lines = [
                '---',
                f'id: {hex_id}',
                f'parent: {parent_yaml}',
                f'post: {post_url}',
                f'author: {author_yaml}',
                f'author_url: {author_url_yaml}',
                f'email_hash: {email_yaml}',
                f'ip_hash: null',
                f'created: {iso_timestamp}',
                '---',
                '',
                body,
            ]
            file_content = '\n'.join(lines) + '\n'

            os.makedirs(out_dir, exist_ok=True)
            out_path = os.path.join(out_dir, filename)
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(file_content)

            total_files += 1

    print(f"\nImport complete:")
    print(f"  Total comment elements processed: {total_comments}")
    print(f"  Files written: {total_files}")
    print(f"  Skipped (not approved): {skipped_not_approved}")
    print(f"  Skipped (pingback/trackback): {skipped_pingback}")
    print(f"  Skipped (no valid date): {skipped_no_date}")

    # List created directories
    comment_dirs = sorted([
        d for d in os.listdir(POSTS_DIR)
        if os.path.isdir(os.path.join(POSTS_DIR, d, 'comments'))
    ])
    print(f"\nPost folders with comments ({len(comment_dirs)}):")
    for d in comment_dirs:
        count = len(os.listdir(os.path.join(POSTS_DIR, d, 'comments')))
        print(f"  posts/{d}/comments/ ({count} files)")


if __name__ == '__main__':
    main()
