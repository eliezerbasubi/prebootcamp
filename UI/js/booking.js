class Booking {
    constructor(){
        this.bookSeat();
    }
    validNumber(){
        const seatNumber = queryFinder("#booking_trip_seat").value;
        if(isNaN(seatNumber) || seatNumber < 1 || seatNumber.length > 2){
            queryFinder("#booking_trip_seat").classList.add("error-input");

            // request focus
            queryFinder("#booking_trip_seat").focus();
        }else{
            // Display pop up
            const overlay = queryFinder(".overlay");
            overlay.style.visibility = "visible";
            overlay.style.opacity = 1;

            // remove error class
            queryFinder("#booking_trip_seat").classList.remove("error-input");
        }
    }

    bookSeat(){
        queryFinder("form").addEventListener("submit",(event)=>{
            event.preventDefault();

            this.validNumber();
        })
    }
}

document.addEventListener("DOMContentLoaded", new Booking())