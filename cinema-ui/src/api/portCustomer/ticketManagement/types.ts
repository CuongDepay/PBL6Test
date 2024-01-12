export interface BookingVO {
  id: string | number;
  tenantId: string;
  cinemaId: string | number;
  cinemaName: string;
  customerId: string | number;
  nickName: string;
  numTicket: string | number;
  promotionId: string | number;
  totalPrice: string | number;
  paymentFlag: string;
  showtimeId: string | number;
  movieName: string;
  createTime: string;
}

export interface BookingForm extends BaseEntity {
  tenantId?: string;
  id?: string | number;
  cinemaId?: string | number;
  customerId?: string | number;
  numTicket?: string | number;
  promotionId?: string | number;
  totalPrice?: string | number;
  paymentFlag?: string;
  showtimeId?: string | number;
  createTime?: string;
}

export interface BookingQuery extends PageQuery {
  cinemaId: string | number;
}

export interface BookingDetailVO {
  tenantId: string;
  id: string | number;
  cinemaId: string | number;
  bookingId: string | number;
  seatId: string | number;
  rowCode: string;
  columnCode: string | number;
}

export interface BookingDetailForm extends BaseEntity {
  tenantId?: string;
  id?: string | number;
  cinemaId?: string | number;
  bookingId?: string | number;
  seatId?: string | number;
}

export interface BookingDetailQuery {
  bookingId?: string | number;
}
