// src/services/UserService.ts
import api from '@/services/api.service';
import type { UserResponse } from "@/interfaces/users.interface";

export const UserService = {
  async fetchAll(): Promise<{ internal: UserResponse[]; external: UserResponse[] }> {
    const { data } = await api().get('/users');
    const internal = data.filter((user: UserResponse) => user.roles.includes("ADMIN")  || user.roles.includes("OPERATOR") );
    const external = data.filter((user: UserResponse) => user.roles.includes("CLI"));
    return { internal, external };
  },
  
  async create(user: UserResponse): Promise<UserResponse> {
    const { data } = await api().post('/users', user);
    return data;
  },
  
  async update(user: UserResponse): Promise<UserResponse> {
    const { data } = await api().put('/users', user);
    return data;
  },
  
  async delete(id: number): Promise<void> {
    await api().delete(`/users/${id}`);
  },
};
