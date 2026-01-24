import java.io.Serializable;

public class Airplane {

    public class Airplane implements Serializable {
        private String model;
        private int seats;
        private int rangeNm;
        private double cruiseSpeedMach;
        private double purchasePriceUSD;
        private double hourlyOperatingCostUSD;

//Constructors

        public Airplane(String model, int seats, int rangeNm, double cruiseSpeedMach, double purchasePriceUSD, double hourlyOperatingCostUSD) {
            this.model = model;
            this.rangeNm = rangeNm;
            this.cruiseSpeedMach = cruiseSpeedMach;
            this.purchasePriceUSD = purchasePriceUSD;
            this.hourlyOperatingCostUSD = hourlyOperatingCostUSD;
        }
            //Getters & Setters
            public String getModel() {
                return this.model;
            }

            public void setModel(String model){
            this.model = model;
            }

           public double getHourlyOperatingCostUSD() {
            return hourlyOperatingCostUSD;
            }

           public void setHourlyOperatingCostUSD(double hourlyOperatingCostUSD) {
            this.hourlyOperatingCostUSD = hourlyOperatingCostUSD;
            }

           public double getPurchasePriceUSD() {
            return purchasePriceUSD;
            }

           public void setPurchasePriceUSD(double purchasePriceUSD) {
            this.purchasePriceUSD = purchasePriceUSD;
            }

            public int getRangeNm() {
            return rangeNm;
            }

            public void setRangeNm(int rangeNm) {
            this.rangeNm = rangeNm;
            }

            public void setSeats(int seats) {
            this.seats = seats;
            }

            public double getCruiseSpeedMach() {
            return cruiseSpeedMach;
            }

            public void setCruiseSpeedMach(double cruiseSpeedMach) {
            this.cruiseSpeedMach = cruiseSpeedMach;
            }

            // Boolean Compare

        public boolean equals(Object obj){
            if (this == obj){
                return true;
            }
            if ( obj == null){
                return false;
            }
            if getClass() != obj.getClass()) {

            }
        }



    }

}
