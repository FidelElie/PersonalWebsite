// ! Next and React
import React, { useState, createContext, useContext, ReactNode } from "react";

// ! Components
import Modal from "../../components/misc/Modal";

type providerValue = {
  openLoader: Function,
  closeLoader: Function,
  toggleLoader: Function
}

const LoaderContext = createContext<providerValue>({
  openLoader: () => {},
  closeLoader: () => {},
  toggleLoader: () => {}
});

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  return (
    <LoaderContext.Provider value={{
      openLoader: () => setLoaderVisible(true),
      closeLoader: () => setLoaderVisible(false),
      toggleLoader: () => setLoaderVisible(!loaderVisible)
    }}>
      <Modal
        id="loader-modal"
        isOpen={loaderVisible}
        onClose={() => { }}
        disableClickOverlay
        elevation={40}
      >
        <span className="text-7xl text-white opacity-90">
          <i className="fas fa-spinner fa-spin" />
        </span>
      </Modal>
      {children}
    </LoaderContext.Provider>
  )
}

const useLoader = () => useContext(LoaderContext);

export default LoaderProvider;
export { useLoader };
