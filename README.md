This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
cp .env.local.example .env.local
```

Then fill in the values:

**Firebase Admin SDK:**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Select your project (or create a new one)
- Go to Project Settings > Service Accounts
- Click "Generate New Private Key" to download the service account JSON
- Extract the following values:
  - `FIREBASE_PROJECT_ID`: Your project ID
  - `FIREBASE_CLIENT_EMAIL`: The `client_email` from the JSON
  - `FIREBASE_PRIVATE_KEY`: The `private_key` from the JSON (keep the quotes and `\n` characters)

**Other Required Variables:**
- `ADMIN_PASSWORD`: Password for admin login
- `RESEND_API_KEY`: Get from [Resend.com](https://resend.com) (for email notifications)
- `RESEND_FROM_EMAIL`: Your verified email address in Resend
- `STRIPE_SECRET_KEY`: Get from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- `STRIPE_WEBHOOK_SECRET`: Get from Stripe Webhooks
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Get from Stripe Dashboard
- `NEXT_PUBLIC_SITE_URL`: Your site URL (use `http://localhost:3000` for local development)

**BookingKoala Integration (Optional):**
To use BookingKoala instead of the custom booking form:
- `NEXT_PUBLIC_USE_BOOKINGKOALA`: Set to `"true"` to enable BookingKoala
- `NEXT_PUBLIC_BOOKINGKOALA_MODE`: Integration mode - `"redirect"` (default), `"iframe"`, or `"embed"`
- `NEXT_PUBLIC_BOOKINGKOALA_URL`: Your BookingKoala booking URL (e.g., `https://yourstore.bookingkoala.com/book`)
- `NEXT_PUBLIC_BOOKINGKOALA_EMBED_CODE`: Embed script code (if using embed mode)
- `NEXT_PUBLIC_BOOKINGKOALA_STORE_ID`: Your BookingKoala store ID (optional)

**Note:** If `NEXT_PUBLIC_USE_BOOKINGKOALA` is not set or set to `"false"`, the site will use the custom booking form.

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Info

This is the Go Clean USA cleaning services website, deployed on Vercel and integrated with BookingKoala for online bookings.

**Last Updated:** December 2025
