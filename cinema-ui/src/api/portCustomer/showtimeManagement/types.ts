export interface ShowtimeVO {
  /**
   * Showtime id
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
   * Movie id
   */
  movieId: string | number;

  /**
   * Movie name
   */
  movieName: string;

  /**
   * Hall id
   */
  hallId: string | number;

  /**
   * Hall name
   */
  hallName: string;

  /**
   *
   */
  startTime: string;

  /**
   *
   */
  endTime: string;
}

export interface ShowtimeForm extends BaseEntity {
  /**
   * Showtime id
   */
  id?: string | number;

  /**
   * Cinema id
   */
  cinemaId: string | number;

  /**
   * Movie id
   */
  movieId: string | number;

  /**
   * Hall id
   */
  hallId: string | number;

  /**
   *
   */
  startTime: string;

  /**
   *
   */
  endTime?: string;
}

export interface ShowtimeQuery extends PageQuery {
  
  /**
   * Showtime id
   */
  id?: string | number;

  /**
   * Cinema id
   */
  cinemaId?: string | number;

  /**
   * Movie id
   */
  movieId?: string | number;

  /**
   * Movie name
   */
  movieName?: string;

  /**
   * Hall id
   */
  hallId?: string | number;

  /**
   * Hall name
   */
  hallName?: string;

  /**
   *
   */
  startTime?: string;

  /**
   *
   */
  endTime?: string;
}
