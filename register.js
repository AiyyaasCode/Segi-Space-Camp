document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from refreshing the page

        // Set the custom "current" date 
        const currentDate = new Date("2024-10-10"); 
        const cutoffDate = new Date("2024-10-16"); // Early bird cutoff date

        // Check if the user registers before or after the cutoff date
        const registrationPrice =
            currentDate < cutoffDate ? "RM699 (Early Bird)" : "RM899 (Regular)";

        // Get all form data
        const formData = new FormData(form);
        const registrationData = {};
        formData.forEach((value, key) => {
            registrationData[key] = value;
        });

        // Add the calculated price based on the registration date
        registrationData.price = registrationPrice;
        registrationData.registrationDate = currentDate.toISOString().split("T")[0]; // Store registration date in YYYY-MM-DD format

        // Retrieve existing registration data from localStorage (if any)
        let allRegistrationData = JSON.parse(localStorage.getItem("registrationData"));

        // If there's no existing data, initialize it as an array
        if (!Array.isArray(allRegistrationData)) {
            allRegistrationData = [];
        }

        // Add the new registration data to the list
        allRegistrationData.push(registrationData);

        // Save the updated list back to localStorage
        localStorage.setItem("registrationData", JSON.stringify(allRegistrationData));

        // Show a success alert with the payment price
        alert(`Registration successful! Your payment price is ${registrationPrice}.`);

        // Clear the form after submission
        form.reset();
    });
});