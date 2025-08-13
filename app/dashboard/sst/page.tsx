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
} from "lucide-react"

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

      <div className="p-6 space-y-6">
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
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "incidentes"
              ? "bg-white text-neuralops-dark-blue shadow-sm"
              : "text-neuralops-medium-blue hover:text-neuralops-dark-blue"
          }`}
        >
          <AlertTriangle className="h-4 w-4 inline mr-2" />
          Incidentes
        </button>
        <button
          onClick={() => setActiveTab("inspecciones")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "inspecciones"
              ? "bg-white text-neuralops-dark-blue shadow-sm"
              : "text-neuralops-medium-blue hover:text-neuralops-dark-blue"
          }`}
        >
          <ClipboardList className="h-4 w-4 inline mr-2" />
          Inspecciones
        </button>
        <button
          onClick={() => setActiveTab("alertas")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "alertas"
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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
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
                                          className={`w-4 h-4 rounded-full ${
                                            item.completed ? "bg-green-500" : "bg-gray-300"
                                          }`}
                                        />
                                        <span
                                          className={`flex-1 ${
                                            item.completed ? "text-neuralops-dark-blue" : "text-neuralops-medium-blue"
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
                  className={`border transition-all duration-200 ${
                    alert.read
                      ? "border-neuralops-very-light-blue bg-white"
                      : "border-neuralops-gold bg-neuralops-gold/5"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`p-2 rounded-lg ${
                            alert.type === "warning" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
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
      </div>
    </div>
  )
}
