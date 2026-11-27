# Meta setup guide: WhatsApp Cloud API for The Furn

Do these steps in order. Steps 1–2 start Meta's review, which takes a few days, so begin today. Don't connect +91 99256 18895 yet: we test on Meta's free test number first, and switch the real number only at the end.

Never paste tokens, passwords or app secrets into chat, Slack or documents. Where a step creates a secret, it goes straight into Coolify at the end (I'll guide you there).

---

## Step 1: Meta Business account (10 minutes)

1. Open **business.facebook.com** and sign in with the Facebook/Meta login that manages The Furn's Instagram or Facebook page (or create one).
2. If The Furn already has a business portfolio there, use it. Otherwise click **Create a business portfolio**:
   - Business name: **The Furn Projects LLP**
   - Your name and business email: **info@thefurn.co**
3. Open **Settings → Business info** and fill in exactly:
   - Legal name: **The Furn Projects LLP**
   - Address: **220, 219 Sumerru Business Corner, near Park Inn by Radisson Blue, Pal Gam, Surat, Gujarat 394510**
   - Phone: **+91 99256 18895**
   - Website: **https://www.thefurn.co**

## Step 2: Business verification (starts Meta's review)

1. In **Settings → Security Centre**, click **Start verification**.
2. Choose verification by documents. Upload a document showing the **legal name and address**, for example:
   - LLP incorporation certificate, or
   - GST registration certificate, or
   - a utility bill / bank statement in the business name
3. Verify by the method Meta offers (email to an @thefurn.co address works best, as it matches the website domain).
4. Meta usually replies within a few working days. You'll get an email; tell me when it says **Verified**.

## Step 3: Developer account and app (20 minutes)

1. Open **developers.facebook.com**, sign in with the same login, and accept the developer terms if asked.
2. **My Apps → Create app**.
   - Use case: **Other**, then type **Business**.
   - App name: **The Furn WhatsApp**
   - Contact email: **info@thefurn.co**
   - Business portfolio: **The Furn Projects LLP**
3. In the app dashboard, find **WhatsApp** and click **Set up**.
4. Meta creates a **WhatsApp Business Account** and a **free test number**. On the **API Setup** page you'll see:
   - a test phone number and its **Phone number ID**
   - a **WhatsApp Business Account ID**
   - a temporary access token (valid 24 hours, only for quick tests)
5. Under **To**, add your own mobile number as a test recipient and confirm the code WhatsApp sends you.

Send me the **Phone number ID** and **WhatsApp Business Account ID** (these are IDs, not secrets).

## Step 4: Display name and profile

In **WhatsApp Manager → Phone numbers** (this is for the real number later; you can prepare it now):
- Display name: **The Furn** (must match the website and signboard; Meta approves it)
- Category: **Home Improvement** (or the closest available)
- Description, address, email, website and hours, matching the website

## Step 5: Check coexistence (important, before switching)

We want your team to keep using the **WhatsApp Business app** on the phone with +91 99256 18895 while the agent runs.

1. In WhatsApp Manager, when adding a phone number, look for the option to **connect an existing WhatsApp Business app number** (Meta calls this coexistence; it is done by scanning a QR code from the WhatsApp Business app).
2. **Don't complete it yet.** Just tell me whether the option appears for you.
3. If it doesn't appear, we'll decide before switching (see the plan, section 6).

## Step 6: Permanent access (later, I'll guide you live)

When the agent is ready for the real number, we'll create:
- a **System user** with a permanent access token (Business Settings → Users → System users)
- the **App secret** (App settings → Basic)
- a **webhook verify token** (a random phrase I generate)

These go **directly into Coolify** as environment variables. We'll do this together on screen; never send them in chat.

## Step 7: Anthropic API key (for the AI)

1. Open **console.anthropic.com**, sign in with info@thefurn.co, and create the organisation **The Furn Projects LLP**.
2. **Billing:** add a card and buy prepaid credits (minimum ≈ $5).
3. **Limits:** set a monthly spend limit (for example $25) so costs can't run away.
4. **API keys → Create key**, name it **the-furn-whatsapp**. Don't copy it anywhere yet; we'll paste it straight into Coolify together.

---

## What to send me

| Item | When |
|---|---|
| "Business verification started" | After step 2 |
| Phone number ID and WhatsApp Business Account ID (test number) | After step 3 |
| Whether the coexistence option appears | After step 5 |
| "Anthropic account ready" | After step 7 |
| "Verified" email from Meta | When it arrives |
