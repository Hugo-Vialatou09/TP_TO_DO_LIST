
import React from "react";
import CorbeilleIcon from "../assets/corbeille.svg";

export default function DeleteTask({ taskId, onDelete }) {
    const handleDelete = () => {
        onDelete(taskId);
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            aria-label="Supprimer la tâche"
            className="cursor-pointer hover:opacity-80"
        >
            <img
                src={CorbeilleIcon}
                alt=""
                className="w-6 h-6 brightness-0 invert"
            />
        </button>
    );
}
