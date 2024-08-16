

var studentlist;

// display the locel storge on the table when reload
if (localStorage.getItem('studentlist') == null) {
    studentlist = [];

}
else {
    studentlist = JSON.parse(localStorage.getItem('studentlist'));
    displayStudent(studentlist);
}


var StudentName = document.getElementById('name');
var StudentGrade = document.getElementById('grade');
// var studentlist = [];

var add = document.querySelector('#add');
add.addEventListener('click', function () {

    var nameValue = StudentName.value.trim();
    // تحقق من صحة الاسم
    if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
        alert('Please enter a valid name containing only letters.');
        StudentName.focus(); // إعادة التركيز على حقل الاسم
        return;
    }

    // Get the values from the input fields
    var students = {
        name: StudentName.value,
        grade: StudentGrade.value
    }
    studentlist.push(students);
    // stor the array  in local storage
    localStorage.setItem('studentlist', JSON.stringify(studentlist));

    // Clear the input fields
    StudentName.value = '';
    StudentGrade.value = '';

    //call back function that disblay the table
    displayStudent(studentlist);

});

//function that disblay the table
function displayStudent(studentlist) {
    var cartoona = ''
    for (var i = 0; i < studentlist.length; i++) {
        cartoona += `<tr>
            <td>${studentlist[i].name}</td>
            <td>${studentlist[i].grade}</td>
            <td><button class="btn btn-danger">Delete</button></td>
            </tr>`
    }
    document.getElementById('tbody').innerHTML = cartoona

}

// delete studentlist
document.getElementById('tbody').addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-danger')) {
        var index = event.target.parentElement.parentElement.rowIndex - 1;
        studentlist.splice(index, 1);
        localStorage.setItem('studentlist', JSON.stringify(studentlist));
        displayStudent(studentlist);
    }
});


// search student by name

document.getElementById('search').addEventListener('keyup', function () {
    var searchValue = this.value.toLowerCase();
    var studentTable = document.getElementById('tbody');
    var studentRows = studentTable.getElementsByTagName('tr');
    for (var i = 0; i < studentRows.length; i++) {
        var name = studentRows[i].getElementsByTagName('td')[0];
        if (name) {
            var textValue = name.textContent || name.innerText;
            if (textValue.toLowerCase().indexOf(searchValue) > -1) {
                studentRows[i].style.display = '';
            } else {
                studentRows[i].style.display = 'none';
            }
        }
    }
});

// sorting the table by grade
    function sortStudents() {
        const sortSelect = document.getElementById("sortSelect").value;
        const sortedStudents = [...studentlist];

        if (sortSelect === "grades") {
            sortedStudents.sort((a, b) => a.grade - b.grade);
        } else {
            sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
        }
    displayStudent(sortedStudents);
    }

    
    //filter: 
    
    function filterStudents() {
        const filterSelect = document.getElementById("filterSelect").value;
        let filteredStudents;

        if (filterSelect === "passed") {
            filteredStudents = studentlist.filter(student => student.grade >= 60);
            
        } else if (filterSelect === "failed") {
            filteredStudents = studentlist.filter(student => student.grade < 60);
           
        } else {
            filteredStudents = studentlist; // All
            
        }
        displayStudent(filteredStudents);
        
    }