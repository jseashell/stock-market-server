public class GameClock {
    private static final int MINUTES_IN_ONE_DAY = 480;
    private int days;
    private int minutes;

    private GameClock(Builder builder) {
        this.days = builder.days;
        this.minutes = builder.minutes;
    }

    public int getDays() {
        return days;
    }

    public int getMinutes() {
        return minutes;
    }

    public void tick() {
        minutes++;
        if (minutes >= MINUTES_IN_ONE_DAY) {
            minutes = 0;
            days++;
        }
    }

    public static class Builder {
        private int days = 1;
        private int minutes = 0;

        public Builder setDays(int days) {
            if (days >= 0) {
                this.days = days;
                return this;
            }
            throw new IllegalArgumentException("Days must be >= 0.");
        }

        public Builder setMinutes(int minutes) {
            if (minutes >= 0 && minutes <= 1440) {
                this.minutes = minutes;
                return this;
            }
            throw new IllegalArgumentException("Minutes must be between 0 and 1440, inclusive.");
        }

        public GameClock build() {
            return new GameClock(this);
        }
    }
}
