import { useState } from "react";

export default function AddTask({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim() !== "") {
      onAddTask(task); 
      setTask(""); 
    }
  };

  return (
    <div className="flex flex-row gap-4 mt-4 max-w-3xl">
      <input 
        className="flex-1 p-2 border-solid border-2 border-[#76b900] text-gray-500 outline-none"
        type="text"
        placeholder="Écrivez une tâche"
        value={task}
        onChange={(e) => setTask(e.target.value)} 
      />
      <button 
        className="bg-[#76b900] text-black font-bold p-2" 
        onClick={handleAddTask}
      >
        <span className="font-bold pr-3">+</span>Ajouter
      </button>
    </div>
  );
}