export interface PromotionVO {
  id: string | number;
  title: string;
  promotionDescription: string;
  discount: number | string;
  imageUrl: string;
  fromDate: string;
  toDate: string;
  remark: string;
}

export interface PromotionForm extends BaseEntity {
  id?: string | number;
  title?: string;
  promotionDescription?: string;
  discount?: number | string;
  imageUrl?: string;
  fromDate?: string;
  toDate?: string;
  remark?: string;
}

export interface PromotionQuery extends PageQuery {
  id?: string | number;
  title?: string;
  promotionDescription?: string;
  discount?: number | string;
  imageUrl?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PromotionInforVO {
  Promotion: PromotionVO;
}
