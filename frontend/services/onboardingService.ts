import { fetchClient } from "./fetchClient";

export interface OnboardingPayload {
  intent: string;
  propertyType: string;
  propertyCount: string;
  bhk: string;
  city: string;
}

// POST onboarding
export const submitOnboarding = (data: OnboardingPayload) =>
  fetchClient("/user/onboarding", {
    method: "POST",
    body: JSON.stringify(data),
  });