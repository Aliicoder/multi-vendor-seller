export type ISellerStatus = "active" | "inactive" | "pending";
export interface IAuthState {
  userId: string;
  name: string;
  media: IMedia;
  email?: string;
  roles: Role[];
  sellerStatus: ISellerStatus;
  accessToken: string;
  addresses: IAddress[];
}
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}
export type Role = "admin" | "seller" | "client" | "courier";
export interface ICategory {
  _id: string;
  name: string;
  parentId?: string;
  path: string[];
  level: number;
}
export interface AuthResponse {
  user: {
    name: string;
    avatar: string;
    roles: Role[];
    accessToken: string;
  };
}

export interface ICounter {
  prev: number;
  curPage: number;
  next: number;
  pagesLen: number;
}
export interface IQueryParams {
  searchValue: string;
  curPage: number;
  perPage: number;
}

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  shopName: string;
  description: string;
  brand: string;
  slug: string;
  media: IMedia[];
  price: number;
  stock: number;
  rating: number;
  discount: number;
  outOfStock: boolean;
}

export interface ICartOrder {
  _id: string;
  sellerId: string;
  units: IUnit[];
  noOfProducts: number;
  amount: number;
  shopName: string;
}
export interface IChat {
  _id: string;
  recentMessage: string;
  participants: IParticipant[];
}
export interface IParticipant {
  userId: IUser;
  userType: "client" | "seller" | "admin" | "courier";
}
export interface IUser {
  _id: string;
  media: IMedia;
  name: string;
  email: string;
  description: string;
  roles: Role;
  method: "standard" | "google";
  password: string;
  googleId: string;
  addresses: IAddress[];
  businessAddresses: IAddress[];
  refreshToken: string;
  passwordResetToken: string;
  passwordResetTokenExpiration: Date;
}
export interface IOrder extends ICartOrder {
  clientId: string;
  productId: IProduct;
  quantity: number;
  totalAmount: number;
  address: IAddress;
  courierId: string;
  status: "pending" | "active" | "settled";
  createdAt: string;
  updatedAt: string;
}
export interface IUnit {
  productId: IProduct;
  price: number;
  noOfProducts: number;
}

export interface IMessage {
  _id: string;
  chatId: Object;
  senderId: Object;
  receiverId: Object;
  message: string;
  isDelivered: boolean;
  isRead: boolean;
}

export interface ISellerChat {
  _id: string;
  recentMessage: string;
  client: {
    _id: string;
    avatar: string;
    name: string;
  };
}

export interface ISellerAdminChat {
  _id: string;
  recentMessage: string;
  admin: {
    _id: string;
    avatar: string;
    name: string;
  };
}

export interface ISellerCategory {
  _id: string;
  name: string;
}
export interface IPriceRange {
  min: number;
  max: number;
}

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  shopName: string;
  root: string[];
  description: string;
  brand: string;
  slug: string;
  sales: number;
  media: IMedia[];
  price: number;
  stock: number;
  rating: number;
  discount: number;
  outOfStock: boolean;
}

export interface IMedia {
  url: string;
  public_id: string;
  type: "image" | "video";
}
export interface IAddress {
  _id?: string;
  type: "home" | "work" | "other";
  lat: number;
  lon: number;
  city: string;
  area: string;
  phone: string;
  pinCode: string;
  province: string;
}
export type ORDER_STATUS = "pending" | "confirmed" | "shipped" | "delivered";
