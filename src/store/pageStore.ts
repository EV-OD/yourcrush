import { create } from "zustand";

type CrushDetail = {
  fullname: string;
  roll_number: string;
  course: string;
  year: string;
};

type PageStore = {
  currentPage: string;
  setCurrentPage: (value: string) => void;
  crushDetail: CrushDetail;
  setCrushDetail: (value: CrushDetail) => void;
};

const usePageStore = create<PageStore>((set) => ({
  currentPage: "home",
  setCurrentPage: (value) => set({ currentPage: value }),
  crushDetail: {
    fullname: "",
    roll_number: "",
    course: "",
    year: "",
  },
  setCrushDetail: (value) => set({ crushDetail: value }),
}));

export default usePageStore;
