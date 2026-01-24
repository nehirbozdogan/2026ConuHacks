import java.util.EnumMap;
import  java.util.Map;

public class ClientProfile {
private double maxBudgetUSD;
private int minSeats;
private int minRangeNm;


    private Map< Spec, Integer> ranks = new EnumMap<>(Spec.class);

    public ClientProfile(double maxBudgetUSD, int minSeats, int minRangeNm) throws IllegalArgumentException {

        if (maxBudgetUSD <= 0 || minRangeNm <= 0 || minSeats <= 0) {
            throw new IllegalArgumentException("Invalid constraints");
        }
        this.maxBudgetUSD = maxBudgetUSD;
        this.minSeats = minSeats;
        this.minRangeNm = minRangeNm;


    }
    public void setRanks(Spec spec, int r) {
        if (r< 1 || r > 5)
            throw new IllegalArgumentException("Rank must be 1–5");

        if (ranks.containsValue(r))
            throw new IllegalArgumentException("Duplicate rank not allowed");

        ranks.put(spec,r);
    } public Map<Spec, Integer> getRanks() {
        return ranks;
    } public boolean IsCompleteRank() {
        if (ranks.isEmpty()) {
            return false;
        } else {
            return ranks.size() == Spec.values().length;
        }
    }


    }

