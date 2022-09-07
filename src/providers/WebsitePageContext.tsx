import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Props } from 'src/types/commons';
import useToggle from 'src/hooks/useToggle';

export interface IMenuProps {
  display: boolean;
}

export type WebsitePageContextType = {
  isLoading: boolean;
  toggleLoading: (trueOrFalse?: boolean | null) => void;
  menuProps: IMenuProps;
  setMenuProps: Dispatch<SetStateAction<IMenuProps>>;
};

const initialValues = {
  isLoading: false,
  toggleLoading: () => {},
  menuProps: {
    display: false,
  },
  setMenuProps: () => {},
};

export const WebsitePageContext = createContext<WebsitePageContextType>(initialValues);

export const WebsitePageProvider = ({ children }: Props) => {
  const { toggle: isLoading, setToggle, onToggle } = useToggle(false);
  const [ menuProps, setMenuProps ] = useState<IMenuProps>(initialValues.menuProps);

  const toggleLoading = (trueOrFalse: boolean | null = null) => {
    if (trueOrFalse === null) {
      onToggle();
      return;
    }
    setToggle(trueOrFalse);
  };

  return (
    <WebsitePageContext.Provider
      value={{
        isLoading,
        toggleLoading,
        menuProps,
        setMenuProps
      }}
    >
      {children}
    </WebsitePageContext.Provider>
  );
};
WebsitePageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useWebsitePage = () => useContext(WebsitePageContext);
