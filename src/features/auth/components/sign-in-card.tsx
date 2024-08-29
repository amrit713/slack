"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignInFlow } from "../types"
import { useState } from "react"

type props = {
    setState: (state: SignInFlow) => void
}

export const SignInCard = ({ setState }: props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Login to continue</CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>

            <form className="space-y-2.5">
                <Input
                    disabled={false}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    type="email"
                    placeholder="Email"
                    required
                />

                <Input
                    disabled={false}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    type="password"
                    placeholder="Password"
                    required
                />

                <Button
                    type="submit"
                    className="w-full"
                    size={"lg"}
                    disabled={false}
                >
                    Continue
                </Button>
            </form>
            <Separator className="my-4" />
            <div className="flex flex-col gap-y-2.5">
                <Button
                    type="submit"
                    className="relative w-full"
                    size={"lg"}
                    variant={"outline"}
                    disabled={false}
                >
                    <FcGoogle className="absolute left-2.5 top-2.5 size-5" />
                    Continue with Google
                </Button>

                <Button
                    type="submit"
                    className="relative w-full"
                    size={"lg"}
                    variant={"outline"}
                    disabled={false}
                >
                    <FaGithub className="absolute left-2.5 top-3 size-5" />
                    Continue with Google
                </Button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
                Don't hava an account?
                <span
                    onClick={() => {
                        setState("signUp")
                    }}
                    className="cursor-pointer text-sky-700 hover:underline"
                >
                    Sign up
                </span>
            </p>
        </Card>
    )
}
