import axios from 'axios';
import { Auth, ResetPassword, Users } from './types';
import { Buffer } from 'buffer';
import httpClient from '../../utils/htttpClient';

const getUsers = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api/users`).then((res) => res.data);
  return response;
};

const codeVerification = async (code: string, mobile: string) => {
  let errorResponse = '';
  const response = await axios
    .post(`${import.meta.env.VITE_API_SERVER_URL}/api/auth/verify-code`, {
      mobile,
      code,
    })
    .then((res) => res)
    .catch((err) => (errorResponse = err.response.data.error.message));

  return { response, errorResponse };
};

const registerService = async ({ name, email, mobile, password }: Users) => {
  let errorResponse = '';
  const response = await axios
    .post(`${import.meta.env.VITE_API_SERVER_URL}/api/auth/local/register`, {
      name,
      email,
      mobile,
      password,
    })
    .then((res) => res)
    .catch((err) => (errorResponse = err.response.data.error.message));

  return { response, errorResponse };
};

const authService = async ({ emailPhone, password, token }: Auth) => {
  let errorResponse = '';

  const response = await axios
    .post(
      `${import.meta.env.VITE_API_SERVER_URL}/api/auth/local`,
      {
        identifier: emailPhone,
        password,
      },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    )
    .then((res) => res)
    .catch((err) => (errorResponse = err.response.data.error.message ?? err.message));

  return { response, errorResponse };
};

const resetPassword = async ({ token, newPassword, newPasswordConfirmation }: ResetPassword) => {
  let errorResponse = '';
  const response = await axios
    .post(`${import.meta.env.VITE_API_SERVER_URL}/api/auth/reset-password?token=${token}`, {
      newPassword,
      newPasswordConfirmation,
    })
    .then((res) => res)
    .catch((err) => (errorResponse = err.response.data.error.message));

  return { response, errorResponse };
};

const verifyForgotPassword = async (email: Users['email']) => {
  let errorResponse = '';
  const response = await axios
    .post(`${import.meta.env.VITE_API_SERVER_URL}/api/auth/forgot-password`, {
      email,
    })
    .then((res) => res)
    .catch((err) => (errorResponse = err.response.data.error.message));

  return { response, errorResponse };
};

const verifyPhoneRegister = async (mobile: string) => {
  let errorResponse = '';
  const response = await axios
    .post(`${import.meta.env.VITE_API_SERVER_URL}/api/auth/send-code`, {
      mobile,
    })
    .then((res) => res)
    .catch((err) => (errorResponse = err.response.data.error.message));

  return { response, errorResponse };
};

const filterServiceEmail = async (email: Users['email']) => {
  const response = await axios
    .get(`${import.meta.env.VITE_API_SERVER_URL}/api/users/count?email=` + email)
    .then((res) => res.data);

  return response;
};

const filterServiceMobile = async (mobile: string) => {
  const response = await axios
    .get(`${import.meta.env.VITE_API_SERVER_URL}/api/users/count?mobile[$contains]=${mobile.replace('+', '')}`)
    .then((res) => res.data);

  return response;
};

export const tokenBuffer = (identifier: string | null, password: string) => {
  return Buffer.from(`${identifier}:${password}`, 'utf8').toString('base64');
};

const verifyEmailWithEmailTemplate = async (recepient: string, name: string) => {
  const res = await httpClient('POST', `${import.meta.env.VITE_API_SERVER_URL}api/users/tedx`, {
    recepient,
    tRef: 1000,
    valueObj: {
      users: {
        name,
      },
    },
  });
  return res;
};

const ApiUserEndpoint = {
  getUsers,
  registerService,
  authService,
  tokenBuffer,
  filterServiceEmail,
  filterServiceMobile,
  verifyForgotPassword,
  resetPassword,
  verifyPhoneRegister,
  codeVerification,
  verifyEmailWithEmailTemplate,
};

export default ApiUserEndpoint;

// https://unpkg.com/@types/react@16.4.7/index.d.ts
