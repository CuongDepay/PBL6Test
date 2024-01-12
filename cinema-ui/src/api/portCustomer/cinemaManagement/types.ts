export interface CinemaVO {
  /**
   * Cinema id
   */
  id: string | number;

  /**
   *
   */
  cinemaName: string;

  /**
   *
   */
  cinemaAddress: string;

  /**
   * Remark
   */
  remark: string;
}

export interface CinemaForm extends BaseEntity {
  /**
   * Cinema id
   */
  id?: string | number;

  /**
   *
   */
  cinemaName?: string;

  /**
   *
   */
  cinemaAddress?: string;

  /**
   * Remark
   */
  remark?: string;
}

export interface CinemaQuery extends PageQuery {
  /**
   *
   */
  id?: string | number;

  /**
   *
   */
  cinemaName?: string;

  /**
   *
   */
  cinemaAddress?: string;
}

export interface CinemaInfoVO {
  Cinema: CinemaVO;
}
