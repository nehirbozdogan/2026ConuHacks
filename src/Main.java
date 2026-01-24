
public class Main {
    public static void main(String[] args) {

                // 1. Create your PlaneList
                PlaneList planeList = new PlaneList();

                // 2. Initialize Airplane objects
                Airplane plane1 = new Airplane("Cessna 172", 4, 800, 0.3, 350000, 150);
                Airplane plane2 = new Airplane("Cirrus SR22", 4, 1200, 0.4, 900000, 250);
                Airplane plane3 = new Airplane("King Air 350", 8, 2000, 0.5, 7000000, 1200);
                Airplane plane4 = new Airplane("Phenom 100", 6, 1800, 0.6, 4000000, 800);
                Airplane plane5 = new Airplane("Piper PA-28", 4, 700, 0.25, 300000, 100);

                // 3. Add planes to the PlaneList
                planeList.AddToStart(plane1);
                planeList.AddToStart(plane2);
                planeList.AddToStart(plane3);
                planeList.AddToStart(plane4);
                planeList.AddToStart(plane5);

                // Print all planes to terminal


    }
}