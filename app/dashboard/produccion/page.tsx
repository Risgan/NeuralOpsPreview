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
  Brain,
  Bot,
  Sparkles,
  Scan,
  Zap,
  Camera,
  Settings,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mic,
  Send,
  Route,
  Wrench,
  Calendar,
} from "lucide-react"

// Definiciones de tipos TypeScript
interface ProductionOrder {
  id: string
  product: string
  quantity: number
  produced: number
  startDate: string
  endDate: string
  status: string
  priority: string
  operator: string
  machine: string
  avatar: string
  specifications: string
  notes: string
}

interface ProductionEvent {
  id: number
  orderId: string
  type: string
  description: string
  timestamp: string
  operator: string
  quantity?: number
  duration?: string
  resolution?: string
  avatar: string
}

interface ProductionReport {
  id: number
  name: string
  type: string
  generatedBy: string
  date: string
  status: string
}

interface ChatMessage {
  sender: 'user' | 'bot'
  text: string
}

const productionOrders: ProductionOrder[] = [
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

const events: ProductionEvent[] = [
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

const reports: ProductionReport[] = [
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
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<ProductionEvent | null>(null)
  const [selectedReport, setSelectedReport] = useState<ProductionReport | null>(null)
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false)
  
  // Estados para funcionalidades de IA
  const [isOcrDialogOpen, setIsOcrDialogOpen] = useState(false)
  const [isPredictiveMaintenanceOpen, setIsPredictiveMaintenanceOpen] = useState(false)
  const [isProductionOptimizationOpen, setIsProductionOptimizationOpen] = useState(false)
  const [isQualityControlOpen, setIsQualityControlOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ocrFile, setOcrFile] = useState<File | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
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

  const toggleOrderStatus = (order: ProductionOrder) => {
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
              <Factory className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Funcionalidades IA */}
      <div className="flex justify-between items-center py-2 px-2">
        <div className="flex items-center gap-2">
        </div>
        <div className="flex gap-2">
          <div className="flex justify-between items-center py-2 px-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                <Sparkles className="h-3 w-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">Funciones IA</span>
              </div>
            </div>
          </div>

          {/* OCR para Órdenes */}
          <Dialog open={isOcrDialogOpen} onOpenChange={setIsOcrDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                <Scan className="h-4 w-4 mr-2" />
                OCR Órdenes
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  IA - Procesamiento OCR de Órdenes
                </DialogTitle>
                <DialogDescription>
                  Sube una imagen de orden de producción y la IA extraerá automáticamente los datos
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Arrastra una imagen aquí o haz clic para seleccionar
                  </p>
                  <Button variant="outline" className="border-purple-300 text-purple-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Seleccionar Archivo
                  </Button>
                </div>
                {isProcessing && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                      <span className="text-purple-700">Procesando imagen con IA...</span>
                    </div>
                  </div>
                )}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Datos Extraídos por IA:</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><strong>Producto:</strong> Bomba Centrífuga</div>
                    <div><strong>Orden #:</strong> OP-2025-001234</div>
                    <div><strong>Cantidad:</strong> 15 unidades</div>
                    <div><strong>Fecha Entrega:</strong> 2025-08-25</div>
                    <div className="col-span-2"><strong>Especificaciones:</strong> Acero inoxidable 316L, presión 150 PSI</div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOcrDialogOpen(false)}>Cancelar</Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Importar Datos</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Mantenimiento Predictivo */}
          <Dialog open={isPredictiveMaintenanceOpen} onOpenChange={setIsPredictiveMaintenanceOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                <Wrench className="h-4 w-4 mr-2" />
                Mantenimiento IA
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  IA - Análisis Predictivo de Mantenimiento
                </DialogTitle>
                <DialogDescription>
                  Predicciones inteligentes para el mantenimiento de equipos de producción
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-red-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-red-700">⚠️ Mantenimiento Urgente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-xs p-2 bg-red-50 rounded">
                        <strong>Línea A - Motor Principal:</strong> Vibración anormal detectada
                      </div>
                      <div className="text-xs p-2 bg-red-50 rounded">
                        <strong>Prensa Hidráulica #3:</strong> Presión inconsistente
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-yellow-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-yellow-700">📊 Mantenimiento Programado</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-xs p-2 bg-yellow-50 rounded">
                        <strong>Tornos CNC:</strong> Lubricación en 5 días
                      </div>
                      <div className="text-xs p-2 bg-yellow-50 rounded">
                        <strong>Sistema Neumático:</strong> Revisión filtros próxima semana
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPredictiveMaintenanceOpen(false)}>Cerrar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Programar Mantenimiento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Optimización de Producción */}
          <Dialog open={isProductionOptimizationOpen} onOpenChange={setIsProductionOptimizationOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                <Route className="h-4 w-4 mr-2" />
                Optimización IA
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-600" />
                  IA - Optimización de Producción
                </DialogTitle>
                <DialogDescription>
                  Optimización inteligente de líneas de producción y eficiencia
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Recomendaciones IA de Optimización:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <span className="font-medium text-sm">Redistribuir carga Línea A → B</span>
                        <div className="text-xs text-gray-600">Reducir tiempo de ciclo en 8%</div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-700 text-xs">Alta prioridad</Badge>
                        <div className="text-xs text-green-600">Ahorro: $12,000/mes</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <span className="font-medium text-sm">Ajustar secuencia de producción</span>
                        <div className="text-xs text-gray-600">Optimizar cambios de herramientas</div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-100 text-blue-700 text-xs">Media prioridad</Badge>
                        <div className="text-xs text-green-600">Ahorro: $5,800/mes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsProductionOptimizationOpen(false)}>Cerrar</Button>
                <Button className="bg-green-600 hover:bg-green-700">Aplicar Optimización</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Asistente IA */}
          <Dialog open={isChatbotOpen} onOpenChange={setIsChatbotOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Bot className="h-4 w-4 mr-2" />
                Asistente IA
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl h-[600px] flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  Asistente IA de Producción
                </DialogTitle>
                <DialogDescription>
                  Pregunta sobre órdenes, eficiencia, mantenimiento o cualquier consulta de producción
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-start">
                    <div className="max-w-xs px-4 py-2 rounded-lg bg-white border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="h-3 w-3 text-purple-600" />
                        <span className="text-xs font-medium text-purple-600">IA Assistant</span>
                      </div>
                      <p className="text-sm">¡Hola! Soy tu asistente IA de producción. ¿En qué puedo ayudarte?</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Pregunta sobre eficiencia, órdenes de producción, etc."
                    className="flex-1"
                  />
                  <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    ¿Estado de la Orden OP-001?
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    ¿Eficiencia de la Línea A?
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Próximos mantenimientos
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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

                    {/* Funcionalidades de IA - Estilo Inventario */}
                    {/* <Dialog open={isOcrDialogOpen} onOpenChange={setIsOcrDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                          <Scan className="h-4 w-4 mr-2" />
                          OCR Órdenes
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isPredictiveMaintenanceOpen} onOpenChange={setIsPredictiveMaintenanceOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                          <Wrench className="h-4 w-4 mr-2" />
                          IA Mantenimiento
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isProductionOptimizationOpen} onOpenChange={setIsProductionOptimizationOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                          <Route className="h-4 w-4 mr-2" />
                          IA Optimización
                        </Button>
                      </DialogTrigger>
                    </Dialog> */}
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
              onClick={() => selectedOrder && toggleOrderStatus(selectedOrder)}
              className="bg-neuralops-gold hover:bg-neuralops-gold/90"
              disabled={!selectedOrder}
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

      {/* Dialogo OCR para Órdenes de Trabajo - Estilo Inventario */}
      <Dialog open={isOcrDialogOpen} onOpenChange={setIsOcrDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              IA - Procesamiento OCR de Órdenes
            </DialogTitle>
            <DialogDescription>
              Sube una imagen de orden de trabajo y la IA extraerá automáticamente los datos
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Arrastra una imagen aquí o haz clic para seleccionar
              </p>
              <Button variant="outline" className="border-purple-300 text-purple-600">
                <Upload className="h-4 w-4 mr-2" />
                Seleccionar Archivo
              </Button>
            </div>
            
            {isProcessing && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                  <span className="text-purple-800">Procesando con IA... Extrayendo datos de la orden</span>
                </div>
              </div>
            )}

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Datos Extraídos por IA:
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Producto:</strong> Pieza Metálica A-100</span>
                  <Badge className="bg-green-100 text-green-700">96% confianza</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Cantidad:</strong> 250 unidades</span>
                  <Badge className="bg-blue-100 text-blue-700">94% confianza</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Operario:</strong> Carlos Mendoza</span>
                  <Badge className="bg-purple-100 text-purple-700">92% confianza</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Máquina:</strong> Torno CNC-05</span>
                  <Badge className="bg-orange-100 text-orange-700">88% confianza</Badge>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOcrDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="mr-2 h-4 w-4" />
              Crear Orden con IA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Optimización de Producción - Estilo Inventario */}
      <Dialog open={isProductionOptimizationOpen} onOpenChange={setIsProductionOptimizationOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-600" />
              IA - Optimización de Producción
            </DialogTitle>
            <DialogDescription>
              Optimiza secuencias de producción para maximizar eficiencia y reducir tiempos
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Route className="h-4 w-4" />
                  Secuencia Actual
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>1. Producto A:</strong></span>
                    <Badge className="bg-gray-100 text-gray-700">4h</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>2. Producto B:</strong></span>
                    <Badge className="bg-gray-100 text-gray-700">3h</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>3. Producto C:</strong></span>
                    <Badge className="bg-gray-100 text-gray-700">5h</Badge>
                  </div>
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm font-medium text-red-800">Total: 12 horas | Eficiencia: 78%</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Secuencia Optimizada IA
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>1. Producto B:</strong></span>
                    <Badge className="bg-green-100 text-green-700">2.8h</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>2. Producto A:</strong></span>
                    <Badge className="bg-green-100 text-green-700">3.5h</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>3. Producto C:</strong></span>
                    <Badge className="bg-green-100 text-green-700">4.2h</Badge>
                  </div>
                  <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded">
                    <p className="text-sm font-medium text-green-800">Total: 10.5h | Eficiencia: 94%</p>
                    <p className="text-xs text-green-600">Ahorro: 1.5 horas (12.5%)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Métricas de Optimización
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded border text-center">
                  <p className="text-2xl font-bold text-green-600">94%</p>
                  <p className="text-xs text-green-500">Eficiencia</p>
                </div>
                <div className="p-3 bg-white rounded border text-center">
                  <p className="text-2xl font-bold text-blue-600">1.5h</p>
                  <p className="text-xs text-blue-500">Tiempo Ahorrado</p>
                </div>
                <div className="p-3 bg-white rounded border text-center">
                  <p className="text-2xl font-bold text-purple-600">$850</p>
                  <p className="text-xs text-purple-500">Ahorro Estimado</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Factores Analizados por IA
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Optimización de setup</p>
                    <p className="text-xs text-gray-600">Minimiza tiempos de cambio entre productos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Disponibilidad de recursos</p>
                    <p className="text-xs text-gray-600">Considera materiales y capacidad de máquinas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Prioridades y fechas límite</p>
                    <p className="text-xs text-gray-600">Respeta cronogramas y urgencias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductionOptimizationOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Route className="mr-2 h-4 w-4" />
              Aplicar Secuencia Optimizada
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Control de Calidad IA */}
      <Dialog open={isQualityControlOpen} onOpenChange={setIsQualityControlOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-neuralops-gold" />
              Control de Calidad con IA
            </DialogTitle>
            <DialogDescription>
              Detección automática de defectos usando análisis de imágenes con inteligencia artificial
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-neuralops-dark-blue">Cargar Imagen para Análisis</h4>
                <div className="border-2 border-dashed border-neuralops-medium-blue/30 rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 text-neuralops-medium-blue mx-auto mb-4" />
                  <p className="text-neuralops-dark-blue mb-2">Toma una foto o sube imagen del producto</p>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Subir Imagen
                  </Button>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Parámetros de Análisis</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Detección de grietas:</span>
                      <Badge variant="default">Activo</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Análisis dimensional:</span>
                      <Badge variant="default">Activo</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Verificación de color:</span>
                      <Badge variant="secondary">Inactivo</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Detección de deformaciones:</span>
                      <Badge variant="default">Activo</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-neuralops-dark-blue">Resultados del Análisis</h4>
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-700 flex items-center gap-2 text-lg">
                      <CheckCircle className="h-5 w-5" />
                      Producto Aprobado
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Confianza del análisis:</span>
                        <span className="font-medium text-green-700">97.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Defectos detectados:</span>
                        <span className="font-medium text-green-700">0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tolerancias:</span>
                        <span className="font-medium text-green-700">Dentro de spec</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tiempo de análisis:</span>
                        <span className="font-medium text-green-700">1.2 segundos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-2">Historial de Calidad</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Productos analizados hoy:</span>
                      <span>247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tasa de aprobación:</span>
                      <span className="text-green-600">94.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Defectos principales:</span>
                      <span className="text-orange-600">Dimensionales (3%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neuralops-beige/10 rounded-lg">
              <h4 className="font-medium text-neuralops-dark-blue mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-neuralops-gold" />
                Capacidades del Sistema de IA
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neuralops-medium-blue">
                <ul className="space-y-1">
                  <li>• Detección de grietas microscópicas</li>
                  <li>• Medición automática de dimensiones</li>
                  <li>• Clasificación de defectos por categoría</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Análisis de textura y acabado superficial</li>
                  <li>• Comparación con patrones de referencia</li>
                  <li>• Generación automática de reportes</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQualityControlOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
              Aprobar Lote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Chatbot Asistente de Producción */}
      <Dialog open={isChatbotOpen} onOpenChange={setIsChatbotOpen}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-neuralops-gold" />
              Asistente Inteligente de Producción
            </DialogTitle>
            <DialogDescription>
              Consulta información sobre procesos, órdenes, eficiencia y más
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex-1 border rounded-lg p-4 overflow-y-auto bg-gray-50 min-h-[300px]">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-neuralops-medium-blue" />
                  <p className="mb-4">¡Hola! Soy tu asistente de producción.</p>
                  <div className="space-y-2 text-left max-w-md mx-auto">
                    <p className="text-sm font-medium text-neuralops-dark-blue">Puedes preguntarme sobre:</p>
                    <ul className="text-sm text-neuralops-medium-blue space-y-1">
                      <li>• Estado de órdenes de producción</li>
                      <li>• Eficiencia de máquinas</li>
                      <li>• Programación de mantenimiento</li>
                      <li>• Análisis de calidad</li>
                      <li>• Procedimientos de producción</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-neuralops-gold text-white' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setChatMessages([...chatMessages, 
                    { sender: 'user', text: '¿Cuál es la eficiencia actual de la Línea 1?' },
                    { sender: 'bot', text: 'La Línea 1 tiene una eficiencia del 94.5% hoy. Está funcionando por encima del promedio de 92%. La última orden (OP-2024-001) va al 75% de completitud.' }
                  ])}
                >
                  Eficiencia Línea 1
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setChatMessages([...chatMessages, 
                    { sender: 'user', text: 'Estado de órdenes pendientes' },
                    { sender: 'bot', text: 'Tienes 3 órdenes activas: OP-2024-001 (75% completada), OP-2024-003 (programada para mañana), y OP-2024-004 (esperando materiales). ¿Necesitas detalles de alguna?' }
                  ])}
                >
                  Órdenes Pendientes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setChatMessages([...chatMessages, 
                    { sender: 'user', text: '¿Cuándo es el próximo mantenimiento?' },
                    { sender: 'bot', text: 'El próximo mantenimiento está programado para el viernes: Línea 2 (mantenimiento preventivo) y Motor Principal (revisión por temperatura elevada detectada por IA).' }
                  ])}
                >
                  Próximo Mantenimiento
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Escribe tu pregunta sobre producción..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newMessage.trim()) {
                        setChatMessages([...chatMessages, 
                          { sender: 'user', text: newMessage },
                          { sender: 'bot', text: 'Procesando tu consulta... Esta funcionalidad estará disponible cuando se conecte con la API de IA.' }
                        ])
                        setNewMessage("")
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setIsListening(!isListening)}
                  >
                    <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : 'text-gray-400'}`} />
                  </Button>
                </div>
                <Button 
                  onClick={() => {
                    if (newMessage.trim()) {
                      setChatMessages([...chatMessages, 
                        { sender: 'user', text: newMessage },
                        { sender: 'bot', text: 'Procesando tu consulta... Esta funcionalidad estará disponible cuando se conecte con la API de IA.' }
                      ])
                      setNewMessage("")
                    }
                  }}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialogo Mantenimiento Predictivo - Estilo Inventario */}
      <Dialog open={isPredictiveMaintenanceOpen} onOpenChange={setIsPredictiveMaintenanceOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              IA - Mantenimiento Predictivo
            </DialogTitle>
            <DialogDescription>
              Analiza el estado de las máquinas y predice necesidades de mantenimiento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Estado Actual de Máquinas
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Línea Producción 1:</strong></span>
                    <Badge className="bg-green-100 text-green-700">Óptimo</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Línea Producción 2:</strong></span>
                    <Badge className="bg-yellow-100 text-yellow-700">Atención</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Motor Principal:</strong></span>
                    <Badge className="bg-red-100 text-red-700">Crítico</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Predicciones IA
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                    <p className="text-sm font-medium text-orange-800">Línea Producción 2</p>
                    <p className="text-xs text-orange-600">Vibración anormal - Fallo en 3 días</p>
                    <p className="text-xs text-orange-500">Confianza: 87%</p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm font-medium text-red-800">Motor Principal</p>
                    <p className="text-xs text-red-600">Temperatura elevada - Crítico</p>
                    <p className="text-xs text-red-500">Confianza: 94%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Recomendaciones de IA
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Línea 2 - Mantenimiento preventivo</p>
                    <p className="text-xs text-gray-600">Programar antes del viernes para evitar fallo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Motor Principal - Temperatura crítica</p>
                    <p className="text-xs text-gray-600">Revisar sistema de refrigeración inmediatamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Sistema Hidráulico - Funcionamiento óptimo</p>
                    <p className="text-xs text-gray-600">Próximo mantenimiento programado en 45 días</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Métricas de Rendimiento
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded border">
                  <p className="text-sm font-medium text-blue-800">OEE General</p>
                  <p className="text-2xl font-bold text-blue-600">89%</p>
                  <p className="text-xs text-green-600">↑ +2.3% vs mes anterior</p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <p className="text-sm font-medium text-blue-800">MTBF Promedio</p>
                  <p className="text-2xl font-bold text-blue-600">168h</p>
                  <p className="text-xs text-green-600">↑ +12h vs mes anterior</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPredictiveMaintenanceOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="mr-2 h-4 w-4" />
              Generar Orden Mantenimiento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
