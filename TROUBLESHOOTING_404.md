# Troubleshooting 404 Error on /book Page

## Quick Fix: Temporarily Disable BookingKoala

If you're getting a 404 error on the `/book` page, try temporarily disabling BookingKoala to see if the custom form loads:

**In Vercel Environment Variables:**
1. Set `NEXT_PUBLIC_USE_BOOKINGKOALA` to `false` (or delete it)
2. Redeploy your site
3. Check if `/book` page loads with the custom form

If the custom form loads, the issue is with BookingKoala configuration.

## Common Causes of 404 on /book Page

### 1. Missing or Incorrect BookingKoala URL

**Problem:** If `NEXT_PUBLIC_USE_BOOKINGKOALA=true` but `NEXT_PUBLIC_BOOKINGKOALA_URL` is missing or incorrect, the page might fail to build.

**Solution:**
- Make sure `NEXT_PUBLIC_BOOKINGKOALA_URL` is set correctly
- The URL should be: `https://gocleanusausa.bookingkoala.com/book`
- Check for typos in the URL

### 2. Incorrect Mode Setting

**Problem:** If `NEXT_PUBLIC_BOOKINGKOALA_MODE` is set incorrectly.

**Solution:**
- For iframe mode: `NEXT_PUBLIC_BOOKINGKOALA_MODE=iframe`
- For embed mode: `NEXT_PUBLIC_BOOKINGKOALA_MODE=embed`
- For redirect mode: `NEXT_PUBLIC_BOOKINGKOALA_MODE=redirect`
- Make sure the value matches exactly (case-sensitive)

### 3. Build Error

**Problem:** A build error might be preventing the page from being generated.

**Solution:**
1. Check Vercel deployment logs for errors
2. Look for TypeScript or build errors
3. Check if all environment variables are set correctly

### 4. Missing Environment Variables for Embed Mode

**Problem:** If using embed mode, `NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE` must be set.

**Solution:**
- Make sure the embed code is complete
- It should be a full `<script>` tag

## Step-by-Step Fix

### Step 1: Check Current Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify these variables exist:
   - `NEXT_PUBLIC_USE_BOOKINGKOALA` = `true`
   - `NEXT_PUBLIC_BOOKINGKOALA_MODE` = `iframe` (or `embed` or `redirect`)
   - `NEXT_PUBLIC_BOOKINGKOALA_URL` = `https://gocleanusausa.bookingkoala.com/book`

### Step 2: Verify Values

Make sure:
- No extra spaces in values
- URLs start with `https://`
- Mode is lowercase: `iframe`, `embed`, or `redirect`
- `true` is lowercase (not `True` or `TRUE`)

### Step 3: Recommended Configuration for Iframe Mode

```
NEXT_PUBLIC_USE_BOOKINGKOALA=true
NEXT_PUBLIC_BOOKINGKOALA_MODE=iframe
NEXT_PUBLIC_BOOKINGKOALA_URL=https://gocleanusausa.bookingkoala.com/book
```

### Step 4: Redeploy

After updating environment variables:
1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger a new deployment

### Step 5: Check Deployment Logs

1. Go to the deployment in Vercel
2. Click on **Build Logs**
3. Look for any errors related to:
   - Environment variables
   - BookingKoala
   - The `/book` page

## Alternative: Use Custom Form Temporarily

If BookingKoala continues to cause issues:

1. **Disable BookingKoala:**
   - Set `NEXT_PUBLIC_USE_BOOKINGKOALA=false` in Vercel
   - Or delete the variable

2. **Redeploy:**
   - This will use your custom booking form instead

3. **Test the date picker:**
   - The custom form should work with the fixes we made earlier

## Still Getting 404?

If you're still getting a 404 after following these steps:

1. **Check the URL:**
   - Make sure you're visiting `/book` (not `/book/` or `/booking`)
   - Try the full URL: `https://yourdomain.com/book`

2. **Check Vercel Build:**
   - Make sure the build completed successfully
   - Check for any build errors in the logs

3. **Clear Cache:**
   - Try visiting in incognito/private mode
   - Clear browser cache

4. **Check Next.js Routing:**
   - The file should be at: `src/app/book/page.tsx`
   - Make sure it exists and exports a default component

## Contact Support

If none of these steps work, the issue might be:
- A Vercel configuration problem
- A Next.js routing issue
- A build configuration problem

Check Vercel support or Next.js documentation for further assistance.
