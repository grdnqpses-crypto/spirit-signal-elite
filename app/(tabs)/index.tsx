import { ScrollView, Text, View, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { useAudio } from "@/lib/audio-context";
import { useBilling } from "@/lib/billing-context";
import { useColors } from "@/hooks/use-colors";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { isRecording, currentAnomaly, startRecording, stopRecording, isInitialized } = useAudio();
  const { isElite, isInitialized: billingInitialized } = useBilling();

  const handleScan = async () => {
    if (!isElite && !isRecording) {
      // Show paywall if not elite
      router.push("../paywall");
      return;
    }

    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const getAnomalyColor = () => {
    switch (currentAnomaly) {
      case "Strong":
        return colors.error;
      case "Moderate":
        return colors.warning;
      case "Minor":
        return colors.success;
      default:
        return colors.muted;
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Spirit Signal</Text>
            <Text className="text-sm text-muted">
              {isElite ? "Elite Mode" : "Free Mode"}
            </Text>
          </View>

          {/* Status Display */}
          <View className="items-center gap-6 my-12">
            <View
              className="w-32 h-32 rounded-full items-center justify-center border-4"
              style={{
                borderColor: getAnomalyColor(),
                backgroundColor: colors.surface,
              }}
            >
              <Text className="text-4xl font-bold text-foreground text-center">
                {isRecording ? "SCANNING" : currentAnomaly || "READY"}
              </Text>
            </View>

            {currentAnomaly && (
              <View className="bg-surface p-4 rounded-lg border border-border">
                <Text className="text-sm text-muted">Anomaly Detected</Text>
                <Text
                  className="text-2xl font-bold"
                  style={{ color: getAnomalyColor() }}
                >
                  {currentAnomaly} Anomaly
                </Text>
              </View>
            )}
          </View>

          {/* Controls */}
          <View className="gap-3">
            <Pressable
              onPress={handleScan}
              disabled={!isInitialized || !billingInitialized}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              className="py-4 px-6 rounded-xl items-center justify-center"
            >
              {!isInitialized || !billingInitialized ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  {isRecording ? "STOP" : "SCAN"}
                </Text>
              )}
            </Pressable>

            {!isElite && (
              <Pressable
                onPress={() => router.push("../paywall")}
                className="py-3 px-6 rounded-xl items-center justify-center border border-primary"
              >
                <Text className="text-primary font-semibold">Unlock Elite - $9.99</Text>
              </Pressable>
            )}

            <Pressable
              onPress={() => router.push("../settings")}
              className="py-3 px-6 rounded-xl items-center justify-center"
            >
              <Text className="text-muted font-semibold">Settings</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
