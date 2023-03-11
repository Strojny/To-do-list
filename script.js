{
    const tasks = [
        {
            content: "Jakieś zadanie",
            done: false,
        },
        {
            content: "Kolejne zadanie",
            done: true,
        },
    ];

    const taskDone = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;

                render();
            })
        })
    }

    const removeTask = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                tasks.splice(index, 1);

                render();
            });
        });
    };

    const addingListItem = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="taskContainer__itemContainer">
            <button class="taskContainer__toggleDoneButton js-done">${task.done ? '&#9989' : '&#129001'}</button>
            <span class="taskContainer__taskContent" ${task.done ? " style=\"text-decoration: line-through\" " : ""}>${task.content}</span>
            <button class="taskContainer__removeButton js-remove">&#128465</button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        removeTask();
    };

    const render = () => {
        addingListItem();

        taskDone();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        addNewTask();
    };

    const addNewTask = () => {
        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (newTaskContent === "") {
            return;
        }

        tasks.push({
            content: newTaskContent,
        });

        newTask.value = "";

        render();
    };

    const formFocus = () => {
        const form = document.querySelector(".js-form");
        
        form.focus();
    }

    const onTaskButtonClick = () => {
        const taskButton = document.querySelector("js-taskButton");

        taskButton.addEventListener("click", formFocus);
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        
        onTaskButtonClick();
    };

    init();
}