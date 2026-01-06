# SendGrid DNS Records Setup for gocleanusa.com

## ✅ Yes, add ALL 4 records below

These records are required for SendGrid domain authentication. Add them to your DNS provider where `gocleanusa.com` is managed.

---

## Records to Add

### Record 1: CNAME (Link Branding)
- **Type:** `CNAME`
- **Host/Name:** `em5888` (or `em5888.gocleanusa.com` - depends on your DNS provider)
- **Value/Target:** `u58508189.wl190.sendgrid.net`
- **TTL:** 3600 (or default)
- **Purpose:** Links your domain to SendGrid's email infrastructure

### Record 2: CNAME (DKIM Key 1)
- **Type:** `CNAME`
- **Host/Name:** `s1._domainkey` (or `s1._domainkey.gocleanusa.com`)
- **Value/Target:** `s1.domainkey.u58508189.wl190.sendgrid.net`
- **TTL:** 3600 (or default)
- **Purpose:** DKIM authentication key #1 (email security)

### Record 3: CNAME (DKIM Key 2)
- **Type:** `CNAME`
- **Host/Name:** `s2._domainkey` (or `s2._domainkey.gocleanusa.com`)
- **Value/Target:** `s2.domainkey.u58508189.wl190.sendgrid.net`
- **TTL:** 3600 (or default)
- **Purpose:** DKIM authentication key #2 (email security)

### Record 4: TXT (DMARC Policy)
- **Type:** `TXT`
- **Host/Name:** `_dmarc` (or `_dmarc.gocleanusa.com`)
- **Value:** `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;`
- **TTL:** 3600 (or default)
- **Purpose:** DMARC policy for email authentication and spam protection

---

## How to Add These Records

### Step-by-Step Instructions:

1. **Log into your DNS provider** (where you manage gocleanusa.com)
   - Common providers: Namecheap, GoDaddy, Cloudflare, Google Domains, Route 53, etc.

2. **Navigate to DNS Management**
   - Usually found under "DNS Settings", "DNS Management", or "Advanced DNS"

3. **Add each record one by one:**
   - Click "Add Record" or similar button
   - Select the record type (CNAME or TXT)
   - Enter the Host/Name (see notes below)
   - Enter the Value/Target
   - Save the record

4. **Important Notes:**
   - **Host field format varies by provider:**
     - Some want just the subdomain: `em5888`
     - Others want the full domain: `em5888.gocleanusa.com`
     - Check your provider's documentation or try both
   
   - **Copy values exactly** - Use the copy buttons in SendGrid, don't type manually

5. **Wait for DNS propagation** (15 minutes to 48 hours, usually ~30 minutes)

6. **Verify in SendGrid:**
   - Go back to SendGrid dashboard
   - Click "Verify" or "Check DNS Records"
   - The errors should disappear once records are found

---

## Provider-Specific Notes

### Namecheap
- Host field: Enter just `em5888` (they auto-add `.gocleanusa.com`)
- Location: Advanced DNS → Add New Record

### GoDaddy
- Host field: Enter just `em5888`
- Location: DNS Management → Add Record

### Cloudflare
- Name field: Enter `em5888` (they auto-add the domain)
- Target field: Enter the full value
- Location: DNS → Add Record

### Google Domains
- Host name: Enter `em5888`
- Location: DNS → Custom Records

### AWS Route 53
- Record name: Enter `em5888`
- Location: Hosted Zones → Create Record

---

## Verification

After adding all records, verify they're working:

```bash
# Check Record 1
dig em5888.gocleanusa.com CNAME +short
# Should return: u58508189.wl190.sendgrid.net

# Check Record 2
dig s1._domainkey.gocleanusa.com CNAME +short
# Should return: s1.domainkey.u58508189.wl190.sendgrid.net

# Check Record 3
dig s2._domainkey.gocleanusa.com CNAME +short
# Should return: s2.domainkey.u58508189.wl190.sendgrid.net

# Check Record 4
dig _dmarc.gocleanusa.com TXT +short
# Should return: v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;
```

Or use online tools:
- [whatsmydns.net](https://www.whatsmydns.net/)
- [mxtoolbox.com](https://mxtoolbox.com/)

---

## Troubleshooting

**If records still show errors after 30+ minutes:**

1. ✅ Double-check you copied values exactly (no extra spaces)
2. ✅ Verify you're editing DNS for the correct domain
3. ✅ Check if your DNS provider requires different host format
4. ✅ Make sure records are saved (some providers require clicking "Save" multiple times)
5. ✅ Try removing and re-adding records if they still don't work

**Common mistakes:**
- ❌ Typing values instead of copying
- ❌ Adding `.gocleanusa.com` when provider auto-adds it
- ❌ Wrong record type (CNAME vs A vs TXT)
- ❌ Extra spaces or characters in values

---

Once all 4 records are verified in SendGrid, your domain authentication will be complete! 🎉

