class ScoredAirplane extends Airplane {
    private double score;

    public ScoredAirplane(Airplane airplane, ClientProfile profile) {
        super(airplane.getModel(),
                airplane.getSeats(),
                airplane.getSizeCategory(),
                airplane.getCruiseSpeedMach(),
                airplane.getPurchasePriceUSD(),
                airplane.getHourlyOperatingCostUSD());
        this.score = calculateScore(profile);
    }
//
    private double calculateScore(ClientProfile profile) {
        double totalScore = 0.0;

        for (Spec spec : Spec.values()) {
            int rank = profile.getRanks().get(spec);
            double deviation;

            if (spec == Spec.SIZE_CATEGORY) {
                deviation = calculateCategoryDeviation(
                        this.getSizeCategory(),
                        profile.getTargetSizeCategory(),
                        rank
                );
            } else {
                double actualValue = getActualValue(spec);
                double targetValue = profile.getTargetValue(spec);
                deviation = calculateNumericDeviation(actualValue, targetValue, rank);
            }

            totalScore += deviation;
        }

        return totalScore;
    }

    private double calculateCategoryDeviation(String actualCategory, String targetCategory, int rank) {
        int actualIndex = getCategoryIndex(actualCategory);
        int targetIndex = getCategoryIndex(targetCategory);
        int steps = Math.abs(actualIndex - targetIndex);

        if (steps == 0) return 0.0;

        double basePenalty;
        switch (rank) {
            case 1: basePenalty = 15.0; break;
            case 2: basePenalty = 10.0; break;
            case 3: basePenalty = 6.0; break;
            case 4: basePenalty = 3.0; break;
            case 5: basePenalty = 1.0; break;
            default: basePenalty = 5.0;
        }

        return basePenalty * steps;
    }

    private double calculateNumericDeviation(double actual, double target, int rank) {
        if (target == 0) return 0.0;

        double percentDeviation = Math.abs(actual - target) / target;
        double weight = (6 - rank);

        return percentDeviation * weight * 100;
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
            case SPEED: return this.getCruiseSpeedMach();
            case BUDGET: return this.getPurchasePriceUSD();
            case OP_COST: return this.getHourlyOperatingCostUSD();
            default: return 0;
        }
    }

    public double getScore() {
        return score;
    }

    @Override
    public String toString() {
        return super.toString() + "Match Score: " + String.format("%.4f", score) + " (lower is better)\n";
    }
}