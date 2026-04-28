import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecommendationItem = {
  id: string;
  title: string;
  description: string;
  postType: "PLACE" | "EVENT" | "SERVICE";
  state: string;
  final_score: number;
  metadata?: {
    types?: string[];
    activities?: string[];
    budgetMin?: number;
    budgetMax?: number;
  };
  images?: { url: string }[];
};

type RecommendationState = {
  tags: string[];
  state: string;
  budget: number | "";

  result: RecommendationItem[] | null;

  setRecommendation: (data: {
    tags: string[];
    state: string;
    budget: number | "";
  }) => void;

  setResult: (
    data: RecommendationItem[] | Record<string, RecommendationItem>
  ) => void;

  clearRecommendation: () => void;
};

export const useRecommendationStore = create<RecommendationState>()(
  persist(
    (set) => ({
      tags: [],
      state: "",
      budget: "",
      result: null,

      setRecommendation: (data) =>
        set({
          tags: data.tags,
          state: data.state,
          budget: data.budget,
        }),

      setResult: (data) =>
        set({
          result: Array.isArray(data)
            ? data
            : Object.values(data),
        }),

      clearRecommendation: () =>
        set({
          tags: [],
          state: "",
          budget: "",
          result: null,
        }),
    }),
    {
      name: "recommendation-storage",
    }
  )
);
