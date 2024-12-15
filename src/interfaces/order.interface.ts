interface Product {
  product: string;
  thresholdTemperature: number;
  density: string;
}
interface Driver {
  name: string;
  lastName: string;
  dni: string;
}
interface Customer {
  businessName: string;
}
interface Truck {
  licensePlate: string;
  tankers: Tanker[];
}
interface Tanker {
  capacityLiters: number;
  licensePlate: string;
}

export interface Order {
  id: number;
  status: string;
  truck: Truck;
  customer: Customer;
  driver: Driver;
  product: Product;
  preset: number;
  receptionDate: string;
  estimatedDate: string;
  initialWeighingDate: string;
  fuelingStartDate: string;
  fuelingEndDate: string;
  finalWeighingDate: string;
  lastAccumulatedMass: string;
}
