export interface IAuthUserRes {
  token: string;
  user: {
    login: string;
    is_premium: boolean;
  };
}

export interface IVerifyTokenArgs {
  token: string;
}

export interface IVerifyTokenRes {
  verify: boolean;
}
