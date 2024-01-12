export interface BillHisToryVO {
  id: number;
  movieName: string;
  genre: string;
  cinemaName: string;
  hallName: string;
  seatIds: string[];
  bookingId: string;
  promotionId: string;
  bookingQr: string;
  posterUrl: string;
  price: number;
  startTime: string;
}
