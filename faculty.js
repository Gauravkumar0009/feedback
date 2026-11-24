
// =====================================
// FACULTY INFORMATION
// =====================================

const facultyData = [

    {
        name: "Dr. Richa Sharma",
        courses: ["CSE326 Internet Programming"]
    },

    {
        name: "Dr. Samiriti Thakur",
        courses: ["CHE110 Environmental Studies"]
    },

    {
        name: "Dr. Pradeep Kumar",
        courses: ["MTH165 Engineering Mathematics"]
    },

    {
        name: "Dr. Anudeep Goraya",
        courses: [
            "PHY175 Physics I",
            "ECE120 Basic Electrical Engineering"
        ]
    },

    {
        name: "Dr. Atul Malhotra",
        courses: [
            "CSE111 Orientation to Computer Programming"
        ]
    }

];


// =====================================
// SAMPLE FEEDBACK DATA FOR DEMO
// =====================================

const demoFeedback = [

    // Dr. Richa Sharma
    {
        faculty: "Dr. Richa Sharma",
        course: "CSE326 Internet Programming",
        rating: 5,
        comment: "Excellent teaching methods. Concepts are explained clearly with practical examples."
    },

    {
        faculty: "Dr. Richa Sharma",
        course: "CSE326 Internet Programming",
        rating: 5,
        comment: "Very supportive faculty. Practical sessions make learning interesting and easy."
    },

    // Dr. Samiriti Thakur
    {
        faculty: "Dr. Samiriti Thakur",
        course: "CHE110 Environmental Studies",
        rating: 5,
        comment: "The lectures are informative and engaging. Every topic is explained beautifully."
    },

    {
        faculty: "Dr. Samiriti Thakur",
        course: "CHE110 Environmental Studies",
        rating: 4.8,
        comment: "Excellent explanation and great interaction with students."
    },

    // Dr. Pradeep Kumar
    {
        faculty: "Dr. Pradeep Kumar",
        course: "MTH165 Engineering Mathematics",
        rating: 5,
        comment: "Explains difficult mathematical concepts in a simple and understandable way."
    },

    {
        faculty: "Dr. Pradeep Kumar",
        course: "MTH165 Engineering Mathematics",
        rating: 4.8,
        comment: "Very knowledgeable teacher. Provides helpful examples and problem-solving methods."
    },

    // Dr. Anudeep Goraya - Physics
    {
        faculty: "Dr. Anudeep Goraya",
        course: "PHY175 Physics I",
        rating: 5,
        comment: "Excellent teaching style. Makes complex physics concepts easy to understand."
    },

    {
        faculty: "Dr. Anudeep Goraya",
        course: "PHY175 Physics I",
        rating: 5,
        comment: "Very helpful and interactive lectures. Great subject knowledge."
    },

    // Dr. Anudeep Goraya - Electrical
    {
        faculty: "Dr. Anudeep Goraya",
        course: "ECE120 Basic Electrical Engineering",
        rating: 5,
        comment: "Practical examples and clear explanations make this subject interesting."
    },

    {
        faculty: "Dr. Anudeep Goraya",
        course: "ECE120 Basic Electrical Engineering",
        rating: 4.8,
        comment: "Excellent guidance during practical and theoretical sessions."
    },

    // Dr. Atul Malhotra
    {
        faculty: "Dr. Atul Malhotra",
        course: "CSE111 Orientation to Computer Programming",
        rating: 5,
        comment: "A great learning experience. Programming concepts are explained step by step."
    },

    {
        faculty: "Dr. Atul Malhotra",
        course: "CSE111 Orientation to Computer Programming",
        rating: 5,
        comment: "Very encouraging faculty. Makes programming interesting for beginners."
    }

];


// =====================================
// LOAD DEMO DATA
// =====================================

// Use demo data only when no feedback exists.
if (localStorage.getItem("courseFeedback") === null) {

    localStorage.setItem(
        "courseFeedback",
        JSON.stringify(demoFeedback)
    );

}


// Read feedback
let feedbackList = JSON.parse(
    localStorage.getItem("courseFeedback")
) || [];


// =====================================
// CALCULATE AVERAGE RATING
// =====================================

function getAverage(list) {

    if (list.length === 0) {
        return 0;
    }

    let total = 0;

    list.forEach(item => {
        total += Number(item.rating);
    });

    return total / list.length;

}


// =====================================
// OVERVIEW SECTION
// =====================================

function showOverview() {

    document.getElementById("totalResponses").innerText =
        feedbackList.length;

    document.getElementById("overallRating").innerText =
        getAverage(feedbackList).toFixed(2) + " / 5";

}


// =====================================
// FACULTY PERFORMANCE TABLE
// =====================================

function showFacultyTable() {

    const table = document.getElementById("facultyTable");

    table.innerHTML = "";

    facultyData.forEach(faculty => {

        const responses = feedbackList.filter(item =>
            item.faculty === faculty.name
        );

        const average = getAverage(responses);

        const status = responses.length > 0
            ? (average >= 4 ? "Good" : "Needs Attention")
            : "No Feedback";

        const row = document.createElement("tr");

        const cells = [
            faculty.name,
            faculty.courses.join(", "),
            responses.length,
            average.toFixed(2) + " / 5",
            status
        ];

        cells.forEach((value, index) => {

            const td = document.createElement("td");

            td.textContent = value;

            if (index === 4) {
                td.className = status === "Needs Attention"
                    ? "status needs-attention"
                    : "status";
            }

            row.appendChild(td);

        });

        table.appendChild(row);

    });

}


// =====================================
// COURSE DETAILS TABLE
// =====================================

function showCourseTable() {

    const table = document.getElementById("courseTable");

    table.innerHTML = "";

    facultyData.forEach(faculty => {

        faculty.courses.forEach(course => {

            const responses = feedbackList.filter(item =>
                item.faculty === faculty.name &&
                item.course === course
            );

            const average = getAverage(responses);

            const row = document.createElement("tr");

            [
                faculty.name,
                course,
                responses.length,
                average.toFixed(2) + " / 5"
            ].forEach(value => {

                const td = document.createElement("td");

                td.textContent = value;

                row.appendChild(td);

            });

            table.appendChild(row);

        });

    });

}


// =====================================
// RECENT STUDENT COMMENTS
// =====================================

function showComments() {

    const commentBox = document.getElementById("comments");

    commentBox.innerHTML = "";

    const comments = feedbackList
        .filter(item => item.comment && item.comment.trim() !== "")
        .slice(-10)
        .reverse();

    if (comments.length === 0) {

        commentBox.innerHTML =
            '<p class="empty-message">No feedback available.</p>';

        return;

    }

    comments.forEach(item => {

        const div = document.createElement("div");

        div.className = "comment";

        const faculty = document.createElement("h3");
        faculty.textContent = item.faculty;

        const course = document.createElement("p");
        course.textContent = "Course: " + item.course;

        const message = document.createElement("p");
        message.textContent = '"' + item.comment + '"';

        const rating = document.createElement("p");
        rating.textContent = "Rating: " + item.rating + " / 5 ⭐";

        div.appendChild(faculty);
        div.appendChild(course);
        div.appendChild(message);
        div.appendChild(rating);

        commentBox.appendChild(div);

    });

}


// =====================================
// LOAD DASHBOARD
// =====================================

function loadDashboard() {

    showOverview();

    showFacultyTable();

    showCourseTable();

    showComments();

}


// RUN
loadDashboard();