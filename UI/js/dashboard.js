class Dashboard {
    constructor() {
        this.manageUsers();
        this.displayBoxModal();
        this.defaultClick();
        this.handleBooking();
        this.submitBooking();
        this.deleteBooking();
    }
    // Retrieve user status (isAdmin)
    manageUsers() {
        const isAdmin = localStorage.getItem('isAdmin');
        const adminAccess = $$('[aria-admin-access]');
        const userAccess = $$('[aria-user-access]');
        const adminTabDefault = $('.admin-default-tab');
        const userDefaultTab = $('.user-default-tab');
        const names = $$('.username');

        if (isAdmin === 'admin') {
            userAccess.forEach(access => {
                access.style.display = 'none';
            });
        } else {
            adminAccess.forEach(access => {
                access.style.display = 'none';
                userDefaultTab.id = 'defaultOpen'; //Set user default tab id 
                adminTabDefault.id = ""; // Remove default admin tab. Create trips
            });

            // Append default user name in bookings
            names.forEach(username => {
                username.textContent = "Jon Doe";
            });
        }
    }
    displayBoxModal() {
        const views = $$('.view_specific_trip');
        const modal = $('#myModal');
        const modalImg = $("#displayer-trip-img");
        const images = $$('.trip_img_view');
        const tripNames = $$('.trip-name');
        const tripName = $('.display-trip-name');

        for (let index = 0; index < views.length; index++) {
            views[index].addEventListener('click', () => {
                modal.style.display = "block";
                modalImg.src = images[index].src;
                tripName.textContent = tripNames[index].textContent
            })

        }

        const span = $(".close");

        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Handle button from specific trip page
    handleBooking() {
        const btn = $('#btn-booking');
        const modal = $('#myModal');
        const tablinkBook = $('#book_a_seat');
        btn.addEventListener('click', () => {
            this.displayDash(event, 'book_seat');
            tablinkBook.className += ' active';
            modal.style.display = 'none';
        });
    }

    // Handle button from book a seat page
    submitBooking() {
        const seatNumber = $('#selected_seat_no');
        const error = $('#seat_not_entered');
        const btnBooking = $('#btn-submit-booking');
        btnBooking.addEventListener('click', () => {
            const number = seatNumber.value;
            if (number !== "") {
                this.showSnackBar('Seat booked successfully');
            } else {
                error.textContent = 'Seat number is not selected';
            }
        });
    }

    // Delete booking action
    deleteBooking() {
        const deleteButtons = $$('.delete_booking');
        for (const btnDelete of deleteButtons) {
            btnDelete.addEventListener('click', () => {
                this.showSnackBar('Booking deleted successfully ');
            });
        }
    }

    showSnackBar(snackContent) {
        // Show snackbar for 3s 
        const displaySnack = $("#snackbar");
        displaySnack.textContent = snackContent;
        displaySnack.className = "show";
        setTimeout(() => {
            displaySnack.className = displaySnack.className.replace("show", "")
        }, 3000);
    }

    displayDash(evt, divName) {
        let i, tabcontent, tablinks;
        tabcontent = $$(".tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = $$(".tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        $(`#${divName}`).style.display = "block";
        evt.currentTarget.className += " active";
    }

    // Set default click for first item in menu
    defaultClick() {
        $("#defaultOpen").click();
    }

}

/**
 * Specific Trip HTML page
 * This class builds a bus map. How seats are arranged in a bus.
 * @constructor 
 * @param {Integer} capacity
 * @param {String} selector
 * @function builder
 */
class BusMapBuilder {
    constructor(capacity, selector) {
        this.capacity = capacity;
        this.selector = selector;
        this.builder(this.capacity, this.selector);
        this.seatBooking();
    }

    builder() {
        const bus_maps = $(this.selector);
        const seats = this.capacity;
        for (let i = 0; i < seats; i++) {
            const seat = document.createElement("input");
            const spacer = document.createElement("br");
            seat.value = i < 9 ? `0${i+1}` : i + 1;
            seat.type = "button";
            seat.className = "bus_seats";
            seat.setAttribute("data-trip-seat", "")
            bus_maps.appendChild(seat);

            //Split seats into a grouping of four
            if (i % 4 === 3) {
                bus_maps.appendChild(spacer);
            }

            //Split seats into two columns 
            if (i % 2 === 1) {
                seat.className = "odd";
            }

            //Show booked seats. For example 10 first seats are booked
            if (i < 10)
                seat.id = "booked";

            // Disable click on booked seats
            if (seat.id === "booked") {
                seat.setAttribute("disabled", "true");
                seat.style.cursor = "not-allowed"
            }
        }
    };

    /**
     * This function is still in progress. But the purpose of it is to
     * click on a seat number that will be selected as your booked seat.
     * @void
     * 
     */
    seatBooking() {
        const book_seats = $$("input[data-trip-seat]")
        const seatNumber = $('#selected_seat_no');

        book_seats.forEach((item, index) => {
            item.addEventListener("click", () => {
                seatNumber.value = index + 1; // Set seat number in input
            });
        });
    };
}

document.addEventListener("DOMContentLoaded", () => {
    new Dashboard();
    new BusMapBuilder(44, '#bus_maps');
});