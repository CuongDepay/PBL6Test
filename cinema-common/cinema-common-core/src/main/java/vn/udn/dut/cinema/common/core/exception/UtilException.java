package vn.udn.dut.cinema.common.core.exception;

import java.io.Serial;

/**
 * Tool exception
 *
 * @author HoaLD
 */
public class UtilException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 8247610319171014183L;

    public UtilException(Throwable e) {
        super(e.getMessage(), e);
    }

    public UtilException(String message) {
        super(message);
    }

    public UtilException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
