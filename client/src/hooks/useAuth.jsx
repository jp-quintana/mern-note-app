import { useState } from 'react';
import axios from 'axios';

import { useAuthContext } from './useAuthContext';

import setHeaderAuthToken from 'utils/setHeaderAuthToken';

export const useAuth = () => {
  const { dispatch } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    setHeaderAuthToken(localStorage.getItem('token'));

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`);
      dispatch({ type: 'LOAD_USER', payload: res.data });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  const signup = async ({
    name,
    lastName,
    email,
    password,
    confirmPassword,
  }) => {
    setError(null);
    setIsLoading(true);
    try {
      if (!name) {
        throw new Error('Name is required.');
      }

      if (!lastName) {
        throw new Error('Last name is required.');
      }

      if (!email) {
        throw new Error('Email is required.');
      }

      if (!password) {
        throw new Error('Password is required.');
      }

      if (!confirmPassword) {
        throw new Error('You must confirm the password.');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match. Please try again.');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        name,
        lastName,
        email,
        password,
        confirmPassword,
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signup`,
        body,
        config
      );

      localStorage.setItem('token', res.data.token);

      await loadUser();

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        if (err.response.data.array) {
          setError(err.response.data.array[0].msg);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        }
      } else {
        setError(err.message);
      }

      setIsLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);
    try {
      if (!email) {
        throw new Error('Email is required.');
      }

      if (!password) {
        throw new Error('Password is required.');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        email,
        password,
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        body,
        config
      );

      localStorage.setItem('token', res.data.token);

      await loadUser();

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        if (err.response.data.array) {
          setError(err.response.data.array[0].msg);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        }
      } else {
        setError(err.message);
      }

      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };
  return { loadUser, signup, login, logout, isLoading, error };
};
