import {useForm} from 'react-hook-form'
import { useTask } from '../context/taskContext';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'; 

dayjs.extend(utc);

function TaskFormPage() {
    const { register, handleSubmit, setValue} = useForm();
    const { createTask, getTask, updateTask } = useTask();
    const navegate = useNavigate();
    
    const params = useParams();

    useEffect(() => {
        const loadTask = async () => {
          if (params.id) {
            const task = await getTask(params.id);
            setValue("title", task.title);
            setValue("description", task.description);
            setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD")
            );
          }
        };
        loadTask();
    }, []);

    const onSubmit =  handleSubmit((data) => {
        if (params.id) {
            updateTask(params.id, {
                ...data,
                date: dayjs.utc(data.date).format(),
              });
        } else {
            createTask({
                ...data,
                date: dayjs.utc(data.date).format(),
              });
        }
        navegate('/tasks');
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                <h1 className='text-2xl font-bold mb-4 text-white'>
                    {
                        params.id ? "Update Task" : "Create Task"
                    }
                </h1>
                <form onSubmit={onSubmit}>
                    <input type="text" name="title" placeholder="Title" {
                        ...register("title", { required: true })
                    }
                    autoFocus
                    className='w-full bg-white text-black px-4 py-2 rounded-md my-2' />
                    <textarea name="description" placeholder="Description" {
                        ...register("description", { required: true })
                    }
                    rows="3"
                    className='w-full bg-white text-black px-4 py-2 rounded-md my-2'/>
                    <input value={
                        dayjs().format("YYYY-MM-DD")
                    } type="date" name="date" {
                        ...register("date", { required: true })   
                    }
                    className='w-full bg-white text-black px-4 py-2 rounded-md my-2'
                    />
                    <button className='w-full bg-slate-500 text-white px-4 py-2 rounded-md my-2' type="submit">
                        {
                            params.id ? "Update Task" : "Create Task"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage;
