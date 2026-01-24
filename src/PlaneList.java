import java.util.NoSuchElementException;

    public class PlaneList implements Cloneable {
        private PlaneNode head;// Pointer to the first node of the list
        private int size;

        public PlaneList(int size, PlaneNode head) {
            this.size = size;
            this.head = head;
        }

        public PlaneList() {
            this.size = 0;
            this.head = null;
        }

        public PlaneList(PlaneList p) {
            if (p == null || p.head == null) {
                head = null;
                size = 0;
                return;
            } else {

                PlaneNode t1 = p.head; // t1 traverses the source list
                // Create the first node (head) of the new list
                this.head = new PlaneNode(
                        new Airplane(
                                t1.plane.getModel(),
                                t1.plane.getSeats(),
                                t1.plane.getRangeNm(),
                                t1.plane.getCruiseSpeedMach(),
                                t1.plane.getPurchasePriceUSD(),
                                t1.plane.getHourlyOperatingCostUSD()
                        ),
                        null
                );
                t1 = t1.next;
                PlaneNode t2 = head; // t2 traverses the new list as we build it

                // Copy the remaining nodes
                while (t1 != null) {

                    t2.next = new PlaneNode(new Airplane(
                            t1.plane.getModel(),
                            t1.plane.getSeats(),
                            t1.plane.getRangeNm(),
                            t1.plane.getCruiseSpeedMach(),
                            t1.plane.getPurchasePriceUSD(),
                            t1.plane.getHourlyOperatingCostUSD()
                    ),
                            null
                    );
                    t1 = t1.next;
                    t2 = t2.next;

                }
                this.size = p.size;

            }

        }

        public PlaneList clone() {
            return new PlaneList(this);
        }

        public void AddToStart(Airplane object) {
            // Create a new node whose next is the current head, then update head
            this.head = new PlaneNode(object, head);
            size++;
        }

        public boolean insertAtIndex(Airplane obj, int index) {

            if (index < 0 || index > size) { // Check for invalid index

                try {
                    throw new NoSuchElementException();
                } catch (NoSuchElementException e) {
                    System.out.println(e.getMessage());// fix here
                }
                return false;


            } else if (head == null) {  // Empty list case
                if (index == 0) { //inserting at the head of an empty list
                    this.AddToStart(obj);
                    return true;
                } else {
                    return false;
                }
            }
            if (index == 0) { // Inserting at the head of a non-empty list
                this.AddToStart(obj);
                return true;
            }  // Traverse to the node just before the desired index
            PlaneNode t = head;
            int i = 0;
            while (t.next != null && i < index - 1) {
                i++;
                t = t.next;
            }
            if (t.next == null || i >= index - 1) {  // Insert new node after t
                t.next = new PlaneNode(obj, t.next);
                size++;
                return true;
            } else {
                return false;
            }
        }

        public boolean deleteFromIndex(int index) {
            if (index < 0 || index >= size) { // Check for invalid index
                try {
                    throw new NoSuchElementException();
                } catch (NoSuchElementException e) {
                    System.out.println(e.getMessage());

                }
                return false;

            }
            if (head == null) { // If the list is empty, nothing to delete
                return false;
            } else if (index == 0) {  // Deleting the head node
                head = head.next;
                size--;
                return true;
            } else {
                // Traverse to the node just before the one to delete
                int i = 0;
                PlaneNode t = head;
                while (i < index - 1 && t != null) {
                    i++;
                    t = t.next;
                }
                if (t == null) {
                    return false;
                }
                // If t.next is not null, bypass the node at index
                if (i >= index - 1) {
                    if (t.next != null) {
                        t.next = t.next.next;
                        size--;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;

                }
            }

        }

        public boolean replaceAtIndex(Airplane c, int index) {
            if (index < 0 || index >= size) { // Check for invalid index
                return false;
            }
            if (head == null) { //check for empty list case
                return false;
            }
            int i = 0;
            PlaneNode t = head;
            while (t != null && i != index) { // Traverse to the node at the given index
                i++;
                t = t.next;
            }
            if (t == null) { // If we ran out of nodes, index is invalid
                return false;
            }
            if (i == index) { // Replace the cellphone at that node
                t.plane = c;
                return true;
            } else {
                return false;
            }


        }

        private class PlaneNode implements Cloneable {
            private Airplane plane;
            private PlaneNode next;

            public PlaneNode() {
                plane = null;
                next = null;
            }

            public PlaneNode(Airplane plane, PlaneNode next) {
                this.plane = plane;
                this.next = next;
            }

            public PlaneNode(PlaneNode p) {
                this(new Airplane(p.plane.getModel(), p.plane.getSeats(), p.plane.getRangeNm(),
                        p.plane.getCruiseSpeedMach(), p.plane.getPurchasePriceUSD(),
                        p.plane.getHourlyOperatingCostUSD()), p.next);
            }

            public PlaneNode clone() {
                return new PlaneNode(this);
            }

            public PlaneNode getNext() {
                return next;
            }

            public void setNext(PlaneNode next) {
                this.next = next;
            }

            public Airplane getPlane() {
                return plane;
            }

            public void setPlane(Airplane plane) {
                this.plane = plane;
            }


        }
    }
