export interface SlideVO {
  id: string | number;

  slideUrl: string;

  remark: string;
}

export interface SlideForm extends BaseEntity {
  id?: string | number;

  slideUrl?: string;

  remark?: string;
}

export interface SlideQuery extends PageQuery {
  id?: string | number;

  slideUrl?: string;
}

export interface SlideInfoVO {
  Slide: SlideVO;
}
