"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Users, Shield, TrendingUp, BarChart3, Clock, ChevronRight, Activity } from "lucide-react"

const quickActions = [
  {
    title: "Nueva Orden de Compra",
    description: "Crear una nueva solicitud de compra",
    icon: ShoppingCart,
    color: "bg-blue-500",
    href: "/dashboard/compras",
  },
  {
    title: "Reporte de Producción",
    description: "Ver métricas de producción del día",
    icon: BarChart3,
    color: "bg-green-500",
    href: "/dashboard/produccion",
  },
  {
    title: "Gestión de Personal",
    description: "Administrar empleados y horarios",
    icon: Users,
    color: "bg-purple-500",
    href: "/dashboard/rrhh",
  },
  {
    title: "Incidentes SST",
    description: "Reportar incidente de seguridad",
    icon: Shield,
    color: "bg-red-500",
    href: "/dashboard/sst",
  },
]

const recentActivity = [
  {
    title: "Orden de compra #OC-2024-001 aprobada",
    time: "Hace 2 horas",
    type: "compras",
  },
  {
    title: "Nuevo empleado registrado: María González",
    time: "Hace 4 horas",
    type: "rrhh",
  },
  {
    title: "Producción diaria completada al 95%",
    time: "Hace 6 horas",
    type: "produccion",
  },
  {
    title: "Capacitación SST programada para mañana",
    time: "Hace 1 día",
    type: "sst",
  },
]

export default function DashboardPage() {
  const [user] = useState({
    name: "John Rueda",
    email: "info@neuralops.com",
    tenant: "NeuralOps S.A.S",
    plan: "Profesional",
  })

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-neuralops-dark-blue to-neuralops-medium-blue rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido, {user.name.split(" ")[0]}!</h1>
          <p className="text-neuralops-beige">Aquí tienes un resumen de la actividad de hoy en {user.tenant}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neuralops-medium-blue">Órdenes Pendientes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-neuralops-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neuralops-dark-blue">12</div>
              <p className="text-xs text-neuralops-medium-blue">+2 desde ayer</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neuralops-medium-blue">Producción Hoy</CardTitle>
              <TrendingUp className="h-4 w-4 text-neuralops-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neuralops-dark-blue">95%</div>
              <p className="text-xs text-neuralops-medium-blue">Meta: 90%</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neuralops-medium-blue">Empleados Activos</CardTitle>
              <Users className="h-4 w-4 text-neuralops-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neuralops-dark-blue">248</div>
              <p className="text-xs text-neuralops-medium-blue">+3 este mes</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neuralops-medium-blue">Incidentes SST</CardTitle>
              <Shield className="h-4 w-4 text-neuralops-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neuralops-dark-blue">1</div>
              <p className="text-xs text-neuralops-medium-blue">-2 vs mes anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-neuralops-dark-blue">Accesos Rápidos</CardTitle>
              <CardDescription>Acciones frecuentes para agilizar tu trabajo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-neuralops-very-light-blue hover:bg-neuralops-beige/10 cursor-pointer transition-colors group">
                    <div className={`p-2 rounded-lg ${action.color} group-hover:scale-105 transition-transform`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-neuralops-dark-blue">{action.title}</h4>
                      <p className="text-sm text-neuralops-medium-blue">{action.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-neuralops-medium-blue group-hover:text-neuralops-gold transition-colors" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-neuralops-dark-blue">Actividad Reciente</CardTitle>
              <CardDescription>Últimas actualizaciones del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 hover:bg-neuralops-beige/5 p-2 rounded-lg transition-colors"
                >
                  <div className="p-1 rounded-full bg-neuralops-gold/20 mt-1">
                    <Activity className="h-3 w-3 text-neuralops-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neuralops-dark-blue">{activity.title}</p>
                    <div className="flex items-center gap-1 text-xs text-neuralops-medium-blue">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
