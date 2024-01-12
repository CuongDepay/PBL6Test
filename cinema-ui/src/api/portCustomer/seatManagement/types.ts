export interface SeatVO {
  /**
   * Seat id
   */
  id: string | number;

  /**
   * Hall id
   */
  hallId: string | number;

  /**
   * Showtime id
   */
  showtimeId: string | number;

  /**
   * Seat type id
   */
  seatTypeId: string | number;

  /**
   * Seat type name
   */
  seatTypeName: string;

  /**
   *
   */
  rowCode: string;

  /**
   *
   */
  columnCode: string |  number;

  /**
   *
   */
  price: string |  number;

  /**
   *
   */
  status: string;
}

export interface SeatForm extends BaseEntity {
  /**
   * Seat id
   */
  id?: string | number;

  /**
   * Hall id
   */
  hallId?: string | number;

  /**
   * Showtime id
   */
  showtimeId?: string | number;

  /**
   * Seat type id
   */
  seatTypeId?: string | number;

  /**
   *
   */
  rowCode: string;

  /**
   *
   */
  columnCode: string |  number;

  /**
   *
   */
  status: string;
}

export interface SeatQuery extends PageQuery {
  
  /**
     * Seat id
     */
  id?: string | number;

  /**
   * Hall id
   */
  hallId?: string | number;

  /**
   * Showtime id
   */
  showtimeId?: string | number;

  /**
   * Seat type id
   */
  seatTypeId?: string | number;

}
