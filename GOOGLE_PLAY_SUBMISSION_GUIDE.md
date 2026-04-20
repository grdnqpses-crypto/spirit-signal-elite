# Spirit Signal Elite - Google Play Store Submission Guide

## Overview

Your Spirit Signal Elite app is production-ready. This guide walks you through building the Android App Bundle (AAB) and submitting it to Google Play Store.

**Timeline:** ~2-3 hours for build + submission, 2-24 hours for Google review

---

## Part 1: Build the AAB (Android App Bundle)

### Option A: Build via Expo Dashboard (Recommended - Easiest)

1. **Go to Expo Dashboard**
   - URL: https://expo.dev/accounts/cryptogrdn/projects/spirit-signal-elite/builds

2. **Click "Build from GitHub"**
   - Platform: **Android**
   - Build Profile: **Production**
   - Git ref: **main** (or your branch)
   - EAS Submit: **Enable** (optional - for automatic submission)

3. **Click Confirm**
   - Build will start (takes 10-20 minutes)
   - You'll receive an email when complete

4. **Download the AAB**
   - Once build completes, click the build
   - Download the `.aab` file (Android App Bundle)

### Option B: Build via EAS CLI (Advanced - More Control)

```bash
cd /home/ubuntu/sss-elite-app

# Login to Expo
pnpm exec eas login

# Build for production
pnpm exec eas build --platform android --profile production

# Download when complete
# Link will be provided in terminal
```

---

## Part 2: Set Up Google Play Console

### Create Developer Account (if needed)
1. Go to https://play.google.com/console
2. Sign in with your Google account
3. Pay $25 one-time registration fee
4. Accept terms and conditions

### Create App Listing

1. **Click "Create app"**
   - App name: **Spirit Signal Elite**
   - Default language: **English**
   - App type: **App**
   - Category: **Productivity** or **Utilities**
   - Content rating: **Complete questionnaire**

2. **Fill in App Details**
   - Short description (80 chars): "Detect anomalies in real-time audio signals"
   - Full description (4000 chars):
     ```
     Spirit Signal Elite is an advanced audio anomaly detection application 
     that uses machine learning to identify unusual patterns in real-time 
     audio signals. Perfect for:
     
     - Audio quality monitoring
     - Signal analysis
     - Anomaly detection research
     - Real-time audio processing
     
     Features:
     - Real-time audio recording and analysis
     - Advanced anomaly detection engine
     - Instant feedback and alerts
     - Professional-grade signal processing
     ```

3. **Add Screenshots** (minimum 2, maximum 8)
   - Size: 1080 x 1920 pixels
   - Show: Home screen, Paywall, Results
   - Add captions describing features

4. **Add App Icon**
   - Size: 512 x 512 pixels
   - Format: PNG
   - Use: `/home/ubuntu/sss-elite-app/assets/images/icon.png`

5. **Add Feature Graphic** (optional)
   - Size: 1024 x 500 pixels
   - Shows on store listing

---

## Part 3: Upload AAB to Google Play

### Upload Build

1. **Go to Google Play Console**
   - https://play.google.com/console

2. **Select Your App**
   - Click "Spirit Signal Elite"

3. **Go to Release → Production**
   - Left sidebar: Release → Production

4. **Click "Create new release"**

5. **Upload AAB File**
   - Click "Browse files"
   - Select your downloaded `.aab` file
   - Wait for upload and validation (2-5 minutes)

6. **Review Release Details**
   - Release notes: "Initial launch of Spirit Signal Elite"
   - Click "Save"

---

## Part 4: Set Up In-App Purchases

### Create $9.99 Elite Unlock Product

1. **Go to Monetize → In-app products**
   - Left sidebar: Monetize → In-app products

2. **Click "Create product"**
   - Product ID: `elite_unlock`
   - Product name: **Elite Unlock**
   - Product type: **One-time purchase**

3. **Set Price**
   - Price: **$9.99 USD**
   - Set for all countries/regions

4. **Add Description**
   - Title: "Unlock Elite Features"
   - Description: "Unlock advanced anomaly detection features"

5. **Activate Product**
   - Status: **Active**
   - Click "Save"

### Link Product in App

The app already has the product ID configured:
- File: `app/(tabs)/index.tsx`
- Product ID: `elite_unlock`
- Price: `$9.99`

---

## Part 5: Complete Store Listing

### Content Rating

1. **Go to Setup → App content**
   - Left sidebar: Setup → App content

2. **Complete Questionnaire**
   - Answer questions about app content
   - Takes ~5 minutes

3. **Get Rating**
   - Google assigns rating (Everyone, 3+, 7+, 12+, 16+, 18+)

### Target Audience

1. **Go to Setup → Target audience**
   - Select: **Not directed to children**
   - Confirm you're not targeting children

### Privacy Policy

1. **Go to Setup → App privacy**
   - Add privacy policy URL (required)
   - Example: Create simple privacy policy on your website
   - Or use: https://www.privacypolicygenerator.info/

### Permissions

1. **Go to Setup → App permissions**
   - Review requested permissions
   - Our app requests: **Microphone** (for audio recording)
   - Confirm permissions are necessary

---

## Part 6: Submit for Review

### Final Checklist

- [ ] AAB uploaded and validated
- [ ] App icon added (512x512 PNG)
- [ ] Screenshots added (minimum 2)
- [ ] Short description (80 chars)
- [ ] Full description (4000 chars)
- [ ] Content rating completed
- [ ] Target audience set
- [ ] Privacy policy added
- [ ] In-app product created ($9.99 elite_unlock)
- [ ] Release notes added

### Submit

1. **Go to Release → Production**
   - Left sidebar: Release → Production

2. **Review Release**
   - Check all details
   - Verify AAB is uploaded

3. **Click "Review release"**
   - Review summary
   - Confirm all required fields

4. **Click "Start rollout to Production"**
   - Confirm submission

5. **Wait for Review**
   - Google reviews in 2-24 hours
   - You'll get email notification
   - Check status in Play Console

---

## Part 7: Post-Submission

### Monitor Review Status

1. **Go to Release → Production**
   - View current status
   - See any rejection reasons

### If Rejected

- Read rejection reason carefully
- Fix issues in app code
- Rebuild AAB
- Resubmit

### If Approved

- App goes live on Google Play Store
- Users can download immediately
- You'll receive confirmation email

---

## Troubleshooting

### Build Fails

**Error: "Credentials not found"**
- Solution: Configure credentials in Expo Dashboard → Credentials
- Upload keystore file with passwords

**Error: "Build timeout"**
- Solution: Retry build, or contact Expo support

### Upload Fails

**Error: "Invalid AAB"**
- Solution: Rebuild from latest code
- Ensure version code is incremented

**Error: "Signature mismatch"**
- Solution: Use same keystore for all builds
- Don't change signing certificate

### App Rejected

**Common Reasons:**
1. **Violates policy** - Review Google Play policies
2. **Crashes on startup** - Test thoroughly
3. **Misleading description** - Match app functionality
4. **Requires permissions not used** - Remove unnecessary permissions

**Solution:**
- Fix issue in code
- Increment version code in `app.config.ts`
- Rebuild and resubmit

---

## Next Steps After Launch

1. **Monitor Reviews**
   - Respond to user reviews
   - Fix bugs reported

2. **Track Analytics**
   - Go to Analytics in Play Console
   - Monitor installs, crashes, ratings

3. **Update App**
   - Add features based on feedback
   - Increment version code
   - Rebuild and submit new release

4. **Marketing**
   - Share app link
   - Get reviews from beta testers
   - Promote on social media

---

## Useful Links

- **Expo Dashboard**: https://expo.dev/accounts/cryptogrdn/projects/spirit-signal-elite
- **Google Play Console**: https://play.google.com/console
- **Google Play Policies**: https://play.google.com/about/developer-content-policy/
- **Expo EAS Documentation**: https://docs.expo.dev/eas/
- **Android App Bundle Guide**: https://developer.android.com/guide/app-bundle

---

## Support

- **Expo Support**: https://expo.dev/support
- **Google Play Support**: https://support.google.com/googleplay/android-developer
- **Stack Overflow**: Tag with `expo` and `google-play`

---

**Your app is ready to launch! Follow these steps and you'll have Spirit Signal Elite on Google Play Store within 24 hours.**
