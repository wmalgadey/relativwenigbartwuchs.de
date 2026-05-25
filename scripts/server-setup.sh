#!/usr/bin/env bash
# Einmalig auf dem Webspace ausführen:
#   ssh -p PORT user@host 'bash -s' < scripts/server-setup.sh
set -euo pipefail

SITE_DIR="$HOME/sites/relativwenigbartwuchs.de"

echo "=== Blue/Green Deploy Setup ==="
echo "  Site-Verzeichnis: $SITE_DIR"
echo ""

mkdir -p "$SITE_DIR/blue" "$SITE_DIR/green"
echo "✓ $SITE_DIR/{blue,green} angelegt"

ln -sfn "$SITE_DIR/blue" "$SITE_DIR/current"
echo "✓ $SITE_DIR/current → blue"

printf 'blue' > "$SITE_DIR/.slot"
echo "✓ Aktiver Slot: blue"

echo ""
echo "=== Setup abgeschlossen ==="
echo "  Document Root für cPanel: $SITE_DIR/current"
echo "  Aktiver Slot: $(cat "$SITE_DIR/.slot")"
echo ""
echo "Nächste Schritte:"
echo "  1. In cPanel den Document Root der Domain auf $SITE_DIR/current setzen"
echo "  2. SSH_KNOWN_HOSTS ermitteln:"
echo "     ssh-keyscan -p PORT DEPLOY_HOST"
echo "  3. In GitLab unter Settings → CI/CD → Variables eintragen:"
echo "     SSH_PRIVATE_KEY, SSH_KNOWN_HOSTS, DEPLOY_HOST, DEPLOY_USER, SSH_PORT"
