import { ScrollView, Text, View, Pressable, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useBilling } from "@/lib/billing-context";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";

export default function PaywallScreen() {
  const router = useRouter();
  const colors = useColors();
  const { isElite, isPurchasing, purchaseError, initiatePurchase, restorePurchases } = useBilling();

  if (isElite) {
    // User already has elite access, redirect to home
    router.replace("/");
    return null;
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="gap-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg font-semibold text-primary">← Back</Text>
            </Pressable>

            <View className="gap-2">
              <Text className="text-4xl font-bold text-foreground">Unlock Elite</Text>
              <Text className="text-base text-muted">
                Access advanced anomaly detection features
              </Text>
            </View>
          </View>

          {/* Benefits */}
          <View className="gap-6 my-8">
            <View className="gap-4">
              <Text className="text-xl font-semibold text-foreground">What You Get:</Text>

              {[
                { title: "Real-Time Analysis", desc: "Instant anomaly detection" },
                { title: "Detailed Results", desc: "View signal strength and history" },
                { title: "Share Results", desc: "Export and share detections" },
                { title: "Priority Support", desc: "Get help when you need it" },
              ].map((benefit, idx) => (
                <View key={idx} className="flex-row gap-3">
                  <View
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Text className="text-white font-bold text-sm">✓</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-foreground">{benefit.title}</Text>
                    <Text className="text-sm text-muted">{benefit.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Price and CTA */}
          <View className="gap-3">
            {purchaseError && (
              <View className="bg-error/10 p-3 rounded-lg">
                <Text className="text-error text-sm">{purchaseError}</Text>
              </View>
            )}

            <Pressable
              onPress={initiatePurchase}
              disabled={isPurchasing}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              className="py-4 px-6 rounded-xl items-center justify-center"
            >
              {isPurchasing ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Purchase for $9.99</Text>
              )}
            </Pressable>

            <Pressable
              onPress={restorePurchases}
              disabled={isPurchasing}
              className="py-3 px-6 rounded-xl items-center justify-center border border-border"
            >
              <Text className="text-foreground font-semibold">Restore Purchase</Text>
            </Pressable>

            <Text className="text-xs text-muted text-center mt-2">
              One-time purchase. Unlock elite features forever.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
