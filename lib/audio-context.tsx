import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { Platform } from "react-native";
import {
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  requestRecordingPermissionsAsync,
} from "expo-audio";

export type AnomalyLevel = "Strong" | "Moderate" | "Minor" | null;

interface AudioContextType {
  isRecording: boolean;
  currentAnomaly: AnomalyLevel;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  isInitialized: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentAnomaly, setCurrentAnomaly] = useState<AnomalyLevel>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const subscriptionRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  // Initialize audio session
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        if (Platform.OS !== "web") {
          // Request permission first
          const permission = await requestRecordingPermissionsAsync();
          if (!permission.granted) {
            console.warn("Microphone permission not granted");
          }

          // Set audio mode
          await setAudioModeAsync({
            allowsRecording: true,
            playsInSilentMode: true,
          });
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize audio:", error);
        setIsInitialized(true); // Continue anyway
      }
    };

    initializeAudio();
  }, []);

  const startRecording = async () => {
    if (recorderState.isRecording || !isInitialized) return;

    try {
      // Request permission if needed
      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) {
        throw new Error("Microphone permission denied");
      }

      // Prepare and start recording
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setCurrentAnomaly(null);

      // Simulate real-time analysis (in production, use native module for actual audio processing)
      // For now, we'll generate random anomalies for demo purposes
      const interval = setInterval(() => {
        const anomalies: AnomalyLevel[] = ["Strong", "Moderate", "Minor", null];
        const randomAnomaly = anomalies[Math.floor(Math.random() * anomalies.length)];
        setCurrentAnomaly(randomAnomaly);
      }, 1000);

      subscriptionRef.current = interval;
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    if (!recorderState.isRecording) return;

    try {
      // Clear the demo interval
      if (subscriptionRef.current) {
        clearInterval(subscriptionRef.current);
        subscriptionRef.current = null;
      }

      await audioRecorder.stop();
      setCurrentAnomaly(null);
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isRecording: recorderState.isRecording,
        currentAnomaly,
        startRecording,
        stopRecording,
        isInitialized,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}
