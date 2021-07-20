// ! Next and React
import React, { useState, createContext, useContext, ReactNode } from "react";

// ! Components
import Modal from "../../components/misc/Modal";

type contextType = {
  openLoader: Function,
  closeLoader: Function,
  toggleLoader: Function,
}

const LoaderContext = createContext<contextType>({
  openLoader: () => {},
  closeLoader: () => {},
  toggleLoader: () => {},
});

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  return (
    <LoaderContext.Provider value={{
      openLoader: () => setLoaderVisible(true),
      closeLoader: () => setLoaderVisible(false),
      toggleLoader: () => setLoaderVisible(!loaderVisible),
    }}>
      <Modal
        id="loader-modal"
        isOpen={loaderVisible}
        onClose={() => {}}
        disableClickOverlay
        elevation={40}
      >
        <div className="w-full flex flex-col items-center justify-center">
          <span className="text-8xl text-white">
            <i className="fas fa-spinner fa-spin"/>
          </span>
        </div>
      </Modal>
      { children }
    </LoaderContext.Provider>
  )
}

const useLoader = () => {
  const { openLoader, closeLoader, toggleLoader } = useContext(LoaderContext);

  const startClose = (autoClose: number = 0) => {
    setTimeout(() => {
      closeLoader()
    }, autoClose);
  }

  return {
    openLoader,
    closeLoader: startClose,
    toggleLoader
  }
};

export default LoaderProvider;
export { useLoader };
