"use client"

import { z } from "zod";

import Image from "next/image";
import { useRef } from "react";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; 

import { createWorkspaceSchema } from "../schemas";
import { useCreateWorkspace } from "../api/use-create-workspace";

interface createWorkspaceFormProps {
    onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: createWorkspaceFormProps) =>{
    const { mutate, isPending } = useCreateWorkspace();

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        const finalValue = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        };

        mutate({ form: finalValue }, {
            onSuccess: () => {
                form.reset();
                // TODO: Redirect to new workspace
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
        }
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-=7">
                <CardTitle className="text-xl font-bold">
                    Create a new workspace
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Workspace Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter workspace name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => {
                                    const value = field.value!;
                                    const imageSrc = value instanceof File ? URL.createObjectURL(value) : value
                                    return (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-5">
                                                {value ? (
                                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                                        <Image 
                                                            alt="Logo"
                                                            fill
                                                            className="object-cover"
                                                            src={imageSrc}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Avatar className="size-[72px]">
                                                        <AvatarFallback>
                                                            <ImageIcon className="ize-[36px] text-neutral-400" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="flex flex-col">
                                                    <p className="text-sm">Workspace Icon</p>
                                                    <p className="text-sm text-mute-foreground">
                                                        JPG, PNG, SVG, JPEG, max 1mb
                                                    </p>
                                                    <input 
                                                        className="hidden"
                                                        type="file"
                                                        accept=".jpg, .png, .jpeg, .svg"
                                                        ref={inputRef}
                                                        onChange={handleImageChange}
                                                        disabled={isPending}
                                                    />
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant="teritary"
                                                        size="xs"
                                                        className="w-fit mt-2"
                                                        onClick={() => inputRef.current?.click()}
                                                    >
                                                        Upload Image
                                                    </Button>
                                                </div>                                                
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <DottedSeparator className="py-7" />
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                size="lg"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isPending}
                                >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isPending}
                            >
                                Create Workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};