// Select the feedback form
const feedbackForm = document.querySelector("form");

// Handle form submission
feedbackForm.addEventListener("submit", function(event) {

    // Prevent page reload
    event.preventDefault();

    // Display success message
    alert("Thank you! Your feedback has been submitted successfully.");

    // Clear the form after submission
    feedbackForm.reset();

});