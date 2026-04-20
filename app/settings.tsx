import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { useBilling } from "@/lib/billing-context";
import { useColors } from "@/hooks/use-colors";
import Constants from "expo-constants";

export default function SettingsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { isElite } = useBilling();

  const appVersion = Constants.expoConfig?.version || "1.0.0";

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg font-semibold text-primary">← Back</Text>
            </Pressable>
            <Text className="text-3xl font-bold text-foreground mt-4">Settings</Text>
          </View>

          {/* Account Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Account</Text>
            <View className="bg-surface p-4 rounded-lg border border-border gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-foreground font-medium">Status</Text>
                <View
                  className="px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: isElite ? colors.success : colors.muted,
                  }}
                >
                  <Text className="text-white text-xs font-semibold">
                    {isElite ? "ELITE" : "FREE"}
                  </Text>
                </View>
              </View>
              {!isElite && (
                <Pressable
                  onPress={() => router.push("../paywall")}
                  className="mt-2 py-2 px-3 rounded bg-primary"
                >
                  <Text className="text-white font-semibold text-center">
                    Upgrade to Elite
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          {/* App Info Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">App Info</Text>
            <View className="bg-surface p-4 rounded-lg border border-border gap-4">
              <View className="flex-row justify-between">
                <Text className="text-muted">Version</Text>
                <Text className="text-foreground font-medium">{appVersion}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-muted">App Name</Text>
                <Text className="text-foreground font-medium">Spirit Signal Elite</Text>
              </View>
            </View>
          </View>

          {/* Links Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Resources</Text>
            <Pressable className="bg-surface p-4 rounded-lg border border-border">
              <Text className="text-primary font-medium">Privacy Policy</Text>
            </Pressable>
            <Pressable className="bg-surface p-4 rounded-lg border border-border">
              <Text className="text-primary font-medium">Terms of Service</Text>
            </Pressable>
            <Pressable className="bg-surface p-4 rounded-lg border border-border">
              <Text className="text-primary font-medium">Contact Support</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="mt-auto pt-4 border-t border-border">
            <Text className="text-xs text-muted text-center">
              © 2026 Spirit Signal Elite. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
