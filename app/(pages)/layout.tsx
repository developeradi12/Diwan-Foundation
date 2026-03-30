import { Footer } from "@/components/sections/Footer"
import Navbar from "@/components/sections/Navbar"

export default function PagesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </>
    )
}