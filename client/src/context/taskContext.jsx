/* eslint-disable react/prop-types */
import { createContext, useContext, useState} from "react";
import { createTaskRequest, getTasksRequest, getTaskRequest, deleteTaskRequest, updateTaskRequest } from "../api/task";

const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTask must be used within a TaskProvider");
    }
    return context;
};

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    
    const getTasks = async () => {
        try {
            const tasks = await getTasksRequest();
            setTasks(tasks.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getTask = async (id) => {
        try {
            const task = await getTaskRequest(id);
            return task.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createTask = async (task) => {
        try {
            const newTask = await createTaskRequest(task);
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteTaskRequest(id);
            const newTasks = tasks.filter((task) => task._id !== id);
            setTasks(newTasks);
        } catch (error) {
            console.error(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, createTask, getTasks, getTask,deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};