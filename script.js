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

        for(const task of tasks) {
            if (task.done) {
                document.querySelector(".js-tasks").classList.add(".taskDone");
            }
        }
    }

    const addingListItem = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
            ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const render = () => {
        addingListItem();

        taskDone();
    }

    const onFormSubmit = (event) => {
            event.preventDefault();

            addNewTask();
        };

    const addNewTask = () => {
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            }

            tasks.push({
                content: newTaskContent,
            });

            render();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}