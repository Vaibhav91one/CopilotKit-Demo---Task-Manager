"use client"

import Task from '@/components/self/Task';
import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import { nanoid } from 'nanoid'
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core"; 

export interface Task {
    id: string;
    title: string;
    description: string;
    status: boolean;
}

function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useCopilotAction({
        name: "addTask",
        description: "Adds a task to the todo list",
        parameters: [
          {
            name: "task",
            type: "object",
            description: "The title of the task",
            required: true,
          },
        ],
        handler: (task: object) => {
          handleTaskAdd(task);
        },
      });

      useCopilotAction({
        name: "deleteTask",
        description: "Deletes a task from the todo list",
        parameters: [
          {
            name: "id",
            type: "string",
            description: "The id of the task",
            required: true,
          },
        ],
        handler: ({id}) => {
          handleTaskDelete(id);
        },
      });

    useCopilotReadable({
        description: "The state of the todo list",
        value: JSON.stringify(tasks)
      });

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const handleTaskAdd = (newTask: Partial<Task>) => { // Use Partial<Task> for optional id
        // Generate a unique ID using nanoid
        const newId = nanoid();
      
        // Check if a duplicate task already exists based on the 'id' property
        const isDuplicate = tasks.some(task => task.id === newId);
      
        if (isDuplicate) {
          // Handle duplicate task here, e.g., show an error message or prevent addition
          console.error("Duplicate task found! Skipping addition.");
          return; // Prevent adding the duplicate task
        }
      
        // If no duplicate found, create a complete task object with the generated ID
        const completeTask: any= { ...newTask, id: newId , status: false};
      
        // Add the new task
        setTasks([...tasks, completeTask]);
        localStorage.setItem('tasks', JSON.stringify([...tasks, completeTask]));
      };

    const handleTaskUpdate = (updatedTask: Task) => {
        const updatedTasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleTaskDelete = (taskId: string) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    };

    return (
        <div className='flex-col gap-5 space-y-10 w-full'>
            <TaskForm AddTask={handleTaskAdd}/>
            <div>
            {tasks.length > 0 ? (
                <ul className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4'>
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onUpdate={handleTaskUpdate}
                            onDelete={handleTaskDelete}
                        />
                    ))}
                </ul>
            ) : (
                <p className='text-gray-400'>
                    No tasks found.
                </p>
            )}
            </div>
        </div>
    );
}

export default TaskList;