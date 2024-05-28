import { createContext, useContext, useState } from 'react';

const SideMenuContext = createContext<{
  isSideMenuOpen: boolean;
  isSideMenuAnimating: boolean;
  toggleSideMenu: () => void;
}>({
  isSideMenuOpen: false,
  isSideMenuAnimating: false,
  toggleSideMenu: () => {},
});

export const useSideMenu = () => {
  return useContext(SideMenuContext);
};

export const SideMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSideMenuAnimating, setIsSideMenuAnimating] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuAnimating(true);
    setTimeout(() => {
      setIsSideMenuOpen((prevState) => !prevState);
      setIsSideMenuAnimating(false);
    }, 150);
  };

  return (
    <SideMenuContext.Provider value={{ isSideMenuOpen, isSideMenuAnimating, toggleSideMenu }}>
      {children}
    </SideMenuContext.Provider>
  );
};
