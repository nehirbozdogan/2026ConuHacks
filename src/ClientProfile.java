import java.util.EnumMap;
import java.util.Map;

class ClientProfile {
    private static final String[] SIZE_CATEGORIES = {
            "light_jet",
            "mid_sized_jet",
            "super_mid_sized_jet",
            "large_cabin_jet"
    };

    private int targetSeats;
    private String targetSizeCategory;
    private double targetCruiseSpeedMach;
    private double targetPurchasePriceUSD;
    private double targetOperatingCostUSD;
    private Map<Spec, Integer> ranks = new EnumMap<>(Spec.class);

    public ClientProfile(int targetSeats, String targetSizeCategory, double targetCruiseSpeedMach,
                         double targetPurchasePriceUSD, double targetOperatingCostUSD) {
        this.targetSeats = targetSeats;
        this.targetSizeCategory = targetSizeCategory;
        this.targetCruiseSpeedMach = targetCruiseSpeedMach;
        this.targetPurchasePriceUSD = targetPurchasePriceUSD;
        this.targetOperatingCostUSD = targetOperatingCostUSD;
    }

    public void setTargetSeats(int seats) {
        if (seats < 0) throw new IllegalArgumentException("Seats cannot be negative");
        this.targetSeats = seats;
    }

    public void setTargetSizeCategory(String category) {
        boolean valid = false;
        for (String validCat : SIZE_CATEGORIES) {
            if (validCat.equals(category)) {
                valid = true;
                break;
            }
        }
        if (!valid) throw new IllegalArgumentException("Invalid size category");
        this.targetSizeCategory = category;
    }

    public void setTargetCruiseSpeedMach(double mach) {
        if (mach < 0) throw new IllegalArgumentException("Speed cannot be negative");
        this.targetCruiseSpeedMach = mach;
    }

    public void setTargetPurchasePriceUSD(double price) {
        if (price < 0) throw new IllegalArgumentException("Price cannot be negative");
        this.targetPurchasePriceUSD = price;
    }

    public void setTargetOperatingCostUSD(double cost) {
        if (cost < 0) throw new IllegalArgumentException("Cost cannot be negative");
        this.targetOperatingCostUSD = cost;
    }

    public int getTargetSeats() { return targetSeats; }
    public String getTargetSizeCategory() { return targetSizeCategory; }
    public double getTargetCruiseSpeedMach() { return targetCruiseSpeedMach; }
    public double getTargetPurchasePriceUSD() { return targetPurchasePriceUSD; }
    public double getTargetOperatingCostUSD() { return targetOperatingCostUSD; }

    public void setRank(Spec spec, int r) {
        if (r < 1 || r > 5)
            throw new IllegalArgumentException("Rank must be 1-5");
        if (ranks.containsValue(r))
            throw new IllegalArgumentException("Duplicate rank not allowed");
        ranks.put(spec, r);
    }

    public Map<Spec, Integer> getRanks() {
        return ranks;
    }

    public boolean isCompleteRank() {
        return ranks.size() == Spec.values().length;
    }

    public double getTargetValue(Spec spec) {
        switch (spec) {
            case SEATS: return targetSeats;
            case SPEED: return targetCruiseSpeedMach;
            case BUDGET: return targetPurchasePriceUSD;
            case OP_COST: return targetOperatingCostUSD;
            default: return 0;
        }
    }

    public static String[] getSizeCategories() {
        return SIZE_CATEGORIES;
    }
}