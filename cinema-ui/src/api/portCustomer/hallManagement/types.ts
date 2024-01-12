export interface HallVO {
  /**
   * Hall id
   */
  id: string | number;

  /**
   * Cinema id
   */
  cinemaId: string | number;

  /**
   * Cinema name
   */
  cinemaName: string;

  /**
   *
   */
  hallName: string;

  /**
   *
   */
  capacity: Boolean;

  /**
   *
   */
  rowNumber: string | number;

  /**
   * Remark
   */
  remark: string;
}

export interface HallForm extends BaseEntity {
  /**
   * Hall id
   */
  id?: string | number;

  /**
   * Cinema id
   */
  cinemaId?: string | number;

  /**
   *
   */
  hallName?: string;

  /**
   *
   */
  capacity?: Boolean;

  /**
   *
   */
  rowNumber?: string | number;

  /**
   * Remark
   */
  remark?: string;
}

export interface HallQuery extends PageQuery {
  
  /**
   *
   */
  cinemaId: string | number;

  /**
   *
   */
  cinemaName: string;

  /**
   *
   */
  hallName: string;
}

export interface HallSeatVO {
  /**
   * Hall id
   */
  hallId: string | number;

  /**
   * Seat type id
   */
  seatTypeId: string | number;

  /**
   * Id
   */
  id: string | number;

  /**
   *
   */
  rowCode: string;

  /**
   *
   */
  columCode: string | number;

  /**
   *
   */
  createTime: string;
}

export interface HallSeatForm extends BaseEntity {
  /**
   * Hall id
   */
  id?: string | number;

  /**
   * Cinema id
   */
  hallId?: string | number;

  /**
   * Seat type id
   */
  seatTypeId?: string | number;

  /**
   *
   */
  rowCode?: string | number;

  /**
   *
   */
  rowSeatNumber?: string;
}

export interface HallSeatQuery {
  
  /**
   *
   */
  hallId?: string | number;
}