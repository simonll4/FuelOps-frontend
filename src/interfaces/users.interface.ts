export interface UserResponse {
  id: number;
  email: string;
  username: string;
  roles: Role[];
  enabled: boolean;
}


export interface Role {
  id: number;
  description: string;
  name: string;
}

export interface UserRequest {
  enabled: boolean;
  email: string;
  username: string;
  password: string; // En la creación, necesitas enviar la contraseña hasheada
  roles: Role[];
}
