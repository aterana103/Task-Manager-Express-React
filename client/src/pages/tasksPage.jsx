import { useEffect } from "react";
import { useTask } from "../context/taskContext";
import TaskCard from "../components/task/taskCard";

export function TaskPage() {

    const { getTasks, tasks } = useTask();
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            {
                tasks.length === 0 && (
                    <div className="flex justify-center items-center h-96">
                        <h1 className="text-4xl"> No tasks yet, please add a new task</h1>
                    </div>
                )
            }
            <div className="flex justify-center items-center p-10 flex-col">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {
                        tasks.map((task) => (
                            <TaskCard key={task._id} task={task} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TaskPage;