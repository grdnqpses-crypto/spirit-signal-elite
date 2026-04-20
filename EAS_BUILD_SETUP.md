# EAS Build Setup Guide - Spirit Signal Elite

## Overview

This guide walks you through setting up Expo EAS Build to create a production-ready AAB (Android App Bundle) for Google Play Store submission.

## Prerequisites

Before starting, ensure you have:

1. **Expo Account** - Create at https://expo.dev if you don't have one
2. **Expo CLI** - Installed globally: `npm install -g expo-cli`
3. **Node.js** - Version 16 or higher
4. **Git** - For version control
5. **Google Play Developer Account** - For submission (separate from EAS)

## Step 1: Create an Expo Account

### Sign Up

1. Visit https://expo.dev
2. Click **Sign up**
3. Enter your email and create a password
4. Verify your email address
5. Complete your profile

### Verify Email

Check your email for a verification link and click it to activate your account.

## Step 2: Log In with Expo CLI

### Authenticate Locally

```bash
cd /home/ubuntu/sss-elite-app
eas login
```

### Follow the Prompts

1. You'll be directed to the Expo website
2. Log in with your Expo account credentials
3. Authorize the CLI to access your account
4. Return to the terminal - you should see a success message

### Verify Authentication

```bash
eas whoami
```

You should see your Expo username displayed.

## Step 3: Link Your Project to Expo

### Initialize EAS Project

```bash
eas project:create
```

### Follow the Prompts

1. **Project name**: Use `sss-elite-app` or your preferred name
2. **Android package**: Confirm the bundle ID (e.g., `space.manus.sss.elite.app.t20260419204735`)
3. **iOS bundle identifier**: Auto-generated, confirm it
4. **Slug**: Confirm the app slug

### Verify Project Link

```bash
eas project:info
```

You should see your project ID and configuration.

## Step 4: Set Up Android Credentials

### Configure Signing Certificate

```bash
eas credentials
```

### Follow the Prompts

1. **Platform**: Select `Android`
2. **Credential type**: Select `Android Keystore`
3. **Keystore**: Choose one of these options:

   **Option A: Let EAS Generate (Recommended for First Build)**
   - Select "Generate a new keystore"
   - EAS will create and securely store your signing certificate
   - You'll receive a keystore ID for future reference

   **Option B: Use Existing Keystore**
   - If you have an existing keystore file, select "Use existing keystore"
   - Upload your keystore file
   - Enter the keystore password and key alias

### Save Credentials Securely

EAS stores credentials securely. You can view them anytime with:

```bash
eas credentials show --platform android
```

**Important**: Save your keystore ID and credentials in a secure location. You'll need them for future builds.

## Step 5: Configure Build Settings

### Review eas.json

The project already has `eas.json` configured. Review it:

```bash
cat eas.json
```

Expected content:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

### Update if Needed

If you need to customize build settings, edit `eas.json` and add your Google Play service account:

```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccount": "path/to/service-account-key.json",
        "track": "internal"
      }
    }
  }
}
```

## Step 6: Test Your Setup

### Build for Development (Optional)

Test the build system without creating a production AAB:

```bash
eas build --platform android --profile development
```

This creates a development client APK for testing in Expo Go.

### Build for Preview (APK)

Create a testable APK before building the production AAB:

```bash
eas build --platform android --profile preview
```

**What happens:**
1. EAS compiles your app
2. Generates a signed APK file
3. Provides a download link
4. You can install on a test device

**Time**: 10-15 minutes

### Test on Device

1. Download the APK from the provided link
2. Transfer to your Android device
3. Install and test the app
4. Verify:
   - Audio recording works
   - SCAN button functions
   - Paywall appears for non-elite users
   - Settings screen displays correctly

## Step 7: Build Production AAB

### Create Production Build

Once testing is complete, build the production AAB:

```bash
eas build --platform android --profile production
```

### Monitor Build Progress

1. EAS Build dashboard shows real-time progress
2. You'll receive email notifications when complete
3. Build typically takes 10-15 minutes

### Download AAB

When the build completes:

1. Visit the provided download link
2. Download the `.aab` file
3. Save it securely (you'll upload to Google Play Console)

**File naming**: `sss-elite-app-1.0.0-production.aab`

## Step 8: Verify Build Artifacts

### Check Build Details

```bash
eas build:list --platform android
```

This shows all your builds with:
- Build ID
- Status (completed, failed, etc.)
- Build time
- Download link

### Download from Dashboard

You can also download builds from:
https://expo.dev/accounts/[your-username]/projects/[project-id]/builds

## Troubleshooting

### Build Fails

**Error: "Build failed"**
- Check the build logs for specific errors
- Verify all dependencies are installed
- Ensure `app.config.ts` is valid

**Solution:**
```bash
eas build --platform android --profile production --verbose
```

### Authentication Issues

**Error: "Not authenticated"**
- Ensure you've run `eas login`
- Verify with `eas whoami`
- Try logging out and back in:

```bash
eas logout
eas login
```

### Credential Issues

**Error: "Credentials not found"**
- Reconfigure credentials:

```bash
eas credentials
```

**Error: "Invalid keystore"**
- Verify your keystore file is valid
- Check keystore password is correct
- Regenerate credentials if needed

### Version Code Issues

**Error: "Version code too low"**
- Increment version in `app.config.ts`:

```typescript
const config: ExpoConfig = {
  version: "1.0.1",  // Increase this
  // ...
};
```

- Rebuild with new version

## Best Practices

### Credential Management

1. **Never commit credentials** - Keep `service-account-key.json` out of git
2. **Use environment variables** - For sensitive data
3. **Rotate credentials** - Periodically update signing certificates
4. **Backup credentials** - Save keystore ID securely

### Build Management

1. **Test before production** - Always build preview APK first
2. **Version incrementally** - Increase version for each release
3. **Monitor build logs** - Check for warnings and errors
4. **Keep builds organized** - Tag builds with release notes

### Performance

1. **Parallel builds** - EAS can handle multiple builds simultaneously
2. **Cache dependencies** - First build takes longer, subsequent builds are faster
3. **Monitor quota** - Check your EAS Build quota usage

## Next Steps

1. ✅ Create Expo account
2. ✅ Authenticate with `eas login`
3. ✅ Link project with `eas project:create`
4. ✅ Configure credentials with `eas credentials`
5. ✅ Test with preview build
6. ✅ Build production AAB
7. ✅ Upload to Google Play Console
8. ✅ Submit for review

## Useful Commands

```bash
# Authentication
eas login
eas logout
eas whoami

# Project Management
eas project:create
eas project:info

# Credentials
eas credentials
eas credentials show --platform android

# Building
eas build --platform android --profile development
eas build --platform android --profile preview
eas build --platform android --profile production

# Monitoring
eas build:list --platform android
eas build:view [BUILD_ID]
```

## Resources

- [EAS Build Documentation](https://docs.expo.dev/eas-update/introduction/)
- [Expo CLI Reference](https://docs.expo.dev/more/expo-cli/)
- [Android App Bundle Guide](https://developer.android.com/guide/app-bundle)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)

## Support

For issues with:
- **Expo/EAS**: [Expo Discord](https://discord.gg/expo) or [GitHub Issues](https://github.com/expo/expo/issues)
- **Google Play**: [Google Play Support](https://support.google.com/googleplay)
- **This Project**: Check the project README and documentation

## FAQ

**Q: How much does EAS Build cost?**
A: EAS Build is free for up to 30 builds per month. Additional builds are available with paid plans.

**Q: Can I build multiple apps with one Expo account?**
A: Yes, you can create multiple projects under one Expo account.

**Q: How long does a build take?**
A: Typically 10-15 minutes. First build may take longer due to dependency caching.

**Q: Can I build iOS apps with EAS?**
A: Yes, EAS supports iOS builds, but requires a Mac with Xcode.

**Q: What if my build fails?**
A: Check the build logs for errors, fix the issue, and rebuild. EAS provides detailed error messages to help troubleshoot.
