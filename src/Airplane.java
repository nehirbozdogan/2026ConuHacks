import java.io.Serializable;
//
class Airplane implements Serializable {
    private String model;
    private int seats;
    private String sizeCategory; // NEW: "light_jet", "mid_sized_jet", etc.
    private int cabinCompartment;
    private double purchasePriceUSD;
    private double hourlyOperatingCostUSD;

    public Airplane(String model, int seats, String sizeCategory, int cabinCompartment,
                    double purchasePriceUSD, double hourlyOperatingCostUSD) {
        setModel(model);
        setSeats(seats);
        setSizeCategory(sizeCategory);
        setCabinCompartment(cabinCompartment);
        setPurchasePriceUSD(purchasePriceUSD);
        setHourlyOperatingCostUSD(hourlyOperatingCostUSD);
    }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public int getSeats() { return seats; }
    public void setSeats(int seats) {
        if (seats <= 0) throw new IllegalArgumentException("Seats must be positive");

        this.seats = seats; }

    public String getSizeCategory() { return sizeCategory; }
    public void setSizeCategory(String sizeCategory) {
        if (sizeCategory == null || sizeCategory.trim().isEmpty()) {
            throw new IllegalArgumentException("Size category cannot be null or empty");
        }
        String[] validCategories = {"light_jet", "mid_sized_jet", "super_mid_sized_jet", "large_cabin_jet"};
        boolean valid = false;
        for (String cat : validCategories) {
            if (cat.equals(sizeCategory)) {
                valid = true;
                break;
            }
        }
        if (!valid) throw new IllegalArgumentException("Invalid size category: " + sizeCategory);
        this.sizeCategory = sizeCategory;
    }

    public int getCabinCompartment() { return cabinCompartment; }
    public void setCabinCompartment(int cabinCompartment) {
        if (cabinCompartment < 0) throw new IllegalArgumentException("Cabin compartment cannot be negative");
        this.cabinCompartment = cabinCompartment; }

    public double getPurchasePriceUSD() { return purchasePriceUSD; }
    public void setPurchasePriceUSD(double purchasePriceUSD) {
        if (purchasePriceUSD < 0) throw new IllegalArgumentException("Price cannot be negative");
        this.purchasePriceUSD = purchasePriceUSD;
    }

    public double getHourlyOperatingCostUSD() { return hourlyOperatingCostUSD; }
    public void setHourlyOperatingCostUSD(double hourlyOperatingCostUSD) {
        if (hourlyOperatingCostUSD < 0) throw new IllegalArgumentException("Operating cost cannot be negative");
        this.hourlyOperatingCostUSD = hourlyOperatingCostUSD;
    }

    @Override
    public String toString() {
        return "-----------------------------------------------\n"
                + "Model: " + model + "\n"
                + "Seats: " + seats + "\n"
                + "Size Category: " + sizeCategory + "\n"
                + "Cabin Compartments: " + cabinCompartment + "\n"
                + "Purchase Price (USD): $" + String.format("%,.2f", purchasePriceUSD) + "\n"
                + "Hourly Operating Cost (USD): $" + String.format("%,.2f", hourlyOperatingCostUSD) + "\n";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Airplane other = (Airplane) obj;
        return this.seats == other.seats
                && this.sizeCategory.equals(other.sizeCategory)
                && this.cabinCompartment == other.cabinCompartment
                && this.purchasePriceUSD == other.purchasePriceUSD
                && this.hourlyOperatingCostUSD == other.hourlyOperatingCostUSD
                && this.model.equals(other.model);
    }
}