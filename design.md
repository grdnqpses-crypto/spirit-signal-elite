# Scientific Spirit Signal Elite - Mobile App Design

## Overview
A mobile app that analyzes audio signals in real-time to detect anomalies. Users can perform scans with a one-time $9.99 purchase to unlock elite features.

## Screen List

1. **Splash Screen** - App logo and branding on launch
2. **Home Screen** - Main interface with scan controls and results display
3. **Paywall Screen** - One-time purchase offer for elite features ($9.99)
4. **Results Screen** - Display anomaly detection results with detailed analysis
5. **Settings Screen** - App preferences, about, and support links

## Primary Content and Functionality

### Home Screen
- **Header**: App title "Spirit Signal Elite"
- **Status Display**: Large text showing current state (Ready, Scanning, Stopped)
- **Action Buttons**: 
  - SCAN button (primary, prominent) - Initiates audio recording
  - STOP button (secondary) - Stops ongoing scan
- **Results Area**: Shows detected anomalies (Strong, Moderate, Minor)
- **Purchase Prompt**: Subtle indicator for elite features (if not purchased)

### Paywall Screen
- **Hero Section**: "Unlock Elite Features"
- **Benefits List**: What elite access provides
- **Price Display**: $9.99 one-time purchase
- **Purchase Button**: Large, prominent CTA
- **Restore Button**: For users who already purchased
- **Close Button**: Return to home

### Results Screen
- **Anomaly Type**: Clear display of detected signal type
- **Timestamp**: When the anomaly was detected
- **Signal Strength**: Visual representation of peak vs. average
- **History**: List of recent detections
- **Share Button**: Share results (if elite)

### Settings Screen
- **App Version**: Current version number
- **Purchase Status**: Shows if elite is active
- **Permissions**: Microphone permission status
- **About**: App description and support links
- **Privacy/Terms**: Links to policies

## Key User Flows

### Flow 1: Basic Scan (Free)
1. User opens app → Home Screen
2. Taps SCAN button
3. App requests microphone permission (if needed)
4. Audio recording begins, state shows "Scanning"
5. Engine analyzes audio buffer in real-time
6. Anomaly detected → State updates with result (e.g., "Strong anomaly")
7. User taps STOP or recording auto-stops
8. Results displayed on Home Screen

### Flow 2: Purchase Elite Access
1. User sees purchase prompt on Home Screen
2. Taps "Unlock Elite" button
3. Navigates to Paywall Screen
4. Reviews benefits and price ($9.99)
5. Taps "Purchase" button
6. Google Play Billing dialog appears
7. User completes payment
8. Receipt validated server-side
9. Elite status activated
10. Returns to Home Screen with full features enabled

### Flow 3: View Detailed Results (Elite)
1. From Home Screen, tap on recent anomaly result
2. Navigates to Results Screen
3. Shows detailed analysis, timestamp, signal strength
4. User can share result or return to home

## Color Choices

**Brand Colors:**
- **Primary**: Deep Blue (#0a7ea4) - Trust, technology, precision
- **Accent**: Electric Purple (#7c3aed) - Energy, signal detection
- **Background**: Off-white (#f9fafb) - Clean, minimal
- **Surface**: White (#ffffff) - Cards, elevated surfaces
- **Success**: Emerald Green (#10b981) - Successful detection
- **Warning**: Amber (#f59e0b) - Moderate anomaly
- **Error**: Crimson Red (#ef4444) - Strong anomaly

**Text:**
- **Primary Text**: Charcoal (#1f2937) - Main content
- **Secondary Text**: Gray (#6b7280) - Metadata, hints
- **Muted**: Light Gray (#d1d5db) - Disabled states

## Layout Principles

- **Portrait Orientation**: All screens optimized for 9:16 aspect ratio
- **One-Handed Usage**: Critical buttons positioned in lower half of screen
- **Safe Area**: Content respects notch and home indicator
- **Spacing**: Consistent 16px/24px/32px grid for padding and margins
- **Typography**: Large, readable fonts (18px+ for body, 24px+ for headings)
- **Touch Targets**: Minimum 44px height for all interactive elements

## Interaction Patterns

- **Primary Actions**: Full-width buttons with strong color contrast
- **Secondary Actions**: Outlined or text buttons
- **Feedback**: Haptic feedback on button press, loading indicators during scans
- **Transitions**: Smooth fade-in/fade-out between screens
- **Error States**: Clear error messages with recovery options
