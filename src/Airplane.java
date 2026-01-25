import java.io.Serializable;

class Airplane implements Serializable {
    private String model;
    private int seats;
    private String sizeCategory; // NEW: "light_jet", "mid_sized_jet", etc.
    private double cruiseSpeedMach;
    private double purchasePriceUSD;
    private double hourlyOperatingCostUSD;

    public Airplane(String model, int seats, String sizeCategory, double cruiseSpeedMach,
                    double purchasePriceUSD, double hourlyOperatingCostUSD) {
        this.model = model;
        this.seats = seats;
        this.sizeCategory = sizeCategory;
        this.cruiseSpeedMach = cruiseSpeedMach;
        this.purchasePriceUSD = purchasePriceUSD;
        this.hourlyOperatingCostUSD = hourlyOperatingCostUSD;
    }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public int getSeats() { return seats; }
    public void setSeats(int seats) { this.seats = seats; }

    public String getSizeCategory() { return sizeCategory; }
    public void setSizeCategory(String sizeCategory) { this.sizeCategory = sizeCategory; }

    public double getCruiseSpeedMach() { return cruiseSpeedMach; }
    public void setCruiseSpeedMach(double cruiseSpeedMach) { this.cruiseSpeedMach = cruiseSpeedMach; }

    public double getPurchasePriceUSD() { return purchasePriceUSD; }
    public void setPurchasePriceUSD(double purchasePriceUSD) { this.purchasePriceUSD = purchasePriceUSD; }

    public double getHourlyOperatingCostUSD() { return hourlyOperatingCostUSD; }
    public void setHourlyOperatingCostUSD(double hourlyOperatingCostUSD) {
        this.hourlyOperatingCostUSD = hourlyOperatingCostUSD;
    }

    @Override
    public String toString() {
        return "-----------------------------------------------\n"
                + "Model: " + model + "\n"
                + "Seats: " + seats + "\n"
                + "Size Category: " + sizeCategory + "\n"
                + "Cruise Speed (Mach): " + cruiseSpeedMach + "\n"
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
                && this.cruiseSpeedMach == other.cruiseSpeedMach
                && this.purchasePriceUSD == other.purchasePriceUSD
                && this.hourlyOperatingCostUSD == other.hourlyOperatingCostUSD
                && this.model.equals(other.model);
    }
}