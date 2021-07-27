export interface IHomeObject {
  id: number;
  title: string;
  secondaryTitle: string;
  location: string;
  capacity: string;
  images: string[];
  price: number;
  categories: string[];
  instanceBooking: boolean;
  housingType: string[];
  flexibleCancellation: boolean;
  position: [number, number];
}

export interface ICategoryObject {
  id: number;
  slug: string;
  title: string;
  image: string;
}
