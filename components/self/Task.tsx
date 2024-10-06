"use client"

import { useState } from 'react';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Task as Body } from './TaskList';
import { Checkbox } from '../ui/checkbox';
import { z } from 'zod';

type TaskProps = {
    task: Body;
    onUpdate: (param: Body) => void;
    onDelete: (id: string) => void;
}



function Task({ task, onUpdate, onDelete }: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const wordLimitTitle = 10;
    const wordLimitDescription = 200;

    // Zod schemas for validation
    const titleSchema = z.string().max(wordLimitTitle, { message: 'Title cannot exceed 50 words' });
    const descriptionSchema = z.string().max(wordLimitDescription, { message: 'Description cannot exceed 200 words' });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const onChange = () => {
        const updatedTask = {
            ...task,
            status: !task.status
        };
        onUpdate(updatedTask);
    }

    const handleTitleChange = (e: any) => {
        const newTitle = e.target.value;

        try {
            titleSchema.parse(newTitle);
            setEditedTitle(newTitle);
        } catch (error: any) {
            // Handle validation error (e.g., show a warning or prevent further input)
            console.error(error.message);
        }
    };

    const handleDescriptionChange = (e: any) => {
        const newDescription = e.target.value;

        try {
          descriptionSchema.parse(newDescription);
          setEditedDescription(newDescription);
        } catch (error: any) {
          // Handle validation error (e.g., show a warning or prevent further input)
          console.error(error.message);
        }
    };

    const handleSubmit = () => {
        const updatedTask = {
            ...task,
            title: editedTitle,
            description: editedDescription,
        };
        onUpdate(updatedTask);
        setIsEditing(false);
    };

    return (
        <>
            {isEditing ? (<Card className="">
                <CardHeader>
                    <CardTitle>
                        <Input type='text' value={editedTitle} onChange={handleTitleChange} />
                    </CardTitle>
                    <CardDescription>
                        <Textarea
                            value={editedDescription}
                            onChange={handleDescriptionChange}
                        />
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleSubmit} variant="secondary">Save</Button>
                    <Button variant="destructive" onClick={handleEditToggle} >Cancel</Button>
                </CardFooter>
            </Card>) : (<Card>
                <CardHeader>
                    <CardTitle className={`${task.status ? 'line-through' : ''}`}>
                        {task.title}
                    </CardTitle>
                    <CardDescription className='line-clam-5 break-words'>
                        <p className={`${task.status ? 'line-through' : ''}`} >
                            {task.description}
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between space-x-5">
                    <Checkbox checked={task.status} onCheckedChange={onChange} />
                    <div className="flex justify-between space-x-2">
                        <Button onClick={handleEditToggle} variant="outline">Edit</Button>
                        <Button variant="destructive" onClick={() => onDelete(task.id)} >Delete</Button>
                    </div>
                </CardFooter>
            </Card>
            )
            }
        </>
    );
}

export default Task;