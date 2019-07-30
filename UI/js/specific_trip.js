class Trip{
    constructor(){
        this.main();
    }

    main(){
        window.addEventListener("load",()=>{
            this.render();
            this.intentBooking();
        })
    }

    // Return all trips
    getTrips(){
        let all_trips = [];
        for (const key in trips) {
            if (trips.hasOwnProperty(key)) {
                const element = trips[key];
                all_trips.push(element);
            }
        }
        return all_trips;
    }

    render(){
        //load trip id
        const trip_id = localStorage.getItem("tripID");
        // Initialize empty object
        let trips = [];
        let filtered = [];
        let output = "";

        // Fill trips object
        trips = this.getTrips().map(item => item)

        // Filter trips
        filtered = trips.filter(({id}) => id === trip_id)

        // Loop over filtered element and append on UI
        filtered.forEach(element => {
            output += `
            <!-- Start trip details box -->
            <div class="box" id="trip_details">
            <ul id="upcoming-trips" class="special">
                <li>
                    <div class="fare">
                        <span>Fare : </span>
                        <span>$${element.fare}</span>
                    </div>
                    <img src="../assets/images/vlcsnap-2019-03-05-23h01m54s542.png" alt="" class="trip-img">
                </li>
                <li> 
                    <p>
                        <span>
                                <span data-name="" class="trip-name">${element.trip_name}</span>
                            </span><br>
                        <span>
                            <span data-origin="" class="property">Origin : </span>
                            <span data-origin-value class="value">${element.origin}</span>
                        </span><br>
                        <span>
                            <span data-destination class="property">Destination : </span>
                            <span data-destination-value class="value">${element.destination}</span>
                        </span><br>
                        <span>
                            <span data-departure class="property">Departure : </span>
                            <span data-departure-value class="value">${element.trip_date}</span>
                        </span><br>
                        <span>
                            <span data-departTime class="property">Time : </span>
                            <span data-departTime-value class="value">${element.departure_time}</span>
                        </span><br>
                        <span>
                            <span data-arrival class="property">Arrival : </span>
                            <span data-arrival-value class="value">${element.arrival}</span>
                        </span><br>
                        <span>
                            <span data-duration class="property">Duration : </span>
                            <span data-duration-value class="value">${element.duration} Day</span>
                        </span><br>
                        <span>
                            <span data-license class="property">Bus License No. : </span>
                            <span data-license-value class="value">${element.bus_license_number}</span>
                        </span><br>
                        <span>
                            <span data-seats class="property">Seats : </span>
                            <span data-seats-value class="value">${element.seating_capacity}</span>
                        </span><br>
                        <span>
                            <span data-seats class="property">Available Seats : </span>
                            <span data-seats-value class="value">10</span>
                        </span><br>
                        <span>
                            <span data-seats class="property">Status : </span>
                            <span data-seats-value class="value">${element.status}</span>
                        </span>
                    </p>
                        <input type="button" value="Book Now" class="btn-default" id="btn_open_booking">
                    </li>
                </li>
            </ul>
        </div> 
        <!-- End trip details box -->
        `;

            // Pass bus seating capacity
            this.drawMap(element.seating_capacity);
        })    
        document.querySelector(".details").innerHTML = output;
    }

    // Draw bus map
    drawMap(capacity){ 
        const buildMap = new BusMapBuilder(capacity,"#bus_maps")
        buildMap.builder();
        buildMap.seatBooking();    
    }

    intentBooking(){
        //Open booking page when book button is clicked
        const main = new Main("#btn_open_booking","booking.html")
        main.open();
    }
}

// Run page
new Trip();