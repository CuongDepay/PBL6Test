export interface SeatTypeVO {
  id: string | number;
  seatTypeName: string;
  price: string | number;
  createTime: string;
  remark: string;
}

export interface SeatTypeForm extends BaseEntity {
  id?: string | number;
  seatTypeName?: string;
  price?: string | number;
  remark?: string;
}

export interface SeatTypeQuery extends PageQuery {
  id?: string | number;
  seatTypeName?: string;
  price?: string | number;
}
