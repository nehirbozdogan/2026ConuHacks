import java.util.EnumMap;
import  java.util.Map;

public class ClientProfile {
    private String[] SizeCategory = {"lightjet", "mid-sized jet", "super mid-sized jet","large cabin jet" };
    private int targetSeats;
    private int targetRangeNm;
    private double targetCruiseSpeedMach;
    private double targetPurchasePriceUSD ;
    private double targetOperatingCostUSD;
    private Map< Spec, Integer> ranks = new EnumMap<>(Spec.class);


    public ClientProfile(int targetSeats, int targetRangeNm, double targetCruiseSpeedMach, double targetPurchasePriceUSD, double targetOperatingCostUSD) {
        this.targetSeats = targetSeats;
        this.targetRangeNm = targetRangeNm;
        this.targetCruiseSpeedMach = targetCruiseSpeedMach;
        this.targetPurchasePriceUSD = targetPurchasePriceUSD;
        this.targetOperatingCostUSD = targetOperatingCostUSD;
    }

    public void setTargetSeats(int seats) throws IllegalArgumentException{
        if (seats < 0) throw new IllegalArgumentException();
        this.targetSeats = seats;
    }

    public void setTargetRangeNm(int range) throws IllegalArgumentException{
        if (range < 0) throw new IllegalArgumentException();
        this.targetRangeNm = range;
    }

    public void setTargetCruiseSpeedMach(double mach) throws IllegalArgumentException{
        if (mach < 0) throw new IllegalArgumentException();
        this.targetCruiseSpeedMach = mach;
    }

    public void setTargetPurchasePriceUSD(double price)throws IllegalArgumentException {
        if (price < 0) throw new IllegalArgumentException();
        this.targetPurchasePriceUSD = price;
    }

    public void setTargetOperatingCostUSD(double cost) throws IllegalArgumentException{
        if (cost < 0) throw new IllegalArgumentException();
        this.targetOperatingCostUSD = cost;
    }


    public int getTargetSeats() { return targetSeats; }
    public int getTargetRangeNm() { return targetRangeNm; }
    public double getTargetCruiseSpeedMach() { return targetCruiseSpeedMach; }
    public double getTargetPurchasePriceUSD() { return targetPurchasePriceUSD; }
    public double getTargetOperatingCostUSD() { return targetOperatingCostUSD; }


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

