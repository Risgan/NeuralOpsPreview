"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  FileText,
  ClipboardList,
  Calendar,
  MapPin,
  User,
  AlertCircle,
  Download,
  CheckSquare,
  History,
  Bell,
  BellOff,
  Shield,
  Package,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Truck,
  XCircle,
  BarChart3,
  Brain,
  Sparkles,
  Upload,
  Bot,
  Scan,
  Zap,
  Camera,
} from "lucide-react"

// Datos de EPP (movidos desde inventario)
const eppItems = [
  {
    id: "EPP-001",
    codigo: "CAS-001",
    nombre: "Casco de Seguridad Blanco",
    categoria: "Protección de la cabeza",
    stock: 150,
    minimo: 50,
    optimo: 200,
    maximo: 300,
    precio: "$15,000",
    unidad: "Unidad",
    estado: "Disponible",
    bodega: "Bodega Central",
    fechaUltimoMovimiento: "2024-08-10",
    lote: "LOT-2024-001",
    fechaVencimiento: "2026-08-10",
  },
  {
    id: "EPP-002",
    codigo: "GAF-001",
    nombre: "Gafas de Seguridad",
    categoria: "Protección ocular",
    stock: 25,
    minimo: 30,
    optimo: 100,
    maximo: 150,
    precio: "$8,500",
    unidad: "Unidad",
    estado: "Stock Bajo",
    bodega: "Bodega Norte",
    fechaUltimoMovimiento: "2024-08-08",
    lote: "LOT-2024-002",
    fechaVencimiento: "2025-12-31",
  },
  {
    id: "EPP-003",
    codigo: "GUA-001",
    nombre: "Guantes de Nitrilo",
    categoria: "Protección de manos",
    stock: 500,
    minimo: 200,
    optimo: 600,
    maximo: 1000,
    precio: "$250",
    unidad: "Par",
    estado: "Disponible",
    bodega: "Bodega Sur",
    fechaUltimoMovimiento: "2024-08-12",
    lote: "LOT-2024-003",
    fechaVencimiento: "2025-06-30",
  },
  {
    id: "EPP-004",
    codigo: "BOT-001",
    nombre: "Botas de Seguridad",
    categoria: "Protección de pies",
    stock: 80,
    minimo: 40,
    optimo: 120,
    maximo: 200,
    precio: "$75,000",
    unidad: "Par",
    estado: "Disponible",
    bodega: "Bodega Central",
    fechaUltimoMovimiento: "2024-08-09",
    lote: "LOT-2024-004",
    fechaVencimiento: "2027-01-15",
  },
]

// Solicitudes de EPP
const solicitudesEPP = [
  {
    id: "SOL-001",
    empleado: "Juan Pérez",
    departamento: "Producción",
    items: [
      { codigo: "CAS-001", nombre: "Casco de Seguridad", cantidad: 1 },
      { codigo: "GUA-001", nombre: "Guantes de Nitrilo", cantidad: 2 },
    ],
    fechaSolicitud: "2024-08-10",
    estado: "Pendiente",
    urgencia: "Media",
  },
  {
    id: "SOL-002",
    empleado: "María González",
    departamento: "Laboratorio",
    items: [
      { codigo: "GAF-001", nombre: "Gafas de Seguridad", cantidad: 1 },
      { codigo: "GUA-001", nombre: "Guantes de Nitrilo", cantidad: 5 },
    ],
    fechaSolicitud: "2024-08-09",
    estado: "Aprobada",
    urgencia: "Alta",
  },
]

// Mock data
const incidents = [
  {
    id: 1,
    title: "Caída en área de producción",
    description: "Empleado resbaló en piso mojado",
    severity: "Media",
    status: "En Investigación",
    reportedBy: "María González",
    date: "2024-01-15",
    time: "14:30",
    location: "Línea de Producción A",
    department: "Producción",
    injuredPerson: "Juan Pérez",
    witnesses: ["Carlos López", "Ana Martínez"],
    immediateActions: "Atención médica inmediata, acordonamiento del área",
    rootCause: "Falta de señalización en área húmeda",
  },
  {
    id: 2,
    title: "Exposición a químicos",
    description: "Derrame de solvente en laboratorio",
    severity: "Alta",
    status: "Cerrado",
    reportedBy: "Dr. Roberto Silva",
    date: "2024-01-10",
    time: "09:15",
    location: "Laboratorio de Calidad",
    department: "Calidad",
    injuredPerson: "N/A",
    witnesses: ["Técnico de turno"],
    immediateActions: "Evacuación del área, ventilación forzada",
    rootCause: "Falla en contenedor de almacenamiento",
  },
]

const checklists = [
  {
    id: 1,
    title: "Inspección de Equipos de Protección",
    description: "Verificación mensual de EPP",
    frequency: "Mensual",
    lastCompleted: "2024-01-10",
    nextDue: "2024-02-10",
    status: "Pendiente",
    assignedTo: "Supervisor SST",
    items: [
      { id: 1, description: "Verificar estado de cascos", completed: true },
      { id: 2, description: "Revisar guantes de seguridad", completed: true },
      { id: 3, description: "Inspeccionar gafas de protección", completed: false },
      { id: 4, description: "Comprobar calzado de seguridad", completed: false },
    ],
  },
  {
    id: 2,
    title: "Revisión de Extintores",
    description: "Control trimestral de sistemas contra incendios",
    frequency: "Trimestral",
    lastCompleted: "2024-01-05",
    nextDue: "2024-04-05",
    status: "Completado",
    assignedTo: "Brigada de Emergencias",
    items: [
      { id: 1, description: "Verificar presión de extintores", completed: true },
      { id: 2, description: "Revisar fechas de vencimiento", completed: true },
      { id: 3, description: "Comprobar accesibilidad", completed: true },
      { id: 4, description: "Actualizar registro de mantenimiento", completed: true },
    ],
  },
]

const alerts = [
  {
    id: 1,
    title: "Vencimiento de capacitación SST",
    description: "15 empleados requieren renovación de capacitación",
    type: "warning",
    date: "2024-01-15",
    read: false,
    priority: "Alta",
  },
  {
    id: 2,
    title: "Inspección de equipos pendiente",
    description: "Revisión mensual de EPP programada para hoy",
    type: "info",
    date: "2024-01-15",
    read: false,
    priority: "Media",
  },
  {
    id: 3,
    title: "Nuevo reglamento SST",
    description: "Actualización en normativa de seguridad industrial",
    type: "info",
    date: "2024-01-14",
    read: true,
    priority: "Baja",
  },
]

export default function SSTPage() {
  const [activeTab, setActiveTab] = useState("incidentes")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIncident, setSelectedIncident] = useState<any>(null)
  const [selectedChecklist, setSelectedChecklist] = useState<any>(null)
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState(false)
  const [isNewChecklistOpen, setIsNewChecklistOpen] = useState(false)
  const [isIncidentDetailsOpen, setIsIncidentDetailsOpen] = useState(false)
  const [isEditIncidentOpen, setIsEditIncidentOpen] = useState(false)
  const [isChecklistDetailsOpen, setIsChecklistDetailsOpen] = useState(false)
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alertsList, setAlertsList] = useState(alerts)

  // Estados para funcionalidades de IA
  const [isVisionOpen, setIsVisionOpen] = useState(false)
  const [isRiskAnalysisOpen, setIsRiskAnalysisOpen] = useState(false)
  const [isPredictiveOpen, setIsPredictiveOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "",
    location: "",
    department: "",
    injuredPerson: "",
    witnesses: "",
    immediateActions: "",
  })

  const [newChecklist, setNewChecklist] = useState({
    title: "",
    description: "",
    frequency: "",
    assignedTo: "",
    items: [""],
  })

  const [reportConfig, setReportConfig] = useState({
    type: "",
    dateFrom: "",
    dateTo: "",
    department: "",
    includeGraphics: true,
    includeRecommendations: true,
  })

  const handleCreateIncident = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Creating incident:", newIncident)
    setIsLoading(false)
    setIsNewIncidentOpen(false)
    setNewIncident({
      title: "",
      description: "",
      severity: "",
      location: "",
      department: "",
      injuredPerson: "",
      witnesses: "",
      immediateActions: "",
    })
  }

  const handleCreateChecklist = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Creating checklist:", newChecklist)
    setIsLoading(false)
    setIsNewChecklistOpen(false)
    setNewChecklist({
      title: "",
      description: "",
      frequency: "",
      assignedTo: "",
      items: [""],
    })
  }

  const handleGenerateReport = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Generating report:", reportConfig)
    setIsLoading(false)
    setIsGenerateReportOpen(false)
  }

  const handleCompleteChecklist = async (checklistId: number) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Completing checklist:", checklistId)
    setIsLoading(false)
  }

  const markAlertAsRead = (alertId: number) => {
    setAlertsList((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const addChecklistItem = () => {
    setNewChecklist((prev) => ({
      ...prev,
      items: [...prev.items, ""],
    }))
  }

  const updateChecklistItem = (index: number, value: string) => {
    setNewChecklist((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeChecklistItem = (index: number) => {
    setNewChecklist((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredChecklists = checklists.filter(
    (checklist) =>
      checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadAlerts = alertsList.filter((alert) => !alert.read)

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Seguridad y Salud en el Trabajo</h1>
              <p className="text-neuralops-beige text-lg">Gestión de incidentes, inspecciones y cumplimiento normativo</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <AlertTriangle className="h-8 w-8 text-white" />
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

          {/* Visión por Computadora */}
          <Dialog open={isVisionOpen} onOpenChange={setIsVisionOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                <Camera className="h-4 w-4 mr-2" />
                Visión IA
              </Button>
            </DialogTrigger>
          </Dialog>

          {/* Análisis de Riesgos */}
          <Dialog open={isRiskAnalysisOpen} onOpenChange={setIsRiskAnalysisOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                <Shield className="h-4 w-4 mr-2" />
                Análisis IA
              </Button>
            </DialogTrigger>
          </Dialog>

          {/* Predicción de Incidentes */}
          <Dialog open={isPredictiveOpen} onOpenChange={setIsPredictiveOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                <TrendingUp className="h-4 w-4 mr-2" />
                Predictivo IA
              </Button>
            </DialogTrigger>
          </Dialog>

          {/* Asistente IA */}
          <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Bot className="h-4 w-4 mr-2" />
                Asistente IA
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      <div className=" p-4 -mt-4 space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-end gap-2">
          <Badge variant="outline" className="text-neuralops-gold border-neuralops-gold">
            {unreadAlerts.length} alertas pendientes
          </Badge>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-neuralops-very-light-blue p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("incidentes")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "incidentes"
                ? "bg-white text-neuralops-dark-blue shadow-sm"
                : "text-neuralops-medium-blue hover:text-neuralops-dark-blue"
              }`}
          >
            <AlertTriangle className="h-4 w-4 inline mr-2" />
            Incidentes
          </button>
          <button
            onClick={() => setActiveTab("inspecciones")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "inspecciones"
                ? "bg-white text-neuralops-dark-blue shadow-sm"
                : "text-neuralops-medium-blue hover:text-neuralops-dark-blue"
              }`}
          >
            <ClipboardList className="h-4 w-4 inline mr-2" />
            Inspecciones
          </button>
          <button
            onClick={() => setActiveTab("epp")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "epp"
                ? "bg-white text-neuralops-dark-blue shadow-sm"
                : "text-neuralops-medium-blue hover:text-neuralops-dark-blue"
              }`}
          >
            <Shield className="h-4 w-4 inline mr-2" />
            EPP
          </button>
          <button
            onClick={() => setActiveTab("reportes-epp")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "reportes-epp"
                ? "bg-white text-neuralops-dark-blue shadow-sm"
                : "text-neuralops-medium-blue hover:text-neuralops-dark-blue"
              }`}
          >
            <BarChart3 className="h-4 w-4 inline mr-2" />
            Reportes EPP
          </button>
          <button
            onClick={() => setActiveTab("alertas")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "alertas"
                ? "bg-white text-neuralops-dark-blue shadow-sm"
                : "text-neuralops-medium-blue hover:text-neuralops-dark-blue"
              }`}
          >
            <Bell className="h-4 w-4 inline mr-2" />
            Alertas
            {unreadAlerts.length > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {unreadAlerts.length}
              </Badge>
            )}
          </button>
        </div>

        {/* Incidentes Tab */}
        {activeTab === "incidentes" && (
          <Card className=" p-4 -mt-4">
            <CardHeader>
              <div className="flex items-center justify-between ">
                <div>
                  <CardTitle className="text-neuralops-dark-blue">Gestión de Incidentes</CardTitle>
                  <CardDescription>Registro y seguimiento de incidentes de seguridad</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isGenerateReportOpen} onOpenChange={setIsGenerateReportOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Generar Reporte
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Generar Reporte de Incidentes</DialogTitle>
                        <DialogDescription>
                          Configura los parámetros para generar un reporte personalizado
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="report-type">Tipo de Reporte</Label>
                          <Select
                            value={reportConfig.type}
                            onValueChange={(value) => setReportConfig((prev) => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mensual">Reporte Mensual</SelectItem>
                              <SelectItem value="trimestral">Reporte Trimestral</SelectItem>
                              <SelectItem value="anual">Reporte Anual</SelectItem>
                              <SelectItem value="personalizado">Período Personalizado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Departamento</Label>
                          <Select
                            value={reportConfig.department}
                            onValueChange={(value) => setReportConfig((prev) => ({ ...prev, department: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Todos los departamentos" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todos">Todos</SelectItem>
                              <SelectItem value="produccion">Producción</SelectItem>
                              <SelectItem value="calidad">Calidad</SelectItem>
                              <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                              <SelectItem value="logistica">Logística</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date-from">Fecha Desde</Label>
                          <Input
                            id="date-from"
                            type="date"
                            value={reportConfig.dateFrom}
                            onChange={(e) => setReportConfig((prev) => ({ ...prev, dateFrom: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date-to">Fecha Hasta</Label>
                          <Input
                            id="date-to"
                            type="date"
                            value={reportConfig.dateTo}
                            onChange={(e) => setReportConfig((prev) => ({ ...prev, dateTo: e.target.value }))}
                          />
                        </div>
                        <div className="col-span-2 space-y-3">
                          <Label>Opciones del Reporte</Label>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-graphics"
                              checked={reportConfig.includeGraphics}
                              onCheckedChange={(checked) =>
                                setReportConfig((prev) => ({ ...prev, includeGraphics: checked as boolean }))
                              }
                            />
                            <Label htmlFor="include-graphics">Incluir gráficos y estadísticas</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="include-recommendations"
                              checked={reportConfig.includeRecommendations}
                              onCheckedChange={(checked) =>
                                setReportConfig((prev) => ({ ...prev, includeRecommendations: checked as boolean }))
                              }
                            />
                            <Label htmlFor="include-recommendations">Incluir recomendaciones</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsGenerateReportOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleGenerateReport} disabled={isLoading}>
                          {isLoading ? "Generando..." : "Generar Reporte"}
                          <Download className="h-4 w-4 ml-2" />
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isNewIncidentOpen} onOpenChange={setIsNewIncidentOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Reportar Incidente
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Reportar Nuevo Incidente</DialogTitle>
                        <DialogDescription>
                          Registra un nuevo incidente de seguridad y salud en el trabajo
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="incident-title">Título del Incidente</Label>
                          <Input
                            id="incident-title"
                            value={newIncident.title}
                            onChange={(e) => setNewIncident((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Descripción breve del incidente"
                          />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="incident-description">Descripción Detallada</Label>
                          <Textarea
                            id="incident-description"
                            value={newIncident.description}
                            onChange={(e) => setNewIncident((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Describe detalladamente lo ocurrido"
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="severity">Severidad</Label>
                          <Select
                            value={newIncident.severity}
                            onValueChange={(value) => setNewIncident((prev) => ({ ...prev, severity: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar severidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Baja">Baja</SelectItem>
                              <SelectItem value="Media">Media</SelectItem>
                              <SelectItem value="Alta">Alta</SelectItem>
                              <SelectItem value="Crítica">Crítica</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Departamento</Label>
                          <Select
                            value={newIncident.department}
                            onValueChange={(value) => setNewIncident((prev) => ({ ...prev, department: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar departamento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Producción">Producción</SelectItem>
                              <SelectItem value="Calidad">Calidad</SelectItem>
                              <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                              <SelectItem value="Logística">Logística</SelectItem>
                              <SelectItem value="Administración">Administración</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Ubicación</Label>
                          <Input
                            id="location"
                            value={newIncident.location}
                            onChange={(e) => setNewIncident((prev) => ({ ...prev, location: e.target.value }))}
                            placeholder="Lugar específico donde ocurrió"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="injured-person">Persona Afectada</Label>
                          <Input
                            id="injured-person"
                            value={newIncident.injuredPerson}
                            onChange={(e) => setNewIncident((prev) => ({ ...prev, injuredPerson: e.target.value }))}
                            placeholder="Nombre de la persona afectada"
                          />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="witnesses">Testigos</Label>
                          <Input
                            id="witnesses"
                            value={newIncident.witnesses}
                            onChange={(e) => setNewIncident((prev) => ({ ...prev, witnesses: e.target.value }))}
                            placeholder="Nombres de testigos (separados por comas)"
                          />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="immediate-actions">Acciones Inmediatas Tomadas</Label>
                          <Textarea
                            id="immediate-actions"
                            value={newIncident.immediateActions}
                            onChange={(e) => setNewIncident((prev) => ({ ...prev, immediateActions: e.target.value }))}
                            placeholder="Describe las acciones inmediatas que se tomaron"
                            rows={2}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewIncidentOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateIncident} disabled={isLoading}>
                          {isLoading ? "Reportando..." : "Reportar Incidente"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neuralops-medium-blue" />
                  <Input
                    placeholder="Buscar incidentes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Incidente</TableHead>
                    <TableHead>Severidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-neuralops-dark-blue">{incident.title}</div>
                          <div className="text-sm text-neuralops-medium-blue">{incident.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            incident.severity === "Alta" || incident.severity === "Crítica"
                              ? "destructive"
                              : incident.severity === "Media"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={incident.status === "Cerrado" ? "default" : "outline"}>{incident.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-neuralops-medium-blue">{incident.date}</TableCell>
                      <TableCell>{incident.location}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog
                            open={isIncidentDetailsOpen && selectedIncident?.id === incident.id}
                            onOpenChange={(open) => {
                              setIsIncidentDetailsOpen(open)
                              if (!open) setSelectedIncident(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedIncident(incident)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Detalles del Incidente</DialogTitle>
                                <DialogDescription>Información completa del incidente reportado</DialogDescription>
                              </DialogHeader>
                              {selectedIncident && (
                                <div className="space-y-6 py-4">
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-3">
                                        <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                          <AlertTriangle className="h-4 w-4 text-neuralops-gold" />
                                        </div>
                                        <div>
                                          <p className="text-sm text-neuralops-medium-blue">Título</p>
                                          <p className="font-medium text-neuralops-dark-blue">{selectedIncident.title}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                          <Calendar className="h-4 w-4 text-neuralops-gold" />
                                        </div>
                                        <div>
                                          <p className="text-sm text-neuralops-medium-blue">Fecha y Hora</p>
                                          <p className="font-medium text-neuralops-dark-blue">
                                            {selectedIncident.date} - {selectedIncident.time}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                          <MapPin className="h-4 w-4 text-neuralops-gold" />
                                        </div>
                                        <div>
                                          <p className="text-sm text-neuralops-medium-blue">Ubicación</p>
                                          <p className="font-medium text-neuralops-dark-blue">
                                            {selectedIncident.location}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                          <User className="h-4 w-4 text-neuralops-gold" />
                                        </div>
                                        <div>
                                          <p className="text-sm text-neuralops-medium-blue">Reportado por</p>
                                          <p className="font-medium text-neuralops-dark-blue">
                                            {selectedIncident.reportedBy}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-4">
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Severidad</p>
                                        <Badge
                                          variant={
                                            selectedIncident.severity === "Alta" ||
                                              selectedIncident.severity === "Crítica"
                                              ? "destructive"
                                              : selectedIncident.severity === "Media"
                                                ? "default"
                                                : "secondary"
                                          }
                                        >
                                          {selectedIncident.severity}
                                        </Badge>
                                      </div>
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Estado</p>
                                        <Badge variant={selectedIncident.status === "Cerrado" ? "default" : "outline"}>
                                          {selectedIncident.status}
                                        </Badge>
                                      </div>
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Departamento</p>
                                        <p className="font-medium text-neuralops-dark-blue">
                                          {selectedIncident.department}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Persona Afectada</p>
                                        <p className="font-medium text-neuralops-dark-blue">
                                          {selectedIncident.injuredPerson}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue mb-2">Descripción</p>
                                      <p className="text-neuralops-dark-blue bg-neuralops-very-light-blue p-3 rounded-lg">
                                        {selectedIncident.description}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue mb-2">Acciones Inmediatas</p>
                                      <p className="text-neuralops-dark-blue bg-neuralops-very-light-blue p-3 rounded-lg">
                                        {selectedIncident.immediateActions}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue mb-2">Causa Raíz</p>
                                      <p className="text-neuralops-dark-blue bg-neuralops-very-light-blue p-3 rounded-lg">
                                        {selectedIncident.rootCause}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue mb-2">Testigos</p>
                                      <div className="flex gap-2">
                                        {selectedIncident.witnesses.map((witness: string, index: number) => (
                                          <Badge key={index} variant="outline">
                                            {witness}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            open={isEditIncidentOpen && selectedIncident?.id === incident.id}
                            onOpenChange={(open) => {
                              setIsEditIncidentOpen(open)
                              if (!open) setSelectedIncident(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedIncident(incident)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Editar Incidente</DialogTitle>
                                <DialogDescription>Modifica la información del incidente</DialogDescription>
                              </DialogHeader>
                              {selectedIncident && (
                                <div className="grid grid-cols-2 gap-4 py-4">
                                  <div className="space-y-2 col-span-2">
                                    <Label htmlFor="edit-title">Título del Incidente</Label>
                                    <Input id="edit-title" defaultValue={selectedIncident.title} />
                                  </div>
                                  <div className="space-y-2 col-span-2">
                                    <Label htmlFor="edit-description">Descripción</Label>
                                    <Textarea
                                      id="edit-description"
                                      defaultValue={selectedIncident.description}
                                      rows={3}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-severity">Severidad</Label>
                                    <Select defaultValue={selectedIncident.severity}>
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
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-status">Estado</Label>
                                    <Select defaultValue={selectedIncident.status}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Reportado">Reportado</SelectItem>
                                        <SelectItem value="En Investigación">En Investigación</SelectItem>
                                        <SelectItem value="En Seguimiento">En Seguimiento</SelectItem>
                                        <SelectItem value="Cerrado">Cerrado</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2 col-span-2">
                                    <Label htmlFor="edit-root-cause">Causa Raíz</Label>
                                    <Textarea id="edit-root-cause" defaultValue={selectedIncident.rootCause} rows={2} />
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditIncidentOpen(false)}>
                                  Cancelar
                                </Button>
                                <Button onClick={() => setIsEditIncidentOpen(false)}>Guardar Cambios</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Inspecciones Tab */}
        {activeTab === "inspecciones" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-neuralops-dark-blue">Inspecciones y Checklists</CardTitle>
                  <CardDescription>Gestión de inspecciones periódicas y listas de verificación</CardDescription>
                </div>
                <Dialog open={isNewChecklistOpen} onOpenChange={setIsNewChecklistOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Checklist
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Checklist</DialogTitle>
                      <DialogDescription>Define un nuevo checklist de inspección</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="checklist-title">Título</Label>
                          <Input
                            id="checklist-title"
                            value={newChecklist.title}
                            onChange={(e) => setNewChecklist((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Nombre del checklist"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checklist-frequency">Frecuencia</Label>
                          <Select
                            value={newChecklist.frequency}
                            onValueChange={(value) => setNewChecklist((prev) => ({ ...prev, frequency: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar frecuencia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Diario">Diario</SelectItem>
                              <SelectItem value="Semanal">Semanal</SelectItem>
                              <SelectItem value="Mensual">Mensual</SelectItem>
                              <SelectItem value="Trimestral">Trimestral</SelectItem>
                              <SelectItem value="Anual">Anual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="checklist-description">Descripción</Label>
                        <Textarea
                          id="checklist-description"
                          value={newChecklist.description}
                          onChange={(e) => setNewChecklist((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Descripción del checklist"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="checklist-assigned">Asignado a</Label>
                        <Input
                          id="checklist-assigned"
                          value={newChecklist.assignedTo}
                          onChange={(e) => setNewChecklist((prev) => ({ ...prev, assignedTo: e.target.value }))}
                          placeholder="Responsable del checklist"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Items del Checklist</Label>
                          <Button type="button" variant="outline" size="sm" onClick={addChecklistItem}>
                            <Plus className="h-4 w-4 mr-1" />
                            Agregar Item
                          </Button>
                        </div>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {newChecklist.items.map((item, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={item}
                                onChange={(e) => updateChecklistItem(index, e.target.value)}
                                placeholder={`Item ${index + 1}`}
                              />
                              {newChecklist.items.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeChecklistItem(index)}
                                >
                                  ×
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewChecklistOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateChecklist} disabled={isLoading}>
                        {isLoading ? "Creando..." : "Crear Checklist"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neuralops-medium-blue" />
                  <Input
                    placeholder="Buscar checklists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <div className="grid gap-4">
                {filteredChecklists.map((checklist) => (
                  <Card key={checklist.id} className="border border-neuralops-very-light-blue">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-neuralops-dark-blue">{checklist.title}</h3>
                            <Badge variant={checklist.status === "Completado" ? "default" : "outline"}>
                              {checklist.status}
                            </Badge>
                            <Badge variant="secondary">{checklist.frequency}</Badge>
                          </div>
                          <p className="text-neuralops-medium-blue mb-4">{checklist.description}</p>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-neuralops-medium-blue">Asignado a</p>
                              <p className="font-medium text-neuralops-dark-blue">{checklist.assignedTo}</p>
                            </div>
                            <div>
                              <p className="text-neuralops-medium-blue">Última Inspección</p>
                              <p className="font-medium text-neuralops-dark-blue">{checklist.lastCompleted}</p>
                            </div>
                            <div>
                              <p className="text-neuralops-medium-blue">Próxima Inspección</p>
                              <p className="font-medium text-neuralops-dark-blue">{checklist.nextDue}</p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm text-neuralops-medium-blue">Progreso</p>
                              <p className="text-sm text-neuralops-medium-blue">
                                {checklist.items.filter((item) => item.completed).length}/{checklist.items.length}
                              </p>
                            </div>
                            <div className="w-full bg-neuralops-very-light-blue rounded-full h-2">
                              <div
                                className="bg-neuralops-gold h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(checklist.items.filter((item) => item.completed).length / checklist.items.length) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {checklist.status === "Pendiente" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <CheckSquare className="h-4 w-4 mr-2" />
                                  Completar
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Completar checklist?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    ¿Estás seguro de que quieres marcar este checklist como completado? Esta acción
                                    registrará la fecha y hora actual.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleCompleteChecklist(checklist.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Completar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}

                          <Dialog
                            open={isChecklistDetailsOpen && selectedChecklist?.id === checklist.id}
                            onOpenChange={(open) => {
                              setIsChecklistDetailsOpen(open)
                              if (!open) setSelectedChecklist(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedChecklist(checklist)}>
                                <History className="h-4 w-4 mr-2" />
                                Ver Historial
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Historial de Inspección - {checklist.title}</DialogTitle>
                                <DialogDescription>Detalles e historial de inspecciones realizadas</DialogDescription>
                              </DialogHeader>
                              {selectedChecklist && (
                                <div className="space-y-6 py-4">
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Descripción</p>
                                        <p className="text-neuralops-dark-blue">{selectedChecklist.description}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Frecuencia</p>
                                        <Badge variant="outline">{selectedChecklist.frequency}</Badge>
                                      </div>
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Asignado a</p>
                                        <p className="text-neuralops-dark-blue">{selectedChecklist.assignedTo}</p>
                                      </div>
                                    </div>
                                    <div className="space-y-4">
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Estado Actual</p>
                                        <Badge
                                          variant={selectedChecklist.status === "Completado" ? "default" : "outline"}
                                        >
                                          {selectedChecklist.status}
                                        </Badge>
                                      </div>
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Última Inspección</p>
                                        <p className="text-neuralops-dark-blue">{selectedChecklist.lastCompleted}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-neuralops-medium-blue mb-1">Próxima Inspección</p>
                                        <p className="text-neuralops-dark-blue">{selectedChecklist.nextDue}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="text-sm text-neuralops-medium-blue mb-3">Items del Checklist</p>
                                    <div className="space-y-2">
                                      {selectedChecklist.items.map((item: any) => (
                                        <div
                                          key={item.id}
                                          className="flex items-center gap-3 p-3 bg-neuralops-very-light-blue rounded-lg"
                                        >
                                          <div
                                            className={`w-4 h-4 rounded-full ${item.completed ? "bg-green-500" : "bg-gray-300"
                                              }`}
                                          />
                                          <span
                                            className={`flex-1 ${item.completed ? "text-neuralops-dark-blue" : "text-neuralops-medium-blue"
                                              }`}
                                          >
                                            {item.description}
                                          </span>
                                          {item.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alertas Tab */}
        {activeTab === "alertas" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-neuralops-dark-blue">Alertas y Notificaciones</CardTitle>
                  <CardDescription>Gestión de alertas de seguridad y cumplimiento</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAlertsList((prev) => prev.map((alert) => ({ ...alert, read: true })))
                    }}
                  >
                    <BellOff className="h-4 w-4 mr-2" />
                    Marcar Todas como Leídas
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertsList.map((alert) => (
                  <Card
                    key={alert.id}
                    className={`border transition-all duration-200 ${alert.read
                        ? "border-neuralops-very-light-blue bg-white"
                        : "border-neuralops-gold bg-neuralops-gold/5"
                      }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className={`p-2 rounded-lg ${alert.type === "warning" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                              }`}
                          >
                            {alert.type === "warning" ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <Bell className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-neuralops-dark-blue">{alert.title}</h4>
                              {!alert.read && <div className="w-2 h-2 bg-neuralops-gold rounded-full" />}
                              <Badge
                                variant={
                                  alert.priority === "Alta"
                                    ? "destructive"
                                    : alert.priority === "Media"
                                      ? "default"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {alert.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-neuralops-medium-blue mb-2">{alert.description}</p>
                            <div className="flex items-center gap-1 text-xs text-neuralops-medium-blue">
                              <Clock className="h-3 w-3" />
                              {alert.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!alert.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAlertAsRead(alert.id)}
                              className="text-neuralops-gold hover:text-neuralops-gold/80"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* EPP Tab */}
        {activeTab === "epp" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-neuralops-dark-blue">Gestión de EPP</CardTitle>
                  <CardDescription>Control de Elementos de Protección Personal</CardDescription>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-neuralops-medium-blue text-neuralops-medium-blue hover:bg-neuralops-medium-blue hover:text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Solicitud EPP
                  </Button>
                  <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                    <Package className="h-4 w-4 mr-2" />
                    Agregar EPP
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Resumen de Stock */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="border-green-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {eppItems.filter(item => item.estado === "Disponible").length}
                      </div>
                      <div className="text-sm text-neuralops-medium-blue">Items Disponibles</div>
                    </CardContent>
                  </Card>
                  <Card className="border-yellow-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {eppItems.filter(item => item.estado === "Stock Bajo").length}
                      </div>
                      <div className="text-sm text-neuralops-medium-blue">Stock Bajo</div>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {eppItems.reduce((total, item) => total + item.stock, 0)}
                      </div>
                      <div className="text-sm text-neuralops-medium-blue">Total Unidades</div>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {solicitudesEPP.filter(sol => sol.estado === "Pendiente").length}
                      </div>
                      <div className="text-sm text-neuralops-medium-blue">Solicitudes Pendientes</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Inventario de EPP */}
                <div>
                  <h3 className="text-lg font-semibold text-neuralops-dark-blue mb-4">Inventario de EPP</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Elemento</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Bodega</TableHead>
                        <TableHead>Vencimiento</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eppItems.map((item) => (
                        <TableRow key={item.id} className="hover:bg-neuralops-beige/5">
                          <TableCell className="font-medium text-neuralops-dark-blue">{item.codigo}</TableCell>
                          <TableCell>{item.nombre}</TableCell>
                          <TableCell className="text-neuralops-medium-blue">{item.categoria}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.stock}</span>
                              <span className="text-sm text-neuralops-medium-blue">/ {item.optimo}</span>
                              {item.stock < item.minimo && (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              item.estado === "Disponible"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : item.estado === "Stock Bajo"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                            }>
                              {item.estado}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-neuralops-medium-blue">{item.bodega}</TableCell>
                          <TableCell className="text-neuralops-medium-blue">{item.fechaVencimiento}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-neuralops-beige/20">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Truck className="h-4 w-4 mr-2" />
                                  Movimiento
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Solicitudes de EPP */}
                <div>
                  <h3 className="text-lg font-semibold text-neuralops-dark-blue mb-4">Solicitudes de EPP</h3>
                  <div className="grid gap-4">
                    {solicitudesEPP.map((solicitud) => (
                      <Card key={solicitud.id} className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-full ${solicitud.urgencia === 'Alta' ? 'bg-red-100' :
                                  solicitud.urgencia === 'Media' ? 'bg-yellow-100' :
                                    'bg-green-100'
                                }`}>
                                <Package className={`h-5 w-5 ${solicitud.urgencia === 'Alta' ? 'text-red-600' :
                                    solicitud.urgencia === 'Media' ? 'text-yellow-600' :
                                      'text-green-600'
                                  }`} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-neuralops-dark-blue">{solicitud.empleado}</h4>
                                <p className="text-neuralops-medium-blue text-sm">{solicitud.departamento}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-sm text-neuralops-medium-blue">
                                    Fecha: {solicitud.fechaSolicitud}
                                  </span>
                                  <Badge variant="outline" className={`text-xs ${solicitud.urgencia === 'Alta' ? 'border-red-500 text-red-600' :
                                      solicitud.urgencia === 'Media' ? 'border-yellow-500 text-yellow-600' :
                                        'border-green-500 text-green-600'
                                    }`}>
                                    {solicitud.urgencia}
                                  </Badge>
                                </div>
                                <div className="mt-2">
                                  <span className="text-sm text-neuralops-medium-blue">Items solicitados:</span>
                                  {solicitud.items.map((item, idx) => (
                                    <div key={idx} className="text-sm text-neuralops-dark-blue ml-2">
                                      • {item.nombre} x{item.cantidad}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={
                                solicitud.estado === "Aprobada"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : solicitud.estado === "Pendiente"
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                              }>
                                {solicitud.estado}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="hover:bg-neuralops-beige/20">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver Detalles
                                  </DropdownMenuItem>
                                  {solicitud.estado === 'Pendiente' && (
                                    <>
                                      <DropdownMenuItem>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Aprobar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Rechazar
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reportes EPP Tab */}
        {activeTab === "reportes-epp" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Costos EPP por Cargo</CardTitle>
                  <CardDescription>Análisis basado en las funciones SQL del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { cargo: "Técnico Mantenimiento", empleados: 5, costo: "$125,000", items: 8 },
                      { cargo: "Operador Producción", empleados: 12, costo: "$285,000", items: 6 },
                      { cargo: "Supervisor SST", empleados: 3, costo: "$95,000", items: 10 },
                      { cargo: "Técnico Calidad", empleados: 4, costo: "$110,000", items: 7 },
                    ].map((cargo, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-neuralops-beige/10 rounded-lg">
                        <div>
                          <p className="font-medium text-neuralops-dark-blue">{cargo.cargo}</p>
                          <p className="text-sm text-neuralops-medium-blue">{cargo.empleados} empleados • {cargo.items} tipos EPP</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-neuralops-dark-blue">{cargo.costo}</p>
                          <p className="text-xs text-neuralops-medium-blue">costo mensual</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Stock por Categoría</CardTitle>
                  <CardDescription>Distribución del inventario por tipo de EPP</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { categoria: "Protección de la cabeza", items: 150, valor: "$2.25M", color: "bg-blue-500" },
                      { categoria: "Protección ocular", items: 85, valor: "$720K", color: "bg-green-500" },
                      { categoria: "Protección de manos", items: 500, valor: "$125K", color: "bg-yellow-500" },
                      { categoria: "Protección respiratoria", items: 200, valor: "$1.8M", color: "bg-red-500" },
                    ].map((categoria, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-neuralops-dark-blue">{categoria.categoria}</span>
                          <div className="text-right">
                            <div className="text-sm font-medium text-neuralops-dark-blue">{categoria.items} items</div>
                            <div className="text-xs text-neuralops-medium-blue">{categoria.valor}</div>
                          </div>
                        </div>
                        <div className="w-full bg-neuralops-very-light-blue rounded-full h-2">
                          <div className={`h-2 ${categoria.color} rounded-full`} style={{ width: `${(categoria.items / 500) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reportes adicionales específicos de EPP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Entrega EPP Mensual</CardTitle>
                  <CardDescription>Distribución de EPP por departamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { departamento: "Mantenimiento", entregas: 45, porcentaje: 35 },
                      { departamento: "Producción", entregas: 62, porcentaje: 48 },
                      { departamento: "Calidad", entregas: 12, porcentaje: 9 },
                      { departamento: "Otros", entregas: 10, porcentaje: 8 },
                    ].map((dept, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-neuralops-dark-blue">{dept.departamento}</span>
                          <span className="text-sm text-neuralops-medium-blue">{dept.entregas} entregas</span>
                        </div>
                        <div className="w-full bg-neuralops-very-light-blue rounded-full h-1.5">
                          <div
                            className="h-1.5 bg-neuralops-gold rounded-full"
                            style={{ width: `${dept.porcentaje}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Estado de Stock EPP</CardTitle>
                  <CardDescription>Alertas de reposición</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">85%</div>
                        <div className="text-xs text-green-600">Stock Normal</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-lg font-bold text-yellow-600">12%</div>
                        <div className="text-xs text-yellow-600">Stock Bajo</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-600">3%</div>
                        <div className="text-xs text-red-600">Stock Crítico</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-600">0%</div>
                        <div className="text-xs text-gray-600">Agotado</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Próximos Vencimientos</CardTitle>
                  <CardDescription>EPP que requiere renovación</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { item: "Cascos Seguridad Lote A", dias: 15, cantidad: 25 },
                      { item: "Gafas Protección Lote B", dias: 28, cantidad: 40 },
                      { item: "Guantes Nitrilo Lote C", dias: 45, cantidad: 100 },
                      { item: "Mascarillas N95 Lote D", dias: 62, cantidad: 200 },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-neuralops-beige/5 rounded">
                        <div>
                          <div className="text-sm font-medium text-neuralops-dark-blue">{item.item}</div>
                          <div className="text-xs text-neuralops-medium-blue">{item.cantidad} unidades</div>
                        </div>
                        <div className={`text-right ${item.dias <= 30 ? 'text-red-600' : item.dias <= 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                          <div className="text-sm font-medium">{item.dias} días</div>
                          <div className="text-xs">para vencer</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Dialogo Visión Artificial IA - Estilo Inventario */}
        <Dialog open={isVisionOpen} onOpenChange={setIsVisionOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                IA - Visión Artificial de Seguridad
              </DialogTitle>
              <DialogDescription>
                Detecta automáticamente violaciones de seguridad usando cámaras y análisis de imágenes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Sube imágenes del área de trabajo para análisis de seguridad
                </p>
                <Button variant="outline" className="border-purple-300 text-purple-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Cargar Imágenes
                </Button>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Detecciones de IA
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>EPP Faltante:</strong> Trabajador sin casco</span>
                    <Badge className="bg-red-100 text-red-700">Crítico</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Área Restringida:</strong> Personal no autorizado</span>
                    <Badge className="bg-orange-100 text-orange-700">Alto</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Orden y Aseo:</strong> Obstrucción en pasillo</span>
                    <Badge className="bg-yellow-100 text-yellow-700">Medio</Badge>
                  </div>
                </div>
              </div>

              {isProcessing && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                    <span className="text-purple-800">Analizando imágenes con IA...</span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsVisionOpen(false)}>
                Cerrar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Generar Alerta de Incidente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialogo Análisis de Riesgos IA - Estilo Inventario */}
        <Dialog open={isRiskAnalysisOpen} onOpenChange={setIsRiskAnalysisOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                IA - Análisis de Riesgos
              </DialogTitle>
              <DialogDescription>
                Evalúa automáticamente riesgos y propone medidas de control
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Evaluación de Riesgos
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm"><strong>Trabajo en Alturas:</strong></span>
                      <Badge className="bg-red-100 text-red-700">Alto</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm"><strong>Manejo de Químicos:</strong></span>
                      <Badge className="bg-orange-100 text-orange-700">Medio</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm"><strong>Operación de Máquinas:</strong></span>
                      <Badge className="bg-yellow-100 text-yellow-700">Bajo</Badge>
                    </div>
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Medidas de Control IA
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm font-medium text-green-800">Arnés de Seguridad</p>
                      <p className="text-xs text-green-600">Obligatorio para trabajo en alturas</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm font-medium text-blue-800">Ventilación Adicional</p>
                      <p className="text-xs text-blue-600">Requerida en área de químicos</p>
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
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Capacitación urgente en alturas</p>
                      <p className="text-xs text-gray-600">3 empleados requieren certificación</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Actualizar matriz de riesgos</p>
                      <p className="text-xs text-gray-600">Incluir nuevos procesos identificados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRiskAnalysisOpen(false)}>
                Cerrar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="mr-2 h-4 w-4" />
                Generar Matriz de Riesgos
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialogo Análisis Predictivo - Estilo Inventario */}
        <Dialog open={isPredictiveOpen} onOpenChange={setIsPredictiveOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-600" />
                IA - Análisis Predictivo de Incidentes
              </DialogTitle>
              <DialogDescription>
                Predice posibles incidentes y sugiere acciones preventivas
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Predicciones de Incidentes
                  </h4>
                  <div className="space-y-3">
                    <div className="p-2 bg-red-50 border border-red-200 rounded">
                      <p className="text-sm font-medium text-red-800">Área de Soldadura</p>
                      <p className="text-xs text-red-600">78% probabilidad de incidente</p>
                      <p className="text-xs text-red-500">Factor: Mantenimiento pendiente</p>
                    </div>
                    <div className="p-2 bg-orange-50 border border-orange-200 rounded">
                      <p className="text-sm font-medium text-orange-800">Almacén Químicos</p>
                      <p className="text-xs text-orange-600">45% probabilidad de incidente</p>
                      <p className="text-xs text-orange-500">Factor: Ventilación deficiente</p>
                    </div>
                  </div>
                </div>

                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Métricas de Seguridad
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border text-center">
                      <p className="text-lg font-bold text-green-600">156</p>
                      <p className="text-xs text-green-500">Días sin incidentes</p>
                    </div>
                    <div className="p-2 bg-white rounded border text-center">
                      <p className="text-lg font-bold text-blue-600">92%</p>
                      <p className="text-xs text-blue-500">Cumplimiento EPP</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Acciones Preventivas de IA
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Mantenimiento urgente - Soldadura</p>
                      <p className="text-xs text-gray-600">Programar revisión de equipos antes del viernes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Inspección de ventilación</p>
                      <p className="text-xs text-gray-600">Verificar sistemas en almacén de químicos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Capacitación refuerzo EPP</p>
                      <p className="text-xs text-gray-600">Aumentar cumplimiento al 98%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPredictiveOpen(false)}>
                Cerrar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Calendar className="mr-2 h-4 w-4" />
                Programar Acciones
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
