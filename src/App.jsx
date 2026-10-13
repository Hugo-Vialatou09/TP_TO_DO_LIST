import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

import AddTask from "./components/AddTask";
import Filters from "./components/Filters";
import EditTask from "./components/EditTask";
import DeleteTask from "./components/DeleteTask";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.92,
    filter: "blur(6px)",
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

function App() {

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("todo-tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [nextId, setNextId] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("todo-tasks");
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];

      return (
        parsedTasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1
      );
    } catch {
      return 1;
    }
  });

  const [activeFilter, setActiveFilter] = useState("Toutes");

  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName) => {
    if (taskName.trim() !== "") {
      const newTask = {
        id: nextId,
        name: taskName.trim(),
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNextId((prevId) => prevId + 1);
    }
  };

  const editTask = (taskId, newName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task,
      ),
    );
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "À faire") {
      return !task.completed;
    }

    if (activeFilter === "Fait") {
      return task.completed;
    }

    return true;
  });

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-screen flex-col bg-black pt-10 pl-5 sm:pt-14 sm:pl-10 md:pt-20 md:pl-20"
    >
      {/* HEADER ANIMÉ */}
      <motion.header variants={itemVariants} className="mb-5">
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="text-3xl font-bold text-white"
        >
          Mes tâches
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400"
        >
          Une chose à la fois. Faites place à l'essentiel.
        </motion.p>

        {/* INDICATEUR DE PROGRESSION */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 h-1 max-w-4xl overflow-hidden rounded-full bg-[#2A2A2A]"
        >
          <motion.div
            className="h-full bg-[#76b900]"
            animate={{
              width: `${
                tasks.length === 0
                  ? 0
                  : (tasks.filter((task) => task.completed).length /
                      tasks.length) *
                    100
              }%`,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          />
        </motion.div>

        <motion.p
          key={tasks.filter((task) => task.completed).length}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-gray-500"
        >
          {tasks.filter((task) => task.completed).length} / {tasks.length}{" "}
          tâches terminées
        </motion.p>
      </motion.header>

      {/* AJOUT DE TÂCHE */}
      <motion.section
        variants={itemVariants}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <AddTask onAddTask={addTask} />
      </motion.section>

      {/* FILTRES */}
      <motion.section variants={itemVariants} className="max-w-6xl">
        <Filters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          tasks={tasks}
        />
      </motion.section>

      {/* LISTE ANIMÉE */}
      <LayoutGroup>
        <motion.div layout className="mt-6 max-w-4xl space-y-4 pb-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  },
                }}
                whileHover={{
                  borderColor: "#76b900",
                  backgroundColor: "#303030",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-between gap-3 rounded-sm border border-gray-500 bg-[#2A2A2A] p-4 text-white"
              >
                {/* CHECKBOX + NOM */}
                <div className="flex min-w-0 items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <motion.input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Marquer ${task.name} comme terminée`}
                      className="h-5 w-5 cursor-pointer accent-[#76b900]"
                      animate={{
                        scale: task.completed ? [1, 1.35, 1] : 1,
                      }}
                      transition={{ duration: 0.35 }}
                    />
                  </motion.div>

                  <div className="min-w-0">
                    <motion.span
                      animate={{
                        color: task.completed ? "#9ca3af" : "#ffffff",
                      }}
                      className={`block break-words ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.name}
                    </motion.span>

                    <AnimatePresence>
                      {task.completed && (
                        <motion.span
                          initial={{ opacity: 0, height: 0, y: -5 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -5 }}
                          className="block overflow-hidden text-xs text-[#76b900]"
                        >
                          Terminé ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* ACTIONS */}
                <motion.div
                  className="flex shrink-0 items-center gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.2) }}
                >
                  <motion.div
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <EditTask task={task} onEdit={editTask} />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <DeleteTask taskId={task.id} onDelete={deleteTask} />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ÉTAT VIDE ANIMÉ */}
          <AnimatePresence mode="wait">
            {filteredTasks.length === 0 && (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 20,
                }}
                className="flex max-w-4xl flex-col items-center justify-center rounded-sm border border-dashed border-gray-700 py-14 text-center"
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-4 text-4xl"
                >
                  {activeFilter === "Fait" ? "✓" : "✦"}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-lg font-semibold text-white"
                >
                  {activeFilter === "Fait"
                    ? "Aucune tâche terminée"
                    : activeFilter === "À faire"
                      ? "Tout est à jour !"
                      : "Aucune tâche pour le moment"}
                </motion.p>

                <p className="mt-2 text-sm text-gray-500">
                  {activeFilter === "À faire"
                    ? "Tu peux profiter de cette petite victoire."
                    : "Ajoute une tâche pour commencer."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </motion.main>
  );
}

export default App;
