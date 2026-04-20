import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import * as RNIap from "react-native-iap";

interface BillingContextType {
  isElite: boolean;
  isPurchasing: boolean;
  purchaseError: string | null;
  initiatePurchase: () => Promise<void>;
  restorePurchases: () => Promise<void>;
  isInitialized: boolean;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

const ELITE_PRODUCT_ID = "spirit_signal_elite_unlock";
const ELITE_PURCHASE_KEY = "elite_purchase_status";

export function BillingProvider({ children }: { children: React.ReactNode }) {
  const [isElite, setIsElite] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { getItem, setItem } = useAsyncStorage(ELITE_PURCHASE_KEY);

  // Initialize IAP and check for existing purchases
  useEffect(() => {
    const initializeBilling = async () => {
      try {
        // Only initialize on Android (iOS uses a different flow)
        if (Platform.OS === "android") {
          await RNIap.initConnection();

          // Check for existing purchases
          const purchases = await RNIap.getAvailablePurchases();
          const hasElitePurchase = purchases.some(
            (purchase) => purchase.productId === ELITE_PRODUCT_ID
          );

          if (hasElitePurchase) {
            setIsElite(true);
            await setItem("true");
          } else {
            // Check local storage as fallback
            const storedStatus = await getItem();
            setIsElite(storedStatus === "true");
          }
        } else {
          // For iOS and web, check local storage
          const storedStatus = await getItem();
          setIsElite(storedStatus === "true");
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize billing:", error);
        // Fallback to local storage
        const storedStatus = await getItem();
        setIsElite(storedStatus === "true");
        setIsInitialized(true);
      }
    };

    initializeBilling();

    return () => {
      if (Platform.OS === "android") {
        RNIap.endConnection();
      }
    };
  }, []);

  const initiatePurchase = async () => {
    if (Platform.OS === "web") {
      // For web/Expo Go, show a mock purchase dialog
      setPurchaseError(null);
      setIsPurchasing(true);
      try {
        // Simulate purchase flow
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsElite(true);
        await setItem("true");
        setPurchaseError(null);
      } catch (error) {
        setPurchaseError("Purchase failed. Please try again.");
      } finally {
        setIsPurchasing(false);
      }
      return;
    }

    setPurchaseError(null);
    setIsPurchasing(true);

    try {
      // Request purchase from Google Play
      const result = await RNIap.requestPurchase({
        sku: ELITE_PRODUCT_ID,
      } as any);

      // If successful, mark as elite
      if (result) {
        setIsElite(true);
        await setItem("true");
      }
    } catch (error: any) {
      if (error.code !== "E_USER_CANCELLED") {
        setPurchaseError(
          error.message || "Purchase failed. Please try again."
        );
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const restorePurchases = async () => {
    if (Platform.OS === "web") {
      return;
    }

    try {
      const purchases = await RNIap.getAvailablePurchases();
      const hasElitePurchase = purchases.some(
        (purchase) => purchase.productId === ELITE_PRODUCT_ID
      );

      if (hasElitePurchase) {
        setIsElite(true);
        await setItem("true");
      }
    } catch (error) {
      console.error("Failed to restore purchases:", error);
    }
  };

  return (
    <BillingContext.Provider
      value={{
        isElite,
        isPurchasing,
        purchaseError,
        initiatePurchase,
        restorePurchases,
        isInitialized,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBilling must be used within BillingProvider");
  }
  return context;
}
