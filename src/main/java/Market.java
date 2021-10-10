import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Market {
    private final List<Stock> stocks;
    
    public static Market initializeMarket(Volatility volatility) {
        return new Market.Builder()
                .add(new Stock.Builder()
                        .setSymbol("FB")
                        .setPrice(330.05)
                        .setVolatility(volatility)
                        .build())
                .add(new Stock.Builder()
                        .setSymbol("AAPL")
                        .setPrice(142.90)
                        .setVolatility(volatility)
                        .build())
                .add(new Stock.Builder()
                        .setSymbol("AMZN")
                        .setPrice(3_288.62)
                        .setVolatility(volatility)
                        .build())
                .add(new Stock.Builder()
                        .setSymbol("NFLX")
                        .setPrice(632.66)
                        .setVolatility(volatility)
                        .build())
                .add(new Stock.Builder()
                        .setSymbol("GOOG")
                        .setPrice(2_801.12)
                        .setVolatility(volatility)
                        .build())
                .build();
    }

    private Market(Builder builder) {
        this.stocks = builder.stocks;
    }

    public List<Stock> getStocks() {
        return Collections.unmodifiableList(stocks);
    }

    public void tick() {
        stocks.forEach(Stock::tick);
    }

    public static class Builder {
        private List<Stock> stocks = new ArrayList<>();

        public Builder add(Stock stock) {
            if (stock != null) {
                stocks.add(stock);
                return this;
            }
            throw new IllegalArgumentException("Market cannot add null stock");
        }

        public Market build() {
            return new Market(this);
        }
    }
}
