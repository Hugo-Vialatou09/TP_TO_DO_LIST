
export default function Filters({ activeFilter, onFilterChange, tasks }) {
    const filters = ['Toutes', 'À faire', 'Fait'];
  
    // Calculer le nombre de tâches pour chaque filtre
    const getTaskCount = (filter) => {
      if (filter === 'À faire') {
        return tasks.filter((task) => !task.completed).length;
      }
  
      if (filter === 'Fait') {
        return tasks.filter((task) => task.completed).length;
      }
  
      return tasks.length;
    };
  
    return (
      <div className="flex space-x-4 pt-10 font-bold border-b border-gray-500 max-w-6xl">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`flex items-center gap-2 p-2 rounded border-b-2 ${
              activeFilter === filter
                ? 'text-white border-[#76b900]'
                : 'text-white border-transparent'
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
  
            <span
              className={`text-sm ${
                activeFilter === filter
                  ? 'text-[#76b900]'
                  : 'text-gray-400'
              }`}
            >
              {getTaskCount(filter)}
            </span>
          </button>
        ))}
      </div>
    );
  }
  