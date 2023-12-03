let tasks = [];

const addTask = (description) => {
    tasks.push({
        id: tasks.length + 1,
        description,
        completed: false
    });
};

const markAsComplete = (id) => {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });
};

const removeTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
};

const displayTasks = () => {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        const text = document.createElement('p');
        text.classList.add('task-text');
        text.textContent = task.description;

        const checkbox = document.createElement('input');
        checkbox.classList.add('checkbox');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        if (task.completed) {
            checkbox.addEventListener('change', () => {
                markAsComplete(task.id);
                displayTasks();
            });
            completedTasksList.appendChild(li);
        } else {
            checkbox.addEventListener('change', () => {
                markAsComplete(task.id);
                displayTasks();
            });
            pendingTasksList.appendChild(li);
        }

        li.prepend(checkbox);
        li.appendChild(text);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = '✖';
        deleteButton.addEventListener('click', () => {
            removeTask(task.id);
            displayTasks();
        });

        li.appendChild(deleteButton);
    });
};

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    addTask(taskInput.value);
    taskInput.value = '';
    displayTasks();
});

displayTasks();