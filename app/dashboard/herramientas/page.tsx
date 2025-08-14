"use client"

import { useState } from "react"
import {
  Wrench,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  User,
  MapPin,
  FileText,
  Camera,
  Hammer,
  Settings,
  TrendingUp,
  Brain,
  Sparkles,
  Scan,
  Shield,
  Zap,
  BarChart3,
  Target,
  Activity,
  Bot
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
// import {
//   Wrench,
//   Plus,
//   Search,
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Clock,
//   CheckCircle,
//   AlertTriangle,
//   Calendar,
//   User,
//   MapPin,
//   FileText,
//   Camera,
//   Hammer,
//   Settings,
//   TrendingUp,
//   Package,
// } from "lucide-react"

// Datos de herramientas
const herramientas = [
  {
    id: "HER-001",
    codigo: "TAL-001",
    nombre: "Taladro Percutor Bosch",
    categoria: "Herramientas Eléctricas",
    estado: "Disponible",
    ubicacion: "Taller Principal",
    responsable: null,
    fechaAdquisicion: "2023-05-15",
    valorCompra: "$150,000",
    estadoFisico: "Excelente",
    proximoMantenimiento: "2024-09-15",
    marca: "Bosch",
    modelo: "GSB 13 RE",
    numeroSerie: "BSH001234",
  },
  {
    id: "HER-002",
    codigo: "SOL-001",
    nombre: "Soldadora Inverter Lincoln",
    categoria: "Soldadura",
    estado: "En préstamo",
    ubicacion: "Obra Site A",
    responsable: "Carlos López",
    fechaAdquisicion: "2023-08-20",
    valorCompra: "$450,000",
    estadoFisico: "Bueno",
    proximoMantenimiento: "2024-08-20",
    marca: "Lincoln",
    modelo: "Invertec V155-S",
    numeroSerie: "LIN005678",
  },
  {
    id: "HER-003",
    codigo: "MED-001",
    nombre: "Multímetro Digital Fluke",
    categoria: "Instrumentos de Medición",
    estado: "En mantenimiento",
    ubicacion: "Taller Eléctrico",
    responsable: "María González",
    fechaAdquisicion: "2024-01-10",
    valorCompra: "$85,000",
    estadoFisico: "Requiere calibración",
    proximoMantenimiento: "2024-10-10",
    marca: "Fluke",
    modelo: "87V",
    numeroSerie: "FLU009876",
  },
]

// Préstamos activos
const prestamos = [
  {
    id: "PRES-001",
    herramienta: "Taladro Percutor Bosch",
    codigo: "TAL-001",
    empleado: "Juan Pérez",
    area: "Mantenimiento",
    fechaPrestamo: "2024-08-10",
    fechaDevolucionProgramada: "2024-08-15",
    proyecto: "Reparación Bomba #3",
    estado: "Activo",
    observaciones: "Para reparación urgente",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "PRES-002",
    herramienta: "Soldadora Inverter Lincoln",
    codigo: "SOL-001",
    empleado: "Carlos López",
    area: "Obras",
    fechaPrestamo: "2024-08-08",
    fechaDevolucionProgramada: "2024-08-20",
    proyecto: "Instalación Site A",
    estado: "Vencido",
    observaciones: "Proyecto extendido",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Mantenimientos
const mantenimientos = [
  {
    id: "MAN-001",
    herramienta: "Compresor Industrial",
    tipo: "Preventivo",
    fechaProgramada: "2024-08-15",
    estado: "Programado",
    tecnico: "Roberto Díaz",
    descripcion: "Cambio de filtros y aceite",
    costo: "$25,000",
  },
  {
    id: "MAN-002",
    herramienta: "Multímetro Digital Fluke",
    tipo: "Correctivo",
    fechaProgramada: "2024-08-12",
    estado: "En proceso",
    tecnico: "Ana Martínez",
    descripcion: "Calibración y verificación",
    costo: "$15,000",
  },
]

export default function HerramientasPage() {
  const [selectedHerramienta, setSelectedHerramienta] = useState<any>(null)
  const [isNewHerramientaOpen, setIsNewHerramientaOpen] = useState(false)
  const [isNewPrestamoOpen, setIsNewPrestamoOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Estados para IA - Estilo Inventario
  const [isInspeccionOpen, setIsInspeccionOpen] = useState(false)
  const [isMonitoreoOpen, setIsMonitoreoOpen] = useState(false)
  const [isOptimizacionOpen, setIsOptimizacionOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible":
        return "bg-green-100 text-green-800 border-green-200"
      case "En préstamo":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "En mantenimiento":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Fuera de servicio":
        return "bg-red-100 text-red-800 border-red-200"
      case "Activo":
        return "bg-green-100 text-green-800 border-green-200"
      case "Vencido":
        return "bg-red-100 text-red-800 border-red-200"
      case "Programado":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "En proceso":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Completado":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEstadoFisicoColor = (estado: string) => {
    switch (estado) {
      case "Excelente":
        return "text-green-600"
      case "Bueno":
        return "text-blue-600"
      case "Regular":
        return "text-yellow-600"
      case "Malo":
        return "text-red-600"
      default:
        return "text-neuralops-medium-blue"
    }
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold space-y-4">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Módulo de Herramientas</h1>
              <p className="text-neuralops-beige text-lg">Gestión de préstamos, mantenimiento y control de herramientas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Wrench className="h-12 w-12 text-white" />
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

            {/* Inspección Visual */}
            <Dialog open={isInspeccionOpen} onOpenChange={setIsInspeccionOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                  <Camera className="h-4 w-4 mr-2" />
                  Inspección IA
                </Button>
              </DialogTrigger>
            </Dialog>

            {/* Monitoreo Estado */}
            <Dialog open={isMonitoreoOpen} onOpenChange={setIsMonitoreoOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  <Activity className="h-4 w-4 mr-2" />
                  Monitoreo IA
                </Button>
              </DialogTrigger>
            </Dialog>

            {/* Optimización Uso */}
            <Dialog open={isOptimizacionOpen} onOpenChange={setIsOptimizacionOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                  <Target className="h-4 w-4 mr-2" />
                  Optimización IA
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

      <div className="p-6 -mt-4">
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-6">{/* Dialog components stay the same */}
          <Dialog open={isNewHerramientaOpen} onOpenChange={setIsNewHerramientaOpen}>
            <DialogTrigger asChild>
              <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Herramienta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Registrar Nueva Herramienta</DialogTitle>
                <DialogDescription>Agrega una herramienta al inventario</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código</Label>
                  <Input id="codigo" placeholder="TAL-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" placeholder="Taladro Percutor" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electricas">Herramientas Eléctricas</SelectItem>
                      <SelectItem value="manuales">Herramientas Manuales</SelectItem>
                      <SelectItem value="medicion">Instrumentos de Medición</SelectItem>
                      <SelectItem value="soldadura">Soldadura</SelectItem>
                      <SelectItem value="neumaticas">Herramientas Neumáticas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca</Label>
                  <Input id="marca" placeholder="Bosch" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo</Label>
                  <Input id="modelo" placeholder="GSB 13 RE" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serie">Número de Serie</Label>
                  <Input id="serie" placeholder="BSH001234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor de Compra</Label>
                  <Input id="valor" placeholder="$150,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha-adquisicion">Fecha de Adquisición</Label>
                  <Input id="fecha-adquisicion" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación</Label>
                  <Input id="ubicacion" placeholder="Taller Principal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado-fisico">Estado Físico</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excelente">Excelente</SelectItem>
                      <SelectItem value="bueno">Bueno</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="malo">Malo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewHerramientaOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                  Registrar Herramienta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isNewPrestamoOpen} onOpenChange={setIsNewPrestamoOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white">
                <User className="h-4 w-4 mr-2" />
                Nuevo Préstamo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Registrar Préstamo de Herramienta</DialogTitle>
                <DialogDescription>Asigna una herramienta a un empleado</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="herramienta-prestamo">Herramienta</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar herramienta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tal-001">TAL-001 - Taladro Percutor</SelectItem>
                      <SelectItem value="sol-001">SOL-001 - Soldadora Inverter</SelectItem>
                      <SelectItem value="med-001">MED-001 - Multímetro Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empleado-prestamo">Empleado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empleado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="juan">Juan Pérez</SelectItem>
                      <SelectItem value="carlos">Carlos López</SelectItem>
                      <SelectItem value="maria">María González</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area-prestamo">Área</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="obras">Obras</SelectItem>
                      <SelectItem value="produccion">Producción</SelectItem>
                      <SelectItem value="calidad">Calidad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proyecto">Proyecto/Orden de Trabajo</Label>
                  <Input id="proyecto" placeholder="Reparación Bomba #3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha-prestamo">Fecha de Préstamo</Label>
                  <Input id="fecha-prestamo" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha-devolucion">Fecha de Devolución</Label>
                  <Input id="fecha-devolucion" type="date" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="observaciones-prestamo">Observaciones</Label>
                  <Input id="observaciones-prestamo" placeholder="Motivo del préstamo..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewPrestamoOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                  Registrar Préstamo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">{[
            { title: "Total Herramientas", value: "156", change: "+8 este mes", changeType: "positive", icon: Wrench },
            { title: "En Préstamo", value: "23", change: "15% utilización", changeType: "neutral", icon: User },
            { title: "Mantenimientos Pendientes", value: "5", change: "2 vencidos", changeType: "negative", icon: Settings },
            { title: "Valor Total", value: "$12.5M", change: "+$2.1M este año", changeType: "positive", icon: TrendingUp },
          ].map((stat, index) => (
            <Card
              key={index}
              className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neuralops-medium-blue">{stat.title}</p>
                    <p className="text-2xl font-bold text-neuralops-dark-blue">{stat.value}</p>
                    <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : stat.changeType === 'negative' ? 'text-red-600' : 'text-neuralops-medium-blue'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-neuralops-gold/20">
                    <stat.icon className="h-6 w-6 text-neuralops-gold" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="herramientas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-neuralops-very-light-blue">
          <TabsTrigger value="herramientas" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
            Inventario
          </TabsTrigger>
          <TabsTrigger value="prestamos" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
            Préstamos
          </TabsTrigger>
          <TabsTrigger value="mantenimientos" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
            Mantenimientos
          </TabsTrigger>
          <TabsTrigger value="reportes" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
            Reportes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="herramientas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-neuralops-dark-blue">Inventario de Herramientas</CardTitle>
                  <CardDescription>Control y seguimiento de herramientas de trabajo</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neuralops-medium-blue" />
                    <Input
                      placeholder="Buscar herramientas..."
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
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Disponible">Disponible</SelectItem>
                      <SelectItem value="En préstamo">En préstamo</SelectItem>
                      <SelectItem value="En mantenimiento">En mantenimiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Herramienta</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Estado Físico</TableHead>
                    <TableHead>Próx. Mantto.</TableHead>
                    <TableHead className="w-20">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {herramientas.map((herramienta) => (
                    <TableRow key={herramienta.id} className="hover:bg-neuralops-beige/5">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Wrench className="h-5 w-5 text-neuralops-gold" />
                          <div>
                            <div className="font-medium text-neuralops-dark-blue">{herramienta.nombre}</div>
                            <div className="text-sm text-neuralops-medium-blue">
                              {herramienta.codigo} • {herramienta.marca} {herramienta.modelo}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-neuralops-gold text-neuralops-gold">
                          {herramienta.categoria}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(herramienta.estado)}>
                          {herramienta.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-neuralops-gold" />
                          <span className="text-neuralops-dark-blue">{herramienta.ubicacion}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {herramienta.responsable ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-neuralops-gold text-white text-xs">
                                {herramienta.responsable.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-neuralops-dark-blue">{herramienta.responsable}</span>
                          </div>
                        ) : (
                          <span className="text-neuralops-medium-blue">Sin asignar</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getEstadoFisicoColor(herramienta.estadoFisico)}`}>
                          {herramienta.estadoFisico}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-neuralops-gold" />
                          <span className="text-sm text-neuralops-dark-blue">{herramienta.proximoMantenimiento}</span>
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
                            <DropdownMenuItem onClick={() => setSelectedHerramienta(herramienta)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              Prestar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Programar mantto.
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Camera className="mr-2 h-4 w-4" />
                              Fotos
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

        <TabsContent value="prestamos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-neuralops-dark-blue">Préstamos Activos</CardTitle>
              <CardDescription>Seguimiento de herramientas prestadas a empleados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Herramienta</TableHead>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Proyecto</TableHead>
                    <TableHead>Fecha Préstamo</TableHead>
                    <TableHead>Devolución</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-20">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prestamos.map((prestamo) => (
                    <TableRow key={prestamo.id} className="hover:bg-neuralops-beige/5">
                      <TableCell>
                        <div>
                          <div className="font-medium text-neuralops-dark-blue">{prestamo.herramienta}</div>
                          <div className="text-sm text-neuralops-medium-blue">{prestamo.codigo}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={prestamo.avatar} />
                            <AvatarFallback className="bg-neuralops-gold text-white text-xs">
                              {prestamo.empleado.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-neuralops-dark-blue">{prestamo.empleado}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-neuralops-dark-blue">{prestamo.area}</TableCell>
                      <TableCell className="text-neuralops-dark-blue">{prestamo.proyecto}</TableCell>
                      <TableCell className="text-neuralops-medium-blue">{prestamo.fechaPrestamo}</TableCell>
                      <TableCell className="text-neuralops-medium-blue">{prestamo.fechaDevolucionProgramada}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(prestamo.estado)}>
                          {prestamo.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Marcar devuelto
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" />
                              Extender préstamo
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Generar acta
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

        <TabsContent value="mantenimientos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-neuralops-dark-blue">Programa de Mantenimientos</CardTitle>
              <CardDescription>Mantenimientos preventivos y correctivos programados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Herramienta</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha Programada</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Costo</TableHead>
                    <TableHead className="w-20">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mantenimientos.map((mantenimiento) => (
                    <TableRow key={mantenimiento.id} className="hover:bg-neuralops-beige/5">
                      <TableCell className="font-medium text-neuralops-dark-blue">
                        {mantenimiento.herramienta}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          mantenimiento.tipo === 'Preventivo' 
                            ? 'border-blue-500 text-blue-600' 
                            : 'border-orange-500 text-orange-600'
                        }>
                          {mantenimiento.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-neuralops-medium-blue">{mantenimiento.fechaProgramada}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(mantenimiento.estado)}>
                          {mantenimiento.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-neuralops-dark-blue">{mantenimiento.tecnico}</TableCell>
                      <TableCell className="text-neuralops-dark-blue">{mantenimiento.descripcion}</TableCell>
                      <TableCell className="font-medium text-neuralops-dark-blue">{mantenimiento.costo}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Completar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Reprogramar
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

        <TabsContent value="reportes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-neuralops-dark-blue">Utilización por Categoría</CardTitle>
                <CardDescription>Análisis de uso de herramientas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { categoria: "Herramientas Eléctricas", total: 45, prestadas: 12, porcentaje: 27 },
                    { categoria: "Soldadura", total: 18, prestadas: 8, porcentaje: 44 },
                    { categoria: "Instrumentos de Medición", total: 32, prestadas: 5, porcentaje: 16 },
                    { categoria: "Herramientas Manuales", total: 61, prestadas: 15, porcentaje: 25 },
                  ].map((categoria, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-neuralops-dark-blue">{categoria.categoria}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium text-neuralops-dark-blue">
                            {categoria.prestadas}/{categoria.total}
                          </div>
                          <div className="text-xs text-neuralops-medium-blue">{categoria.porcentaje}% uso</div>
                        </div>
                      </div>
                      <div className="w-full bg-neuralops-very-light-blue rounded-full h-2">
                        <div 
                          className="bg-neuralops-gold h-2 rounded-full transition-all duration-500"
                          style={{ width: `${categoria.porcentaje}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-neuralops-dark-blue">Mantenimientos del Mes</CardTitle>
                <CardDescription>Programación de mantenimientos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { herramienta: "Compresor Industrial", fecha: "15 Ago", tipo: "Preventivo", costo: "$25,000" },
                    { herramienta: "Soldadora Lincoln", fecha: "18 Ago", tipo: "Correctivo", costo: "$45,000" },
                    { herramienta: "Taladro Magnético", fecha: "22 Ago", tipo: "Preventivo", costo: "$18,000" },
                    { herramienta: "Multímetro Fluke", fecha: "25 Ago", tipo: "Calibración", costo: "$15,000" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neuralops-beige/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-xs text-neuralops-medium-blue">AGO</div>
                          <div className="font-bold text-neuralops-dark-blue">{item.fecha.split(' ')[0]}</div>
                        </div>
                        <div>
                          <p className="font-medium text-neuralops-dark-blue text-sm">{item.herramienta}</p>
                          <p className="text-xs text-neuralops-medium-blue">{item.tipo}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-neuralops-dark-blue">{item.costo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>

      {/* Dialogo Inspección Visual IA - Estilo Inventario */}
      <Dialog open={isInspeccionOpen} onOpenChange={setIsInspeccionOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              IA - Inspección Visual Inteligente
            </DialogTitle>
            <DialogDescription>
              Análisis automático del estado de herramientas usando visión artificial
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Captura o sube imágenes de herramientas para análisis automático
              </p>
              <Button variant="outline" className="border-purple-300 text-purple-600">
                <Scan className="h-4 w-4 mr-2" />
                Iniciar Inspección
              </Button>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Resultados de Inspección
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Taladro TAL-001:</strong> Desgaste en broca</span>
                  <Badge className="bg-orange-100 text-orange-700">Medio</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Llave HER-025:</strong> Estado óptimo</span>
                  <Badge className="bg-green-100 text-green-700">Excelente</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Martillo MAR-012:</strong> Mango suelto</span>
                  <Badge className="bg-red-100 text-red-700">Crítico</Badge>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Recomendaciones Automáticas
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Reemplazo inmediato - MAR-012</p>
                    <p className="text-xs text-gray-600">Riesgo de seguridad por mango suelto</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Wrench className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Mantenimiento preventivo - TAL-001</p>
                    <p className="text-xs text-gray-600">Cambiar broca y lubricar mecanismo</p>
                  </div>
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
            <Button variant="outline" onClick={() => setIsInspeccionOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <FileText className="mr-2 h-4 w-4" />
              Generar Reporte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Monitoreo Estado IA - Estilo Inventario */}
      <Dialog open={isMonitoreoOpen} onOpenChange={setIsMonitoreoOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              IA - Monitoreo Inteligente de Estado
            </DialogTitle>
            <DialogDescription>
              Seguimiento predictivo del estado y vida útil de herramientas
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Estado General
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">Herramientas activas:</span>
                    <Badge className="bg-green-100 text-green-700">142</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">En mantenimiento:</span>
                    <Badge className="bg-orange-100 text-orange-700">8</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">Requieren atención:</span>
                    <Badge className="bg-red-100 text-red-700">6</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Métricas de Rendimiento
                </h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-blue-600">91%</p>
                    <p className="text-xs text-blue-500">Disponibilidad</p>
                  </div>
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-green-600">23</p>
                    <p className="text-xs text-green-500">Días promedio uso</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Predicciones de IA
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Mantenimiento programado</p>
                    <p className="text-xs text-gray-600">12 herramientas requerirán servicio en próximos 15 días</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Optimización detectada</p>
                    <p className="text-xs text-gray-600">Redistribuir herramientas área A a área C reducirá tiempos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Shield className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Alerta de seguridad</p>
                    <p className="text-xs text-gray-600">3 herramientas eléctricas próximas a certificación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMonitoreoOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="mr-2 h-4 w-4" />
              Programar Mantenimiento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Optimización Uso IA - Estilo Inventario */}
      <Dialog open={isOptimizacionOpen} onOpenChange={setIsOptimizacionOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-600" />
              IA - Optimización de Uso y Distribución
            </DialogTitle>
            <DialogDescription>
              Optimiza la asignación y rotación de herramientas para máxima eficiencia
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Eficiencia de Uso
                </h4>
                <div className="space-y-3">
                  <div className="p-2 bg-white border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Área Producción</p>
                    <p className="text-xs text-green-600">87% utilización - Óptimo</p>
                  </div>
                  <div className="p-2 bg-white border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Área Mantenimiento</p>
                    <p className="text-xs text-orange-600">62% utilización - Mejorable</p>
                  </div>
                  <div className="p-2 bg-white border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Área Calidad</p>
                    <p className="text-xs text-green-600">78% utilización - Bueno</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Ahorros Potenciales
                </h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-green-600">$15k</p>
                    <p className="text-xs text-green-500">Ahorro mensual</p>
                  </div>
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-blue-600">18%</p>
                    <p className="text-xs text-blue-500">Mejora eficiencia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Recomendaciones de Optimización
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Redistribuir taladros área A → B</p>
                    <p className="text-xs text-gray-600">3 taladros subutilizados pueden mejorar productividad área B</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Settings className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Crear pool compartido medición</p>
                    <p className="text-xs text-gray-600">Instrumentos de precisión usados 40% pueden compartirse</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Hammer className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Programar rotación herramientas especiales</p>
                    <p className="text-xs text-gray-600">Evitar acumulación en una sola área</p>
                  </div>
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
                  <span className="text-green-800">Optimizando distribución con IA...</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOptimizacionOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Target className="mr-2 h-4 w-4" />
              Aplicar Optimización
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
