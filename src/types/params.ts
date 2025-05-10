import { IRange } from "./types";

export interface IGetPaginatedOrdersPaginationParams {
  orderId: string;
  userId: string;
  perPage?: number;
  deliveryStatus?: string;
  sort?: [];
  curPage?: number;
  amount?: IRange;
  quantity?: IRange;
}
