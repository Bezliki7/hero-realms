export type RegistrationDto = {
  email: string;
  password: string;
};

export type RegisterReponse = {
  id: number;
  email: string;
  password: string;
  accessToken: string;
};
