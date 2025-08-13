"use client"

import type React from "react"

import { useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ShoppingCart,
  Factory,
  Users,
  Shield,
  Settings,
  User,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Headphones,
  DollarSign,
  Building2,
  Package,
  Wrench,
  Scale,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Ventas",
    icon: TrendingUp,
    url: "/dashboard/ventas",
    badge: "5",
  },
  {
    title: "Operaciones",
    icon: Headphones,
    url: "/dashboard/operaciones",
    badge: "8",
  },
  {
    title: "Finanzas",
    icon: DollarSign,
    url: "/dashboard/finanzas",
    badge: "2",
  },
  {
    title: "Inventario",
    icon: Package,
    url: "/dashboard/inventario",
    badge: "15",
  },
  {
    title: "Herramientas",
    icon: Wrench,
    url: "/dashboard/herramientas",
    badge: "4",
  },
  {
    title: "Compras",
    icon: ShoppingCart,
    url: "/dashboard/compras",
    badge: "3",
  },
  {
    title: "Producción",
    icon: Factory,
    url: "/dashboard/produccion",
    badge: null,
  },
  {
    title: "RRHH",
    icon: Users,
    url: "/dashboard/rrhh",
    badge: "12",
  },
  {
    title: "SST",
    icon: Shield,
    url: "/dashboard/sst",
    badge: "1",
  },
  {
    title: "Gerencia",
    icon: Building2,
    url: "/dashboard/gerencia",
    badge: null,
  },
  {
    title: "Legal",
    icon: Scale,
    url: "/dashboard/legal",
    badge: "3",
  },
  {
    title: "Administración",
    icon: Settings,
    url: "/dashboard/configuracion",
    badge: null,
  },
]

function AppSidebar({ isTextVisible, toggleText }: { isTextVisible: boolean; toggleText: () => void }) {
  const pathname = usePathname()
  const [user] = useState({
    name: "John Rueda",
    email: "info@neuralops.com",
    tenant: "NeuralOps S.A.S",
    plan: "Profesional",
  })

  const SidebarButton = ({ item }: { item: (typeof sidebarItems)[0] }) => {
    const isActive = pathname === item.url

    const buttonContent = (
      <Link
        href={item.url}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group w-full
          ${
            isActive
              ? "bg-neuralops-gold text-white shadow-md"
              : "text-neuralops-medium-blue hover:bg-neuralops-beige/20 hover:text-neuralops-dark-blue"
          }
        `}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        <span
          className={`font-medium transition-all duration-200 ${isTextVisible ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
        >
          {item.title}
        </span>
        {item.badge && isTextVisible && (
          <Badge
            variant="secondary"
            className={`ml-auto text-xs transition-all duration-200 ${
              isActive ? "bg-white/20 text-white" : "bg-neuralops-gold text-white"
            }`}
          >
            {item.badge}
          </Badge>
        )}
      </Link>
    )

    if (!isTextVisible) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
            <TooltipContent side="right" className="bg-neuralops-dark-blue text-white">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return buttonContent
  }

  return (
    <div
      className={`h-full bg-white border-r border-neuralops-very-light-blue flex flex-col transition-all duration-300 ${isTextVisible ? "w-64" : "w-16"}`}
    >
      {/* Header */}
      <div className="border-b border-neuralops-very-light-blue p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isTextVisible ? (
            <Link href="/dashboard">
              <Image src="/logo.png" alt="NeuralOps" width={120} height={40} className="h-8 w-auto" />
            </Link>
          ) : (
            <Link href="/dashboard" className="w-8 h-8 bg-neuralops-gold rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </Link>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleText}
          className="h-8 w-8 text-neuralops-medium-blue hover:text-neuralops-dark-blue hover:bg-neuralops-beige/20"
        >
          {isTextVisible ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {isTextVisible && (
            <h3 className="text-xs font-semibold text-neuralops-medium-blue uppercase tracking-wider mb-4">
              Módulos Principales
            </h3>
          )}
          {sidebarItems.map((item) => (
            <SidebarButton key={item.title} item={item} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neuralops-very-light-blue p-4">
        {isTextVisible ? (
          <div className="text-xs text-neuralops-medium-blue">
            <div className="font-semibold truncate">{user.tenant}</div>
            <div className="flex items-center justify-between mt-1">
              <span>Plan {user.plan}</span>
              <Badge variant="outline" className="text-xs">
                Activo
              </Badge>
            </div>
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-8 h-8 rounded-full bg-neuralops-gold flex items-center justify-center text-white font-semibold text-xs cursor-pointer">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-neuralops-dark-blue text-white">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs opacity-80">{user.tenant}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user] = useState({
    name: "John Rueda",
    email: "info@neuralops.com",
    tenant: "NeuralOps S.A.S",
    plan: "Profesional",
  })

  const [isTextVisible, setIsTextVisible] = useState(true)

  const toggleText = () => {
    setIsTextVisible(!isTextVisible)
  }

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <AppSidebar isTextVisible={isTextVisible} toggleText={toggleText} />
      </Suspense>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-neuralops-very-light-blue bg-white px-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neuralops-medium-blue" />
              <input
                type="search"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 w-64 border border-neuralops-very-light-blue rounded-md focus:outline-none focus:ring-2 focus:ring-neuralops-gold focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-neuralops-medium-blue hover:text-neuralops-dark-blue relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-neuralops-dark-blue hover:bg-neuralops-beige/20"
                >
                  <div className="h-8 w-8 rounded-full bg-neuralops-gold flex items-center justify-center text-white font-semibold text-sm">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="font-medium hidden sm:block">{user.name}</span>
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
