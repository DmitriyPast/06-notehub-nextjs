import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";
// import NoteForm from "../NoteForm/NoteForm";

interface ModalProps {
  // movie: Movie;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      onMouseDown={onBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {/* */}

        {children /* <NoteForm onClose={onClose} /> */}
      </div>
    </div>,
    document.body
  );
}
