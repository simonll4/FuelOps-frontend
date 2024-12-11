export interface Truck {
  licensePlate: string;
}

export interface Customer {
  businessName: string;
}

export interface Order {
  id: number;
  status: string;
  truck: Truck;
  customer: Customer;
  preset: number;
  receptionDate: string;
  estimatedDate: string;
  initialWeighingDate: string | null;
  fuelingStartDate: string | null;
  fuelingEndDate: string | null;
  finalWeighingDate: string | null;
}
