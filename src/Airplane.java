import java.io.Serializable;

public class Airplane implements Serializable {
    private String model;
    private int seats;
    private int rangeNm;
    private double cruiseSpeedMach;
    private double purchasePriceUSD;
    private double hourlyOperatingCostUSD;

    // Constructor
    public Airplane(String model, int seats, int rangeNm, double cruiseSpeedMach, double purchasePriceUSD, double hourlyOperatingCostUSD) {
        this.model = model;
        this.seats = seats;
        this.rangeNm = rangeNm;
        this.cruiseSpeedMach = cruiseSpeedMach;
        this.purchasePriceUSD = purchasePriceUSD;
        this.hourlyOperatingCostUSD = hourlyOperatingCostUSD;
    }

    // Getters & Setters
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public int getSeats() { return seats; }
    public void setSeats(int seats) { this.seats = seats; }

    public int getRangeNm() { return rangeNm; }
    public void setRangeNm(int rangeNm) { this.rangeNm = rangeNm; }

    public double getCruiseSpeedMach() { return cruiseSpeedMach; }
    public void setCruiseSpeedMach(double cruiseSpeedMach) { this.cruiseSpeedMach = cruiseSpeedMach; }

    public double getPurchasePriceUSD() { return purchasePriceUSD; }
    public void setPurchasePriceUSD(double purchasePriceUSD) { this.purchasePriceUSD = purchasePriceUSD; }

    public double getHourlyOperatingCostUSD() { return hourlyOperatingCostUSD; }
    public void setHourlyOperatingCostUSD(double hourlyOperatingCostUSD) { this.hourlyOperatingCostUSD = hourlyOperatingCostUSD; }

    // Equals method
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Airplane other = (Airplane) obj;

        return this.seats == other.seats
                && this.rangeNm == other.rangeNm
                && this.cruiseSpeedMach == other.cruiseSpeedMach
                && this.purchasePriceUSD == other.purchasePriceUSD
                && this.hourlyOperatingCostUSD == other.hourlyOperatingCostUSD
                && this.model.equals(other.model);
    }
}

