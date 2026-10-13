
import React, { useState } from "react";
import DeleteTask from "./DeleteTask";
import AddTask from "./AddTask";

export default function TaskList() {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Tâche 1" },
        { id: 2, name: "Tâche 2" },
        { id: 3, name: "Tâche 3" },
    ]);


    const handleAddTask = (taskName) => {
        const newTask = {
            id: Date.now(),
            name: taskName,
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
        );
    };

    return (
        <div>
            <AddTask onAddTask={handleAddTask} />

            <div className="mt-4 space-y-0">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex items-center space-x-4"
                    >
                        <span>{task.name}</span>

                        <DeleteTask
                            taskId={task.id}
                            onDelete={handleDeleteTask}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
