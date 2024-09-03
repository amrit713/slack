"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "../hooks/use-current-user"
import { Loader, LogOut, UserIcon } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"

export const UserButton = () => {
    const { data, isLoading } = useCurrentUser()
    const { signOut } = useAuthActions()

    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    }

    if (!data) {
        return null
    }

    const { image, name } = data

    const avatarFallback = name!.charAt(0).toUpperCase()
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="relative outline-none">
                <Avatar className="transtion size-10 hover:opacity-75">
                    <AvatarImage alt={"name"} src={image} />
                    <AvatarFallback className="bg-indigo-600 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <p className="flex items-center gap-4 p-2 text-lg font-semibold capitalize">
                    <UserIcon className="size-4" />
                    {name}
                </p>

                <DropdownMenuItem onClick={() => signOut()} className="h-10">
                    <LogOut className="mr-2 size-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
