export interface OrderDetail {
  id: number;
  timeStamp: string;
  accumulatedMass: number;
  density: number;
  temperature: number;
  flowRate: number;
}

export interface OrderDetailsResponse {
  details: OrderDetail[];
  pagination: {
    currentPage: number;
    totalElements: number;
    totalPages: number;
  };
}