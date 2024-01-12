package vn.udn.dut.cinema.publicapi.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.udn.dut.cinema.common.core.domain.R;
import vn.udn.dut.cinema.common.web.core.BaseController;
import vn.udn.dut.cinema.port.domain.bo.BookingBo;
import vn.udn.dut.cinema.port.domain.bo.BookingDetailBo;
import vn.udn.dut.cinema.port.domain.bo.CinemaBo;
import vn.udn.dut.cinema.port.domain.bo.MovieBo;
import vn.udn.dut.cinema.port.domain.bo.PromotionBo;
import vn.udn.dut.cinema.port.domain.bo.SeatBo;
import vn.udn.dut.cinema.port.domain.bo.ShowtimeBo;
import vn.udn.dut.cinema.port.domain.bo.SlideBo;
import vn.udn.dut.cinema.port.domain.bo.VnpHistoryBo;
import vn.udn.dut.cinema.port.domain.vo.CinemaVo;
import vn.udn.dut.cinema.port.domain.vo.HallVo;
import vn.udn.dut.cinema.port.domain.vo.InvoiceInfoVo;
import vn.udn.dut.cinema.port.domain.vo.MovieVo;
import vn.udn.dut.cinema.port.domain.vo.PromotionVo;
import vn.udn.dut.cinema.port.service.IBookingDetailService;
import vn.udn.dut.cinema.port.service.IBookingService;
import vn.udn.dut.cinema.port.service.ICinemaService;
import vn.udn.dut.cinema.port.service.IHallService;
import vn.udn.dut.cinema.port.domain.vo.SeatOrderVo;
import vn.udn.dut.cinema.port.domain.vo.SeatTypeVo;
import vn.udn.dut.cinema.port.domain.vo.SeatVo;
import vn.udn.dut.cinema.port.domain.vo.ShowtimeInfoVo;
import vn.udn.dut.cinema.port.domain.vo.ShowtimeVo;
import vn.udn.dut.cinema.port.domain.vo.VnpHistoryVo;
import vn.udn.dut.cinema.port.service.IMovieService;
import vn.udn.dut.cinema.port.service.IPromotionService;
import vn.udn.dut.cinema.port.service.ISeatService;
import vn.udn.dut.cinema.port.service.ISeatTypeService;
import vn.udn.dut.cinema.port.service.IShowtimeService;
import vn.udn.dut.cinema.port.service.ISlideService;
import vn.udn.dut.cinema.port.service.IVnpHistoryService;

/**
 * Homepage api
 *
 * @author HOALD
 * @date 2023-11-11
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/homepage/search")
public class HomepageSearchController extends BaseController {

	private final IPromotionService promotionService;
	private final IMovieService movieService;
	private final ISlideService slideService;
	private final ICinemaService cinemaService;
	private final IShowtimeService showtimeService;
	private final ISeatService seatService;
	private final IVnpHistoryService vnpHistoryService;
	private final ISeatTypeService seatTypeService;
	private final IBookingService bookingService;
	private final IBookingDetailService bookingDetailService;
	private final IHallService hallService;

	@GetMapping("/documents")
	public R<Map<String, Object>> getDocuments() {
		Map<String, Object> result = new HashMap<String, Object>();
		PromotionBo bo1 = new PromotionBo();
		result.put("promotions", promotionService.queryList(bo1));
		MovieBo bo2 = new MovieBo();
		result.put("movies", movieService.queryList(bo2));
		SlideBo bo3 = new SlideBo();
		result.put("slides", slideService.queryList(bo3));
		return R.ok(result);
	}
	
	@GetMapping("/nowplayingmovies")
	public List<MovieVo> getNowPlayingMovies() {
		return movieService.getNowPlayingMovies();
	}
	
	@GetMapping("/upcommingmovies")
	public List<MovieVo> getUpcommingMovies() {
		return movieService.getUpcomingMovies();
	}

	@GetMapping("/promotions")
	public List<PromotionVo> getPromotions() {
		return promotionService.getNowPromotions();
	}
	@GetMapping("/cinemas")
	public List<CinemaVo> getCinemaList(CinemaBo bo) {
		return cinemaService.queryList(bo);
	}
	
	@GetMapping("/showtimeInfoList/{movieId}")
	public List<ShowtimeInfoVo> fetchShowtimeInfoList(@PathVariable Long movieId) {
		return showtimeService.fetchShowtimeInfoList(movieId);
	}
	
	@GetMapping("/showtimeInfoList")
	public List<ShowtimeVo> getShowtimeList(ShowtimeBo bo) {
		return showtimeService.queryList(bo);	}
	
	@GetMapping("/showtime/seatOrderList/{showtimeId}")
	public List<SeatOrderVo> fetchSeatOrderList(@PathVariable Long showtimeId) {
		return seatService.fetchSeatOrderList(showtimeId);
	}
	
	
	
	/**
	 * Handle payment successfully
	 */
	@GetMapping("/booking/{transactionId}")
	public R<InvoiceInfoVo> handleBookingTicket(@PathVariable String transactionId) {
		InvoiceInfoVo invoiceInfo = new InvoiceInfoVo();
		VnpHistoryBo vnpHistoryParam = new VnpHistoryBo();
		vnpHistoryParam.setVnpTransactionId(transactionId);
		VnpHistoryVo vnpHistory = vnpHistoryService.queryList(vnpHistoryParam).get(0);
		String seatIdsStr = vnpHistory.getTransactionId();
		String[] seatIds = seatIdsStr.split(",");
		SeatVo seat = seatService.queryById(Long.parseLong(seatIds[0]));
		ShowtimeVo showtime = showtimeService.queryById(seat.getShowtimeId());
		BookingBo booking = new BookingBo();
		booking.setCinemaId(showtime.getCinemaId());
		booking.setCustomerId(vnpHistory.getCreateBy());
		booking.setPaymentFlag("Y");
		booking.setNumTicket((long) seatIds.length);
		if (!"00".equals(transactionId.split("_")[1])) {
			Long promotionId = Long.parseLong(transactionId.split("_")[1]);
			booking.setPromotionId(promotionId);
			PromotionVo promotion = promotionService.queryById(promotionId);
			invoiceInfo.setPromotionName(promotion.getPromotionDescription());
		}
		booking.setShowtimeId(showtime.getId());
		booking.setTotalPrice(vnpHistory.getAmount());
		bookingService.insertByBo(booking);
		invoiceInfo.setTicketId(booking.getId());
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm - dd/MM/yyyy");
		// Chuyển đối tượng Date thành chuỗi
		String formattedDate = sdf.format(showtime.getStartTime());
		invoiceInfo.setStartTime(formattedDate);
		CinemaVo cinema = cinemaService.queryById(showtime.getCinemaId());
		invoiceInfo.setCinemaName(cinema.getCinemaName());
		HallVo hall = hallService.queryById(showtime.getHallId());
		invoiceInfo.setHallName(hall.getHallName());
		Long totalAmount = 0L;
		String seatName = "";
		List<SeatVo> seatList = new ArrayList<>();
		for (String seatIdStr : seatIds) {
			Long seatId = Long.parseLong(seatIdStr);
			SeatVo seatObj = seatService.queryById(seatId);
			seatList.add(seatObj);
			SeatTypeVo seatType = seatTypeService.queryById(seatObj.getSeatTypeId());
			totalAmount += seatType.getPrice();
			seatName += seatObj.getRowCode() + seatObj.getColumnCode() + ", ";
			BookingDetailBo bookingDetail = new BookingDetailBo();
			bookingDetail.setBookingId(booking.getId());
			bookingDetail.setSeatId(seatId);
			bookingDetail.setCinemaId(showtime.getCinemaId());
			bookingDetailService.insertByBo(bookingDetail);
			SeatBo seatUpdate = new SeatBo();
			seatUpdate.setStatus("Y");
			seatUpdate.setId(seatId);
			seatService.updateByBo(seatUpdate);
		}
		for (SeatVo seatVo : seatList) {
			SeatTypeVo seatType = seatTypeService.queryById(seatVo.getSeatTypeId());
			seatVo.setSeatTypeName(seatType.getSeatTypeName());
		}
		Map<String, Long> summary = seatList.stream()
				.collect(Collectors.groupingBy(SeatVo::getSeatTypeName, Collectors.counting()));

		String seatDescription = summary.entrySet().stream().map(entry -> entry.getValue() + " x " + entry.getKey())
				.collect(Collectors.joining(", "));
		invoiceInfo.setSeatName(seatName.substring(0, seatName.length() - 2));
		invoiceInfo.setSeatDescription(seatDescription);
		invoiceInfo.setTotalAmount(totalAmount);
		invoiceInfo.setActualAmount(vnpHistory.getAmount());
		invoiceInfo.setDiscountAmount(totalAmount - vnpHistory.getAmount());
		return R.ok(invoiceInfo);
	}
}
