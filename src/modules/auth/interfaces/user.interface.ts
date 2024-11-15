export interface AuthUser {
  username: string;
  email: string;
  roles: string[];
}

export interface LoggedUser {
  user: AuthUser;
  token: string;
}
