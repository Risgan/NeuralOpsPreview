"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Factory,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Play,
  Pause,
  AlertTriangle,
  Clock,
  FileText,
  BarChart3,
  TrendingUp,
  Package,
} from "lucide-react"

const productionOrders = [
  {
    id: "OP-2024-001",
    product: "Producto A - Lote 001",
    quantity: 1000,
    produced: 750,
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    status: "En Proceso",
    priority: "Alta",
    operator: "Juan Pérez",
    machine: "Línea 1",
    avatar: "/placeholder.svg?height=32&width=32",
    specifications: "Especificaciones técnicas del producto A",
    notes: "Producción normal, sin incidencias",
  },
  {
    id: "OP-2024-002",
    product: "Producto B - Lote 002",
    quantity: 500,
    produced: 500,
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    status: "Completada",
    priority: "Media",
    operator: "María González",
    machine: "Línea 2",
    avatar: "/placeholder.svg?height=32&width=32",
    specifications: "Especificaciones técnicas del producto B",
    notes: "Completada exitosamente",
  },
  {
    id: "OP-2024-003",
    product: "Producto C - Lote 003",
    quantity: 800,
    produced: 0,
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    status: "Programada",
    priority: "Baja",
    operator: "John Rueda",
    machine: "Línea 3",
    avatar: "/placeholder.svg?height=32&width=32",
    specifications: "Especificaciones técnicas del producto C",
    notes: "Pendiente de inicio",
  },
]

const events = [
  {
    id: 1,
    orderId: "OP-2024-001",
    type: "Avance",
    description: "Producción completada al 75%",
    timestamp: "2024-01-17 14:30",
    operator: "Juan Pérez",
    quantity: 750,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    orderId: "OP-2024-001",
    type: "Parada",
    description: "Parada programada para mantenimiento",
    timestamp: "2024-01-17 12:00",
    operator: "Juan Pérez",
    duration: "30 min",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    orderId: "OP-2024-002",
    type: "Falla",
    description: "Falla en sensor de temperatura",
    timestamp: "2024-01-16 09:15",
    operator: "María González",
    resolution: "Sensor reemplazado",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    orderId: "OP-2024-002",
    type: "Completado",
    description: "Orden de producción completada",
    timestamp: "2024-01-15 16:45",
    operator: "María González",
    quantity: 500,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const reports = [
  {
    id: 1,
    name: "Reporte de Producción Diaria - 17/01/2024",
    type: "Producción",
    generatedBy: "Sistema",
    date: "2024-01-17",
    status: "Completado",
  },
  {
    id: 2,
    name: "Análisis de Eficiencia - Enero 2024",
    type: "Eficiencia",
    generatedBy: "John Rueda",
    date: "2024-01-16",
    status: "En Proceso",
  },
  {
    id: 3,
    name: "Reporte de Paradas - Semana 3",
    type: "Paradas",
    generatedBy: "María González",
    date: "2024-01-15",
    status: "Completado",
  },
]

const stats = [
  {
    title: "Órdenes Activas",
    value: "8",
    change: "+2",
    icon: Factory,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Eficiencia Promedio",
    value: "94.5%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Productos Terminados",
    value: "1,250",
    change: "+156",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Tiempo de Parada",
    value: "2.3h",
    change: "-0.5h",
    icon: Pause,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export default function ProduccionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false)
  const [isNewEventOpen, setIsNewEventOpen] = useState(false)
  const [isNewReportOpen, setIsNewReportOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const [newOrder, setNewOrder] = useState({
    product: "",
    quantity: "",
    startDate: "",
    endDate: "",
    priority: "",
    operator: "",
    machine: "",
    specifications: "",
    notes: "",
  })

  const [newEvent, setNewEvent] = useState({
    orderId: "",
    type: "",
    description: "",
    quantity: "",
    duration: "",
    resolution: "",
  })

  const [newReport, setNewReport] = useState({
    name: "",
    type: "",
    dateFrom: "",
    dateTo: "",
    includeOrders: true,
    includeEvents: true,
    includeEfficiency: false,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Proceso":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Completada":
        return "bg-green-100 text-green-800 border-green-200"
      case "Programada":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Pausada":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800 border-red-200"
      case "Media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Baja":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Avance":
        return <Play className="h-4 w-4 text-green-500" />
      case "Parada":
        return <Pause className="h-4 w-4 text-yellow-500" />
      case "Falla":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Completado":
        return <Factory className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleSubmitOrder = () => {
    console.log("Nueva orden:", newOrder)
    setIsNewOrderOpen(false)
    setNewOrder({
      product: "",
      quantity: "",
      startDate: "",
      endDate: "",
      priority: "",
      operator: "",
      machine: "",
      specifications: "",
      notes: "",
    })
  }

  const handleSubmitEvent = () => {
    console.log("Nuevo evento:", newEvent)
    setIsNewEventOpen(false)
    setNewEvent({
      orderId: "",
      type: "",
      description: "",
      quantity: "",
      duration: "",
      resolution: "",
    })
  }

  const handleSubmitReport = () => {
    console.log("Nuevo reporte:", newReport)
    setIsNewReportOpen(false)
    setNewReport({
      name: "",
      type: "",
      dateFrom: "",
      dateTo: "",
      includeOrders: true,
      includeEvents: true,
      includeEfficiency: false,
    })
  }

  const toggleOrderStatus = (order) => {
    const newStatus = order.status === "En Proceso" ? "Pausada" : "En Proceso"
    console.log(`Cambiando estado de ${order.id} a ${newStatus}`)
    // Aquí actualizarías el estado en la base de datos
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Módulo de Producción</h1>
              <p className="text-neuralops-beige text-lg">Gestiona órdenes de producción, eventos y reportes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Factory className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 -mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neuralops-medium-blue">{stat.title}</p>
                    <p className="text-2xl font-bold text-neuralops-dark-blue">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} vs mes anterior</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger
              value="orders"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <Factory className="h-4 w-4" />
              Órdenes
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4" />
              Eventos
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <Factory className="h-5 w-5" />
                      Órdenes de Producción
                    </CardTitle>
                    <CardDescription>Gestiona las órdenes de producción activas</CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar órdenes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 border-neuralops-very-light-blue focus:border-neuralops-gold focus:ring-neuralops-gold"
                      />
                    </div>
                    <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                          <Plus className="h-4 w-4 mr-2" />
                          Nueva Orden
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Nueva Orden de Producción</DialogTitle>
                          <DialogDescription>
                            Completa la información para crear una nueva orden de producción
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="product">Producto</Label>
                              <Input
                                id="product"
                                value={newOrder.product}
                                onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                                placeholder="Nombre del producto y lote"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quantity">Cantidad</Label>
                              <Input
                                id="quantity"
                                type="number"
                                value={newOrder.quantity}
                                onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="startDate">Fecha de Inicio</Label>
                              <Input
                                id="startDate"
                                type="date"
                                value={newOrder.startDate}
                                onChange={(e) => setNewOrder({ ...newOrder, startDate: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="endDate">Fecha de Fin</Label>
                              <Input
                                id="endDate"
                                type="date"
                                value={newOrder.endDate}
                                onChange={(e) => setNewOrder({ ...newOrder, endDate: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="priority">Prioridad</Label>
                              <Select
                                value={newOrder.priority}
                                onValueChange={(value) => setNewOrder({ ...newOrder, priority: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar prioridad" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="alta">Alta</SelectItem>
                                  <SelectItem value="media">Media</SelectItem>
                                  <SelectItem value="baja">Baja</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="operator">Operador</Label>
                              <Select
                                value={newOrder.operator}
                                onValueChange={(value) => setNewOrder({ ...newOrder, operator: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar operador" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="juan-perez">Juan Pérez</SelectItem>
                                  <SelectItem value="maria-gonzalez">María González</SelectItem>
                                  <SelectItem value="carlos-mendoza">John Rueda</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="machine">Máquina/Línea</Label>
                              <Select
                                value={newOrder.machine}
                                onValueChange={(value) => setNewOrder({ ...newOrder, machine: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar línea" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="linea-1">Línea 1</SelectItem>
                                  <SelectItem value="linea-2">Línea 2</SelectItem>
                                  <SelectItem value="linea-3">Línea 3</SelectItem>
                                  <SelectItem value="linea-4">Línea 4</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="specifications">Especificaciones Técnicas</Label>
                            <Textarea
                              id="specifications"
                              value={newOrder.specifications}
                              onChange={(e) => setNewOrder({ ...newOrder, specifications: e.target.value })}
                              placeholder="Especificaciones técnicas del producto"
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Notas Adicionales</Label>
                            <Textarea
                              id="notes"
                              value={newOrder.notes}
                              onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                              placeholder="Notas o comentarios adicionales"
                              rows={2}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsNewOrderOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleSubmitOrder} className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                            Crear Orden
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {productionOrders.map((order) => (
                    <Card
                      key={order.id}
                      className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-neuralops-gold/20">
                              <Factory className="h-6 w-6 text-neuralops-gold" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-neuralops-dark-blue text-lg">{order.id}</h3>
                                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                                <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                              </div>
                              <p className="text-neuralops-dark-blue font-medium">{order.product}</p>
                              <p className="text-neuralops-medium-blue text-sm">{order.machine}</p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="hover:bg-neuralops-beige/20">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedOrder(order)
                                  setIsEditMode(true)
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleOrderStatus(order)}>
                                {order.status === "En Proceso" ? (
                                  <>
                                    <Pause className="h-4 w-4 mr-2" />
                                    Pausar
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-4 w-4 mr-2" />
                                    Iniciar
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-neuralops-medium-blue">Progreso</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={(order.produced / order.quantity) * 100} className="flex-1 h-2" />
                              <span className="text-sm font-medium text-neuralops-dark-blue">
                                {Math.round((order.produced / order.quantity) * 100)}%
                              </span>
                            </div>
                            <p className="text-xs text-neuralops-medium-blue mt-1">
                              {order.produced}/{order.quantity} unidades
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-neuralops-medium-blue">Operador</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={order.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-neuralops-gold text-white text-xs">
                                  {order.operator
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-neuralops-dark-blue">{order.operator}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-neuralops-medium-blue">Fechas</p>
                            <p className="text-sm text-neuralops-dark-blue mt-1">
                              {order.startDate} - {order.endDate}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Registro de Eventos
                    </CardTitle>
                    <CardDescription>Historial de eventos de producción</CardDescription>
                  </div>
                  <Dialog open={isNewEventOpen} onOpenChange={setIsNewEventOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                        <Plus className="h-4 w-4 mr-2" />
                        Registrar Evento
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Registrar Nuevo Evento</DialogTitle>
                        <DialogDescription>Registra un evento relacionado con la producción</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="orderId">Orden de Producción</Label>
                            <Select
                              value={newEvent.orderId}
                              onValueChange={(value) => setNewEvent({ ...newEvent, orderId: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar orden" />
                              </SelectTrigger>
                              <SelectContent>
                                {productionOrders.map((order) => (
                                  <SelectItem key={order.id} value={order.id}>
                                    {order.id} - {order.product}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Tipo de Evento</Label>
                            <Select
                              value={newEvent.type}
                              onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="avance">Avance</SelectItem>
                                <SelectItem value="parada">Parada</SelectItem>
                                <SelectItem value="falla">Falla</SelectItem>
                                <SelectItem value="completado">Completado</SelectItem>
                                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Descripción</Label>
                          <Textarea
                            id="description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            placeholder="Descripción detallada del evento"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="quantity">Cantidad (opcional)</Label>
                            <Input
                              id="quantity"
                              type="number"
                              value={newEvent.quantity}
                              onChange={(e) => setNewEvent({ ...newEvent, quantity: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="duration">Duración (opcional)</Label>
                            <Input
                              id="duration"
                              value={newEvent.duration}
                              onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                              placeholder="30 min"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="resolution">Resolución (opcional)</Label>
                            <Input
                              id="resolution"
                              value={newEvent.resolution}
                              onChange={(e) => setNewEvent({ ...newEvent, resolution: e.target.value })}
                              placeholder="Acción tomada"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewEventOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSubmitEvent} className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                          Registrar Evento
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 p-4 border rounded-lg border-neuralops-very-light-blue hover:bg-neuralops-beige/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      {getEventIcon(event.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-neuralops-dark-blue">{event.type}</span>
                          <Badge variant="outline" className="text-xs border-neuralops-gold text-neuralops-gold">
                            {event.orderId}
                          </Badge>
                        </div>
                        <p className="text-neuralops-dark-blue">{event.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-neuralops-medium-blue">
                          <span>{event.timestamp}</span>
                          <div className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={event.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-neuralops-gold text-white text-xs">
                                {event.operator
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{event.operator}</span>
                          </div>
                          {event.quantity && <span>Cantidad: {event.quantity}</span>}
                          {event.duration && <span>Duración: {event.duration}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Reportes de Producción
                    </CardTitle>
                    <CardDescription>Genera y consulta reportes del área</CardDescription>
                  </div>
                  <Dialog open={isNewReportOpen} onOpenChange={setIsNewReportOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                        <Plus className="h-4 w-4 mr-2" />
                        Generar Reporte
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Generar Nuevo Reporte</DialogTitle>
                        <DialogDescription>
                          Configura los parámetros para generar un reporte personalizado
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="reportName">Nombre del Reporte</Label>
                          <Input
                            id="reportName"
                            value={newReport.name}
                            onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                            placeholder="Ej: Reporte de Producción Semanal"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reportType">Tipo de Reporte</Label>
                          <Select
                            value={newReport.type}
                            onValueChange={(value) => setNewReport({ ...newReport, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="produccion">Producción</SelectItem>
                              <SelectItem value="eficiencia">Eficiencia</SelectItem>
                              <SelectItem value="paradas">Paradas</SelectItem>
                              <SelectItem value="eventos">Eventos</SelectItem>
                              <SelectItem value="completo">Reporte Completo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="dateFrom">Fecha Desde</Label>
                            <Input
                              id="dateFrom"
                              type="date"
                              value={newReport.dateFrom}
                              onChange={(e) => setNewReport({ ...newReport, dateFrom: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dateTo">Fecha Hasta</Label>
                            <Input
                              id="dateTo"
                              type="date"
                              value={newReport.dateTo}
                              onChange={(e) => setNewReport({ ...newReport, dateTo: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Label>Incluir en el Reporte</Label>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="includeOrders"
                                checked={newReport.includeOrders}
                                onChange={(e) => setNewReport({ ...newReport, includeOrders: e.target.checked })}
                                className="rounded border-neuralops-very-light-blue"
                              />
                              <Label htmlFor="includeOrders" className="text-sm">
                                Órdenes de Producción
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="includeEvents"
                                checked={newReport.includeEvents}
                                onChange={(e) => setNewReport({ ...newReport, includeEvents: e.target.checked })}
                                className="rounded border-neuralops-very-light-blue"
                              />
                              <Label htmlFor="includeEvents" className="text-sm">
                                Eventos y Paradas
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="includeEfficiency"
                                checked={newReport.includeEfficiency}
                                onChange={(e) => setNewReport({ ...newReport, includeEfficiency: e.target.checked })}
                                className="rounded border-neuralops-very-light-blue"
                              />
                              <Label htmlFor="includeEfficiency" className="text-sm">
                                Métricas de Eficiencia
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewReportOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSubmitReport} className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                          Generar Reporte
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre del Reporte</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Generado Por</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-neuralops-beige/5">
                        <TableCell className="font-medium text-neuralops-dark-blue">{report.name}</TableCell>
                        <TableCell className="text-neuralops-medium-blue">{report.type}</TableCell>
                        <TableCell className="text-neuralops-medium-blue">{report.generatedBy}</TableCell>
                        <TableCell className="text-neuralops-medium-blue">{report.date}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === "Completado" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="hover:bg-neuralops-beige/20">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedReport(report)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Reporte
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Descargar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal para Ver Detalles de Orden */}
      <Dialog open={!!selectedOrder && !isEditMode} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de Orden - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Información completa de la orden de producción</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Producto</Label>
                  <p className="text-neuralops-dark-blue">{selectedOrder.product}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Cantidad</Label>
                  <p className="text-neuralops-dark-blue">{selectedOrder.quantity} unidades</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Producido</Label>
                  <p className="text-neuralops-dark-blue">{selectedOrder.produced} unidades</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Progreso</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={(selectedOrder.produced / selectedOrder.quantity) * 100} className="flex-1 h-2" />
                    <span className="text-sm font-medium text-neuralops-dark-blue">
                      {Math.round((selectedOrder.produced / selectedOrder.quantity) * 100)}%
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Operador</Label>
                  <p className="text-neuralops-dark-blue">{selectedOrder.operator}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Máquina/Línea</Label>
                  <p className="text-neuralops-dark-blue">{selectedOrder.machine}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Estado</Label>
                  <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Prioridad</Label>
                  <Badge className={getPriorityColor(selectedOrder.priority)}>{selectedOrder.priority}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Fecha de Inicio</Label>
                  <p className="text-neuralops-dark-blue">{selectedOrder.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Fecha de Fin</Label>
                  <p className="text-neuralops-dark-blue">{selectedOrder.endDate}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-neuralops-medium-blue">Especificaciones Técnicas</Label>
                <p className="text-neuralops-dark-blue mt-1">{selectedOrder.specifications}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-neuralops-medium-blue">Notas</Label>
                <p className="text-neuralops-dark-blue mt-1">{selectedOrder.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
              Cerrar
            </Button>
            <Button
              onClick={() => toggleOrderStatus(selectedOrder)}
              className="bg-neuralops-gold hover:bg-neuralops-gold/90"
            >
              {selectedOrder?.status === "En Proceso" ? "Pausar Orden" : "Iniciar Orden"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Ver Detalles de Evento */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Evento</DialogTitle>
            <DialogDescription>Información completa del evento de producción</DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-neuralops-gold/20">{getEventIcon(selectedEvent.type)}</div>
                <div>
                  <h3 className="text-xl font-semibold text-neuralops-dark-blue">{selectedEvent.type}</h3>
                  <p className="text-neuralops-medium-blue">{selectedEvent.orderId}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Descripción</Label>
                  <p className="text-neuralops-dark-blue">{selectedEvent.description}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Fecha y Hora</Label>
                  <p className="text-neuralops-dark-blue">{selectedEvent.timestamp}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Operador</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={selectedEvent.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-neuralops-gold text-white text-xs">
                        {selectedEvent.operator
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-neuralops-dark-blue">{selectedEvent.operator}</span>
                  </div>
                </div>
                {selectedEvent.quantity && (
                  <div>
                    <Label className="text-sm font-medium text-neuralops-medium-blue">Cantidad</Label>
                    <p className="text-neuralops-dark-blue">{selectedEvent.quantity} unidades</p>
                  </div>
                )}
                {selectedEvent.duration && (
                  <div>
                    <Label className="text-sm font-medium text-neuralops-medium-blue">Duración</Label>
                    <p className="text-neuralops-dark-blue">{selectedEvent.duration}</p>
                  </div>
                )}
                {selectedEvent.resolution && (
                  <div>
                    <Label className="text-sm font-medium text-neuralops-medium-blue">Resolución</Label>
                    <p className="text-neuralops-dark-blue">{selectedEvent.resolution}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Ver Detalles de Reporte */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Reporte</DialogTitle>
            <DialogDescription>Información del reporte de producción</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-neuralops-gold/20">
                  <FileText className="h-6 w-6 text-neuralops-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neuralops-dark-blue">{selectedReport.name}</h3>
                  <p className="text-neuralops-medium-blue">{selectedReport.type}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Generado Por</Label>
                  <p className="text-neuralops-dark-blue">{selectedReport.generatedBy}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Fecha de Generación</Label>
                  <p className="text-neuralops-dark-blue">{selectedReport.date}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Estado</Label>
                  <Badge variant={selectedReport.status === "Completado" ? "default" : "secondary"}>
                    {selectedReport.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-neuralops-beige/10 rounded-lg">
                <Label className="text-sm font-medium text-neuralops-medium-blue">Resumen del Reporte</Label>
                <p className="text-neuralops-dark-blue mt-1">
                  Este reporte contiene información detallada sobre {selectedReport.type.toLowerCase()} para el período
                  especificado. Incluye métricas, gráficos y análisis relevantes.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Cerrar
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">Descargar PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
