import Image from "next/image";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProjectAvatarProps {
    image?: string;
    name: string;
    className?: string;
    fallBackClassName?: string,
};

export const ProjectAvatar = ({ image, name, className, fallBackClassName }: ProjectAvatarProps) => {
    if (image) {
        return (
            <div className={cn(
                "size-5 relative rounded-md orverflow-hidden",
                className
            )}>
                <Image src={image} alt={name} fill className="object-cover rounded-md" />
            </div>
        )
    };

    return (
        <Avatar className={cn(
            "size-5 rounded-md",
            className
        )}>
            <AvatarFallback className={cn(
                "text-white bg-blue-600 font-semibold text-sm uppercase rounded-md",
                fallBackClassName
            )}>
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
}