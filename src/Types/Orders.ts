// OrderTypes.ts

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country:string
  phone: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: Address;
  date: number;
  payment: boolean;
  paymentMethod: "COD" | "Online";
  status: string;
  __v: number;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
}
