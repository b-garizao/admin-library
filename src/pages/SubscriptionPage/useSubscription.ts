import { useState, useEffect, useMemo, useCallback } from "react";
import { createClient } from "@sanity/client";

export interface SubscriptionConfig {
  adminProjectId?: string;
  subscriptionProductId?: string;
  stripePaymentLink?: string;
}

const defaultConfig: Required<SubscriptionConfig> = {
  adminProjectId: "etv3qe6r",
  subscriptionProductId: "",
  stripePaymentLink: "https://buy.stripe.com/test_dRmdR96Oja496G17rV8k800",
};

export const createAdminClient = (config: SubscriptionConfig) => {
  const adminProjectId = config.adminProjectId || defaultConfig.adminProjectId;
  
  console.log(
    "Configuring adminClient with Project ID:",
    adminProjectId,
    "Dataset:",
    "production",
  );
  
  return createClient({
    projectId: adminProjectId,
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-01-01",
  });
};

export const adminClient = createClient({
  projectId: defaultConfig.adminProjectId,
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

export interface SubscriptionData {
  subscriptionStatus:
    | "active"
    | "inactive"
    | "past_due"
    | "canceled"
    | "trialing"
    | "none";
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  customerEmail?: string;
  subscriptionId?: string;
  stripeCustomerId?: string;
  stripePaymentLink?: string;
}

export interface UseSubscriptionReturn {
  subscription: SubscriptionData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSubscription = (
  email: string,
  config?: SubscriptionConfig,
): UseSubscriptionReturn => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(
    null,
  );
  // Initialize loading as false when no email, true otherwise to avoid immediate re-renders
  const [loading, setLoading] = useState(() => !!email);
  const [error, setError] = useState<string | null>(null);

  const adminProjectId = useMemo(
    () => config?.adminProjectId || defaultConfig.adminProjectId,
    [config?.adminProjectId]
  );

  const subscriptionProductId = useMemo(
    () => config?.subscriptionProductId || defaultConfig.subscriptionProductId,
    [config?.subscriptionProductId]
  );

  const stripePaymentLink = useMemo(
    () => config?.stripePaymentLink || defaultConfig.stripePaymentLink,
    [config?.stripePaymentLink]
  );

  const fetchSubscription = useCallback(async (emailValue: string) => {
    if (!emailValue) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching subscription for email:", emailValue);

      const client = createAdminClient({ adminProjectId });

      const SUBSCRIPTION_QUERY = `*[_type == "subscription" && stripeProductId == $productId][0]{
        _id,
        platformName,
        status,
        expiryDate,
        stripeCustomerId,
        stripeProductId,
        stripePaymentLink
      }`;

      console.log("Product ID:", subscriptionProductId);

      if (!subscriptionProductId) {
        console.warn("No subscription product ID configured");
      }

      const result = await client.fetch(SUBSCRIPTION_QUERY, { productId: subscriptionProductId });

      console.log("Subscription data from Sanity:", result);

      if (result) {
        setSubscription({
          subscriptionStatus: result.status || "none",
          currentPeriodEnd: result.expiryDate,
          cancelAtPeriodEnd: result.cancelAtPeriodEnd || false,
          customerEmail: emailValue,
          subscriptionId: result._id,
          stripeCustomerId: result.stripeCustomerId,
          stripePaymentLink: result.stripePaymentLink,
        });
      } else {
        setSubscription({
          subscriptionStatus: "none",
        });
      }
    } catch (err: any) {
      console.error("Error fetching subscription:", err);
      setError(err.message || "Failed to fetch subscription");
      setSubscription({
        subscriptionStatus: "none",
      });
    } finally {
      setLoading(false);
    }
  }, [adminProjectId, subscriptionProductId]);

  useEffect(() => {
    fetchSubscription(email);
  }, [email, fetchSubscription]);

  return {
    subscription,
    loading,
    error,
    refetch: () => fetchSubscription(email),
  };
};

export const STRIPE_PAYMENT_LINK = defaultConfig.stripePaymentLink;
export const STRIPE_PRODUCT_ID = defaultConfig.subscriptionProductId;

export const getSubscriptionPageUrl = (config?: SubscriptionConfig) => {
  return config?.stripePaymentLink || defaultConfig.stripePaymentLink;
};
