# Build & Deployment Guide - Spirit Signal Elite

## Quick Start

This guide covers building and deploying the Spirit Signal Elite app to Google Play Store using Expo EAS Build.

## Prerequisites

Before you begin, ensure you have:

1. **Expo Account** - Create at https://expo.dev
2. **Google Play Developer Account** - Register at https://play.google.com/console ($25 fee)
3. **Expo CLI** - Install with `npm install -g expo-cli`
4. **Node.js** - Version 16 or higher
5. **Google Cloud Project** - For service account credentials

## Project Structure

```
sss-elite-app/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx            # Home screen with SCAN button
│   │   └── _layout.tsx          # Tab configuration
│   ├── paywall.tsx              # In-app purchase screen
│   ├── settings.tsx             # Settings screen
│   ├── _layout.tsx              # Root layout with providers
│   └── oauth/                   # OAuth callback
├── lib/
│   ├── audio-context.tsx        # Audio recording & anomaly detection
│   ├── billing-context.tsx      # Google Play Billing integration
│   ├── theme-provider.tsx       # Theme management
│   └── trpc.ts                  # API client
├── components/
│   ├── screen-container.tsx     # SafeArea wrapper
│   └── ui/
│       └── icon-symbol.tsx      # Icon mapping
├── app.config.ts                # Expo configuration
├── eas.json                     # EAS Build configuration
├── package.json                 # Dependencies
└── tailwind.config.js           # Tailwind CSS config
```

## Development Setup

### 1. Install Dependencies

```bash
cd /home/ubuntu/sss-elite-app
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

This starts:
- Metro bundler on port 8081
- Backend API on port 3000
- Expo Go QR code for mobile testing

### 3. Test on Device

**Option A: Expo Go (Recommended for Development)**
1. Install Expo Go app on your Android device
2. Scan the QR code from the terminal
3. App opens in Expo Go

**Option B: Native Build (for Testing)**
```bash
eas build --platform android --profile development
```

## Building for Production

### Step 1: Prepare Your Credentials

Before building, ensure you have:
1. Expo account credentials
2. Google Play service account JSON file
3. App signing certificate (EAS can generate this)

### Step 2: Configure Credentials

```bash
eas credentials
```

Follow the prompts to:
- Select Android platform
- Generate or provide signing credentials
- Store credentials securely

### Step 3: Build the AAB

```bash
eas build --platform android --profile production
```

**What happens:**
1. EAS Build compiles your app
2. Generates a signed AAB (Android App Bundle)
3. Uploads to EAS Build servers
4. Provides download link when complete

**Build time:** 10-15 minutes

### Step 4: Download the AAB

Once the build completes:
1. Visit the provided download link
2. Download the `.aab` file
3. Save it securely (you'll upload to Google Play)

## Uploading to Google Play Store

### Step 1: Prepare Google Play Console

1. Log in to [Google Play Console](https://play.google.com/console)
2. Select your app "Spirit Signal Elite"
3. Go to **Release** → **Production**
4. Click **Create new release**

### Step 2: Upload AAB

1. Click **Browse files** and select your downloaded `.aab` file
2. Wait for Google Play to process and validate the AAB
3. Review the app details provided

### Step 3: Complete Release Information

1. **Release notes**: Add what's new in this version
2. **Content rating**: Complete the content rating form (if not done)
3. **Privacy policy**: Ensure a valid privacy policy URL is set
4. **Store listing**: Verify all store listing information is complete

### Step 4: Submit for Review

1. Review all sections for warnings
2. Click **Review release**
3. Verify the summary
4. Click **Start rollout to Production**

**Review time:** 24-48 hours typically

## In-App Purchase Setup

### Configure Product in Google Play Console

1. Go to **Monetize** → **In-app products**
2. Click **Create product**
3. **Product ID**: `spirit_signal_elite_unlock`
4. **Product type**: "Managed product"
5. **Price**: $9.99 USD
6. **Status**: Activate

### Test Purchases

1. Add your Google account as a tester
2. Install the app on a test device
3. Tap "Unlock Elite - $9.99" button
4. Complete the purchase flow
5. Verify purchase is saved

## Version Management

### Update Version for New Release

1. Edit `app.config.ts`:
```typescript
const config: ExpoConfig = {
  version: "1.0.1",  // Increment version
  // ... rest of config
};
```

2. Rebuild:
```bash
eas build --platform android --profile production
```

3. Upload new AAB to Google Play Console

**Important:** Version code must be higher than previous releases.

## Monitoring & Updates

### View App Statistics

1. Go to Google Play Console
2. **Statistics** section shows:
   - Downloads and installs
   - Active installs
   - Ratings and reviews
   - Crash reports

### Push Updates

After initial release, you can:
1. Fix bugs and push updates
2. Add new features
3. Improve UI/UX

Each update requires:
1. Version bump in `app.config.ts`
2. New EAS Build
3. Upload to Google Play Console
4. Review and approval (24-48 hours)

## Troubleshooting

### Build Fails

**Error: "Build failed"**
- Check EAS Build logs for details
- Verify all dependencies are installed
- Ensure `app.config.ts` is valid

**Solution:**
```bash
eas build --platform android --profile production --verbose
```

### Upload Fails

**Error: "Invalid signature"**
- Ensure signing certificate matches Google Play Console
- Regenerate credentials if needed

**Error: "Version code too low"**
- Increment version in `app.config.ts`
- Version code must be higher than previous release

### Purchase Not Working

**Issue: Purchase button doesn't work**
1. Verify product ID in Google Play Console matches code
2. Ensure in-app product is activated
3. Check that app is signed correctly

**Solution:**
1. Go to `lib/billing-context.tsx`
2. Verify `ELITE_PRODUCT_ID = "spirit_signal_elite_unlock"`
3. Rebuild and test

## Performance Optimization

### Reduce Build Size

The AAB includes:
- arm64-v8a (64-bit ARM)
- armeabi-v7a (32-bit ARM)

Google Play automatically optimizes for each device.

### Monitor App Performance

1. Check crash reports in Google Play Console
2. Monitor battery usage
3. Track user retention

## Security Best Practices

1. **Keep credentials secure** - Never commit service account JSON
2. **Use environment variables** - For sensitive data
3. **Test thoroughly** - Before releasing to production
4. **Monitor reviews** - For security-related feedback

## Next Steps

1. ✅ Build and test locally
2. ✅ Create Google Play Developer account
3. ✅ Configure in-app purchases
4. ✅ Build AAB with EAS
5. ✅ Upload to Google Play Console
6. ✅ Submit for review
7. ✅ Monitor app performance
8. ✅ Plan future updates

## Useful Commands

```bash
# Start development
pnpm dev

# Build for preview (APK)
eas build --platform android --profile preview

# Build for production (AAB)
eas build --platform android --profile production

# Check TypeScript
pnpm check

# Format code
pnpm format

# Run tests
pnpm test

# View credentials
eas credentials
```

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Guide](https://docs.expo.dev/eas-update/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [React Native IAP](https://react-native-iap.dooboolab.com/)
- [Android App Bundle](https://developer.android.com/guide/app-bundle)

## Support

For help with:
- **Expo**: [Expo Discord](https://discord.gg/expo)
- **Google Play**: [Google Play Support](https://support.google.com/googleplay)
- **React Native**: [React Native Community](https://reactnative.dev/help)
