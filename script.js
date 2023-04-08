{
    let tasks = [];

    const updateTasks = (TaskIndex) => {
        tasks = tasks.map((task, mapIndex) => {
            if (TaskIndex === mapIndex) {
                return {
                    ...task,
                    done: !task.done,
                }
            }
            return task;
        });

        render();
    }

    const taskDone = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, TaskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                updateTasks(TaskIndex);
            })
        })
    }

    const removeTask = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, removeTaskIndex) => {
            removeButton.addEventListener("click", () => {
                tasks = tasks.filter((_,index) => index !== removeTaskIndex);

                render();
            });
        });
    };

    const addingListItem = () => { // renderuje liste zadan
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="taskContainer__itemContainer">
                    <button class="taskContainer__toggleDoneButton js-done">
                        ${task.done ? '&#10004;' : ''}
                    </button>
                    <span class="taskContainer__taskContent" ${task.done ? " style=\"text-decoration: line-through\" " : ""}>
                        ${task.content}
                    </span>
                    <button class="taskContainer__removeButton js-remove">
                        &#128465
                    </button>
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

        refreshPageStatus();
        formFocus();
    };

    const refreshPageStatus = () => {
        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (newTaskContent === "") {
            return;
        }

        tasks = [        // odswieza liste zadan 
            ...tasks,
            { content: newTaskContent },
        ];

        newTask.value = "";

        render();
    };

    const formFocus = () => { // ustawia focus na input formularza
        const form = document.querySelector(".js-newTask");

        form.focus();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}