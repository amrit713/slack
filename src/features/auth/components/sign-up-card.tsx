"use client"
import { useState } from "react"
import { useAuthActions } from "@convex-dev/auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignInFlow } from "../types"

type props = {
    setState: (state: SignInFlow) => void
}

export const SignUpCard = ({ setState }: props) => {
    const { signIn } = useAuthActions()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confrimPassword, setConfirmPassword] = useState("")

    const [pending, setPending] = useState(false)
    const [error, setError] = useState("")

    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confrimPassword) {
            setError("password don match match")
            return
        }
        setPending(true)
        signIn("password", { name, email, password, flow: "signUp" })
            .catch(() => {
                setError("Something went wrong")
            })
            .finally(() => {
                setPending(false)
            })

        setTimeout(() => {
            setError("")
        }, 5000)
    }
    const handleProviderSignUp = (value: "github" | "google") => {
        setPending(true)
        signIn(value).finally(() => {
            setPending(false)
        })
    }

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Sign up to continue</CardTitle>
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
                <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
                    <Input
                        disabled={pending}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        type="text"
                        placeholder="Full Name"
                        required
                    />
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
                    <Input
                        disabled={pending}
                        value={confrimPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                        type="password"
                        placeholder="Confirm password"
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
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        type="submit"
                        className="relative w-full"
                        size={"lg"}
                        variant={"outline"}
                        disabled={pending}
                        onClick={() => handleProviderSignUp("google")}
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
                        onClick={() => handleProviderSignUp("github")}
                    >
                        <FaGithub className="absolute left-2.5 top-3 size-5" />
                        Continue with Github
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        Already have an account?
                        <span
                            onClick={() => {
                                setState("signIn")
                            }}
                            className="cursor-pointer font-semibold text-sky-600 hover:underline"
                        >
                            Sign in
                        </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
