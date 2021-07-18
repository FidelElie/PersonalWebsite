// ! Next and React
import { useRef } from "react";

// ! Library
import { joinClasses } from "../utilities";

// ! Components
import { ToastContainer, Zoom, toast } from 'react-toastify';

const defaultContextCategories = {
  success: "bg-green-600 text-white",
  error: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
  warning: "bg-yellow-500 text-white",
  default: "bg-blue-500 text-white",
  dark: "bg-white-600 text-black"
}

const ToastProvider = (props) => {
  const { contextCategories = defaultContextCategories } = props;

  return (
    <ToastContainer
      transition={Zoom}
      toastClassName={({ type }) => joinClasses(
        "relative flex z-50 p-2 min-h-10 justify-between overflow-hidden cursor-pointer",
        contextCategories[type || "default"]
      )}
      bodyClassName={() => "text-sm font-white font-med block p-3"}
      position="bottom-center"
      autoClose={3000}
      closeButton={() => <i className="fas fa-times-circle" />}
    />
  )
}

const useToast = (text = "", options = {}) => {
  const toastReference = useRef(null);
  const currentToast = () => toastReference.current = toast(text, options);

  const show = () => currentToast();

  const update = (text, options = {}) => {
    toast.update(toastReference.current, {
      render: () => text,
      ...options
    });
  }

  const dismiss = () => toast.dismiss(toastReference.current);

  return { show, update, dismiss }
}

export default ToastProvider;
export { useToast }


