# How to Find BookingKoala Values for Vercel Environment Variables

This guide will help you find the values you need to re-add BookingKoala environment variables in Vercel.

## Environment Variables You Need

Based on your current setup, you need these 3 variables in Vercel:

1. `NEXT_PUBLIC_USE_BOOKINGKOALA`
2. `NEXT_PUBLIC_BOOKINGKOALA_MODE`
3. `NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE` (if using embed mode)
4. `NEXT_PUBLIC_BOOKINGKOALA_URL` (if using redirect or iframe mode)

## Where to Find These Values in BookingKoala Dashboard

### Step 1: Log into Your BookingKoala Account

1. Go to [https://www.bookingkoala.com](https://www.bookingkoala.com)
2. Click "Login" and enter your credentials
3. You'll be taken to your BookingKoala dashboard

### Step 2: Find Your Booking URL

**Option A: From Settings/Integrations**
1. In your BookingKoala dashboard, look for:
   - **Settings** → **Integrations** or
   - **Settings** → **Website** or
   - **Settings** → **Booking Form**
2. Look for "Booking URL" or "Public Booking Link"
3. It should look like: `https://gocleanusausa.bookingkoala.com/book` or `https://yourstorename.bookingkoala.com/book`

**Option B: From the Booking Form Page**
1. Navigate to **Booking Form** or **Online Booking** in the left sidebar
2. Look for a "Share" or "Link" button
3. Copy the public booking URL

**Option C: Check Your Store Name**
- Your store name appears to be: `gocleanusausa`
- So your booking URL is likely: `https://gocleanusausa.bookingkoala.com/book`

### Step 3: Find Your Embed Code (If Using Embed Mode)

1. In your BookingKoala dashboard, go to:
   - **Settings** → **Integrations** or
   - **Settings** → **Website** or
   - **Booking Form** → **Embed Code**
2. Look for "Embed Code" or "Website Integration"
3. Copy the entire `<script>` tag that looks like:
   ```html
   <script src="https://gocleanusausa.bookingkoala.com/resources/embed.js"></script>
   ```

### Step 4: Determine Your Mode

You have 3 options:

**1. Redirect Mode (Recommended for Mobile)**
- Users are redirected to BookingKoala's page
- Best for mobile compatibility
- Values:
  - `NEXT_PUBLIC_USE_BOOKINGKOALA=true`
  - `NEXT_PUBLIC_BOOKINGKOALA_MODE=redirect`
  - `NEXT_PUBLIC_BOOKINGKOALA_URL=https://gocleanusausa.bookingkoala.com/book`

**2. Iframe Mode**
- Embeds BookingKoala in an iframe on your site
- May have mobile date picker issues
- Values:
  - `NEXT_PUBLIC_USE_BOOKINGKOALA=true`
  - `NEXT_PUBLIC_BOOKINGKOALA_MODE=iframe`
  - `NEXT_PUBLIC_BOOKINGKOALA_URL=https://gocleanusausa.bookingkoala.com/book`

**3. Embed Mode**
- Uses BookingKoala's embed script
- Values:
  - `NEXT_PUBLIC_USE_BOOKINGKOALA=true`
  - `NEXT_PUBLIC_BOOKINGKOALA_MODE=embed`
  - `NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE=<script src="https://gocleanusausa.bookingkoala.com/resources/embed.js"></script>`

## Quick Reference: Exact Locations in BookingKoala Dashboard

### Method 1: Settings Menu
1. Click your profile icon (top right)
2. Click **Settings**
3. Look for:
   - **Integrations** tab
   - **Website** tab
   - **Booking Form** section

### Method 2: Left Sidebar Navigation
Look for these menu items:
- **Booking Form**
- **Online Booking**
- **Integrations**
- **Settings** → **Website**

### Method 3: Direct URL (If You Know Your Store Name)
- Booking URL: `https://[your-store-name].bookingkoala.com/book`
- Embed Script: `https://[your-store-name].bookingkoala.com/resources/embed.js`

Based on your code, your store appears to be: **gocleanusausa**

## Recommended Setup for In-Website Form (Not Redirect)

Since you want the form to open on your website (not redirect), use **Iframe Mode** or **Embed Mode**:

**Option 1: Iframe Mode (Recommended)**
**In Vercel Environment Variables:**
```
NEXT_PUBLIC_USE_BOOKINGKOALA=true
NEXT_PUBLIC_BOOKINGKOALA_MODE=iframe
NEXT_PUBLIC_BOOKINGKOALA_URL=https://gocleanusausa.bookingkoala.com/book
```

**Option 2: Embed Mode**
**In Vercel Environment Variables:**
```
NEXT_PUBLIC_USE_BOOKINGKOALA=true
NEXT_PUBLIC_BOOKINGKOALA_MODE=embed
NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE=<script src="https://gocleanusausa.bookingkoala.com/resources/embed.js"></script>
```

**Note:** Iframe mode is usually more reliable for mobile date pickers. Embed mode may require the embed code from your BookingKoala dashboard.

## Steps to Re-add in Vercel

1. **Delete the existing variables** (click the three dots → Delete)
2. **Add them back one by one:**
   - Click "Add New" or "+"
   - Enter the variable name
   - Enter the value
   - Select scope: "All Environments" (or Production/Preview as needed)
   - Click "Save"
3. **Redeploy** your site after adding the variables

## Need Help Finding It?

If you can't find these values:
1. Contact BookingKoala support (available 24/7 via email)
2. Check your BookingKoala welcome email (it often contains your booking URL)
3. Look in your BookingKoala account settings under "Store Information"

## Testing After Re-adding

1. After adding the variables in Vercel, trigger a new deployment
2. Visit your `/book` page
3. Test the date picker on a mobile device
4. If using redirect mode, you should be redirected to BookingKoala's booking page
