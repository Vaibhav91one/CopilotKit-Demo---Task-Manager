"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { z } from "zod"
import toast from "react-hot-toast";

export interface ExcludedTask {
    title: string;
    description: string;
}

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(200),
})

type TaskFormProps = {
    AddTask: (newTask: ExcludedTask) => void,
}

export default function TaskForm({ AddTask}: TaskFormProps) {

    const [isOpen, setIsOpen] = useState(false);

    const onChange = () => {
        setIsOpen(!isOpen)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            AddTask(values);
            toast.success("Task created successfully!")
        } catch (error) {
            toast.error("Something went wrong!")
        }
        finally {
            form.reset();
            setIsOpen(!isOpen)
        }

    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} variant="default" className="bg-green-500 flex justify-center items-center gap-1 hover:bg-green-700">
                    <Plus size={20} />
                    <p>
                        Add task
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add task</DialogTitle>
                    <DialogDescription>
                        Make changes to your task here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Type your task title"
                                            className="col-span-3"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is the title of your task.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type your message here."
                                            id="description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is the description of your task.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

