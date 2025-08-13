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
  Settings,
  Headphones,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Car,
  Plane,
  Wrench,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Camera,
  Upload,
  Download,
  Users,
  Truck,
  Package,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Shield,
  Zap,
  Target,
  Activity,
  History,
  QrCode,
  Scan,
  Image,
  Bot,
  Star,
  MessageSquare,
  UserCheck,
  Navigation,
} from "lucide-react"

// Estados del flujo de equipos
const equipmentStates = [
  { id: 'recepcion', name: 'Recepción', color: 'bg-blue-500', description: 'Equipo recibido y registrado' },
  { id: 'diagnostico', name: 'Diagnóstico', color: 'bg-yellow-500', description: 'Evaluación inicial del equipo' },
  { id: 'revision', name: 'Revisión Técnica', color: 'bg-orange-500', description: 'Inspección detallada' },
  { id: 'reparacion', name: 'Reparación', color: 'bg-red-500', description: 'Proceso de reparación' },
  { id: 'calibracion', name: 'Calibración', color: 'bg-purple-500', description: 'Calibración y ajustes' },
  { id: 'pruebas', name: 'Pruebas', color: 'bg-indigo-500', description: 'Pruebas de funcionamiento' },
  { id: 'transporte', name: 'Listo para Transporte', color: 'bg-teal-500', description: 'Preparado para envío' },
  { id: 'entregado', name: 'Entregado', color: 'bg-green-500', description: 'Entregado al cliente' }
]

// Datos de equipos en proceso
const equipments = [
  {
    id: 1,
    code: 'EQ-2024-001',
    client: 'TechCorp S.A.',
    equipmentType: 'Medidor de Flujo',
    brand: 'Endress+Hauser',
    model: 'Promag 400',
    serial: 'PH400-2023-5647',
    plate: 'TC-MF-001',
    status: 'diagnostico',
    priority: 'Alta',
    entryDate: '2024-08-10',
    estimatedDelivery: '2024-08-20',
    technician: 'Carlos Méndez',
    location: 'Taller 1',
    description: 'Medidor presenta error en lectura de caudal',
    images: ['/placeholder.svg?height=100&width=100'],
    progress: 25
  },
  {
    id: 2,
    code: 'EQ-2024-002',
    client: 'IndustrialCorp',
    equipmentType: 'Válvula de Control',
    brand: 'Fisher',
    model: '657ED',
    serial: 'FV657-2023-8901',
    plate: 'IC-VC-045',
    status: 'reparacion',
    priority: 'Media',
    entryDate: '2024-08-08',
    estimatedDelivery: '2024-08-18',
    technician: 'Ana Rodríguez',
    location: 'Taller 2',
    description: 'Actuador neumático no responde correctamente',
    images: ['/placeholder.svg?height=100&width=100'],
    progress: 60
  },
  {
    id: 3,
    code: 'EQ-2024-003',
    client: 'PetroQuímica S.A.',
    equipmentType: 'Transmisor de Presión',
    brand: 'Rosemount',
    model: '3051S',
    serial: 'RM3051-2023-3456',
    plate: 'PQ-TP-128',
    status: 'calibracion',
    priority: 'Crítica',
    entryDate: '2024-08-05',
    estimatedDelivery: '2024-08-15',
    technician: 'Miguel Torres',
    location: 'Lab Calibración',
    description: 'Calibración de rutina y verificación de precisión',
    images: ['/placeholder.svg?height=100&width=100'],
    progress: 80
  }
]

// Historial de actividades
const activityHistory = [
  {
    id: 1,
    equipmentId: 1,
    action: 'Cambio de estado',
    description: 'Equipo movido de Recepción a Diagnóstico',
    user: 'Carlos Méndez',
    timestamp: '2024-08-10 14:30',
    previousState: 'recepcion',
    newState: 'diagnostico'
  },
  {
    id: 2,
    equipmentId: 1,
    action: 'Comentario técnico',
    description: 'Sensor primario presenta obstrucción parcial',
    user: 'Carlos Méndez',
    timestamp: '2024-08-10 15:45',
    attachments: ['diagnostico_inicial.pdf']
  },
  {
    id: 3,
    equipmentId: 2,
    action: 'Inicio de reparación',
    description: 'Desmontaje de actuador neumático iniciado',
    user: 'Ana Rodríguez',
    timestamp: '2024-08-09 09:15',
    previousState: 'revision',
    newState: 'reparacion'
  }
]

// Estadísticas del módulo
const operationsStats = [
  {
    title: "Equipos en Proceso",
    value: "24",
    change: "+3",
    changeType: "positive",
    icon: Settings,
  },
  {
    title: "Reparaciones Completadas",
    value: "12",
    change: "+5",
    changeType: "positive",
    icon: Wrench,
  },
  {
    title: "Tiempo Promedio",
    value: "8.5 días",
    change: "-1.2",
    changeType: "positive",
    icon: Clock,
  },
  {
    title: "Satisfacción Cliente",
    value: "96%",
    change: "+2%",
    changeType: "positive",
    icon: Target,
  },
]

// Datos de servicios al cliente
const servicios = [
  {
    id: "SRV-001",
    cliente: "TechCorp S.A.",
    contacto: "Ana Rodríguez",
    telefono: "+56 9 8765 4321",
    email: "ana@techcorp.com",
    tipoServicio: "Mantenimiento",
    estado: "Programado",
    fechaServicio: "2024-08-15",
    tecnico: "Carlos López",
    prioridad: "Alta",
    direccion: "Av. Providencia 1234, Santiago",
    descripcion: "Mantenimiento preventivo equipo industrial",
    horaEstimada: "09:00",
    duracionEstimada: "3 horas",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "SRV-002",
    cliente: "InnovateXYZ",
    contacto: "Roberto Díaz",
    telefono: "+56 9 7654 3210",
    email: "roberto@innovate.cl",
    tipoServicio: "Reparación",
    estado: "En proceso",
    fechaServicio: "2024-08-12",
    tecnico: "María González",
    prioridad: "Media",
    direccion: "Los Leones 456, Providencia",
    descripcion: "Reparación de sistema hidráulico",
    horaEstimada: "14:00",
    duracionEstimada: "2 horas",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "SRV-003",
    cliente: "GlobalSolutions",
    contacto: "Patricia Morales",
    telefono: "+56 9 6543 2109",
    email: "patricia@global.com",
    tipoServicio: "Instalación",
    estado: "Completado",
    fechaServicio: "2024-08-10",
    tecnico: "Juan Pérez",
    prioridad: "Baja",
    direccion: "Moneda 1234, Santiago Centro",
    descripcion: "Instalación de nuevo sistema de control",
    horaEstimada: "10:00",
    duracionEstimada: "4 horas",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Datos de repuestos en taller
const repuestos = [
  {
    id: "REP-001",
    codigo: "BOM-001",
    nombre: "Bomba Hidráulica",
    cliente: "TechCorp S.A.",
    fechaIngreso: "2024-08-08",
    estado: "En diagnóstico",
    tecnico: "Carlos López",
    tiempoEstimado: "5 días",
    problema: "Pérdida de presión",
    diagnostico: "Sello interno dañado",
    solucion: "Reemplazo de sello y calibración",
    costoEstimado: "$45,000",
    prioridad: "Alta",
  },
  {
    id: "REP-002",
    codigo: "MOT-002",
    nombre: "Motor Eléctrico",
    cliente: "InnovateXYZ",
    fechaIngreso: "2024-08-05",
    estado: "En reparación",
    tecnico: "María González",
    tiempoEstimado: "3 días",
    problema: "Sobrecalentamiento",
    diagnostico: "Rodamientos gastados",
    solucion: "Reemplazo de rodamientos",
    costoEstimado: "$28,000",
    prioridad: "Media",
  },
  {
    id: "REP-003",
    codigo: "VAL-003",
    nombre: "Válvula de Control",
    cliente: "GlobalSolutions",
    fechaIngreso: "2024-08-03",
    estado: "Listo para entrega",
    tecnico: "Juan Pérez",
    tiempoEstimado: "Completado",
    problema: "No abre completamente",
    diagnostico: "Actuador defectuoso",
    solucion: "Reemplazo de actuador",
    costoEstimado: "$15,000",
    prioridad: "Baja",
  },
]

// Datos de viajes y viáticos
const viajes = [
  {
    id: "VIA-001",
    empleado: "Carlos López",
    destino: "Valparaíso",
    fechaSalida: "2024-08-15",
    fechaRegreso: "2024-08-16",
    motivo: "Servicio técnico TechCorp",
    estado: "Aprobado",
    tipoViaje: "Terrestre",
    presupuesto: "$85,000",
    gastos: [
      { concepto: "Transporte", monto: "$25,000", estado: "Aprobado" },
      { concepto: "Hospedaje", monto: "$35,000", estado: "Pendiente" },
      { concepto: "Alimentación", monto: "$15,000", estado: "Aprobado" },
    ],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "VIA-002",
    empleado: "María González",
    destino: "Concepción",
    fechaSalida: "2024-08-20",
    fechaRegreso: "2024-08-22",
    motivo: "Instalación sistema InnovateXYZ",
    estado: "Pendiente",
    tipoViaje: "Aéreo",
    presupuesto: "$150,000",
    gastos: [
      { concepto: "Vuelo", monto: "$80,000", estado: "Pendiente" },
      { concepto: "Hospedaje", monto: "$45,000", estado: "Pendiente" },
      { concepto: "Alimentación", monto: "$25,000", estado: "Pendiente" },
    ],
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

function StatsCard({ title, value, change, icon: Icon, changeType }: any) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-neuralops-gold" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
          {change} desde la semana pasada
        </p>
      </CardContent>
    </Card>
  )
}

export default function OperacionesPage() {
  const [selectedServicio, setSelectedServicio] = useState<any>(null)
  const [selectedRepuesto, setSelectedRepuesto] = useState<any>(null)
  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false)
  const [isNewViajeOpen, setIsNewViajeOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Estados para el sistema de gestión de equipos
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [showNewEquipment, setShowNewEquipment] = useState(false)
  const [showCameraModal, setShowCameraModal] = useState(false)
  const [equipmentList, setEquipmentList] = useState(equipments)
  const [newEquipment, setNewEquipment] = useState({
    code: '',
    client: '',
    equipmentType: '',
    brand: '',
    model: '',
    serial: '',
    plate: '',
    priority: 'Media',
    description: '',
    technician: '',
    location: ''
  })
  const [aiCaptureData, setAiCaptureData] = useState({
    serial: '',
    plate: '',
    model: '',
    brand: '',
    confidence: 0
  })

  // Funciones para el sistema de gestión de equipos
  const handleAiCapture = () => {
    // Simulación de captura por IA
    setTimeout(() => {
      const mockData = {
        serial: 'AI-CAPTURE-' + Math.random().toString(36).substr(2, 9),
        plate: 'PL-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        model: 'Model-' + Math.floor(Math.random() * 1000),
        brand: ['Endress+Hauser', 'Fisher', 'Rosemount', 'Siemens'][Math.floor(Math.random() * 4)],
        confidence: Math.floor(Math.random() * 20) + 80
      }
      setAiCaptureData(mockData)
      setNewEquipment(prev => ({
        ...prev,
        serial: mockData.serial,
        plate: mockData.plate,
        model: mockData.model,
        brand: mockData.brand
      }))
    }, 2000)
    setShowCameraModal(true)
  }

  const addComment = (equipmentId: number, comment: string) => {
    if (!comment) return
    const newActivity = {
      id: Date.now(),
      equipmentId,
      action: 'Comentario técnico',
      description: comment,
      user: 'Usuario Actual',
      timestamp: new Date().toLocaleString(),
      attachments: []
    }
    console.log('Nuevo comentario:', newActivity)
  }

  const changeEquipmentState = (equipmentId: number, newState: string) => {
    setEquipmentList(prev => prev.map(eq => {
      if (eq.id === equipmentId) {
        const stateIndex = equipmentStates.findIndex(s => s.id === newState)
        const progress = ((stateIndex + 1) / equipmentStates.length) * 100
        return { ...eq, status: newState, progress }
      }
      return eq
    }))
  }

  const getEquipmentPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica': return 'bg-red-100 text-red-800'
      case 'Alta': return 'bg-orange-100 text-orange-800'
      case 'Media': return 'bg-yellow-100 text-yellow-800'
      case 'Baja': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStateInfo = (stateId: string) => {
    return equipmentStates.find(state => state.id === stateId) || equipmentStates[0]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Programado":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "En proceso":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Completado":
        return "bg-green-100 text-green-800 border-green-200"
      case "Cancelado":
        return "bg-red-100 text-red-800 border-red-200"
      case "En diagnóstico":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "En reparación":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Listo para entrega":
        return "bg-green-100 text-green-800 border-green-200"
      case "Aprobado":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Rechazado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "Media":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Baja":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Módulo de Operaciones</h1>
              <p className="text-neuralops-beige text-lg">Gestiona servicios al cliente, agenda, repuestos y viajes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Headphones className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 -mt-4">
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-6">{/* Dialog components stay the same */}
          <Dialog open={isNewServiceOpen} onOpenChange={setIsNewServiceOpen}>
            <DialogTrigger asChild>
              <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Servicio
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Programar Nuevo Servicio</DialogTitle>
                <DialogDescription>
                  Agenda un nuevo servicio al cliente
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input id="cliente" placeholder="Nombre del cliente" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contacto">Contacto</Label>
                  <Input id="contacto" placeholder="Persona de contacto" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="+56 9 1234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contacto@neuralops.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo-servicio">Tipo de Servicio</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="reparacion">Reparación</SelectItem>
                      <SelectItem value="instalacion">Instalación</SelectItem>
                      <SelectItem value="diagnostico">Diagnóstico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prioridad">Prioridad</Label>
                  <Select>
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
                  <Label htmlFor="fecha-servicio">Fecha de Servicio</Label>
                  <Input id="fecha-servicio" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora-servicio">Hora</Label>
                  <Input id="hora-servicio" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tecnico">Técnico Asignado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar técnico" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos">Carlos López</SelectItem>
                      <SelectItem value="maria">María González</SelectItem>
                      <SelectItem value="juan">Juan Pérez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duracion">Duración Estimada</Label>
                  <Input id="duracion" placeholder="Ej: 3 horas" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input id="direccion" placeholder="Dirección completa del servicio" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="descripcion">Descripción del Servicio</Label>
                  <Textarea id="descripcion" placeholder="Describe el trabajo a realizar..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewServiceOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                  Programar Servicio
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isNewViajeOpen} onOpenChange={setIsNewViajeOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white">
                <Plane className="h-4 w-4 mr-2" />
                Solicitar Viaje
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Solicitar Viaje y Viáticos</DialogTitle>
                <DialogDescription>
                  Solicita autorización para viaje de trabajo
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="empleado-viaje">Empleado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empleado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos">Carlos López</SelectItem>
                      <SelectItem value="maria">María González</SelectItem>
                      <SelectItem value="juan">Juan Pérez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destino">Destino</Label>
                  <Input id="destino" placeholder="Ciudad/Región de destino" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha-salida">Fecha de Salida</Label>
                  <Input id="fecha-salida" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha-regreso">Fecha de Regreso</Label>
                  <Input id="fecha-regreso" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo-viaje">Tipo de Viaje</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="terrestre">Terrestre</SelectItem>
                      <SelectItem value="aereo">Aéreo</SelectItem>
                      <SelectItem value="maritimo">Marítimo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presupuesto">Presupuesto Estimado</Label>
                  <Input id="presupuesto" placeholder="$150,000" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="motivo-viaje">Motivo del Viaje</Label>
                  <Textarea id="motivo-viaje" placeholder="Describe el propósito del viaje..." />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium">Desglose de Gastos</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="space-y-1">
                      <Label htmlFor="transporte" className="text-xs">Transporte</Label>
                      <Input id="transporte" placeholder="$25,000" className="text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="hospedaje" className="text-xs">Hospedaje</Label>
                      <Input id="hospedaje" placeholder="$80,000" className="text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="alimentacion" className="text-xs">Alimentación</Label>
                      <Input id="alimentacion" placeholder="$25,000" className="text-sm" />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewViajeOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                  Enviar Solicitud
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Servicios Programados"
          value="24"
          change="+8%"
          changeType="positive"
          icon={Calendar}
        />
        <StatsCard
          title="En Proceso"
          value="12"
          change="+3"
          changeType="positive"
          icon={Clock}
        />
        <StatsCard
          title="Equipos en Taller"
          value="8"
          change="-2"
          changeType="negative"
          icon={Wrench}
        />
        <StatsCard
          title="Viajes Pendientes"
          value="5"
          change="+2"
          changeType="positive"
          icon={Plane}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="servicios" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-neuralops-very-light-blue">
          <TabsTrigger value="servicios" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
            Servicios al Cliente
          </TabsTrigger>
          <TabsTrigger value="equipos" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
            Equipos en Taller
          </TabsTrigger>
          <TabsTrigger value="viajes" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
            Viajes y Viáticos
          </TabsTrigger>
          <TabsTrigger value="agenda" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
            Agenda
          </TabsTrigger>
        </TabsList>

        <TabsContent value="servicios" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-neuralops-dark-blue">Servicios al Cliente</CardTitle>
                  <CardDescription>Gestiona la agenda de servicios y seguimiento</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neuralops-medium-blue" />
                    <Input
                      placeholder="Buscar servicios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="Programado">Programado</SelectItem>
                      <SelectItem value="En proceso">En proceso</SelectItem>
                      <SelectItem value="Completado">Completado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead className="w-20">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicios.map((servicio) => (
                    <TableRow key={servicio.id} className="hover:bg-neuralops-beige/5">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={servicio.avatar} />
                            <AvatarFallback className="bg-neuralops-gold text-white text-xs">
                              {servicio.contacto.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-neuralops-dark-blue">{servicio.cliente}</div>
                            <div className="text-sm text-neuralops-medium-blue">{servicio.contacto}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-neuralops-dark-blue">{servicio.tipoServicio}</div>
                          <div className="text-sm text-neuralops-medium-blue">{servicio.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(servicio.estado)}>
                          {servicio.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-neuralops-dark-blue">{servicio.fechaServicio}</div>
                          <div className="text-sm text-neuralops-medium-blue">{servicio.horaEstimada}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-neuralops-dark-blue">{servicio.tecnico}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(servicio.prioridad)}
                          <span className="text-sm">{servicio.prioridad}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-neuralops-gold" />
                          <span className="text-sm text-neuralops-dark-blue truncate max-w-32">
                            {servicio.direccion}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedServicio(servicio)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Llamar cliente
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Navigation className="mr-2 h-4 w-4" />
                              Ver ubicación
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Completar servicio
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

        <TabsContent value="equipos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-neuralops-dark-blue">Sistema de Gestión de Equipos</CardTitle>
                  <CardDescription>
                    Trazabilidad completa desde recepción hasta entrega con IA
                  </CardDescription>
                </div>
                <Button onClick={() => setShowNewEquipment(true)} className="bg-neuralops-dark-blue hover:bg-neuralops-medium-blue">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Equipo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="equipments" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="equipments">Equipos en Proceso</TabsTrigger>
                  <TabsTrigger value="workflow">Flujo de Estados</TabsTrigger>
                  <TabsTrigger value="history">Historial</TabsTrigger>
                </TabsList>

                {/* Tab de Equipos */}
                <TabsContent value="equipments" className="space-y-4">
                  <div className="grid gap-4">
                    {equipmentList.map((equipment) => {
                      const stateInfo = getStateInfo(equipment.status)
                      return (
                        <Card key={equipment.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <Badge variant="outline" className="font-mono">
                                  {equipment.code}
                                </Badge>
                                <Badge className={getEquipmentPriorityColor(equipment.priority)}>
                                  {equipment.priority}
                                </Badge>
                                <Badge className={`text-white ${stateInfo.color}`}>
                                  {stateInfo.name}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <h3 className="font-semibold text-neuralops-dark-blue">
                                    {equipment.equipmentType}
                                  </h3>
                                  <p className="text-sm text-gray-600">{equipment.brand} - {equipment.model}</p>
                                  <p className="text-sm text-gray-500">Cliente: {equipment.client}</p>
                                </div>
                                
                                <div>
                                  <p className="text-sm"><strong>Serial:</strong> {equipment.serial}</p>
                                  <p className="text-sm"><strong>Placa:</strong> {equipment.plate}</p>
                                  <p className="text-sm"><strong>Técnico:</strong> {equipment.technician}</p>
                                </div>
                                
                                <div>
                                  <p className="text-sm"><strong>Ingreso:</strong> {equipment.entryDate}</p>
                                  <p className="text-sm"><strong>Est. Entrega:</strong> {equipment.estimatedDelivery}</p>
                                  <p className="text-sm"><strong>Ubicación:</strong> {equipment.location}</p>
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                  <span>Progreso</span>
                                  <span>{equipment.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-neuralops-medium-blue h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${equipment.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 ml-4">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setSelectedEquipment(equipment)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Ver Detalles
                              </Button>
                              
                              <Button 
                                size="sm" 
                                className="bg-neuralops-gold hover:bg-neuralops-gold/80"
                                onClick={() => addComment(equipment.id, prompt('Agregar comentario:') || '')}
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Comentar
                              </Button>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>

                {/* Tab de Flujo de Estados */}
                <TabsContent value="workflow" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {equipmentStates.map((state, index) => (
                      <Card key={state.id} className="p-4">
                        <div className={`w-full h-3 ${state.color} rounded-full mb-3`}></div>
                        <h3 className="font-semibold text-neuralops-dark-blue mb-1">{state.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{state.description}</p>
                        <div className="text-xs text-gray-500">
                          Paso {index + 1} de {equipmentStates.length}
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <Card className="p-4">
                    <h3 className="font-semibold text-neuralops-dark-blue mb-3">Equipos por Estado</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {equipmentStates.map((state) => {
                        const count = equipmentList.filter(eq => eq.status === state.id).length
                        return (
                          <div key={state.id} className="text-center">
                            <div className={`w-12 h-12 ${state.color} rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2`}>
                              {count}
                            </div>
                            <p className="text-sm font-medium">{state.name}</p>
                          </div>
                        )
                      })}
                    </div>
                  </Card>
                </TabsContent>

                {/* Tab de Historial */}
                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-3">
                    {activityHistory.map((activity) => (
                      <Card key={activity.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-neuralops-beige rounded-full flex items-center justify-center">
                            <UserCheck className="h-4 w-4 text-neuralops-dark-blue" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">EQ-{activity.equipmentId.toString().padStart(4, '0')}</Badge>
                              <span className="font-medium text-neuralops-dark-blue">{activity.action}</span>
                              <span className="text-sm text-gray-500">{activity.timestamp}</span>
                            </div>
                            <p className="text-gray-700">{activity.description}</p>
                            <p className="text-sm text-gray-500">Por: {activity.user}</p>
                            {activity.previousState && activity.newState && (
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={`text-white ${getStateInfo(activity.previousState).color}`}>
                                  {getStateInfo(activity.previousState).name}
                                </Badge>
                                <Navigation className="h-4 w-4 text-gray-400" />
                                <Badge className={`text-white ${getStateInfo(activity.newState).color}`}>
                                  {getStateInfo(activity.newState).name}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="viajes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-neuralops-dark-blue">Viajes y Viáticos</CardTitle>
              <CardDescription>Gestión de viajes de trabajo y reembolsos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {viajes.map((viaje) => (
                  <div key={viaje.id} className="border border-neuralops-very-light-blue rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={viaje.avatar} />
                          <AvatarFallback className="bg-neuralops-gold text-white">
                            {viaje.empleado.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-neuralops-dark-blue">{viaje.empleado}</h3>
                          <p className="text-sm text-neuralops-medium-blue">{viaje.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(viaje.estado)}>
                          {viaje.estado}
                        </Badge>
                        {viaje.tipoViaje === "Aéreo" ? (
                          <Plane className="h-4 w-4 text-neuralops-gold" />
                        ) : (
                          <Car className="h-4 w-4 text-neuralops-gold" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-neuralops-medium-blue">Destino</p>
                        <p className="font-medium text-neuralops-dark-blue">{viaje.destino}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neuralops-medium-blue">Fechas</p>
                        <p className="font-medium text-neuralops-dark-blue">
                          {viaje.fechaSalida} - {viaje.fechaRegreso}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-neuralops-medium-blue">Presupuesto</p>
                        <p className="font-medium text-neuralops-dark-blue">{viaje.presupuesto}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-neuralops-medium-blue mb-2">Motivo</p>
                      <p className="text-neuralops-dark-blue">{viaje.motivo}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-neuralops-dark-blue mb-2">Desglose de Gastos</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {viaje.gastos.map((gasto, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-neuralops-beige/10 rounded">
                            <span className="text-sm text-neuralops-dark-blue">{gasto.concepto}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-neuralops-dark-blue">{gasto.monto}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${gasto.estado === 'Aprobado' ? 'border-green-500 text-green-600' : 'border-yellow-500 text-yellow-600'}`}
                              >
                                {gasto.estado}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agenda" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Calendario de Servicios</CardTitle>
                  <CardDescription>Vista semanal de servicios programados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-neuralops-medium-blue">
                      <div>Lun</div>
                      <div>Mar</div>
                      <div>Mié</div>
                      <div>Jue</div>
                      <div>Vie</div>
                      <div>Sáb</div>
                      <div>Dom</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }, (_, i) => (
                        <div
                          key={i}
                          className="aspect-square border border-neuralops-very-light-blue rounded p-1 text-xs"
                        >
                          <div className="font-medium text-neuralops-dark-blue">{(i % 31) + 1}</div>
                          {i === 12 && (
                            <div className="mt-1">
                              <div className="bg-neuralops-gold text-white p-1 rounded text-xs">
                                TechCorp
                              </div>
                            </div>
                          )}
                          {i === 15 && (
                            <div className="mt-1">
                              <div className="bg-blue-500 text-white p-1 rounded text-xs">
                                InnovateXYZ
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Próximos Servicios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {servicios.slice(0, 3).map((servicio) => (
                      <div key={servicio.id} className="flex items-center gap-3 p-2 bg-neuralops-beige/10 rounded-lg">
                        <div className="text-center">
                          <div className="text-xs text-neuralops-medium-blue">AGO</div>
                          <div className="font-bold text-neuralops-dark-blue">
                            {servicio.fechaServicio.split('-')[2]}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-neuralops-dark-blue text-sm">{servicio.cliente}</p>
                          <p className="text-xs text-neuralops-medium-blue">{servicio.tipoServicio}</p>
                          <p className="text-xs text-neuralops-medium-blue">{servicio.horaEstimada}</p>
                        </div>
                        {getPriorityIcon(servicio.prioridad)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Técnicos Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Carlos López", "María González", "Juan Pérez"].map((tecnico, index) => (
                      <div key={tecnico} className="flex items-center justify-between p-2 bg-neuralops-beige/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-neuralops-gold text-white text-xs">
                              {tecnico.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-neuralops-dark-blue">{tecnico}</span>
                        </div>
                        <Badge variant="outline" className={index === 0 ? "border-red-500 text-red-600" : "border-green-500 text-green-600"}>
                          {index === 0 ? "Ocupado" : "Disponible"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {selectedServicio && (
        <Dialog open={!!selectedServicio} onOpenChange={() => setSelectedServicio(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Headphones className="h-6 w-6 text-neuralops-gold" />
                <div>
                  <div>Servicio {selectedServicio.id}</div>
                  <div className="text-sm font-normal text-neuralops-medium-blue">{selectedServicio.cliente}</div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información del Cliente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <UserCheck className="h-4 w-4 text-neuralops-gold" />
                      <span className="text-neuralops-dark-blue">{selectedServicio.contacto}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-neuralops-gold" />
                      <span className="text-neuralops-dark-blue">{selectedServicio.telefono}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-neuralops-gold" />
                      <span className="text-neuralops-dark-blue">{selectedServicio.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-neuralops-gold" />
                      <span className="text-neuralops-dark-blue">{selectedServicio.direccion}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Detalles del Servicio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue">Estado:</span>
                      <Badge className={getStatusColor(selectedServicio.estado)}>
                        {selectedServicio.estado}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue">Tipo:</span>
                      <span className="text-neuralops-dark-blue">{selectedServicio.tipoServicio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue">Técnico:</span>
                      <span className="text-neuralops-dark-blue">{selectedServicio.tecnico}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue">Fecha:</span>
                      <span className="text-neuralops-dark-blue">{selectedServicio.fechaServicio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue">Hora:</span>
                      <span className="text-neuralops-dark-blue">{selectedServicio.horaEstimada}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue">Duración:</span>
                      <span className="text-neuralops-dark-blue">{selectedServicio.duracionEstimada}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-neuralops-dark-blue mb-2">Descripción del Trabajo</h3>
                <p className="text-neuralops-medium-blue bg-neuralops-beige/10 p-3 rounded-lg">
                  {selectedServicio.descripcion}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modales del Sistema de Gestión de Equipos */}
      
      {/* Modal de Nuevo Equipo */}
      {showNewEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-neuralops-dark-blue">Registrar Nuevo Equipo</CardTitle>
                <Button variant="outline" size="sm" onClick={handleAiCapture}>
                  <Bot className="h-4 w-4 mr-2" />
                  IA Captura
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Código</label>
                  <Input
                    type="text"
                    value={newEquipment.code}
                    onChange={(e) => setNewEquipment({...newEquipment, code: e.target.value})}
                    placeholder="EQ-2024-XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cliente</label>
                  <Input
                    type="text"
                    value={newEquipment.client}
                    onChange={(e) => setNewEquipment({...newEquipment, client: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Equipo</label>
                  <Input
                    type="text"
                    value={newEquipment.equipmentType}
                    onChange={(e) => setNewEquipment({...newEquipment, equipmentType: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Marca</label>
                  <Input
                    type="text"
                    value={newEquipment.brand}
                    onChange={(e) => setNewEquipment({...newEquipment, brand: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Modelo</label>
                  <Input
                    type="text"
                    value={newEquipment.model}
                    onChange={(e) => setNewEquipment({...newEquipment, model: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Serial</label>
                  <Input
                    type="text"
                    value={newEquipment.serial}
                    onChange={(e) => setNewEquipment({...newEquipment, serial: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Placa</label>
                  <Input
                    type="text"
                    value={newEquipment.plate}
                    onChange={(e) => setNewEquipment({...newEquipment, plate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Prioridad</label>
                  <Select value={newEquipment.priority} onValueChange={(value) => setNewEquipment({...newEquipment, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baja">Baja</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Crítica">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Técnico Asignado</label>
                  <Input
                    type="text"
                    value={newEquipment.technician}
                    onChange={(e) => setNewEquipment({...newEquipment, technician: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ubicación</label>
                  <Input
                    type="text"
                    value={newEquipment.location}
                    onChange={(e) => setNewEquipment({...newEquipment, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción del Problema</label>
                <Textarea
                  rows={3}
                  value={newEquipment.description}
                  onChange={(e) => setNewEquipment({...newEquipment, description: e.target.value})}
                  placeholder="Describa el problema o motivo del ingreso..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-neuralops-dark-blue hover:bg-neuralops-medium-blue"
                  onClick={() => {
                    const newCode = `EQ-2024-${String(equipmentList.length + 1).padStart(3, '0')}`
                    const newEquipmentWithId = {
                      ...newEquipment,
                      id: equipmentList.length + 1,
                      code: newEquipment.code || newCode,
                      status: 'recepcion',
                      entryDate: new Date().toISOString().split('T')[0],
                      estimatedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                      progress: 12.5,
                      images: ['/placeholder.svg?height=100&width=100']
                    }
                    setEquipmentList([...equipmentList, newEquipmentWithId])
                    setShowNewEquipment(false)
                    setNewEquipment({
                      code: '', client: '', equipmentType: '', brand: '', model: '',
                      serial: '', plate: '', priority: 'Media', description: '', technician: '', location: ''
                    })
                  }}
                >
                  Registrar Equipo
                </Button>
                <Button variant="outline" onClick={() => setShowNewEquipment(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Captura IA */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-neuralops-dark-blue flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Captura con IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Procesando imagen...</p>
                  {aiCaptureData.confidence > 0 && (
                    <div className="mt-4 space-y-2">
                      <Badge className="bg-green-100 text-green-800">
                        Confianza: {aiCaptureData.confidence}%
                      </Badge>
                      <div className="text-sm text-left">
                        <p><strong>Serial:</strong> {aiCaptureData.serial}</p>
                        <p><strong>Placa:</strong> {aiCaptureData.plate}</p>
                        <p><strong>Modelo:</strong> {aiCaptureData.model}</p>
                        <p><strong>Marca:</strong> {aiCaptureData.brand}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-neuralops-dark-blue hover:bg-neuralops-medium-blue"
                  onClick={() => setShowCameraModal(false)}
                >
                  Usar Datos
                </Button>
                <Button variant="outline" onClick={() => setShowCameraModal(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Detalles del Equipo */}
      {selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-neuralops-dark-blue">
                    {selectedEquipment.equipmentType} - {selectedEquipment.code}
                  </CardTitle>
                  <p className="text-gray-600">{selectedEquipment.client}</p>
                </div>
                <Button variant="outline" onClick={() => setSelectedEquipment(null)}>
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Información del equipo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-neuralops-dark-blue mb-3">Información del Equipo</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Marca:</strong> {selectedEquipment.brand}</p>
                    <p><strong>Modelo:</strong> {selectedEquipment.model}</p>
                    <p><strong>Serial:</strong> {selectedEquipment.serial}</p>
                    <p><strong>Placa:</strong> {selectedEquipment.plate}</p>
                    <p><strong>Descripción:</strong> {selectedEquipment.description}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-neuralops-dark-blue mb-3">Estado del Proceso</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Estado Actual:</strong> {getStateInfo(selectedEquipment.status).name}</p>
                    <p><strong>Técnico:</strong> {selectedEquipment.technician}</p>
                    <p><strong>Ubicación:</strong> {selectedEquipment.location}</p>
                    <p><strong>Progreso:</strong> {selectedEquipment.progress}%</p>
                  </div>
                </div>
              </div>

              {/* Cambio de estado */}
              <div>
                <h3 className="font-semibold text-neuralops-dark-blue mb-3">Cambiar Estado</h3>
                <div className="flex flex-wrap gap-2">
                  {equipmentStates.map((state) => (
                    <Button
                      key={state.id}
                      size="sm"
                      variant={selectedEquipment.status === state.id ? "default" : "outline"}
                      className={selectedEquipment.status === state.id ? `${state.color} text-white` : ""}
                      onClick={() => {
                        changeEquipmentState(selectedEquipment.id, state.id)
                        setSelectedEquipment({...selectedEquipment, status: state.id})
                      }}
                    >
                      {state.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Historial del equipo */}
              <div>
                <h3 className="font-semibold text-neuralops-dark-blue mb-3">Historial de Actividades</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {activityHistory
                    .filter(activity => activity.equipmentId === selectedEquipment.id)
                    .map((activity) => (
                      <div key={activity.id} className="p-3 bg-gray-50 rounded border-l-4 border-neuralops-medium-blue">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                            <p className="text-xs text-gray-500">{activity.user} - {activity.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
