// Estilos — el consumer importa una sola vez
import "./styles/globals.css";

export * from "./components";
export * from "./libs";
export * from "./modals";
export * from "./hooks";
export * from "./pages";

// Re-export SubscriptionPage directly
import { default as SubscriptionPageExport } from "./pages/SubscriptionPage/index.tsx";
export { SubscriptionPageExport as SubscriptionPage };

export { useSubscription, adminClient, STRIPE_PAYMENT_LINK, STRIPE_PRODUCT_ID, getSubscriptionPageUrl, type SubscriptionData, type UseSubscriptionReturn, type SubscriptionConfig, createAdminClient } from "./pages/SubscriptionPage/useSubscription.ts";
