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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
            ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        taskDone();
    }

    const init = () => {
        render();
    };

    init();
}