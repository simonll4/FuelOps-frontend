// Interfaz para Alarmas
export interface Alarm {
  id: number;
  state: "Pendiente" | "Aceptada";
  timestamp: string; // Marca de tiempo de la alarma
  temperature: number; // Temperatura registrada
  observation?: string | null; // Observación opcional
  operator?: string | null; // Operador responsable
}
