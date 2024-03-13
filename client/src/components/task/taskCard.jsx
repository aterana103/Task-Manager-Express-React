/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useTask } from "../../context/taskContext";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'; 

dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTask();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between mb-2 gap-2">
        <h1 className="text-2xl font-bold text-white">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button className='bg-red-500 text-white px-4 py-2 rounded-md my-2' onClick={() => deleteTask(task._id)}>Delete</button>
          <Link className="bg-blue-200 text-white px-4 py-2 rounded-md my-2" to={`/tasks/${task._id}`}>Edit</Link>
        </div>
      </header >
      <p className="text-slate-300 min-h-14">{task.description}</p>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY/")}</p>
    </div>
  )
}


export default TaskCard;