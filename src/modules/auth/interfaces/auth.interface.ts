export interface LoginCredentials {
  username: string;
  password: string;
}

export enum AuthStatus {
  Authenticated = 'Authenticated',
  NotAuthenticated = 'NotAuthenticated',
  Checking = 'Checking',
}