{
    let tasks = [];

    let doneTasksHidden = false;

    const hideDoneTasks = () => {
        const taskHTMLelement = document.querySelectorAll('.js-taskContainer__itemContainer');

        tasks.forEach((task, i) => {
            if (task.done) taskHTMLelement[i].classList.toggle('taskContainer__markAllTasksDone--hidden');

            doneTasksHidden = !doneTasksHidden;

            render();
        });
    }

    const markAllDone = () => {
        tasks = tasks.map(task => {                 // Dlaczego nie może być ?: task => task.done
            task.done = true                        // lub
            return task;                            // task.done
        });                                         // return task;

        render();
    }

    const updateTasks = (taskIndex) => {
        tasks = tasks.map((task, mapIndex) => {
            if (taskIndex === mapIndex) {
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

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                updateTasks(taskIndex);
            })
        })
    }


    const removeTask = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, removeTaskIndex) => {
            removeButton.addEventListener("click", () => {
                tasks = tasks.filter((_, index) => index !== removeTaskIndex);

                render();
            });
        });
    };

    const renderTasks = () => { // renderuje liste zadan
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="taskContainer__itemContainer js-taskContainer__itemContainer">
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

    const renderButtons = () => {
        const buttonsContainer = document.querySelector('.js-buttonsContainer');

        const buttonsHTML = `
                    <button class="js-hideDone">
                        Ukryj ukonczone
                    </button>
                    <button class="js-markAllTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                        Ukończ wszystkie
                    </button>
        `

        if (tasks.length > 0) {
            buttonsContainer.innerHTML = buttonsHTML;
        }
    }

    const bindBtnsEvents = () => {
        const btnAllDone = document.querySelector('.js-markAllTasksDone');
        const btnHideDone = document.querySelector('.js-hideDone');

        if (btnAllDone && tasks.length > 0) { // Jeśli guzik istnieje, to przypina EventListener
            btnAllDone.addEventListener('click', markAllDone);
        }

        if (btnHideDone) {
            btnHideDone.addEventListener('click', hideDoneTasks);
        }
    }

    const render = () => {
        renderTasks();
        renderButtons();

        bindBtnsEvents();
        taskDone();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        addNewTask();
        formFocus();
    };

    const addNewTask = () => {
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