export interface CustomerVO {
  userId: string | number;
  userName: string;
  nickName: string;
  customerType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  password: string;
  status: string;
  remark: string;
}
export interface CustomerForm extends BaseEntity {
  userId?: string | number;
  userName?: string;
  nickName?: string;
  customerType?: string;
  email?: string;
  phonenumber?: string;
  sex?: string;
  avatar?: string;
  password?: string;
  status?: string;
  remark?: string;
}

export interface CustomerQuery extends PageQuery {
  userId?: string | number;
  userName?: string;
  nickName?: string;
  customerType?: string;
  email?: string;
  phonenumber?: string;
  sex?: string;
  avatar?: string;
  password?: string;
  status?: string;
}

export interface CustomerInfoVO {
  Customer: CustomerVO;
}
