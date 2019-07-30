class Account extends Validator{
    constructor(){
        super();
        this.validateFields();
    }

    validateFields(){
        const firstname = queryFinder("#info-fname").value
        const lastname = queryFinder("#info-lname").value
        const email = queryFinder("#info-email").value
        const phone = queryFinder("#info-phone").value
        const city = queryFinder("#info-city").value

        let isValid = true;

        if (!this.validate("text",firstname)) {
            queryFinder(".error-display-firstname").textContent = "Firstname is empty";
        } else {
            queryFinder(".error-display-firstname").textContent = "";
        }

        if (!this.validate("text",lastname)) {
            queryFinder(".error-display-lastname").textContent = "Lastname is empty";
            isValid = false;
        } else {
            queryFinder(".error-display-lastname").textContent = "";
        }

        if (!this.validate("email",email)) {
            queryFinder(".error-display-email").textContent = "Invalid email address";
            isValid = false;
        } else {
            queryFinder(".error-display-email").textContent = "";
        }

        if (!this.validate("phone",phone)) {
            queryFinder(".error-display-phone").textContent = "Invalid phone number";
            isValid = false;
        } else {
            queryFinder(".error-display-phone").textContent = "";
        }

        if (!this.validate("text",city)) {
            queryFinder(".error-display-city").textContent = "City is empty";
            isValid = false;
        } else {
            queryFinder(".error-display-city").textContent = "";
        }

        if(isValid){
            showSnackBar();
        }
    }
}
// Open view booking page 
class GoBooking{
    constructor(){
        this.openBooking();
    }
    openBooking(){
        document.location.assign("view_bookings.html")
    }
}

//open trips page
class GoTrips{
    constructor(){
        this.openBooking();
    }
    openBooking(){
        document.location.assign("view_trips.html")
    }
}