class ViewTrip{
    constructor(){
        this.main();
    }

    main(){
        document.addEventListener("DOMContentLoaded",()=>{
            this.origins();
            this.destinations();
            this.renderTrips();
            this.cancel();
            this.redirect();
            this.intentTrip();
            this.updateUI();
            this.canCancel();
            this.dontCancel();
        })
    }

    renderTrips(){
       this.bind(this.filler());
    }

    filler(){
        //Pass values of {trips} from index file into elements variable
        const elements = trips;
        
        //Initialize empty object {raw_trips}, 
        const raw_trips = [];
        let purifier = [];
        
        for (const key in elements) {
            // Check if the key exists in elements object
            if (elements.hasOwnProperty(key)) {
                const element = elements[key];
                
                // Push {element} into {raw_trips} object
                raw_trips.push(element);
            }
        }

        // Push {raw_trips} items into {purifier}
        purifier = raw_trips.map(item => item);
        return purifier;
    }

    origins(){
        const orn_trip = this.filler();
        const select = queryFinder("#filter_origin");

        // De-structure {origin} and {id}
        orn_trip.map(({origin,id})=>{
            // Create option tag
            const options = document.createElement("option");
            options.value = origin;
            options.textContent = origin;

            // Append options to select
            select.appendChild(options);
        });
    }

    destinations(){
        const orn_trip = this.filler();
        const select = queryFinder("#filter_destination");

        // De-structure {origin} and {id}
        orn_trip.map(({destination,id})=>{
            // Create option tag
            const options = document.createElement("option");
            options.value = destination;
            options.textContent = destination;

            // Append options to select
            select.appendChild(options);
        });
    }

    updateUI(){
        // Filter by Origin
        queryFinder("#filter_origin").addEventListener("change",({target})=>{
           let property_origins = this.filterByOrigin(target.value);
           this.bind(property_origins)
        })

        // Filter by Destination
        queryFinder("#filter_destination").addEventListener("change",({target})=>{
           let trip_destinations = this.filterByDestination(target.value);
           this.bind(trip_destinations)
        })
    }

    cancel(){  
        const buttons = queryFinderAll(".cancel_trip");
        const overlay = queryFinder(".overlay");
        for(let button of buttons){
            button.addEventListener("click",()=>{
                overlay.style.visibility = "visible";
                overlay.style.opacity = 1;
            });
        }
    }

    canCancel() {
        queryFinder("#cancel").addEventListener("click",()=>{
            queryFinder(".overlay").style.visibility = "hidden";
            queryFinder(".overlay").style.opacity = 0;

            // Show snackbar 
            showSnackBar();
        });
    }

    dontCancel() {
        queryFinder("#reject").addEventListener("click",()=>{
            queryFinder(".overlay").style.visibility = "hidden";
            queryFinder(".overlay").style.opacity = 0;
        });
    }

    redirect(){
        
        const view_booking = new Main(".btn_open_booking","booking.html");
        view_booking.redirectPage();
    }

    // Open specific trip when the button is clicked
    intentTrip(){
        const btn_views = queryFinderAll(".specific-trip");
       for(let view of btn_views){
           view.addEventListener("click",(event)=>{
                // Save trip ID to local storage
                localStorage.setItem("tripID",event.target.id);
                
                // Send to specific trip page
                document.location.assign("specific_trip.html");
           });
       }
    }
    /**
     * 
     * @param {String} origin 
     * 
     */
    filterByOrigin(origin_name){
       return this.filler().filter(({origin}) => origin === origin_name)
    }

    /**
     * 
     * @param {String} destination_name 
     */
    filterByDestination(destination_name){
       return this.filler().filter(({destination}) => destination === destination_name)
    }

    bind(origin_array){
        // Set to UI
        let output = "";
        origin_array.forEach(element => {
            output += 
            `<div class="box">
                <div class="cover-grid card pb">
                    <img src="../assets/images/bg.png" alt="">
                    <!-- Fare  -->
                    <div class="fare">
                        <span>Fare : </span>
                        <span>$${element.fare}</span>
                    </div>

                    <!-- View specific trip -->
                    <div class="specific-trip">
                        <i class="fas fa-eye" id="${element.id}"></i>
                    </div>
                    <div class="grid-info">
                        <h3 class="trip-name">${element.trip_name}</h3>
                        <p>
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
                                <span data-departure-value class="value">${element.trip_date} @</span>
                                <span data-departTime-value class="value">${element.departure_time}</span>
                            </span><br>
                            <span>
                                <span data-arrival class="property">Arrival : </span>
                                <span data-arrival-value class="value">${element.arrival}</span>
                            </span><br>
                            <span>
                                <span data-arrival class="property">Bus License No: : </span>
                                <span data-arrival-value class="value">${element.bus_license_number}</span>
                            </span><br>
                            <span>
                                <span data-arrival class="property">Seats : </span>
                                <span data-arrival-value class="value">${element.seating_capacity}</span>
                            </span><br>
                            <span>
                                <span data-arrivalTime class="property">Status : </span>
                                <span data-arrivalTime-value class="value status-active">${element.status}</span>
                            </span>
                        </p>
                    </div>
                    <div class="card-footer">
                        <input type="button" value="Book Now" class="btn-default btn-good btn_open_booking">
                        <input type="button" value="Cancel" class="btn-default btn-danger cancel_trip">
                    </div>
                </div>
            </div>`;
        });
        queryFinder("#trips_display").innerHTML = output;
    }
}

new ViewTrip();