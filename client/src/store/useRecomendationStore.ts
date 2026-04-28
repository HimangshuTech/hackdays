import { create } from "zustand";

type RecommendationState = {
  tags: string[];
  state: string;
  budget: number | "";

  setRecommendation: (data: {
    tags: string[];
    state: string;
    budget: number | "";
  }) => void;

  clearRecommendation: () => void;
};

export const useRecommendationStore = create<RecommendationState>((set) => ({
  tags: [],
  state: "",
  budget: "",

  setRecommendation: (data) =>
    set({
      tags: data.tags,
      state: data.state,
      budget: data.budget,
    }),

  clearRecommendation: () =>
    set({
      tags: [],
      state: "",
      budget: "",
    }),
}));
