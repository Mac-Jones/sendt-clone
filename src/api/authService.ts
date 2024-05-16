import { ILogin, IRegister } from '@/types';
import { isAxiosError } from 'axios';
import client from './client';

const login = async (user: ILogin) => {
  try {
    const response = await client({
      method: 'post',
      url: '/login',
      data: {
        ...user,
      },
    });

    if (response.data.success) {
      return response.data;
    }
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      const data = e.response.data;
      return data;
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }
};

const register = async (user: IRegister) => {
  try {
    const response = await client({
      method: 'post',
      url: '/register',
      data: {
        ...user,
      },
    });

    console.log('response', response);

    if (response.data.success) {
      return response.data;
    }
  } catch (e) {
    console.log('error', e);
    if (isAxiosError(e) && e.response) {
      console.log('axios error', e);
      const data = e.response.data;
      return data;
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }
};

export { login, register };
