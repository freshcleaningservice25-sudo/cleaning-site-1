#!/bin/bash

echo "Checking SendGrid DNS records for gocleanusa.com..."
echo ""
echo "=========================================="
echo "Record 1: CNAME (Link Branding)"
echo "=========================================="
echo "Checking: em5888.gocleanusa.com"
RESULT1=$(dig em5888.gocleanusa.com CNAME +short)
echo "Result: $RESULT1"
echo "Expected: u58508189.wl190.sendgrid.net"
if [ "$RESULT1" = "u58508189.wl190.sendgrid.net." ] || [ "$RESULT1" = "u58508189.wl190.sendgrid.net" ]; then
    echo "✅ Record 1 is correct!"
else
    echo "❌ Record 1 not found or incorrect"
fi
echo ""

echo "=========================================="
echo "Record 2: CNAME (DKIM Key 1)"
echo "=========================================="
echo "Checking: s1._domainkey.gocleanusa.com"
RESULT2=$(dig s1._domainkey.gocleanusa.com CNAME +short)
echo "Result: $RESULT2"
echo "Expected: s1.domainkey.u58508189.wl190.sendgrid.net"
if [ "$RESULT2" = "s1.domainkey.u58508189.wl190.sendgrid.net." ] || [ "$RESULT2" = "s1.domainkey.u58508189.wl190.sendgrid.net" ]; then
    echo "✅ Record 2 is correct!"
else
    echo "❌ Record 2 not found or incorrect"
fi
echo ""

echo "=========================================="
echo "Record 3: CNAME (DKIM Key 2)"
echo "=========================================="
echo "Checking: s2._domainkey.gocleanusa.com"
RESULT3=$(dig s2._domainkey.gocleanusa.com CNAME +short)
echo "Result: $RESULT3"
echo "Expected: s2.domainkey.u58508189.wl190.sendgrid.net"
if [ "$RESULT3" = "s2.domainkey.u58508189.wl190.sendgrid.net." ] || [ "$RESULT3" = "s2.domainkey.u58508189.wl190.sendgrid.net" ]; then
    echo "✅ Record 3 is correct!"
else
    echo "❌ Record 3 not found or incorrect"
fi
echo ""

echo "=========================================="
echo "Record 4: TXT (DMARC Policy)"
echo "=========================================="
echo "Checking: _dmarc.gocleanusa.com"
RESULT4=$(dig _dmarc.gocleanusa.com TXT +short)
echo "Result: $RESULT4"
echo "Expected: v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;"
if echo "$RESULT4" | grep -q "v=DMARC1"; then
    echo "✅ Record 4 is correct!"
else
    echo "❌ Record 4 not found or incorrect"
fi
echo ""

echo "=========================================="
echo "Summary"
echo "=========================================="
COUNT=0
[ "$RESULT1" = "u58508189.wl190.sendgrid.net." ] || [ "$RESULT1" = "u58508189.wl190.sendgrid.net" ] && COUNT=$((COUNT+1))
[ "$RESULT2" = "s1.domainkey.u58508189.wl190.sendgrid.net." ] || [ "$RESULT2" = "s1.domainkey.u58508189.wl190.sendgrid.net" ] && COUNT=$((COUNT+1))
[ "$RESULT3" = "s2.domainkey.u58508189.wl190.sendgrid.net." ] || [ "$RESULT3" = "s2.domainkey.u58508189.wl190.sendgrid.net" ] && COUNT=$((COUNT+1))
echo "$RESULT4" | grep -q "v=DMARC1" && COUNT=$((COUNT+1))

echo "Records configured: $COUNT/4"
if [ $COUNT -eq 4 ]; then
    echo "🎉 All DNS records are configured correctly!"
    echo "You can now verify in SendGrid dashboard."
else
    echo "⚠️  Some records are missing or still propagating."
    echo "Wait 15-30 minutes and run this script again."
fi

