let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if(textInput.value === '') {
        console.log("All you got is Failure 'Bitch!'");
        msg.innerHTML = "Task cann't be blank you dumb ass 'Bitch!'";
    }
    else {
        msg.innerHTML = '';
        console.log("You Succeed 'Bitch!'");

        acceptData();

        add.setAttribute("data-bs-dismiss", "modal"); // Closing the form after clicking add button.
        add.click(); // Closing at one click.

        // IIEF to stop the form closing when clicking the add when the title is empty.
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

// Collected data by acceptData() pushed in this object.
// let data = {};
// Storing data in array to store in Local Storage chrome to not to vanish data when refresh.
let data = [];

// Here collecting the data from input & pushing into data object.
let acceptData = () => {
    // data["text"] = textInput.value;
    // data["date"] = dateInput.value;
    // data["description"] = textarea.value;
    // console.log(data);
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });
    console.log(data);

    // Adding the data into the local storage. || Whatever data accepting from the input pushing into data[] at the same time pushing all of the data inside local storage.
    localStorage.setItem("data", JSON.stringify(data)); // Here data representing the data[]. JSON.stringify() making the data readable otherwise it is kinda object shaped.

    createTasks();
};

// Here using data object the output gonna show inside the tasks. 
let createTasks = () => {
    // Every time run this function it'll clear the previous tasks & then load the new tasks. Otherwise every task will be generate two times.
    tasks.innerHTML = "";

    // If there are 6 tasks then x gonna target all of the 6 tasks one by one. y count the index number.
    // Here x is using to retrive the data otherwise all was undefined.
    data.map((x, y) => {
        return (
            tasks.innerHTML += `
                <div id=${y}>
                    <span class="fw-bold text-capitalize">${x.text}</span>
                    <span class="small text-seconday">${x.date}</span>
                    <p class="text-capitalize">${x.description}</p>
        
                    <span class="options">
                        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                        <i onClick="deleteTask(this);createTasks()" class="fas fa-trash"></i>
                    </span>
                </div>
            `
        );

        // onClick="deleteTask(this);createTasks()" here putting createTasks() coz every time deleting a single task from app this entire function will run again & it'll show updated number of tasks.
    });

    // tasks.innerHTML += "Tasks has been updated!";
    // tasks.innerHTML += `
    //     <div>
    //         <span class="fw-bold text-capitalize">${data.text}</span>
    //         <span class="small text-seconday">${data.date}</span>
    //         <p class="text-capitalize">${data.description}</p>

    //         <span class="options">
    //             <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
    //             <i onClick="deleteTask(this)" class="fas fa-trash"></i>
    //         </span>
    //     </div>
    // `;
    resetForm();
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    // console.log(e.parentElement.parentElement.id); Every time delete a task it gonna give the index number.

    // Delete data from the local storage as well, won't appear again after refresh.
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    // Every time click on the edit icon it'll go to the form.
    textInput.value = selectedTask.children[0].innerHTML; // 0 represents the first child of the div which is first span i.e title.
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    // Deleting the before edited task.
    // selectedTask.remove();

    // Calling the deleteTask() to remove the previous before editing task completely from local storage.
    deleteTask(e);
}

// Reset the form after typing.
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

(() => {
    // Get all the data from the local storage.
    // 135 trying to retrive data from the Local Storage & putting it back inside data[] 38 then 137 running createTasks() & it has a map(), it's trying to map the data if it's blank coz Local Storage is blank that's why the map() doesn't run so will get error, cann't even add new task. In order to prevent this added || [].
    data = JSON.parse(localStorage.getItem("data")) || []; // JSON.parse() converting the datas into an array form.

    createTasks();

    console.log(data);
})();