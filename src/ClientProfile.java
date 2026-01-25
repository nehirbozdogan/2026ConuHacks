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
    private int targetCabinCompartment;
    private double targetPurchasePriceUSD;
    private double targetOperatingCostUSD;
    private Map<Spec, Integer> ranks = new EnumMap<>(Spec.class);

    public ClientProfile(int targetSeats, String targetSizeCategory, int targetCabinCompartment,
                         double targetPurchasePriceUSD, double targetOperatingCostUSD) {
        setTargetSeats(targetSeats);
        setTargetSizeCategory(targetSizeCategory);
        setTargetCabinCompartment(targetCabinCompartment);
        setTargetPurchasePriceUSD(targetPurchasePriceUSD);
        setTargetOperatingCostUSD(targetOperatingCostUSD);
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

    public void setTargetCabinCompartment(int cc) {
        if (cc < 0) throw new IllegalArgumentException("Compartment cannot be negative");
        this.targetCabinCompartment = cc;
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
    public int getTargetCabinCompartment() { return targetCabinCompartment; }
    public double getTargetPurchasePriceUSD() { return targetPurchasePriceUSD; }
    public double getTargetOperatingCostUSD() { return targetOperatingCostUSD; }

    public void setRank(Spec spec, int r) {
        if (spec == null) {
            throw new IllegalArgumentException("Spec cannot be null");
        } if (r < 1 || r > 5)
            throw new IllegalArgumentException("Rank must be 1-5");
        if (ranks.containsValue(r))
            throw new IllegalArgumentException("Duplicate rank not allowed");
        ranks.put(spec, r);
    }

    public Map<Spec, Integer> getRanks() {
        return new EnumMap<>(ranks);
    }

    public boolean isCompleteRank() {
        return ranks.size() == Spec.values().length;
    }

    public double getTargetValue(Spec spec) {
        switch (spec) {
            case SEATS: return targetSeats;
            case CABIN_COMPARTMENT: return targetCabinCompartment;
            case BUDGET: return targetPurchasePriceUSD;
            case OP_COST: return targetOperatingCostUSD;
            default: return 0;
        }
    }

    public static String[] getSizeCategories() {
        return SIZE_CATEGORIES.clone();
    }
}