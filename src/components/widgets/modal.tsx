import { useEffect } from "react";
import useModalStore from "../../store/modalStore";

function Modal() {
  const { modalState, modalData } = useModalStore();
  useEffect(() => {
    const dialog = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modalState == "opened") {
      dialog.showModal();
    } else if (modalState == "closed") {
      dialog.close();
    }
  }, [modalState]);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-red-400 text-white">
        <h3 className="font-bold text-lg">{modalData.title}</h3>
        <p className="py-4">{modalData.content}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
