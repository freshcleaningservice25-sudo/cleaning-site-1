# SendGrid Setup Guide - Step by Step

This guide will walk you through setting up SendGrid for email functionality in your cleaning site.

## Overview

Your project uses SendGrid to send emails for:
- Contact form notifications
- Booking confirmations
- Order notifications

**Free Tier:** SendGrid offers 100 emails/day for free, which is perfect for getting started.

---

## Step 1: Create a SendGrid Account

1. Go to [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
2. Click **"Start for Free"** or **"Sign Up"**
3. Fill out the signup form:
   - Enter your email address
   - Create a password
   - Choose your country
   - Accept the terms of service
4. Verify your email address by clicking the link sent to your inbox
5. Complete any additional verification steps (phone number, etc.)

---

## Step 2: Verify Your Sender Identity

Before you can send emails, SendGrid requires you to verify who you are sending emails from.

### Option A: Single Sender Verification (Easiest - Recommended for Testing)

1. Log into your SendGrid dashboard
2. Navigate to **Settings** → **Sender Authentication**
3. Click **"Verify a Single Sender"**
4. Fill out the form:
   - **From Email Address**: Enter the email you want to send from (e.g., `noreply@yourdomain.com` or your personal email)
   - **From Name**: Enter a display name (e.g., `Go Clean USA`)
   - **Reply To**: Enter where replies should go (can be the same as From Email)
   - **Company Address**: Your business address (required)
   - **City**: Your city
   - **State**: Your state
   - **Zip Code**: Your zip code
   - **Country**: Your country
5. Click **"Create"**
6. Check your email inbox for a verification email from SendGrid
7. Click the verification link in the email
8. ✅ Your sender is now verified!

**Note:** For production, you should use a domain you own. For testing, you can use a personal email address.

### Option B: Domain Authentication (Recommended for Production)

If you have your own domain (e.g., `gocleanusa.com`):

1. Navigate to **Settings** → **Sender Authentication**
2. Click **"Authenticate Your Domain"**
3. Select your DNS provider or choose "Other"
4. Follow the instructions to add DNS records to your domain
5. Once verified, you can send from any email address on that domain

---

## Step 3: Create an API Key

1. In your SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **"Create API Key"** button (top right)
3. Give your API key a name (e.g., "Cleaning Site Production" or "Cleaning Site Development")
4. Choose API Key Permissions:
   - **Full Access** (easiest, but less secure)
   - **Restricted Access** (recommended):
     - Select **"Mail Send"** → **"Full Access"**
     - This gives the key permission to send emails only
5. Click **"Create & View"**
6. ⚠️ **IMPORTANT:** Copy the API key immediately! You'll only see it once.
   - It will look like: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Save it somewhere safe (password manager, secure note, etc.)

---

## Step 4: Configure Environment Variables

1. In your project root directory, create or edit `.env.local` file:

```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.your_actual_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
# OR with a display name:
# SENDGRID_FROM_EMAIL=Go Clean USA <noreply@yourdomain.com>

# Optional: Email to receive contact form notifications
CONTACT_NOTIFY_EMAIL=Contact@gocleanusa.com
```

2. Replace the values:
   - `SENDGRID_API_KEY`: Paste the API key you copied in Step 3
   - `SENDGRID_FROM_EMAIL`: Use the verified email address from Step 2
     - Format options:
       - Simple: `noreply@yourdomain.com`
       - With name: `Go Clean USA <noreply@yourdomain.com>`
   - `CONTACT_NOTIFY_EMAIL`: The email address where you want to receive contact form submissions

3. Save the file

---

## Step 5: Test Your Setup

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Test the contact form:
   - Go to `http://localhost:3000/contact`
   - Fill out and submit the contact form
   - Check the email address you set in `CONTACT_NOTIFY_EMAIL`

3. Check your server logs:
   - You should see: `✅ Email sent successfully via SendGrid:`
   - If there's an error, you'll see: `❌ Failed to send email via SendGrid:`

---

## Troubleshooting

### Error: "Email service not configured (SENDGRID_API_KEY missing)"
- **Solution:** Make sure `.env.local` exists and contains `SENDGRID_API_KEY`
- Restart your development server after adding environment variables

### Error: "From email not configured (SENDGRID_FROM_EMAIL missing)"
- **Solution:** Add `SENDGRID_FROM_EMAIL` to your `.env.local` file
- Make sure the email address matches your verified sender in SendGrid

### Error: "The from address does not match a verified Sender Identity"
- **Solution:** The email address in `SENDGRID_FROM_EMAIL` must be verified in SendGrid
- Go to Settings → Sender Authentication and verify your sender

### Error: "Unauthorized" or "403 Forbidden"
- **Solution:** Check that your API key has "Mail Send" permissions
- Create a new API key with proper permissions if needed

### DNS Validation Error: "Expected CNAME for [host] to match [value]"
This error appears when setting up Domain Authentication. It means SendGrid can't find or validate your DNS records.

**Common causes:**
1. DNS records not added yet
2. DNS records added incorrectly
3. DNS propagation still in progress (can take 5 minutes to 48 hours)
4. Typo in the DNS record

**How to fix:**
1. **Verify records are added correctly:**
   - Go to your DNS provider (where you manage gocleanusa.com)
   - Check that both CNAME records are added exactly as shown in SendGrid
   - Make sure there are no typos

2. **Check DNS propagation:**
   - Use online tools like [whatsmydns.net](https://www.whatsmydns.net/#CNAME/em5888.gocleanusa.com) or run:
     ```bash
     dig em5888.gocleanusa.com CNAME +short
     ```
   - Should return: `u58508189.wl190.sendgrid.net`

3. **Common DNS provider notes:**
   - **Namecheap/GoDaddy:** Enter just `em5888` in the Host field (they auto-add the domain)
   - **Cloudflare:** Enter `em5888` in the Name field
   - **Google Domains:** Enter `em5888` in the Host name field
   - **Route 53:** Enter `em5888` in the Record name field

4. **Wait for propagation:**
   - DNS changes can take 15 minutes to 48 hours
   - Usually resolves within 30 minutes
   - Click "Verify" in SendGrid after waiting

5. **If still not working:**
   - Double-check the exact values (copy from SendGrid, don't type manually)
   - Make sure you're editing the correct domain's DNS
   - Contact your DNS provider support if needed

### Emails going to spam folder
- **Solution:** 
  - Use Domain Authentication instead of Single Sender Verification
  - Set up SPF and DKIM records (SendGrid provides these)
  - Avoid spam trigger words in subject lines
  - Send to engaged recipients

---

## Security Best Practices

1. **Never commit `.env.local` to git** - It's already in `.gitignore`
2. **Use Restricted Access API Keys** - Only grant "Mail Send" permissions
3. **Rotate API Keys regularly** - Create new keys and delete old ones
4. **Use Domain Authentication for production** - More trustworthy than single sender
5. **Monitor your SendGrid dashboard** - Check for unusual activity

---

## Production Deployment

When deploying to production (e.g., Vercel):

1. Add the same environment variables in your hosting platform:
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL`
   - `CONTACT_NOTIFY_EMAIL`

2. For Vercel:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add each variable with the same names

3. Make sure your sender email/domain is verified in SendGrid

---

## Additional Resources

- [SendGrid Documentation](https://docs.sendgrid.com/)
- [SendGrid API Reference](https://docs.sendgrid.com/api-reference)
- [SendGrid Best Practices](https://docs.sendgrid.com/for-developers/sending-email/best-practices)
- [SendGrid Pricing](https://sendgrid.com/pricing/) - Free tier: 100 emails/day

---

## Quick Reference

**Required Environment Variables:**
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

**Optional Environment Variables:**
```bash
CONTACT_NOTIFY_EMAIL=Contact@gocleanusa.com
```

**Where to find these in SendGrid:**
- API Key: Settings → API Keys → Create API Key
- Verified Sender: Settings → Sender Authentication → Verify a Single Sender

---

That's it! Your SendGrid integration should now be working. 🎉

