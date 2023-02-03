import React, { createContext, useContext, useState } from 'react';
interface ISidebar {
  isSidebarOpen: boolean;
  showSidebar: (value: boolean) => void;
  closeSidebar: (value: boolean) => void;
}
const SidebarContext = createContext<ISidebar>({} as ISidebar);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, showSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useGlobalSideBarContext = () => {
  return useContext(SidebarContext);
};
