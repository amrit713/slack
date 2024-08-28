import { Button } from "@/components/ui/button"
import { AuthScreen } from "@/features/auth/components/auth-screen"

export default function Home() {
    return (
        <div className="contents text-clip font-sans text-red-950">
            hello world
            <AuthScreen />
        </div>
    )
}
