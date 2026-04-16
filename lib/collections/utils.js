/** Extract the first non-heading paragraph from a markdown content string. */
export function extractExcerpt(content) {
  const paragraphs = content.trim().split(/\n\n+/);
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('```') || trimmed.startsWith('!') || trimmed.startsWith('\\_')) continue;
    return trimmed
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
      .replace(/(\*\*|__)([^*_]+)\1/g, '$2')
      .replace(/(\*|_)([^*_]+)\1/g, '$2')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/~~([^~]+)~~/g, '$1')
      .replace(/\\([_*[\](){}#+\-.!])/g, '$1')
      .replace(/\n/g, ' ')
      .trim();
  }
  return '';
}
