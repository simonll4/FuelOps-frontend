export interface OrderDetail {
  id: number;
  timestamp: string;
  acummulatedMass: number;
  density: number;
  temperature: number;
  flow: number;
}

export interface OrderDetailsResponse {
  details: OrderDetail[];
  pagination: {
      currentPage: number;
      totalElements: number;
      totalPages: number;
  };
}