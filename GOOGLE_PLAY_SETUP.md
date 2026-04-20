# Google Play Store Setup & Build Guide

## Overview

This guide walks you through setting up the Spirit Signal Elite app for Google Play Store 2026 requirements, including in-app purchases and AAB (Android App Bundle) generation using Expo EAS Build.

## Prerequisites

- Expo account (create at https://expo.dev)
- Google Play Developer account ($25 one-time fee)
- Google Cloud Project with billing enabled
- Expo CLI installed (`npm install -g expo-cli`)

## Step 1: Set Up Google Play Developer Account

1. Visit [Google Play Console](https://play.google.com/console)
2. Sign in with your Google account
3. Pay the $25 developer registration fee
4. Complete your developer profile with:
   - Developer name
   - Email address
   - Website (optional)
   - Phone number

## Step 2: Create a New App in Google Play Console

1. Click **Create app** in Google Play Console
2. Fill in the app details:
   - **App name**: "Spirit Signal Elite"
   - **Default language**: English
   - **App or game**: Select "App"
   - **Free or paid**: Select "Free" (we'll use in-app purchases)
3. Accept the declaration and create the app

## Step 3: Set Up In-App Purchase ($9.99 Elite Unlock)

### Create the In-App Product

1. In Google Play Console, go to **Monetize** → **In-app products**
2. Click **Create product**
3. Fill in the product details:
   - **Product ID**: `spirit_signal_elite_unlock`
   - **Product name**: "Spirit Signal Elite Unlock"
   - **Product type**: Select "Managed product" (one-time purchase)
   - **Description**: "Unlock elite features including advanced anomaly detection and result sharing"
4. Click **Create product**

### Configure Pricing

1. In the product details, go to **Pricing and distribution**
2. Set the price to **$9.99 USD**
3. Select all countries where you want to distribute
4. Click **Save**

### Activate the Product

1. Go to **Status** section
2. Click **Activate** to make the product available for purchase

## Step 4: Set Up Google Cloud Project for Service Account

### Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **Service Account**
5. Fill in the service account details:
   - **Service account name**: "Spirit Signal Elite"
   - **Service account ID**: auto-generated
6. Click **Create and Continue**
7. Grant the service account the **Editor** role
8. Click **Continue** and then **Done**

### Generate Service Account Key

1. Click on the created service account
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Select **JSON** format
5. Click **Create** - this downloads the JSON file
6. Save this file securely (you'll need it for EAS Build)

## Step 5: Configure Expo EAS Build

### Link Your Expo Account

```bash
cd /home/ubuntu/sss-elite-app
eas login
# Follow the prompts to log in with your Expo account
```

### Set Up Android Credentials

```bash
eas credentials
# Select Android
# Follow the prompts to generate/provide signing credentials
```

When prompted, you can either:
- Let EAS generate credentials for you (recommended for first-time builds)
- Provide your own keystore file

### Update eas.json

The `eas.json` file is already configured. Update the service account path:

```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccount": "path/to/your/service-account-key.json",
        "track": "internal"
      }
    }
  }
}
```

## Step 6: Build the AAB (Android App Bundle)

### Build for Production

```bash
eas build --platform android --profile production
```

This will:
1. Build the AAB file
2. Upload it to EAS Build
3. Provide you with a download link when complete

The build process typically takes 10-15 minutes.

### Download the AAB

Once the build completes, you'll receive a download link. The AAB file will be named something like:
`sss-elite-app-1.0.0-production.aab`

## Step 7: Upload AAB to Google Play Console

### Prepare for Release

1. In Google Play Console, go to **Release** → **Production**
2. Click **Create new release**
3. Upload the AAB file you downloaded from EAS Build
4. Review the app details:
   - **Release notes**: Add release notes for version 1.0.0
   - **Content rating**: Complete the content rating questionnaire
   - **Privacy policy**: Add a link to your privacy policy

### Complete App Listing

1. Go to **Store listing** and fill in:
   - **App title**: "Spirit Signal Elite"
   - **Short description**: Brief description of the app
   - **Full description**: Detailed description of features
   - **Screenshots**: Upload 2-8 screenshots (required)
   - **Feature graphic**: Upload a 1024x500px banner
   - **App icon**: 512x512px PNG
   - **Category**: Select appropriate category
   - **Content rating**: Complete questionnaire
   - **Target audience**: Select appropriate age group

### Add Pricing & Distribution

1. Go to **Pricing & distribution**
2. Set countries where the app is available
3. Ensure **Free** is selected (with in-app purchases)
4. Review content rating

## Step 8: Submit for Review

1. Review all sections marked with a warning icon
2. Complete any missing information
3. Click **Review release**
4. Review the summary and click **Start rollout to Production**

The app will be submitted for review. Google typically reviews apps within 24-48 hours.

## Step 9: Monitor App Status

1. Check **Release** → **Production** for review status
2. Once approved, the app will be available on Google Play Store
3. Monitor **Statistics** for download and rating data

## Google Play Store 2026 Requirements Compliance

This app meets the following 2026 requirements:

- ✅ **Minimum SDK 24** (API level 24 / Android 7.0)
- ✅ **Target SDK 35** (API level 35 / Android 15)
- ✅ **64-bit support** (AAB includes arm64-v8a and armeabi-v7a)
- ✅ **Privacy policy** (required for app listing)
- ✅ **Content rating** (required for distribution)
- ✅ **In-app purchases** (Google Play Billing integration)
- ✅ **Microphone permissions** (properly declared)
- ✅ **Data safety** (complete data safety form)

## Testing Before Release

### Test on Device

```bash
# Build APK for testing
eas build --platform android --profile preview

# Or use Expo Go for quick testing
eas build --platform android --profile development
```

### Test In-App Purchases

1. Add your Google account as a tester in Google Play Console
2. Install the app on a test device
3. Test the purchase flow
4. Verify purchase state is saved correctly

## Troubleshooting

### Build Fails

- Check that all required environment variables are set
- Verify your Expo account has sufficient credits
- Check the build logs in EAS Build dashboard

### Upload Fails

- Ensure the AAB is signed correctly
- Verify the version code is higher than previous releases
- Check that the package name matches your Google Play app

### Purchase Not Working

- Verify the product ID matches in Google Play Console
- Ensure the app is signed with the same key as in Google Play Console
- Check that in-app purchase is enabled in Google Play Console

## Next Steps

1. Monitor app performance in Google Play Console
2. Collect user feedback and reviews
3. Plan updates and new features
4. Consider implementing analytics for user behavior tracking

## Additional Resources

- [Expo EAS Build Documentation](https://docs.expo.dev/eas-update/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Google Play Billing Documentation](https://developer.android.com/google-play/billing)
- [React Native IAP Documentation](https://react-native-iap.dooboolab.com/)

## Support

For issues with:
- **Expo Build**: Visit [Expo Discord](https://discord.gg/expo)
- **Google Play**: Contact [Google Play Support](https://support.google.com/googleplay)
- **React Native IAP**: Check [GitHub Issues](https://github.com/dooboolab-community/react-native-iap/issues)
