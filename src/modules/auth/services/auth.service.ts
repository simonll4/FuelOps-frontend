import api from '@/services/api';
import type { LoginCredentials } from '../interfaces/auth.interface';
import type { AuthUser, LoggedUser } from '../interfaces/user.interface';

export const login = async (user: LoginCredentials) => {
  const { data } = await api().post<LoggedUser>(`/auth/login`, {
    username: user.username,
    password: user.password,
  });
  return data;
};

export const validateToken = async () => {
  const { data } = await api().get<AuthUser>(`/auth/validate`);
  return data;
}