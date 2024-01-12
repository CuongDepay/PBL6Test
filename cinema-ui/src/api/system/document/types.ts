export interface DocumentVO {
  /**
   * System document id
   */
  id: string | number;

  /**
   *
   */
  docType: string;

  /**
   *
   */
  docTitle: string;

  /**
   *
   */
  docUrl: string;

  /**
   *
   */
  docDescription: string;

  /**
   *
   */
  docTarget: string;

  /**
   *
   */
  imageType: string;

  /**
   *
   */
  isExternalLink: string;

  /**
   *
   */
  status: string;

  /**
   *
   */
  ossId?: number;

  /**
   *
   */
  createTime?: string;

  /**
   * Remark
   */
  remark: string;
}

export interface DocumentForm extends BaseEntity {
  /**
   * System document id
   */
  id?: string | number;

  /**
   *
   */
  docType?: string;

  /**
   *
   */
  docTitle?: string;

  /**
   *
   */
  docUrl?: string;

  /**
   *
   */
  docDescription?: string;

  /**
   *
   */
  docTarget?: string;

  /**
   *
   */
  imageType?: string;

  /**
   *
   */
  isExternalLink?: string;

  /**
   *
   */
  status?: string;

  /**
   *
   */
  ossId?: number;

  /**
   * Remark
   */
  remark?: string;
}

export interface DocumentQuery extends PageQuery {
  /**
   *
   */
  docType?: string;

  /**
   *
   */
  docTitle?: string;

  /**
   *
   */
  docUrl?: string;

  /**
   *
   */
  docDescription?: string;

  /**
   *
   */
  docTarget?: string;

  /**
   *
   */
  imageType?: string;

  /**
   *
   */
  isExternalLink?: string;

  /**
   *
   */
  ossId?: number;

  /**
   *
   */
  status?: string;
}
