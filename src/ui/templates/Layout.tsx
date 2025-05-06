import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}


export const Layout = ({children}: LayoutProps) => {
    return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        {children}
    </div>
}