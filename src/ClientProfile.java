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
    public void setRank(Spec spec, int r) {
        if (r <= 0) {
            throw new IllegalArgumentException(
                    "Rank must be >= 1 (1 = most important)"
            );
        }

        // Check if this rank is already used by another spec
        for (Map.Entry<Spec, Integer> entry : rank.entrySet()) {
            if (entry.getValue() == r && entry.getKey() != spec) {
                throw new IllegalArgumentException(
                        "Rank " + r + " is already assigned to " + entry.getKey()
                );
            }
        }

        rank.put(spec, r);
    }
    public String ValidateRanks() {
        int numSpecs = Spec.values().length;
        if(rank.size() != numSpecs) {
            return "You must rank all " + numSpecs + " specs. Currently ranked: " + rank.size();
        }

    }

}