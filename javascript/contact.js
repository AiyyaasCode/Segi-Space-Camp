document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from refreshing the page

        // Get all form data
        const formData = new FormData(form);
        const contactData = {};

        // Iterate through the FormData and handle newline removal for the message
        formData.forEach((value, key) => {
            if (key === "message") {
                // Remove newline characters and replace them with a space
                contactData[key] = value.replace(/\n/g, " "); // Replaces all '\n' with space
            } else {
                contactData[key] = value; // For other fields, keep the original value
            }
        });

        // Retrieve existing contact data from localStorage (if any)
        let allContactData = JSON.parse(localStorage.getItem("contactData"));

        // If there's no existing data, initialize it as an array
        if (!Array.isArray(allContactData)) {
            allContactData = [];
        }

        // Add the new contact data to the list
        allContactData.push(contactData);

        // Save the updated list back to localStorage
        localStorage.setItem("contactData", JSON.stringify(allContactData));

        // Show a success alert
        alert("Submission successful! Thank you for contacting us!");

        // Clear the form after submission
        form.reset();
    });
});
