import java.util.Map;
import java.util.EnumMap;

class ScoredAirplane extends Airplane {
    private double score;
    private double matchPercentage;
    private Map<Spec, Double> individualMatches = new EnumMap<>(Spec.class);

    public ScoredAirplane(Airplane airplane, ClientProfile profile) {
        super(airplane.getModel(),
                airplane.getSeats(),
                airplane.getSizeCategory(),
                airplane.getCabinCompartment(),
                airplane.getPurchasePriceUSD(),
                airplane.getHourlyOperatingCostUSD());
        this.matchPercentage = calculateMatchPercentage(profile);
        this.score = 100.0 - matchPercentage; // Lower score is still better for sorting
    }

    private double calculateMatchPercentage(ClientProfile profile) {
        double totalWeightedMatch = 0.0;
        double totalWeight = 0.0;

        for (Spec spec : Spec.values()) {
            int rank = profile.getRanks().get(spec);
            double weight = (6 - rank); // Rank 1 = weight 5, Rank 5 = weight 1

            double matchScore; // 0-100, where 100 is perfect match

            if (spec == Spec.SIZE_CATEGORY) {
                matchScore = calculateCategoryMatch(
                        this.getSizeCategory(),
                        profile.getTargetSizeCategory(),
                        rank
                );
            } else {
                double actualValue = getActualValue(spec);
                double targetValue = profile.getTargetValue(spec);
                matchScore = calculateNumericMatch(actualValue, targetValue, rank);
            }

            individualMatches.put(spec, matchScore);
            totalWeightedMatch += matchScore * weight;
            totalWeight += weight;
        }

        // Return weighted average match percentage
        return totalWeight > 0 ? totalWeightedMatch / totalWeight : 0.0;
    }

    private double calculateCategoryMatch(String actualCategory, String targetCategory, int rank) {
        int actualIndex = getCategoryIndex(actualCategory);
        int targetIndex = getCategoryIndex(targetCategory);
        int steps = Math.abs(actualIndex - targetIndex);

        // Exact match = 100%
        if (steps == 0) return 100.0;

        // Calculate match percentage based on distance and rank
        // Rank 1 (strict): each step away reduces match significantly
        // Rank 5 (loose): each step away reduces match slightly
        double maxSteps = 3.0; // Maximum possible steps in our 4-category system
        double stepPenalty;

        switch (rank) {
            case 1: stepPenalty = 40.0; break; // -40% per step (very strict)
            case 2: stepPenalty = 30.0; break; // -30% per step
            case 3: stepPenalty = 20.0; break; // -20% per step
            case 4: stepPenalty = 15.0; break; // -15% per step
            case 5: stepPenalty = 10.0; break; // -10% per step (very loose)
            default: stepPenalty = 25.0;
        }

        double match = 100.0 - (steps * stepPenalty);
        return Math.max(0.0, match); // Don't go below 0%
    }

    private double calculateNumericMatch(double actual, double target, int rank) {
        if (target == 0) return 100.0; // Avoid division by zero

        double percentDeviation = Math.abs(actual - target) / target;

        // Define tolerance levels based on rank
        double tolerance;
        switch (rank) {
            case 1: tolerance = 0.05; break;  // 5% tolerance (very strict)
            case 2: tolerance = 0.10; break;  // 10% tolerance
            case 3: tolerance = 0.20; break;  // 20% tolerance
            case 4: tolerance = 0.30; break;  // 30% tolerance
            case 5: tolerance = 0.50; break;  // 50% tolerance (very loose)
            default: tolerance = 0.20;
        }

        // Calculate match percentage
        // If within tolerance: 100% match
        // If deviation = 2x tolerance: 50% match
        // If deviation >= 3x tolerance: 0% match
        if (percentDeviation <= tolerance) {
            // Perfect to good match: 100% to 80%
            return 100.0 - (percentDeviation / tolerance) * 20.0;
        } else if (percentDeviation <= tolerance * 2) {
            // Acceptable match: 80% to 50%
            double excessDeviation = (percentDeviation - tolerance) / tolerance;
            return 80.0 - (excessDeviation * 30.0);
        } else if (percentDeviation <= tolerance * 3) {
            // Poor match: 50% to 0%
            double excessDeviation = (percentDeviation - (tolerance * 2)) / tolerance;
            return 50.0 - (excessDeviation * 50.0);
        } else {
            // Very poor match: 0%
            return 0.0;
        }
    }

    private int getCategoryIndex(String category) {
        String[] categories = ClientProfile.getSizeCategories();
        for (int i = 0; i < categories.length; i++) {
            if (categories[i].equals(category)) {
                return i;
            }
        }
        return -1;
    }

    private double getActualValue(Spec spec) {
        switch (spec) {
            case SEATS: return this.getSeats();
            case CABIN_COMPARTMENT: return this.getCabinCompartment();
            case BUDGET: return this.getPurchasePriceUSD();
            case OP_COST: return this.getHourlyOperatingCostUSD();
            default: return 0;
        }
    }

    public double getScore() {
        return score;
    }

    public double getMatchPercentage() {
        return matchPercentage;
    }

    public Map<Spec, Double> getIndividualMatches() {
        return new EnumMap<>(individualMatches);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder(super.toString());
        sb.append("Overall Match: ").append(String.format("%.2f%%", matchPercentage)).append("\n");
        sb.append("Match Breakdown:\n");
        for (Map.Entry<Spec, Double> entry : individualMatches.entrySet()) {
            sb.append("  ").append(entry.getKey()).append(": ")
                    .append(String.format("%.2f%%", entry.getValue())).append("\n");
        }
        return sb.toString();
    }
}