import { create } from "zustand";

type TimingStore = {
  isInitialAnimationFinished: boolean;
  setInitialAnimationFinished: (value: boolean) => void;
};

const useTimingStore = create<TimingStore>((set) => ({
  isInitialAnimationFinished: false,
  setInitialAnimationFinished: (value) =>
    set({ isInitialAnimationFinished: value }),
}));

export default useTimingStore;
