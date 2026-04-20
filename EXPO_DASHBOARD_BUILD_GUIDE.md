# Spirit Signal Elite - Expo Dashboard Build & Google Play Submission Guide

## Overview

This guide provides step-by-step instructions to build and submit the Spirit Signal Elite app to Google Play Store using the Expo Dashboard and Google Play Console.

**Status:** The app is fully developed and ready for production build and submission.

---

## Prerequisites

Before starting, ensure you have:

1. **Expo Account** - CryptoGRDN (already created)
2. **GitHub Account** - CryptoGRDN (already created)
3. **Google Play Console Account** - Already set up with the app listing
4. **Google Cloud Project** - Already configured with necessary APIs
5. **Android Signing Certificate** - Already generated and configured

---

## Phase 1: Connect GitHub Repository to Expo Project

### Step 1.1: Navigate to Expo Dashboard

1. Go to https://expo.dev/dashboard
2. Log in with your Expo account (CryptoGRDN)
3. Click on the **Spirit Signal Elite** project

### Step 1.2: Connect GitHub Repository

1. In the project dashboard, click on **GitHub** in the left sidebar under "PROJECT SETTINGS"
2. Click **"Connect GitHub"** button
3. You'll be redirected to GitHub authorization page
4. Click **"Authorize Expo"** to allow Expo to access your repositories
5. On the GitHub app installation page, select **"All repositories"** or **"Only select repositories"** and choose **spirit-signal-elite**
6. Click **"Install & Authorize"**
7. You'll be redirected back to Expo dashboard

### Step 1.3: Select Repository

After authorization:

1. Back in Expo dashboard, you should see a dropdown to select the repository
2. Select **CryptoGRDN/spirit-signal-elite**
3. Select **main** as the branch
4. Click **"Save"** or **"Connect"**

---

## Phase 2: Configure Credentials

### Step 2.1: Set Up Android Credentials

1. In the project dashboard, go to **Credentials** under "PROJECT SETTINGS"
2. Click on **"Android"** section
3. Click **"Add Credentials"** or **"Configure"**
4. You'll need to provide:
   - **Keystore**: The Android signing certificate (should already be configured from previous setup)
   - **Keystore Password**: The password for your keystore
   - **Key Alias**: The alias of your signing key
   - **Key Password**: The password for your key

If you don't have these, you can:
- Generate a new keystore: `keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias`
- Or use the existing credentials from your Google Play Console setup

---

## Phase 3: Trigger EAS Build

### Step 3.1: Navigate to Builds

1. In the project dashboard, click on **"Builds"** in the left sidebar under "DEPLOY"
2. Click **"Build your app for distribution"** or **"Create new build"**

### Step 3.2: Configure Build Settings

1. **Platform**: Select **Android**
2. **Build Type**: Select **APK** or **AAB** (choose **AAB** for Google Play Store)
3. **Build Profile**: Select **production** (from eas.json)
4. **Branch**: Confirm **main** is selected

### Step 3.3: Start the Build

1. Click **"Build"** or **"Start Build"**
2. The build will start and you'll see a progress indicator
3. Build typically takes 10-15 minutes

### Step 3.4: Monitor Build Progress

1. You can view the build status in real-time
2. The dashboard will show:
   - Build status (Queued, Building, Completed, Failed)
   - Build logs
   - Estimated time remaining

---

## Phase 4: Download the AAB

### Step 4.1: Wait for Build Completion

1. Once the build shows **"Completed"** status, click on it to view details
2. You'll see a download button for the AAB file

### Step 4.2: Download AAB

1. Click **"Download"** button
2. The AAB file will be downloaded to your computer (typically named something like `spirit-signal-elite-production.aab`)
3. Save this file in a safe location

---

## Phase 5: Upload AAB to Google Play Console

### Step 5.1: Navigate to Google Play Console

1. Go to https://play.google.com/console
2. Log in with your Google account
3. Select the **Spirit Signal Elite** app

### Step 5.2: Upload AAB

1. In the left sidebar, go to **"Release"** → **"Production"**
2. Click **"Create new release"** or **"Edit release"**
3. Click **"Browse files"** under "App bundles and APKs"
4. Select the downloaded AAB file
5. Click **"Upload"**
6. Wait for the upload to complete and validation to pass

### Step 5.3: Review Release Details

1. Verify the app version number
2. Add release notes if desired
3. Review the app details

---

## Phase 6: Create In-App Product ($9.99 Purchase)

### Step 6.1: Navigate to In-App Products

1. In Google Play Console, go to **"Monetize"** → **"In-app products"**
2. Click **"Create product"**

### Step 6.2: Configure Product

1. **Product ID**: Enter `elite_unlock` (or similar)
2. **Product Type**: Select **"One-time purchase"**
3. **Product Name**: Enter `Elite Unlock`
4. **Description**: Enter `Unlock elite features for Spirit Signal`

### Step 6.3: Set Price

1. In the **"Pricing"** section, set the price to **$9.99**
2. Select your country/region
3. Click **"Save"**

### Step 6.4: Activate Product

1. Set the product status to **"Active"**
2. Click **"Save"**

---

## Phase 7: Complete Store Listing

### Step 7.1: Review App Details

1. Go to **"Store presence"** → **"Main store listing"**
2. Verify all information is correct:
   - App name: Spirit Signal Elite
   - Short description
   - Full description
   - Screenshots
   - Feature graphic
   - Privacy policy
   - Support email

### Step 7.2: Content Rating

1. Go to **"Store presence"** → **"Content rating"**
2. Complete the content rating questionnaire if not already done
3. Submit for rating

### Step 7.3: App Signing

1. Go to **"Setup"** → **"App signing"**
2. Verify that Google Play is managing your app signing
3. Note the SHA-1 fingerprint for your certificate

---

## Phase 8: Submit for Review

### Step 8.1: Final Review

1. Go to **"Release"** → **"Production"**
2. Review all the details:
   - AAB uploaded and validated
   - In-app products configured
   - Store listing complete
   - Privacy policy provided
   - Content rating submitted

### Step 8.2: Submit Release

1. Click **"Review release"**
2. Verify all information one more time
3. Click **"Start rollout to Production"** or **"Submit"**
4. Confirm the submission

### Step 8.3: Monitor Review Status

1. After submission, Google will review your app (typically 2-24 hours)
2. You can check the status in the **"Release"** section
3. You'll receive an email notification when the review is complete

---

## Troubleshooting

### Build Fails

**Issue**: EAS build fails with an error

**Solution**:
1. Check the build logs in the Expo dashboard
2. Common issues:
   - Missing or incorrect credentials
   - Invalid app configuration
   - Dependency conflicts
3. Fix the issue and retry the build

### Upload Fails

**Issue**: AAB upload fails in Google Play Console

**Solution**:
1. Verify the AAB file is not corrupted
2. Check that the version code is higher than the previous release
3. Ensure the signing certificate matches
4. Try uploading again

### In-App Purchase Not Working

**Issue**: In-app purchase fails or doesn't appear in the app

**Solution**:
1. Verify the product ID matches exactly in the app code and Google Play Console
2. Ensure the product is set to "Active" status
3. Check that the app is using the correct Google Play Billing library
4. Test on a real device (not emulator)

---

## Timeline

- **Build**: 10-15 minutes
- **Upload to Google Play**: 2-5 minutes
- **Google Review**: 2-24 hours (typically 4-8 hours)
- **Total Time**: 1-2 days

---

## Support

For issues with:
- **Expo**: https://docs.expo.dev
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Google Play**: https://support.google.com/googleplay/android-developer

---

## Checklist

Before submitting, ensure:

- [ ] GitHub repository connected to Expo project
- [ ] Android credentials configured
- [ ] AAB successfully built
- [ ] AAB downloaded
- [ ] AAB uploaded to Google Play Console
- [ ] In-app product ($9.99) created and active
- [ ] Store listing complete with all required information
- [ ] Privacy policy provided
- [ ] Content rating submitted
- [ ] Release reviewed and ready for submission
- [ ] Submitted for review

---

## Next Steps

1. Follow Phase 1-3 to build the AAB
2. Download the AAB (Phase 4)
3. Upload to Google Play Console (Phase 5)
4. Create in-app product (Phase 6)
5. Complete store listing (Phase 7)
6. Submit for review (Phase 8)

Good luck with your submission! 🚀
