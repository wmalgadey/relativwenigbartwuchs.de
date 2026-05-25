#!/usr/bin/env bash
# Lokaler Deployment-Test — simuliert die GitLab-Pipeline ohne Production zu berühren.
#
# Konfiguration via .env.deploy (wird von git ignoriert):
#   cp scripts/.env.deploy.example .env.deploy
#   # Werte eintragen, dann:
#   bash scripts/test-deploy.sh
#
set -euo pipefail

# ── Farben ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RESET='\033[0m'
ok()   { echo -e "${GREEN}✓${RESET} $*"; }
fail() { echo -e "${RED}✗${RESET} $*"; FAILED=$((FAILED + 1)); }
info() { echo -e "${YELLOW}→${RESET} $*"; }

FAILED=0

# ── Konfiguration laden ───────────────────────────────────────────────────────
ENV_FILE="$(dirname "$0")/../.env.deploy"
if [ -f "$ENV_FILE" ]; then
  # shellcheck source=/dev/null
  source "$ENV_FILE"
else
  echo "Keine .env.deploy gefunden. Beispiel anlegen:"
  echo "  cp scripts/.env.deploy.example .env.deploy"
  exit 1
fi

: "${DEPLOY_HOST:?DEPLOY_HOST nicht gesetzt}"
: "${DEPLOY_USER:?DEPLOY_USER nicht gesetzt}"
: "${SSH_PORT:=22}"
: "${SITE_DIR:=sites/relativwenigbartwuchs.de}"
: "${CPANEL_USER:?CPANEL_USER nicht gesetzt}"
: "${CPANEL_TOKEN:?CPANEL_TOKEN nicht gesetzt}"

SSH="ssh -p $SSH_PORT -o BatchMode=yes -o ConnectTimeout=10 $DEPLOY_USER@$DEPLOY_HOST"
TEST_PREFIX=".deploy_test_$$"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  Deployment-Test für relativwenigbartwuchs.de"
echo "  Host: $DEPLOY_USER@$DEPLOY_HOST:$SSH_PORT"
echo "═══════════════════════════════════════════════════════"
echo ""

# ── 1. Voraussetzungen ────────────────────────────────────────────────────────
echo "[ 1/5 ] Lokale Voraussetzungen"

for cmd in ssh rsync curl; do
  if command -v "$cmd" &>/dev/null; then
    ok "$cmd vorhanden"
  else
    fail "$cmd nicht gefunden"
  fi
done

# ── 2. SSH-Verbindung ─────────────────────────────────────────────────────────
echo ""
echo "[ 2/5 ] SSH-Verbindung"

if $SSH "echo ok" &>/dev/null; then
  ok "SSH-Verbindung erfolgreich"
else
  fail "SSH-Verbindung fehlgeschlagen"
  echo "  Prüfe: ssh -p $SSH_PORT $DEPLOY_USER@$DEPLOY_HOST"
  echo "  Abbruch — weitere Tests nicht möglich."
  exit 1
fi

SERVER_OS=$($SSH "uname -s" 2>/dev/null || echo "unbekannt")
ok "Server-OS: $SERVER_OS"

if $SSH "command -v mv" &>/dev/null; then
  ok "mv vorhanden"
else
  fail "mv nicht gefunden"
fi

# ── 3. Rsync + Symlink-Swap ───────────────────────────────────────────────────
echo ""
echo "[ 3/5 ] Rsync & Symlink-Swap (isolierter Test, wird aufgeräumt)"

# Temp-Verzeichnis lokal anlegen
LOCAL_TMP=$(mktemp -d)
echo "test-deploy-$(date +%s)" > "$LOCAL_TMP/index.html"
trap 'rm -rf "$LOCAL_TMP"' EXIT

# Upload testen
TEST_DIR_A="\$HOME/$SITE_DIR/${TEST_PREFIX}_a"
TEST_DIR_B="\$HOME/$SITE_DIR/${TEST_PREFIX}_b"
TEST_LINK="\$HOME/$SITE_DIR/${TEST_PREFIX}_current"

info "Rsync-Upload nach ${TEST_PREFIX}_a ..."
if rsync -az --checksum -e "ssh -p $SSH_PORT" \
    "$LOCAL_TMP/" "$DEPLOY_USER@$DEPLOY_HOST:~/$SITE_DIR/${TEST_PREFIX}_a/"; then
  ok "Rsync erfolgreich"
else
  fail "Rsync fehlgeschlagen"
fi

# Symlink-Swap testen (ln + mv -T)
info "Symlink-Swap testen ..."
SWAP_RESULT=$($SSH "
  set -e
  mkdir -p $TEST_DIR_B
  ln -sfn $TEST_DIR_A $TEST_LINK
  # Swap: A → B
  ln -sfn $TEST_DIR_B ${TEST_LINK}_next
  mv -T ${TEST_LINK}_next $TEST_LINK
  readlink $TEST_LINK
" 2>&1)

EXPECTED_B=$($SSH "echo \$HOME/$SITE_DIR/${TEST_PREFIX}_b")
if echo "$SWAP_RESULT" | grep -qF "${TEST_PREFIX}_b"; then
  ok "Symlink-Swap (mv -T) funktioniert"
else
  fail "Symlink-Swap fehlgeschlagen: $SWAP_RESULT"
fi

# Cleanup
$SSH "rm -rf $TEST_DIR_A $TEST_DIR_B $TEST_LINK ${TEST_LINK}_next 2>/dev/null || true"
ok "Cleanup abgeschlossen"

# ── 4. cPanel API ─────────────────────────────────────────────────────────────
echo ""
echo "[ 4/5 ] cPanel API"

CPANEL_URL="https://$DEPLOY_HOST:2083"

info "API-Auth testen (SubDomain::listsubdomains) ..."
HTTP_CODE=$(curl -s -o /tmp/cpanel_test_$$.json -w "%{http_code}" \
  "$CPANEL_URL/execute/SubDomain/listsubdomains" \
  -H "Authorization: cpanel $CPANEL_USER:$CPANEL_TOKEN")

if [ "$HTTP_CODE" = "200" ]; then
  STATUS=$(python3 -c "import json,sys; d=json.load(open('/tmp/cpanel_test_$$.json')); print(d.get('status','?'))" 2>/dev/null || echo "?")
  if [ "$STATUS" = "1" ]; then
    SUBDOMAIN_COUNT=$(python3 -c "import json,sys; d=json.load(open('/tmp/cpanel_test_$$.json')); print(len(d.get('data',[])))" 2>/dev/null || echo "?")
    ok "cPanel API erreichbar (Auth OK, $SUBDOMAIN_COUNT Subdomains vorhanden)"
  else
    fail "cPanel API: Auth fehlgeschlagen — Token oder User prüfen"
    cat /tmp/cpanel_test_$$.json
  fi
else
  fail "cPanel API nicht erreichbar (HTTP $HTTP_CODE)"
fi
rm -f /tmp/cpanel_test_$$.json

# Subdomain-Anlegen + Löschen testen
TEST_SUBDOMAIN="deploy-test-$$"
info "Test-Subdomain ${TEST_SUBDOMAIN}.relativwenigbartwuchs.de anlegen ..."

RESPONSE=$(curl -sf "$CPANEL_URL/execute/SubDomain/addsubdomain" \
  -H "Authorization: cpanel $CPANEL_USER:$CPANEL_TOKEN" \
  --data-urlencode "domain=${TEST_SUBDOMAIN}" \
  --data-urlencode "rootdomain=relativwenigbartwuchs.de" \
  --data-urlencode "dir=sites/review/${TEST_SUBDOMAIN}" \
  2>/dev/null)

if echo "$RESPONSE" | grep -q '"status":1'; then
  ok "Subdomain anlegen funktioniert"

  info "Test-Subdomain wieder löschen ..."
  DEL_RESPONSE=$(curl -sf "$CPANEL_URL/execute/SubDomain/delsubdomain" \
    -H "Authorization: cpanel $CPANEL_USER:$CPANEL_TOKEN" \
    --data-urlencode "domain=${TEST_SUBDOMAIN}.relativwenigbartwuchs.de" \
    2>/dev/null)

  if echo "$DEL_RESPONSE" | grep -q '"status":1'; then
    ok "Subdomain löschen funktioniert"
  else
    fail "Subdomain löschen fehlgeschlagen"
    echo "$DEL_RESPONSE"
  fi
else
  fail "Subdomain anlegen fehlgeschlagen"
  echo "$RESPONSE"
fi

# ── 5. Site-Verzeichnis ───────────────────────────────────────────────────────
echo ""
echo "[ 5/5 ] Site-Verzeichnis auf dem Server"

if $SSH "[ -d \$HOME/$SITE_DIR/blue ] && [ -d \$HOME/$SITE_DIR/green ]"; then
  ok "Slot-Verzeichnisse blue/ und green/ vorhanden"
else
  fail "Slot-Verzeichnisse fehlen — server-setup.sh noch nicht ausgeführt?"
fi

if $SSH "[ -L \$HOME/$SITE_DIR/current ]"; then
  TARGET=$($SSH "readlink \$HOME/$SITE_DIR/current")
  ok "Symlink current vorhanden → $TARGET"
else
  fail "Symlink current fehlt — server-setup.sh noch nicht ausgeführt?"
fi

if $SSH "[ -f \$HOME/$SITE_DIR/.slot ]"; then
  SLOT=$($SSH "cat \$HOME/$SITE_DIR/.slot")
  ok "Aktiver Slot: $SLOT"
else
  info ".slot fehlt (wird beim ersten Deploy angelegt)"
fi

# ── Ergebnis ──────────────────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════"
if [ "$FAILED" -eq 0 ]; then
  echo -e "  ${GREEN}Alle Tests bestanden — Deployment bereit.${RESET}"
else
  echo -e "  ${RED}$FAILED Test(s) fehlgeschlagen.${RESET}"
fi
echo "═══════════════════════════════════════════════════════"
echo ""

exit "$FAILED"
