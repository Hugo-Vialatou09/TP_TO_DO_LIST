
import { useState } from "react";
import ModifierIcon from "../assets/modifier.svg";

export default function EditTask({ task, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleSave = () => {
    if (newName.trim() !== "") {
      onEdit(task.id, newName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewName(task.name);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
          className="p-1 bg-[#2A2A2A] border border-gray-500 text-white outline-none"
        />

        <button
          type="button"
          onClick={handleSave}
          className="text-[#76b900] cursor-pointer"
        >
          Enregistrer
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="text-gray-400 cursor-pointer"
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      aria-label="Modifier la tâche"
      className="text-white cursor-pointer hover:opacity-80"
    >
      <img 
      src={ModifierIcon} 
      alt="" 
      className="w-6 h-6 brightness-0 invert" />
    </button>
  );
}
