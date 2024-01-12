export interface InvoiceInfoVO {
    /**
     * Booking id
     */
    ticketId: string | number;
  
    /**
     * Start time
     */
    startTime: string;
  
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
    seatName: string;
  
    /**
     *
     */
    promotionName: string;
  
    /**
     *
     */
    seatDescription: string;

    totalAmount: number;

    discountAmount: number;

    actualAmount: number;
  }
