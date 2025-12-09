image.png# BookingKoala Integration Guide

This guide will help you integrate BookingKoala into your existing cleaning service website.

## What is BookingKoala?

BookingKoala is a comprehensive booking and business management platform designed specifically for service businesses like cleaning companies. It provides:

- Online booking forms
- Payment processing
- Scheduling and calendar management
- Customer management
- Provider/team management
- Marketing tools (SMS, email campaigns, gift cards)
- Mobile apps
- Reports and analytics

## Getting Started

### Step 1: Sign Up for BookingKoala

1. Visit [BookingKoala.com](https://www.bookingkoala.com)
2. Sign up for a free 14-day trial
3. Choose a plan that fits your needs:
   - **Starter**: $27/month (5 providers)
   - **Growing**: $57/month (15 providers)
   - **Premium**: $197/month (50 providers)

### Step 2: Get Your Booking URL

After signing up, you'll need to get your booking URL from your BookingKoala dashboard:

1. Log into your BookingKoala account
2. Navigate to your booking form settings
3. Copy your booking URL (it will look like: `https://yourstore.bookingkoala.com/book`)

### Step 3: Configure Environment Variables

Add the following to your `.env.local` file:

```bash
# Enable BookingKoala integration
NEXT_PUBLIC_USE_BOOKINGKOALA=true

# Choose integration mode: "redirect", "iframe", or "embed"
NEXT_PUBLIC_BOOKINGKOALA_MODE=redirect

# Your BookingKoala booking URL
NEXT_PUBLIC_BOOKINGKOALA_URL=https://yourstore.bookingkoala.com/book

# Optional: Store ID (if provided by BookingKoala)
NEXT_PUBLIC_BOOKINGKOALA_STORE_ID=your-store-id

# Optional: Embed code (only if using embed mode)
NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE=<script src="..."></script>
```

## Integration Modes

### 1. Redirect Mode (Recommended)

This mode redirects users to BookingKoala's hosted booking page. This is the simplest and most reliable option.

**Configuration:**
```bash
NEXT_PUBLIC_USE_BOOKINGKOALA=true
NEXT_PUBLIC_BOOKINGKOALA_MODE=redirect
NEXT_PUBLIC_BOOKINGKOALA_URL=https://yourstore.bookingkoala.com/book
```

**Pros:**
- Simple setup
- Full BookingKoala features
- Mobile-optimized
- Always up-to-date

**Cons:**
- Users leave your site temporarily
- Less control over styling

### 2. Iframe Mode

Embeds the BookingKoala booking form in an iframe on your site.

**Configuration:**
```bash
NEXT_PUBLIC_USE_BOOKINGKOALA=true
NEXT_PUBLIC_BOOKINGKOALA_MODE=iframe
NEXT_PUBLIC_BOOKINGKOALA_URL=https://yourstore.bookingkoala.com/book
```

**Pros:**
- Users stay on your site
- Seamless integration
- Easy to implement

**Cons:**
- May have mobile responsiveness issues
- Limited styling control

### 3. Embed Mode

Uses BookingKoala's embed script (if provided).

**Configuration:**
```bash
NEXT_PUBLIC_USE_BOOKINGKOALA=true
NEXT_PUBLIC_BOOKINGKOALA_MODE=embed
NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE=<script src="https://..."></script>
```

**Pros:**
- Most customizable
- Can match your site's design better

**Cons:**
- Requires embed code from BookingKoala
- May need custom CSS adjustments

## Testing the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/book`

3. You should see:
   - **Redirect mode**: A loading screen that redirects to BookingKoala
   - **Iframe mode**: The BookingKoala form embedded in your page
   - **Embed mode**: The BookingKoala form using the embed script

## Switching Back to Custom Form

If you want to use your custom booking form instead:

1. Remove or set to `false`:
   ```bash
   NEXT_PUBLIC_USE_BOOKINGKOALA=false
   ```

2. Or simply remove the variable from `.env.local`

## Troubleshooting

### BookingKoala not loading

- Check that `NEXT_PUBLIC_USE_BOOKINGKOALA=true` is set
- Verify your booking URL is correct
- Make sure your BookingKoala account is active
- Check browser console for errors

### Redirect not working

- Ensure `NEXT_PUBLIC_BOOKINGKOALA_URL` is set correctly
- Check that the URL is accessible
- Verify BookingKoala account status

### Iframe not displaying

- Check if BookingKoala allows iframe embedding
- Verify the URL is correct
- Check browser console for CORS errors
- Try using redirect mode instead

### Embed code not working

- Verify the embed code is complete
- Check that BookingKoala provides embed functionality
- Ensure the script is properly formatted
- Try iframe mode as an alternative

## Support

- **BookingKoala Support**: [bookingkoala.com/support](https://www.bookingkoala.com)
- **BookingKoala Help Center**: Available in your dashboard
- **Email Support**: Available 24/7/365 via email

## Next Steps

After integrating BookingKoala:

1. **Customize your booking form** in the BookingKoala dashboard
2. **Set up your services and pricing**
3. **Configure payment processing** (Stripe integration)
4. **Set up SMS notifications** (if on Growing or Premium plan)
5. **Add your team members** as providers
6. **Test the booking flow** end-to-end

## Benefits of Using BookingKoala

- ✅ **Automated scheduling** - No more manual calendar management
- ✅ **Payment processing** - Built-in Stripe integration
- ✅ **Customer management** - All customer data in one place
- ✅ **Marketing tools** - SMS reminders, email campaigns, gift cards
- ✅ **Mobile apps** - For you, your team, and customers
- ✅ **Reports & analytics** - Track bookings, revenue, and more
- ✅ **Multi-location support** - Manage multiple service areas
- ✅ **Time zone handling** - Automatic time zone conversion

## Cost Comparison

**Custom Solution (Current):**
- Development time: Ongoing
- Maintenance: Ongoing
- Features: Limited to what you build
- Updates: Manual

**BookingKoala:**
- Development time: Minimal (setup only)
- Maintenance: Handled by BookingKoala
- Features: Comprehensive, regularly updated
- Updates: Automatic

## Conclusion

BookingKoala provides a complete booking and business management solution that can save you time and help grow your business. The integration is simple and can be enabled/disabled easily via environment variables.

For questions or issues, refer to the BookingKoala support resources or check the troubleshooting section above.

