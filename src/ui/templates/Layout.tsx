import { ReactNode } from "react"
import Header from '../organisms/Header';

interface LayoutProps {
    children: ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Header />
        {children}
    </div>
}