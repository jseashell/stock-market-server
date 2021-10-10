import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class GameClockTest {
    @Test
    public void tick() {
        final int days = 1;
        final int minutes = 15;

        GameClock gameClock =
                new GameClock.Builder()
                        .setDays(days)
                        .setMinutes(minutes)
                        .build();

        gameClock.tick();

        assertEquals(days, gameClock.getDays());
        assertEquals(minutes + 1, gameClock.getMinutes());
    }

    @Test
    public void tick_rotatesDays() {
        int minutesInOneDay = 480;
        
        GameClock gameClock =
                new GameClock.Builder()
                        .setDays(0)
                        .setMinutes(minutesInOneDay)
                        .build();

        gameClock.tick();

        assertEquals(1, gameClock.getDays());
        assertEquals(0, gameClock.getMinutes());
    }

    @Test
    public void setDays_throwsForNegative() {
        assertThrows(IllegalArgumentException.class, () -> {
            new GameClock.Builder().setDays(-1);
        });
    }

    @Test
    public void setMinutes_throwsForNegative() {
        assertThrows(IllegalArgumentException.class, () -> {
            new GameClock.Builder().setMinutes(-1);
        });
    }

    @Test
    public void setMinutes_throwsForGreaterThan1440() {
        assertThrows(IllegalArgumentException.class, () -> {
            new GameClock.Builder().setMinutes(1441);
        });
    }
}
