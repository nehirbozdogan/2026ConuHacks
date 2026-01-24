import java.util.EnumMap;
import  java.util.Map;

public class ClientProfile {
private double maxBudgetUSD;
private int minSeats;
private int minRangeNm;

    private Map< Spec, Integer> rank = new EnumMap<>(Spec.class);

    public ClientProfile(double maxBudgetUSD, int minSeats, int minRangeNm) throws IllegalArgumentException {

        if (maxBudgetUSD <= 0 || minRangeNm <= 0 || minSeats <= 0) {
            throw new IllegalArgumentException("Invalid constraints");
        }
        this.maxBudgetUSD = maxBudgetUSD;
        this.minSeats = minSeats;
        this.minRangeNm = minRangeNm;


    }
    public void  setRank(Spec spec, int rank) {
        if (rank <= 0) throw new IllegalArgumentException("Invalid rank");
    }

}