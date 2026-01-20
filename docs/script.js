// Load students from localStorage or start with empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

// Reference to the table body
const table = document.getElementById("studentTable");

// Function to display all students
function displayStudents() {
    table.innerHTML = ""; // Clear table

    students.forEach((student, index) => {
        let row = table.insertRow();

        // Insert student data
        row.insertCell(0).innerText = student.name;
        row.insertCell(1).innerText = student.email;
        row.insertCell(2).innerText = student.course;

        // Add Edit and Delete buttons
        let actions = row.insertCell(3);
        actions.innerHTML = `
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        `;
    });
}

// Add/Register student
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page refresh

    let student = {
        name: name.value,
        email: email.value,
        course: course.value
    };

    students.push(student); // Add to array
    localStorage.setItem("students", JSON.stringify(students)); // Save in localStorage

    displayStudents(); // Refresh table
    this.reset(); // Clear form
    message.innerText = "Student saved successfully!";
});

// Delete student
function deleteStudent(index) {
    students.splice(index, 1); // Remove from array
    localStorage.setItem("students", JSON.stringify(students)); // Update storage
    displayStudents(); // Refresh table
}

// Edit student
function editStudent(index) {
    let student = students[index];

    // Fill form with existing data
    name.value = student.name;
    email.value = student.email;
    course.value = student.course;

    // Remove old record
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents(); // Refresh table
}

// Display students on page load
displayStudents();