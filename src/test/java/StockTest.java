import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class StockTest {
    @Test
    public void getSymbol() {
        String symbol = "AAPL";

        Stock stock = new Stock.Builder()
                .setSymbol(symbol)
                .build();

        assertEquals(symbol, stock.getSymbol());
    }

    @Test
    public void getPrice() {
        double price = 1;

        Stock stock = new Stock.Builder()
                .setPrice(price)
                .build();

        assertEquals(price, stock.getPrice());
    }

    @Test
    public void getVolatility() {
        Volatility volatility = Volatility.MEDIUM;

        Stock stock = new Stock.Builder()
                .setVolatility(volatility)
                .build();

        assertEquals(volatility, stock.getVolatility());
    }

    @Test
    public void equals_symmetric() {
        Stock a = new Stock.Builder().setSymbol("AAPL").build();
        Stock b = new Stock.Builder().setSymbol("AAPL").build();
        assertTrue(a.equals(b) && b.equals(a));
    }

    @Test
    public void equals_asymmetric() {
        Stock a = new Stock.Builder().setSymbol("AAPL").build();
        Stock b = new Stock.Builder().setSymbol("NFLX").build();
        assertFalse(a.equals(b) && b.equals(a));
    }

    @Test
    public void builder_setSymbol_throws_nullEmpty() {
        assertThrows(IllegalArgumentException.class,
                () -> new Stock.Builder().setSymbol(null));
        assertThrows(IllegalArgumentException.class,
                () -> new Stock.Builder().setSymbol(""));
    }
}
