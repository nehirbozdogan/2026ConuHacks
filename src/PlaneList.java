import java.util.NoSuchElementException;

    public class PlaneList implements Cloneable {
        private PlaneNode head;// Pointer to the first node of the list
        private int size;

        public PlaneList(int size, PlaneNode head) {
            this.size = size;
            this.head = head;
        }

        public PlaneList() {// constructor
            this.size = 0;
            this.head = null;
        }

        public PlaneList(PlaneList p) {// copy constructor
            if (p == null || p.head == null) {
                head = null;
                size = 0;
                return;
            } else {

                PlaneNode t1 = p.head;

                this.head = new PlaneNode(
                        new Airplane(
                                t1.plane.getModel(),
                                t1.plane.getSeats(),
                                t1.plane.getSizeCategory(),
                                t1.plane.getCruiseSpeedMach(),
                                t1.plane.getPurchasePriceUSD(),
                                t1.plane.getHourlyOperatingCostUSD()
                        ),
                        null
                );
                t1 = t1.next;
                PlaneNode t2 = head;


                while (t1 != null) {

                    t2.next = new PlaneNode(new Airplane(
                            t1.plane.getModel(),
                            t1.plane.getSeats(),
                            t1.plane.getSizeCategory(),
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

        public PlaneList clone() { // clone method
            return new PlaneList(this);
        }

        public void AddToStart(Airplane object) {//addtostart method

            this.head = new PlaneNode(object, head);
            size++;
        }

        public boolean insertAtIndex(Airplane obj, int index) {// insertatindex method

            if (index < 0 || index > size) {

                try {
                    throw new NoSuchElementException();
                } catch (NoSuchElementException e) {
                    System.out.println(e.getMessage());// fix here
                }
                return false;


            } else if (head == null) {
                if (index == 0) {
                    this.AddToStart(obj);
                    return true;
                } else {
                    return false;
                }
            }
            if (index == 0) {
                this.AddToStart(obj);
                return true;
            }
            PlaneNode t = head;
            int i = 0;
            while (t.next != null && i < index - 1) {
                i++;
                t = t.next;
            }
            if (t.next == null || i >= index - 1) {
                t.next = new PlaneNode(obj, t.next);
                size++;
                return true;
            } else {
                return false;
            }
        }

        public boolean deleteFromIndex(int index) { //deletefromindex
            if (index < 0 || index >= size) {
                try {
                    throw new NoSuchElementException();
                } catch (NoSuchElementException e) {
                    System.out.println(e.getMessage());

                }
                return false;

            }
            if (head == null) {
                return false;
            } else if (index == 0) {
                head = head.next;
                size--;
                return true;
            } else {

                int i = 0;
                PlaneNode t = head;
                while (i < index - 1 && t != null) {
                    i++;
                    t = t.next;
                }
                if (t == null) {
                    return false;
                }

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

        public boolean replaceAtIndex(Airplane c, int index) {// replaceatindex method
            if (index < 0 || index >= size) {
                return false;
            }
            if (head == null) {
                return false;
            }
            int i = 0;
            PlaneNode t = head;
            while (t != null && i != index) {
                i++;
                t = t.next;
            }
            if (t == null) {
                return false;
            }
            if (i == index) {
                t.plane = c;
                return true;
            } else {
                return false;
            }



        } public PlaneNode find(Airplane airplane) {// find method
            if (head == null) {
                return null;
            }	PlaneNode t = head;

            while (t != null && !t.plane.equals(airplane)) {

                t = t.next;

            } return t;
        }

        public boolean contains(Airplane airplane) { // contains method
            if (this.find(airplane) == null) {
                return false;
            } else {
                return true;
            }
        } public void showContents() { // showcontents method
            if (head == null) {
                System.out.println("head --> X");
            } else {

                PlaneNode t = head;
                while (t != null) {

                    System.out.print(t.plane + "--> ");
                    t = t.next;

                } System.out.print("X\n");

            }
        }

        public boolean equals(Object o) {// equals method

            if ( o == null || this.getClass() != o.getClass()) {
                return false;
            }
            PlaneList L1 = (PlaneList)o;

            if (head == null && L1.head == null) {
                return true;
            } else if ((head == null && L1.head != null) || (head != null && L1.head == null)) {

                return false;
            }
            PlaneNode t1 = head;
            PlaneNode t2 = L1.head;
            while (t1!= null && t2!=null) {
                if (!t1.plane.equals(t2.plane)) {
                    return false;
                }
                t1 = t1.next;
                t2 = t2.next;
            }
            if (t1 == null && t2 == null) {
                return true;
            } else {
                return false;
            }

        } public void deleteFromStart() { // deletefromstart method

            if (head == null) {
                return;
            } else {
                head = head.next;
                size--;
                return;
            }
        } public PlaneNode getHead() {
            return head;
        }

//



        public class PlaneNode implements Cloneable {
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
                this(new Airplane(p.plane.getModel(), p.plane.getSeats(), p.plane.getSizeCategory(),
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
