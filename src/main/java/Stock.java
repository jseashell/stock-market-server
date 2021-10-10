import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Stock {
    private final String symbol;
    private double price;
    private Volatility volatility;
    private final List<Double> history = new ArrayList<>();

    public Stock(Builder builder) {
        this.symbol = builder.symbol;
        this.price = builder.price;
        this.volatility = builder.volatility;
    }

    public String getSymbol() {
        return symbol;
    }

    public double getPrice() {
        return price;
    }

    public Volatility getVolatility() {
        return volatility;
    }

    public void setVolatility(Volatility volatility) {
        this.volatility = volatility;
    }

    public List<Double> getHistory() {
        return Collections.unmodifiableList(history);
    }

    public void tick() {
        double lastPrice = price;
        history.add(lastPrice);
        price += Math.random() > 0.5 ? 1 : -1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Stock stock = (Stock) o;

        return Double.compare(stock.price, price) == 0
                && symbol.equals(stock.symbol)
                && volatility == stock.volatility;
    }

    @Override
    public int hashCode() {
        return Objects.hash(symbol, price, volatility);
    }

    public static class Builder {
        private String symbol = "";
        private double price = 0;
        private Volatility volatility = Volatility.LOW;

        public Builder setSymbol(String symbol) {
            if (symbol != null && !symbol.isEmpty()) {
                this.symbol = symbol;
                return this;
            }
            throw new IllegalArgumentException("Stock must have a symbol.");
        }

        public Builder setPrice(double price) {
            if (price > 0) {
                this.price = price;
                return this;
            }
            throw new IllegalArgumentException("Stock price must be greater than $0.00");
        }

        public Builder setVolatility(Volatility volatility) {
            this.volatility = volatility;
            return this;
        }

        public Stock build() {
            return new Stock(this);
        }
    }
}
