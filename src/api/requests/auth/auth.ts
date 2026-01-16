import { AxiosRequestConfig } from "axios";

import { URLS } from "../requests.constant";
import { api } from "@/api/instance";

import type { RegisterReponse, RegistrationDto } from "./auth.interface";

class AuthService {
  public register(dto: RegistrationDto, config?: AxiosRequestConfig) {
    return api.post<RegisterReponse>(URLS.AUTH.REGISTER, dto, config);
  }

  public login(dto: RegistrationDto, config?: AxiosRequestConfig) {
    return api.post<RegisterReponse>(URLS.AUTH.LOGIN, dto, config);
  }

  public logout(config?: AxiosRequestConfig) {
    return api.post(URLS.AUTH.LOGOUT, undefined, config);
  }
}

export default AuthService;
