import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;

import java.awt.*;
import java.io.File;
import java.io.IOException;

public class Game {
    private static final int DAYS = 10;
    private static final Volatility VOLATILITY = Volatility.MEDIUM;
    private static final int TICK_SPEED = 0;
    private static final boolean PRINT_TO_CONSOLE = false;

    public static void main(String[] args) {
        GameClock gameClock = new GameClock.Builder().build();

        Market market = Market.initializeMarket(VOLATILITY);
        long tickMillis = System.currentTimeMillis();

        while (gameClock.getDays() <= DAYS) {
            long currentMillis = System.currentTimeMillis();
            if (currentMillis >= (tickMillis + TICK_SPEED)) {
                gameClock.tick();
                market.tick();
                tickMillis = System.currentTimeMillis();
                debugPrint(gameClock, market);
            }
        }

        writeImageFiles(market);
    }


    private static void debugPrint(GameClock gameClock, Market market) {
        if (PRINT_TO_CONSOLE) {
            int days = gameClock.getDays();
            int hours = gameClock.getMinutes() / 60;
            int minutes = gameClock.getMinutes() % 60;

            System.out.printf("====== Day %d ===== %d:%02d =====\n", days, hours, minutes);

            market.getStocks().forEach(stock ->
                    System.out.printf("\t%4s\t$%.2f\n", stock.getSymbol(), stock.getPrice()));
        }
    }

    private static void writeImageFiles(Market market) {
        market.getStocks().forEach(stock -> {
            XYSeries series = new XYSeries(stock.getSymbol());
            for (int i = 0; i < stock.getHistory().size(); i++) {
                double yValue = stock.getHistory().get(i);
                series.add(i, yValue);
            }

            XYSeriesCollection dataset = new XYSeriesCollection();
            dataset.addSeries(series);

            JFreeChart chart = ChartFactory.createXYLineChart(
                    stock.getSymbol(),
                    "Minute",
                    "Price",
                    dataset,
                    PlotOrientation.VERTICAL,
                    true, true, false);

            Color background = Color.BLACK;
            chart.setBackgroundPaint(background);
            chart.getLegend().setBackgroundPaint(background);
            chart.getPlot().setBackgroundPaint(background);
            chart.getXYPlot().setDomainGridlinesVisible(false);
            chart.getXYPlot().getRangeAxis().setMinorTickMarksVisible(true);
            chart.getXYPlot().getRangeAxis().setAutoRange(true);
            chart.getXYPlot().setRangeGridlinesVisible(true);
            ((NumberAxis) chart.getXYPlot().getRangeAxis()).setAutoRangeIncludesZero(false);
            File lineChart = new File("images/history_" + stock.getSymbol() + ".jpeg");

            try {
                int width = 1600;
                int height = 900;
                ChartUtils.saveChartAsJPEG(lineChart, chart, width, height);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
}
