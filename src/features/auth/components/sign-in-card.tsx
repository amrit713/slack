"use client"

import { useState } from "react"
import { useAuthActions } from "@convex-dev/auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignInFlow } from "../types"

type props = {
    setState: (state: SignInFlow) => void
}

export const SignInCard = ({ setState }: props) => {
    const { signIn } = useAuthActions()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pending, setPending] = useState(false)
    const [error, setError] = useState("")

    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPending(true)
        signIn("password", { email, password, flow: "signIn" })
            .catch(() => {
                setError("Invalid email or password")
            })
            .finally(() => {
                setPending(false)
            })

        setTimeout(() => {
            setError("")
        }, 5000)
    }

    const handleProviderSignIn = (value: "github" | "google") => {
        setPending(true)
        signIn(value).finally(() => {
            setPending(false)
        })
    }

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Login to continue</CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>

            {!!error && (
                <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5" onSubmit={onPasswordSignIn}>
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type="email"
                        placeholder="Email"
                        required
                    />

                    <Input
                        disabled={pending}
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
                        disabled={pending}
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
                        disabled={pending}
                        onClick={() => handleProviderSignIn("google")}
                    >
                        <FcGoogle className="absolute left-2.5 top-2.5 size-5" />
                        Continue with Google
                    </Button>

                    <Button
                        type="submit"
                        className="relative w-full"
                        size={"lg"}
                        variant={"outline"}
                        disabled={pending}
                        onClick={() => handleProviderSignIn("github")}
                    >
                        <FaGithub className="absolute left-2.5 top-3 size-5" />
                        Continue with Github
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        Don't hava an account?
                        <span
                            onClick={() => {
                                setState("signUp")
                            }}
                            className="cursor-pointer font-semibold text-sky-700 hover:underline"
                        >
                            Sign up
                        </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
