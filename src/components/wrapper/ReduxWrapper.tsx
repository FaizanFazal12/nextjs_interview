'use client'
import { Provider } from 'react-redux';
import { store } from '../../lib/redux/store';
import React from 'react';

interface ReduxWrapperProps {
  children: React.ReactNode;
}

const ReduxWrapper: React.FC<ReduxWrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;