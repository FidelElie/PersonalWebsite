// ! Next and React
import { ReactNode, useEffect } from "react";

// ! Library
import { joinClasses } from "../../lib/utilities";

type props = {
  id: string,
  isOpen: boolean,
  onClose: Function,
  disableClickOverlay?: boolean,
  contentClassName?: string,
  elevation?: number,
  children: ReactNode
}

const ESCAPE_KEY_CODE = "Escape";

const Modal = (props: props) => {
  const {
    id,
    isOpen,
    onClose,
    disableClickOverlay,
    contentClassName = "",
    elevation = 50,
    children
  } = props;

  const closeModal = () => { if (onClose) onClose() }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code == ESCAPE_KEY_CODE) { closeModal() }
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      // FIXME event listener not being removed
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  return (
    <div
      id={id}
      className={joinClasses("top-0 left-0 fixed h-full w-full bg-black bg-opacity-75 flex justify-center items-center lg:min-h-screen", {
        "hidden": !isOpen,
        [`z-${elevation}`]: true
      })}
      onClick={event => {
        if (!disableClickOverlay) {
          if ((event.target as HTMLDivElement).id == id) closeModal();
        }
      }}
    >
      <div
        className={joinClasses({
          [contentClassName]: contentClassName
        })}
      >
        { children }
      </div>
    </div>
  )
}

export default Modal;
