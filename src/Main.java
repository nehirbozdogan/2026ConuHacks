import java.util.List;

public class Main {
    public static void main(String[] args) {

        PlaneList market = new PlaneList();

        market.AddToStart(new Airplane("Cessna Citation CJ3", 7, "light_jet", 1, 8000000, 1500));
        market.AddToStart(new Airplane("Embraer Phenom 300", 8, "light_jet", 2, 9500000, 1800));
        market.AddToStart(new Airplane("Hawker 800XP", 8, "mid_sized_jet", 3, 13000000, 2200));
        market.AddToStart(new Airplane("Cessna Citation XLS+", 9, "mid_sized_jet", 2, 12500000, 2100));
        market.AddToStart(new Airplane("Gulfstream G280", 10, "super_mid_sized_jet", 4, 25000000, 3000));
        market.AddToStart(new Airplane("Bombardier Challenger 350", 10, "super_mid_sized_jet", 3, 27000000, 3200));
        market.AddToStart(new Airplane("Gulfstream G650", 18, "large_cabin_jet", 5, 65000000, 5000));
        market.AddToStart(new Airplane("Bombardier Global 7500", 19, "large_cabin_jet", 6, 75000000, 5500));

       /* System.out.println("========== AIRCRAFT MARKET ==========");
        System.out.println("Total aircraft available: 8\n");

        // Create client profile
        ClientProfile client = new ClientProfile(
                10,                      // target seats
                "super_mid_sized_jet",   // target size
                1,                    // target compartment
                26000000,                // target budget ($26M)
                3100                     // target operating cost ($3100/hr)
        );
//
        // Set rankings (1 = most important, 5 = least important)
        client.setRank(Spec.BUDGET, 1);           // Budget is MOST important
        client.setRank(Spec.SIZE_CATEGORY, 2);    // Size/Range is 2nd
        client.setRank(Spec.SEATS, 3);            // Seats is 3rd
        client.setRank(Spec.OP_COST, 4);          // Operating cost is 4th
        client.setRank(Spec.CABIN_COMPARTMENT, 5);            // Speed is LEAST important

        System.out.println("========== CLIENT REQUIREMENTS ==========");
        System.out.println("Target Seats: " + client.getTargetSeats());
        System.out.println("Target Size: " + client.getTargetSizeCategory());
        System.out.println("Target Speed: " + client.getTargetCabinCompartment() + " Mach");
        System.out.println("Target Budget: $" + String.format("%,.2f", client.getTargetPurchasePriceUSD()));
        System.out.println("Target Operating Cost: $" + String.format("%,.2f", client.getTargetOperatingCostUSD()) + "/hr");
        System.out.println("\nPriority Rankings:");
        System.out.println("  Rank 1 (Most Important): BUDGET");
        System.out.println("  Rank 2: SIZE_CATEGORY");
        System.out.println("  Rank 3: SEATS");
        System.out.println("  Rank 4: OP_COST");
        System.out.println("  Rank 5 (Least Important): COMPARTMENT\n");

        // Find best matches
        AirplaneManager matcher = new AirplaneManager();
        List<ScoredAirplane> topMatches = matcher.findBestMatches(market, client, 3);

        System.out.println("========== TOP 3 MATCHES ==========\n");
        for (int i = 0; i < topMatches.size(); i++) {
            System.out.println("MATCH #" + (i + 1));
            System.out.println(topMatches.get(i));
        }
    } */
    }
}