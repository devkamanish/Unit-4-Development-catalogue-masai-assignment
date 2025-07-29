async function fetchStudents() {
  const res = await fetch('https://6889053aadf0e59551bc3944.mockapi.io/students');
  const students = await res.json();
  displayStudents(students);
}

async function addStudent(student) {
  await fetch('https://6889053aadf0e59551bc3944.mockapi.io/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });
  fetchStudents();
}

async function updateStudent(id, updatedData) {
  await fetch(`https://6889053aadf0e59551bc3944.mockapi.io/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
  fetchStudents();
}


async function deleteStudent(id) {
  await fetch(`https://6889053aadf0e59551bc3944.mockapi.io/students/${id}`, {
    method: 'DELETE'
  });
  fetchStudents();
}

document.getElementById("studentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const student = {
    name: document.getElementById("name").value.trim(),
    age: Number(document.getElementById("age").value),
    course: document.getElementById("course").value.trim()
  };

  if (!student.name || !student.age || !student.course) {
    alert("All fields are required!");
    return;
  }

  addStudent(student);
});

