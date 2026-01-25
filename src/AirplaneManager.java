import java.util.ArrayList;
import java.util.List;

class AirplaneManager {
    public List<ScoredAirplane> findBestMatches(PlaneList market, ClientProfile profile, int topN) {
        if (!profile.isCompleteRank()) {
            throw new IllegalArgumentException("Client must rank all 5 specs before matching");
        }

        List<ScoredAirplane> scoredPlanes = new ArrayList<>();

        // Score each plane in the market
        PlaneList.PlaneNode current = market.getHead();
        while (current != null) {
            scoredPlanes.add(new ScoredAirplane(current.getPlane(), profile));
            current = current.getNext();
        }

        // Sort by score (lower is better)
        scoredPlanes.sort((a, b) -> Double.compare(a.getScore(), b.getScore()));

        // Return top N
        return scoredPlanes.subList(0, Math.min(topN, scoredPlanes.size()));
    }
}

