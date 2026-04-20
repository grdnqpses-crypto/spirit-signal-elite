# Quick Start - Build & Deploy Spirit Signal Elite

## 5-Minute Setup Overview

Your **Spirit Signal Elite** app is ready to build. Follow these steps to create an AAB and submit to Google Play Store.

## Phase 1: Authenticate with Expo (5 minutes)

### Step 1: Open Terminal in Project Directory

```bash
cd /home/ubuntu/sss-elite-app
```

### Step 2: Log In to Expo

```bash
pnpm exec eas login
```

**What happens:**
- Browser opens automatically
- Log in with: `grdn.qpses@gmail.com`
- Authorize the CLI
- Return to terminal

### Step 3: Verify Authentication

```bash
pnpm exec eas whoami
```

You should see your username displayed.

## Phase 2: Link Project to Expo (2 minutes)

### Create Project Link

```bash
pnpm exec eas project:create
```

**Follow the prompts:**
1. **Project name**: `sss-elite-app` (or your preference)
2. **Android package**: Confirm the bundle ID
3. **iOS bundle**: Confirm (or skip if Android-only)

### Verify Project

```bash
pnpm exec eas project:info
```

Save your **Project ID** - you'll need it for builds.

## Phase 3: Configure Credentials (3 minutes)

### Set Up Android Signing

```bash
pnpm exec eas credentials
```

**Follow the prompts:**
1. Select **Android**
2. Select **Android Keystore**
3. Choose **Generate a new keystore** (recommended)
4. EAS will create and store your signing certificate

**Save your keystore ID** for future reference.

## Phase 4: Build the AAB (15 minutes)

### Create Production Build

```bash
pnpm exec eas build --platform android --profile production
```

**What happens:**
1. EAS compiles your app
2. Generates a signed AAB file
3. Shows build progress in terminal
4. Provides download link when complete

### Download the AAB

When the build finishes:
1. Click the download link provided
2. Or visit: https://expo.dev/accounts/[username]/projects/[project-id]/builds
3. Download the `.aab` file (e.g., `sss-elite-app-1.0.0-production.aab`)

## Phase 5: Set Up Google Play Console (10 minutes)

### Create Developer Account

1. Visit https://play.google.com/console
2. Pay $25 developer fee
3. Complete your profile

### Create App Listing

1. Click **Create app**
2. **App name**: "Spirit Signal Elite"
3. **Default language**: English
4. **App or game**: App
5. **Free or paid**: Free (with in-app purchases)

### Set Up In-App Purchase

1. Go to **Monetize** → **In-app products**
2. Click **Create product**
3. **Product ID**: `spirit_signal_elite_unlock`
4. **Name**: "Spirit Signal Elite Unlock"
5. **Type**: "Managed product"
6. **Price**: $9.99 USD
7. **Status**: Activate

## Phase 6: Upload AAB to Google Play (5 minutes)

### Upload Build

1. In Google Play Console, go to **Release** → **Production**
2. Click **Create new release**
3. Upload your AAB file
4. Wait for validation (2-3 minutes)

### Complete Store Listing

1. **Store listing**: Add title, description, screenshots
2. **Content rating**: Complete questionnaire
3. **Privacy policy**: Add link
4. **Pricing & distribution**: Select countries

### Submit for Review

1. Click **Review release**
2. Review the summary
3. Click **Start rollout to Production**

**Review time**: 24-48 hours

## Useful Commands

```bash
# Authentication
pnpm exec eas login
pnpm exec eas logout
pnpm exec eas whoami

# Project Management
pnpm exec eas project:create
pnpm exec eas project:info

# Credentials
pnpm exec eas credentials

# Building
pnpm exec eas build --platform android --profile preview    # APK for testing
pnpm exec eas build --platform android --profile production # AAB for Play Store

# Monitoring
pnpm exec eas build:list --platform android
```

## Troubleshooting

### Build Fails
```bash
pnpm exec eas build --platform android --profile production --verbose
```

### Not Authenticated
```bash
pnpm exec eas logout
pnpm exec eas login
```

### Credentials Issue
```bash
pnpm exec eas credentials
```

## What's Next

1. ✅ Authenticate with Expo
2. ✅ Link project
3. ✅ Configure credentials
4. ✅ Build AAB
5. ✅ Create Google Play app
6. ✅ Set up in-app purchase
7. ✅ Upload AAB
8. ✅ Submit for review
9. ⏳ Wait for approval (24-48 hours)
10. ✅ App live on Google Play Store!

## Support Resources

- **EAS Build Docs**: https://docs.expo.dev/eas-update/introduction/
- **Google Play Help**: https://support.google.com/googleplay/android-developer
- **Expo Discord**: https://discord.gg/expo

## Important Notes

- **Credentials**: EAS securely stores your signing certificate. Never commit it to git.
- **Version Updates**: Increment version in `app.config.ts` for each new release.
- **Testing**: Always test with preview APK before production build.
- **Backups**: Save your keystore ID and project ID in a secure location.

---

**Estimated Total Time**: 45 minutes from start to submission

**App Status**: ✅ Ready for production build
