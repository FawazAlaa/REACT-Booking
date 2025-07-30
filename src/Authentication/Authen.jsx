import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogged } from '../Context/IsLogged';
import toast from 'react-hot-toast';

export const Authentication = ({ children }) => {
  const { logged } = useLogged();

  useEffect(() => {
    if (!logged) {
      toast.error('Please log in first to access this feature 👋');
    }
  }, [logged]);

  return logged ? children : <Navigate to="/login" replace />;
};