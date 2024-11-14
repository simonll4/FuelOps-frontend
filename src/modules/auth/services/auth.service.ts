import api from '@/services/api';
import type { User } from '../interfaces/user.interface';


export const login = async (user: User) => {
  const { username, password } = user;
  const { data } =
    await api().post<{ token: string }>(`/login?username=${username}&password=${password}`);
  console.log('token: ', data);
  return data;
};