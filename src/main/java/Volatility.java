public enum Volatility {
    LOW(5),
    MEDIUM(10),
    HIGH(20);

    private final int factor;

    Volatility(int factor) {
        this.factor = factor;
    }

    public int getFactor() {
        return factor;
    }
}
