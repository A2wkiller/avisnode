import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Link, useLocation, useNavigate } from "react-router"
import { LucideIcon } from "lucide-react"
import { cn } from "./utils"
import { toast } from "sonner"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
    comingSoon?: boolean
}

interface NavBarProps {
    items: NavItem[]
    className?: string
    defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const pathname = location.pathname
    const [mounted, setMounted] = useState(false)
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)

    const initialActive = items.find(item => item.url === pathname)?.name || defaultActive
    const [activeTab, setActiveTab] = useState<string>(initialActive)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const matched = items.find(item => item.url === pathname)
        if (matched) setActiveTab(matched.name)
    }, [pathname, items])

    if (!mounted) return null

    return (
        <div className={cn("fixed top-5 left-0 right-0 z-[9999]", className)}>
            <div className="flex justify-center pt-6">
                <motion.div
                    className="flex items-center gap-3 relative py-2 px-2 glass-effect-pill"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.name
                        const isHovered = hoveredTab === item.name

                        return (
                            <a
                                key={item.name}
                                href={item.url}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (item.comingSoon) {
                                        toast.info(`${item.name} is coming soon!`)
                                        return
                                    }
                                    setActiveTab(item.name)
                                    navigate(item.url)
                                }}
                                onMouseEnter={() => setHoveredTab(item.name)}
                                onMouseLeave={() => setHoveredTab(null)}
                                className={cn(
                                    "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                                    "text-white/70 hover:text-white",
                                    isActive && "text-white flex items-center gap-2"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0.3, 0.5, 0.3],
                                            scale: [1, 1.03, 1]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-teal-500/25 rounded-full blur-md" />
                                        <div className="absolute inset-[-4px] bg-teal-500/20 rounded-full blur-xl" />
                                        <div className="absolute inset-[-8px] bg-teal-500/15 rounded-full blur-2xl" />
                                        <div className="absolute inset-[-12px] bg-teal-500/5 rounded-full blur-3xl" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 animate-shine" />
                                    </motion.div>
                                )}

                                <span className="hidden md:flex items-center gap-1.5 relative z-10">
                                    <span>{item.name}</span>
                                    {item.comingSoon && (
                                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 uppercase tracking-wider border border-teal-500/20 whitespace-nowrap">
                                            Soon
                                        </span>
                                    )}
                                </span>

                                <span className="md:hidden relative z-10" tabIndex={0}>
                                    <Icon size={18} strokeWidth={2.5} />
                                </span>
                            </a>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}
