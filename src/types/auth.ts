export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister extends ILogin {
  firstName: string;
  lastName: string;
}
