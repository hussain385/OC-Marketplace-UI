type Users = {
  name: string;
  email: string;
  mobile: string;
  password: string;
};

type Auth = {
  emailPhone: string;
  password: string;
  token: string;
};

type ResetPassword = {
  token: string | null;
  newPassword: string;
  newPasswordConfirmation: string;
};

export type { Users, Auth, ResetPassword };
