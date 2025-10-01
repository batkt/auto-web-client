export interface Branch {
  _id: string;
  name: string;
  fullAddress: string;
  phone: string;
  email: string;
  services: string[];
  image: string;
  coordinates: [number, number];
  pastor?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
