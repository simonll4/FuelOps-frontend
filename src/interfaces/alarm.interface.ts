export interface Alarm {
  status: string;
  id: number;
  orderId: number; // ID de la orden asociada
  state: "Pendiente" | "Aceptada";
  timeStamp: string; // Marca de tiempo de la alarma
  temperature: number; // Temperatura registrada
  observations?: string | null; // Observación opcional
  user?: string | null; // Operador responsable
}

export interface AlarmResponse {
  alarms: Alarm[];
  pagination: {
    currentPage: number;
    totalElements: number;
    totalPages: number;
  };
}