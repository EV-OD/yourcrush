import { create } from "zustand";

type ModalDataType = {
  title: string;
  content: string;
};

type ModalStore = {
  modalState: "opened" | "closed";
  setModal: (value: "opened" | "closed") => void;
  modalData: ModalDataType;
  setModalData: (value: ModalDataType) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modalState: "closed",
  setModal: (value) => set({ modalState: value }),
  modalData: { title: "", content: "" },
  setModalData: (value) => set({ modalData: value }),
}));

export default useModalStore;
