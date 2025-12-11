"use client";

import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  FieldGroup,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTodoBoardStore } from "../store";
import type { ITodoColumn } from "../types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  column: z.string().min(1, "Column is required"),
  dueDate: z.date().min(1, "Due date must be in the future"),
});

interface NewTodoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTodo = ({ isOpen, onClose }: NewTodoProps) => {
  const [open, setOpen] = useState(false);
  const {
    addTodo,
    newTodoModalColumn,
    columns,
    editTodoItem,
    updateTodo,
    setEditTodoItem,
  } = useTodoBoardStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (editTodoItem) {
      updateTodo(editTodoItem.id, {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        column: columns.find(
          (column) => column.id === data.column
        ) as unknown as ITodoColumn,
      });
      form.reset();
      onClose();
      return;
    }
    addTodo({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      column: columns.find(
        (column) => column.id === data.column
      ) as unknown as ITodoColumn,
    });
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (newTodoModalColumn) {
      form.setValue("column", newTodoModalColumn.id);
    }
  }, [newTodoModalColumn, form]);

  useEffect(() => {
    if (editTodoItem) {
      form.setValue("title", editTodoItem.title);
      form.setValue("description", editTodoItem.description);
      form.setValue("column", editTodoItem.column.id);
      form.setValue("dueDate", new Date(editTodoItem.dueDate));
    } else {
      form.reset();
    }
  }, [editTodoItem, form]);

  useEffect(() => {
    if (!isOpen) {
      setEditTodoItem(null);
    }
  }, [isOpen, setEditTodoItem]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="border-0 w-full p-4 shadow-popup [&>button]:cursor-pointer"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {editTodoItem ? "Edit Todo" : "Add New Todo"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Enter your title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Enter your description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="column"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="column">Column</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a column" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {columns.map((column) => (
                                <SelectItem key={column.id} value={column.id}>
                                  {column.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="dueDate">Due Date</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-full justify-between font-normal cursor-pointer"
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldGroup>
              <Button type="submit" className="w-full mt-4">
                {form.formState.isSubmitting ? "Saving todo..." : "Save Todo"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
