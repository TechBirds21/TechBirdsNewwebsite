# Environment Variables Setup Guide

## 📋 Required Environment Variables

Your `.env` file should contain the following variables:

### **Lines 1-2 (REQUIRED):**

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
```

### **Line 3 (OPTIONAL but Recommended):**

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🔧 How to Get Your Supabase Credentials

### Step 1: Go to Supabase Dashboard
1. Visit [https://app.supabase.com](https://app.supabase.com)
2. Sign in to your account
3. Select your project (or create a new one)

### Step 2: Get Your Credentials
1. Click on **Settings** (gear icon) in the left sidebar
2. Click on **API** in the settings menu
3. You'll see two important values:

   **For `VITE_SUPABASE_URL`:**
   - Look for **Project URL**
   - Copy the entire URL (e.g., `https://xxxxxxxxxxxxx.supabase.co`)

   **For `VITE_SUPABASE_ANON_KEY`:**
   - Look for **Project API keys**
   - Find the **`anon` `public`** key
   - Copy the entire key (it's a long string)

### Step 3: Add to .env File
Create a `.env` file in the root directory and add:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 How to Get Google Analytics ID (Optional)

### Step 1: Go to Google Analytics
1. Visit [https://analytics.google.com](https://analytics.google.com)
2. Sign in and select your property

### Step 2: Get Measurement ID
1. Click **Admin** (gear icon) at the bottom left
2. Under **Property**, click **Data Streams**
3. Click on your web stream
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add to .env File
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## ✅ Complete .env File Example

```env
# Supabase Configuration (REQUIRED)
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzE2ODAwMCwiZXhwIjoxOTYyNzQ0MDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google Analytics (OPTIONAL)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🔒 Security Notes

1. **Never commit `.env` to Git** - It's already in `.gitignore`
2. **Use different keys for development and production**
3. **The `anon` key is safe for client-side use** - It's designed for public access
4. **Keep your service role key secret** - Never use it in client-side code

---

## 🧪 Testing Your Setup

After adding your environment variables:

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Check the browser console** - You should NOT see Supabase errors

3. **Test the contact form** - Submit a test message and check Supabase dashboard

4. **Verify Google Analytics** (if added):
   - Check Google Analytics Real-Time reports
   - You should see your visits

---

## ❌ Common Issues

### Issue: "supabaseUrl is required"
**Solution:** Make sure `VITE_SUPABASE_URL` is set in your `.env` file

### Issue: "Missing env.VITE_SUPABASE_ANON_KEY"
**Solution:** Add `VITE_SUPABASE_ANON_KEY` to your `.env` file

### Issue: Environment variables not loading
**Solution:** 
- Make sure the file is named exactly `.env` (not `.env.local` or `.env.development`)
- Restart your development server after adding variables
- Make sure variables start with `VITE_` prefix

---

## 📝 Quick Reference

| Variable | Required | Description | Where to Get It |
|----------|---------|-------------|-----------------|
| `VITE_SUPABASE_URL` | ✅ Yes | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | ✅ Yes | Your Supabase anon public key | Supabase Dashboard → Settings → API |
| `VITE_GA_MEASUREMENT_ID` | ❌ No | Google Analytics 4 ID | Google Analytics → Admin → Data Streams |

---

**Need Help?** Check the [Supabase Documentation](https://supabase.com/docs) or [Google Analytics Help](https://support.google.com/analytics)

