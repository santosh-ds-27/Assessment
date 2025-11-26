let taskForm = document.getElementById("taskForm");
let taskList = document.getElementById("taskList");

// Load tasks when page opens
showTasks();

// When form is submitted
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let due = document.getElementById("due").value;
    let priority = document.getElementById("priority").value;
    let status = document.getElementById("status").value;

    if (title.length < 5) {
        alert("Title must be at least 5 characters");
        return;
    }

    let task = {
        title,
        description,
        due,
        priority,
        status
    };

    let arr = JSON.parse(localStorage.getItem("tasks")) || [];
    arr.push(task);
    localStorage.setItem("tasks", JSON.stringify(arr));

    taskForm.reset();
    showTasks();
});

// Show tasks
function showTasks() {
    taskList.innerHTML = "";
    let arr = JSON.parse(localStorage.getItem("tasks")) || [];

    arr.forEach((t, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <b>${t.title}</b><br>
            ${t.description}<br>
            Due: ${t.due}<br>
            Priority: ${t.priority}<br>
            Status: ${t.status}<br>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Delete task
function deleteTask(index) {
    let arr = JSON.parse(localStorage.getItem("tasks")) || [];
    arr.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(arr));
    showTasks();
}
