export interface MovieVO {
  id: string | number;

  title: string;

  movieDescription: string;

  releaseDate: string;

  endDate: string;

  duration: number | string;

  language: string;

  rated: string;

  genre: string;

  director: string;
  actor: string;
  rating: string;
  posterUrl: string;
  trailerUrl: string;

  remark: string;
}

export interface MovieForm extends BaseEntity {
  id?: string | number;

  title?: string;

  movieDescription?: string;

  releaseDate?: string;

  endDate?: string;

  duration?: number | string;

  language?: string;

  rated?: string;

  genre?: string;

  director?: string;
  actor?: string;
  rating?: string;
  posterUrl?: string;
  trailerUrl?: string;

  remark?: string;
}

export interface MovieQuery extends PageQuery {
  id?: string | number;

  title?: string;

  movieDescription?: string;

  releaseDate?: string;

  endDate?: string;

  duration?: number | string;

  language?: string;

  rated?: string;

  genre?: string;

  director?: string;
  actor?: string;
  rating?: string;
  posterUrl?: string;
  trailerUrl?: string;
}

export interface MovieInfoVO {
  Movie: MovieVO;
}
