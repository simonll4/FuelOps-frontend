export interface UserResponse {
  email: string;
  username: string;
  rol: string;
  status: "Activa" | "Desactivada";
  password?: string;
}
