"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Calendar,
  FileText,
  UserPlus,
  CalendarDays,
  TrendingUp,
  UserCheck,
  Clock,
  DollarSign,
  Calculator,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sun,
  Moon,
  Briefcase,
  Brain,
  Sparkles,
  Upload,
  BarChart3,
  Bot,
  Scan,
  Zap,
} from "lucide-react"

const employees = [
  {
    id: 1,
    name: "John Rueda",
    position: "Gerente de Producción",
    department: "Producción",
    email: "info@neuralops.com",
    phone: "+57 300 123 4567",
    status: "Activo",
    startDate: "2023-01-15",
    salary: "$3,500,000",
    avatar: "/placeholder.svg?height=40&width=40",
    vacationDays: { available: 15, used: 8, total: 23 },
    baseSalary: 3500000,
  },
  {
    id: 2,
    name: "María González",
    position: "Supervisora de Calidad",
    department: "Producción",
    email: "maria@neuralops.com",
    phone: "+57 300 234 5678",
    status: "Activo",
    startDate: "2023-03-20",
    salary: "$2,800,000",
    avatar: "/placeholder.svg?height=40&width=40",
    vacationDays: { available: 18, used: 5, total: 23 },
    baseSalary: 2800000,
  },
  {
    id: 3,
    name: "Juan Pérez",
    position: "Operario",
    department: "Producción",
    email: "juan@neuralops.com",
    phone: "+57 300 345 6789",
    status: "Vacaciones",
    startDate: "2023-06-10",
    salary: "$1,500,000",
    avatar: "/placeholder.svg?height=40&width=40",
    vacationDays: { available: 12, used: 11, total: 23 },
    baseSalary: 1500000,
  },
]

// Novedades de nómina
const novelties = [
  {
    id: 1,
    employeeId: 1,
    employee: "John Rueda",
    type: "Horas Extra",
    description: "Horas extra trabajadas - Proyecto especial",
    date: "2024-08-05",
    amount: 350000,
    hours: 15,
    status: "Aprobada",
    approvedBy: "RRHH",
  },
  {
    id: 2,
    employeeId: 2,
    employee: "María González",
    type: "Dominical",
    description: "Trabajo dominical - Mantenimiento",
    date: "2024-08-04",
    amount: 120000,
    hours: 8,
    status: "Pendiente",
    approvedBy: "",
  },
  {
    id: 3,
    employeeId: 3,
    employee: "Juan Pérez",
    type: "Licencia",
    description: "Licencia de paternidad",
    date: "2024-08-01",
    amount: -250000,
    days: 5,
    status: "Aprobada",
    approvedBy: "Gerencia",
  },
]

// Detalle de nómina
const payrollDetail = [
  {
    id: 1,
    employee: "John Rueda",
    position: "Gerente de Producción",
    baseSalary: 3500000,
    overtime: 350000,
    dominical: 0,
    bonuses: 200000,
    deductions: {
      health: 140000,
      pension: 140000,
      tax: 280000,
    },
    totalDeductions: 560000,
    netSalary: 3490000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    employee: "María González",
    position: "Supervisora de Calidad",
    baseSalary: 2800000,
    overtime: 0,
    dominical: 120000,
    bonuses: 150000,
    deductions: {
      health: 112000,
      pension: 112000,
      tax: 168000,
    },
    totalDeductions: 392000,
    netSalary: 2678000,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const absences = [
  {
    id: 1,
    employee: "Juan Pérez",
    type: "Vacaciones",
    startDate: "2024-01-15",
    endDate: "2024-01-25",
    days: 10,
    status: "Aprobada",
    reason: "Vacaciones anuales",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    employee: "María González",
    type: "Incapacidad",
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    days: 3,
    status: "Pendiente",
    reason: "Incapacidad médica",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    employee: "John Rueda",
    type: "Permiso",
    startDate: "2024-01-08",
    endDate: "2024-01-08",
    days: 1,
    status: "Aprobada",
    reason: "Cita médica",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const reports = [
  {
    id: 1,
    name: "Reporte de Nómina - Enero 2024",
    type: "Nómina",
    generatedBy: "Sistema",
    date: "2024-01-31",
    status: "Completado",
  },
  {
    id: 2,
    name: "Reporte de Ausencias - Enero 2024",
    type: "Ausencias",
    generatedBy: "María González",
    date: "2024-01-30",
    status: "Completado",
  },
  {
    id: 3,
    name: "Evaluación de Desempeño Q4 2023",
    type: "Desempeño",
    generatedBy: "John Rueda",
    date: "2024-01-15",
    status: "En Proceso",
  },
]

const stats = [
  {
    title: "Total Empleados",
    value: "248",
    change: "+3",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Empleados Activos",
    value: "235",
    change: "+2",
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Ausencias Pendientes",
    value: "12",
    change: "-1",
    icon: CalendarDays,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Rotación Mensual",
    value: "2.1%",
    change: "-0.3%",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

export default function RRHHPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [isNewNoveltyOpen, setIsNewNoveltyOpen] = useState(false)
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false)
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false)
  const [isGeneratePayrollOpen, setIsGeneratePayrollOpen] = useState(false)
  
  // Estados para funcionalidades de IA
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)
  const [isRecrutaOpen, setIsRecrutaOpen] = useState(false)
  const [isPredictiveOpen, setIsPredictiveOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  
  const [newNovelty, setNewNovelty] = useState({
    employeeId: "",
    type: "",
    description: "",
    amount: "",
    hours: "",
    days: "",
    date: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800 border-green-200"
      case "Vacaciones":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Inactivo":
        return "bg-red-100 text-red-800 border-red-200"
      case "Aprobada":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Rechazada":
        return "bg-red-100 text-red-800 border-red-200"
      case "Completado":
        return "bg-green-100 text-green-800 border-green-200"
      case "En Proceso":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Recursos Humanos</h1>
              <p className="text-neuralops-beige text-lg">Gestiona empleados, ausencias y reportes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="h-8 w-8 text-white" />
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

          {/* Análisis de Rendimiento */}
          <Dialog open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                Análisis IA
              </Button>
            </DialogTrigger>
          </Dialog>

          {/* Reclutamiento Inteligente */}
          <Dialog open={isRecrutaOpen} onOpenChange={setIsRecrutaOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                <Search className="h-4 w-4 mr-2" />
                Reclutamiento IA
              </Button>
            </DialogTrigger>
          </Dialog>

          {/* Predicción de Ausentismo */}
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

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger
              value="employees"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              Empleados
            </TabsTrigger>
            <TabsTrigger
              value="payroll"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <DollarSign className="h-4 w-4" />
              Nómina
            </TabsTrigger>
            <TabsTrigger
              value="absences"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <CalendarDays className="h-4 w-4" />
              Ausencias
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gestión de Empleados
                    </CardTitle>
                    <CardDescription>Administra la información de los empleados</CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar empleados..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 border-neuralops-very-light-blue focus:border-neuralops-gold focus:ring-neuralops-gold"
                      />
                    </div>
                    <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Nuevo Empleado
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empleado</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Vacaciones</TableHead>
                      <TableHead>Fecha Ingreso</TableHead>
                      <TableHead>Salario</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-neuralops-beige/5">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-neuralops-gold text-white">
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-neuralops-dark-blue">{employee.name}</div>
                              <div className="text-sm text-neuralops-medium-blue">{employee.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-neuralops-dark-blue">{employee.position}</TableCell>
                        <TableCell className="text-neuralops-medium-blue">{employee.department}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-neuralops-dark-blue">
                              {employee.vacationDays.available} disponibles
                            </span>
                            <span className="text-xs text-neuralops-medium-blue">
                              {employee.vacationDays.used}/{employee.vacationDays.total} usados
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-neuralops-medium-blue">{employee.startDate}</TableCell>
                        <TableCell className="font-medium text-neuralops-dark-blue">{employee.salary}</TableCell>
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
                                Ver Perfil
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedEmployee(employee)
                                setIsVacationModalOpen(true)
                              }}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Gestionar Vacaciones
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <DollarSign className="h-4 w-4 mr-2" />
                                Ver Nómina
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

          <TabsContent value="payroll" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Gestión de Nómina
                    </CardTitle>
                    <CardDescription>Administra novedades, vacaciones y procesamiento de nómina</CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <Dialog open={isNewNoveltyOpen} onOpenChange={setIsNewNoveltyOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-neuralops-medium-blue text-neuralops-medium-blue hover:bg-neuralops-medium-blue hover:text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Nueva Novedad
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Dialog open={isGeneratePayrollOpen} onOpenChange={setIsGeneratePayrollOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                          <Calculator className="h-4 w-4 mr-2" />
                          Generar Nómina
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="novelties" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3 bg-neuralops-very-light-blue">
                    <TabsTrigger value="novelties" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                      Novedades
                    </TabsTrigger>
                    <TabsTrigger value="payroll-detail" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                      Detalle Nómina
                    </TabsTrigger>
                    <TabsTrigger value="vacations" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                      Vacaciones
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="novelties" className="space-y-4">
                    <div className="grid gap-4">
                      {novelties.map((novelty) => (
                        <Card key={novelty.id} className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${
                                  novelty.type === 'Horas Extra' ? 'bg-blue-100' :
                                  novelty.type === 'Dominical' ? 'bg-yellow-100' :
                                  novelty.type === 'Licencia' ? 'bg-red-100' :
                                  'bg-green-100'
                                }`}>
                                  {novelty.type === 'Horas Extra' && <Clock className="h-5 w-5 text-blue-600" />}
                                  {novelty.type === 'Dominical' && <Sun className="h-5 w-5 text-yellow-600" />}
                                  {novelty.type === 'Licencia' && <Briefcase className="h-5 w-5 text-red-600" />}
                                  {novelty.type === 'Permiso' && <Calendar className="h-5 w-5 text-green-600" />}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-neuralops-dark-blue">{novelty.employee}</h3>
                                  <p className="text-neuralops-medium-blue text-sm">{novelty.type} - {novelty.description}</p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <span className="text-sm text-neuralops-medium-blue">Fecha: {novelty.date}</span>
                                    {novelty.hours && <span className="text-sm text-neuralops-medium-blue">{novelty.hours} horas</span>}
                                    {novelty.days && <span className="text-sm text-neuralops-medium-blue">{novelty.days} días</span>}
                                    <span className={`text-sm font-medium ${novelty.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      ${novelty.amount.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(novelty.status)}>{novelty.status}</Badge>
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
                                    {novelty.status === 'Pendiente' && (
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
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="payroll-detail" className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-neuralops-dark-blue">Detalle de Nómina - Agosto 2024</h3>
                      <Button onClick={() => setIsPayrollModalOpen(true)} className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalle Completo
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Empleado</TableHead>
                          <TableHead>Salario Base</TableHead>
                          <TableHead>Horas Extra</TableHead>
                          <TableHead>Dominicales</TableHead>
                          <TableHead>Bonificaciones</TableHead>
                          <TableHead>Deducciones</TableHead>
                          <TableHead>Salario Neto</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payrollDetail.map((payroll) => (
                          <TableRow key={payroll.id} className="hover:bg-neuralops-beige/5">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={payroll.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-neuralops-gold text-white">
                                    {payroll.employee.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-neuralops-dark-blue">{payroll.employee}</div>
                                  <div className="text-sm text-neuralops-medium-blue">{payroll.position}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-neuralops-dark-blue">
                              ${payroll.baseSalary.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-green-600">
                              ${payroll.overtime.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-blue-600">
                              ${payroll.dominical.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-green-600">
                              ${payroll.bonuses.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-red-600">
                              ${payroll.totalDeductions.toLocaleString()}
                            </TableCell>
                            <TableCell className="font-bold text-neuralops-dark-blue">
                              ${payroll.netSalary.toLocaleString()}
                            </TableCell>
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
                                    Ver Desprendible
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Descargar PDF
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Ajustar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="vacations" className="space-y-4">
                    <div className="grid gap-4">
                      {employees.map((employee) => (
                        <Card key={employee.id} className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-neuralops-gold text-white">
                                    {employee.name.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-neuralops-dark-blue">{employee.name}</h3>
                                  <p className="text-neuralops-medium-blue text-sm">{employee.position}</p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                      <span className="text-sm text-neuralops-medium-blue">
                                        {employee.vacationDays.available} disponibles
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                      <span className="text-sm text-neuralops-medium-blue">
                                        {employee.vacationDays.used} usados
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                      <span className="text-sm text-neuralops-medium-blue">
                                        {employee.vacationDays.total} total año
                                      </span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-neuralops-very-light-blue rounded-full h-2 mt-2">
                                    <div
                                      className="bg-neuralops-gold h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${(employee.vacationDays.used / employee.vacationDays.total) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setSelectedEmployee(employee)
                                  setIsVacationModalOpen(true)
                                }}
                                className="border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white"
                              >
                                <Calendar className="h-4 w-4 mr-2" />
                                Gestionar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="absences" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <CalendarDays className="h-5 w-5" />
                      Gestión de Ausencias
                    </CardTitle>
                    <CardDescription>Registra y gestiona ausencias de empleados</CardDescription>
                  </div>
                  <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Ausencia
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {absences.map((absence) => (
                    <Card
                      key={absence.id}
                      className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={absence.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-neuralops-gold text-white">
                                {absence.employee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-neuralops-dark-blue text-lg">{absence.employee}</h3>
                              <p className="text-neuralops-medium-blue">
                                {absence.type} - {absence.reason}
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-neuralops-medium-blue">
                                  {absence.startDate} - {absence.endDate}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {absence.days} días
                                </Badge>
                                <Badge className={getStatusColor(absence.status)}>{absence.status}</Badge>
                              </div>
                            </div>
                          </div>
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
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
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
                      Reportes de RRHH
                    </CardTitle>
                    <CardDescription>Genera y consulta reportes del área</CardDescription>
                  </div>
                  <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Generar Reporte
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {reports.map((report) => (
                    <Card
                      key={report.id}
                      className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-neuralops-gold/20">
                              <FileText className="h-6 w-6 text-neuralops-gold" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-neuralops-dark-blue text-lg">{report.name}</h3>
                              <p className="text-neuralops-medium-blue">{report.type}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-neuralops-medium-blue">
                                  Generado por: {report.generatedBy}
                                </span>
                                <span className="text-sm text-neuralops-medium-blue">{report.date}</span>
                                <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="hover:bg-neuralops-beige/20">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Reporte
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Descargar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal para Nueva Novedad */}
        <Dialog open={isNewNoveltyOpen} onOpenChange={setIsNewNoveltyOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-neuralops-dark-blue">Registrar Nueva Novedad</DialogTitle>
              <DialogDescription>
                Registra una nueva novedad de nómina para un empleado
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-select">Empleado</Label>
                  <Select value={newNovelty.employeeId} onValueChange={(value) => setNewNovelty({...newNovelty, employeeId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empleado" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          {employee.name} - {employee.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="novelty-type">Tipo de Novedad</Label>
                  <Select value={newNovelty.type} onValueChange={(value) => setNewNovelty({...newNovelty, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Horas Extra">Horas Extra</SelectItem>
                      <SelectItem value="Dominical">Dominical</SelectItem>
                      <SelectItem value="Licencia">Licencia</SelectItem>
                      <SelectItem value="Permiso">Permiso</SelectItem>
                      <SelectItem value="Bonificación">Bonificación</SelectItem>
                      <SelectItem value="Descuento">Descuento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="novelty-description">Descripción</Label>
                <Textarea
                  id="novelty-description"
                  placeholder="Descripción de la novedad..."
                  value={newNovelty.description}
                  onChange={(e) => setNewNovelty({...newNovelty, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="novelty-amount">Monto</Label>
                  <Input
                    id="novelty-amount"
                    placeholder="350000"
                    value={newNovelty.amount}
                    onChange={(e) => setNewNovelty({...newNovelty, amount: e.target.value})}
                  />
                </div>
                {(newNovelty.type === 'Horas Extra' || newNovelty.type === 'Dominical') && (
                  <div className="space-y-2">
                    <Label htmlFor="novelty-hours">Horas</Label>
                    <Input
                      id="novelty-hours"
                      placeholder="8"
                      value={newNovelty.hours}
                      onChange={(e) => setNewNovelty({...newNovelty, hours: e.target.value})}
                    />
                  </div>
                )}
                {(newNovelty.type === 'Licencia' || newNovelty.type === 'Permiso') && (
                  <div className="space-y-2">
                    <Label htmlFor="novelty-days">Días</Label>
                    <Input
                      id="novelty-days"
                      placeholder="5"
                      value={newNovelty.days}
                      onChange={(e) => setNewNovelty({...newNovelty, days: e.target.value})}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="novelty-date">Fecha</Label>
                  <Input
                    id="novelty-date"
                    type="date"
                    value={newNovelty.date}
                    onChange={(e) => setNewNovelty({...newNovelty, date: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewNoveltyOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                Registrar Novedad
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal para Gestión de Vacaciones */}
        <Dialog open={isVacationModalOpen} onOpenChange={setIsVacationModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-neuralops-dark-blue">
                Gestión de Vacaciones - {selectedEmployee?.name}
              </DialogTitle>
              <DialogDescription>
                Administra las vacaciones del empleado
              </DialogDescription>
            </DialogHeader>
            {selectedEmployee && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <Card className="border-green-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedEmployee.vacationDays.available}</div>
                      <div className="text-sm text-neuralops-medium-blue">Días Disponibles</div>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">{selectedEmployee.vacationDays.used}</div>
                      <div className="text-sm text-neuralops-medium-blue">Días Usados</div>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedEmployee.vacationDays.total}</div>
                      <div className="text-sm text-neuralops-medium-blue">Total Anual</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-neuralops-dark-blue">Programar Vacaciones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Fecha Inicio</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Fecha Fin</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Observaciones</Label>
                        <Textarea placeholder="Observaciones adicionales..." />
                      </div>
                      <Button className="w-full bg-neuralops-gold hover:bg-neuralops-gold/90">
                        Programar Vacaciones
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-neuralops-dark-blue">Historial de Vacaciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-neuralops-beige/10 rounded-lg">
                          <div>
                            <div className="font-medium text-neuralops-dark-blue">Dic 2023</div>
                            <div className="text-sm text-neuralops-medium-blue">15 días - Vacaciones anuales</div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Completado</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-neuralops-beige/10 rounded-lg">
                          <div>
                            <div className="font-medium text-neuralops-dark-blue">Jul 2024</div>
                            <div className="text-sm text-neuralops-medium-blue">8 días - Vacaciones familiares</div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Completado</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsVacationModalOpen(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal para Generar Nómina */}
        <Dialog open={isGeneratePayrollOpen} onOpenChange={setIsGeneratePayrollOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-neuralops-dark-blue flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Generar Nómina
              </DialogTitle>
              <DialogDescription>
                Procesa la nómina del período seleccionado
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Período</Label>
                  <Select defaultValue="2024-08">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-08">Agosto 2024</SelectItem>
                      <SelectItem value="2024-07">Julio 2024</SelectItem>
                      <SelectItem value="2024-06">Junio 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Nómina</Label>
                  <Select defaultValue="mensual">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensual">Mensual</SelectItem>
                      <SelectItem value="quincenal">Quincenal</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Resumen de Nómina</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neuralops-medium-blue">Total Empleados:</span>
                        <span className="font-medium text-neuralops-dark-blue">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neuralops-medium-blue">Salarios Base:</span>
                        <span className="font-medium text-neuralops-dark-blue">$7,800,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neuralops-medium-blue">Horas Extra:</span>
                        <span className="font-medium text-green-600">$350,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neuralops-medium-blue">Dominicales:</span>
                        <span className="font-medium text-blue-600">$120,000</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neuralops-medium-blue">Bonificaciones:</span>
                        <span className="font-medium text-green-600">$350,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neuralops-medium-blue">Deducciones:</span>
                        <span className="font-medium text-red-600">$952,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="text-neuralops-medium-blue font-semibold">Total Neto:</span>
                        <span className="font-bold text-neuralops-dark-blue text-lg">$7,668,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div className="text-sm">
                  <div className="font-medium text-yellow-800">Novedades Pendientes</div>
                  <div className="text-yellow-600">Hay 1 novedad pendiente de aprobación</div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsGeneratePayrollOpen(false)}>
                Cancelar
              </Button>
              <Button variant="outline" className="border-neuralops-medium-blue text-neuralops-medium-blue">
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                <Calculator className="h-4 w-4 mr-2" />
                Procesar Nómina
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal para Detalle de Nómina */}
        <Dialog open={isPayrollModalOpen} onOpenChange={setIsPayrollModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-neuralops-dark-blue">Detalle Completo de Nómina - Agosto 2024</DialogTitle>
              <DialogDescription>
                Desglose detallado de la nómina procesada
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {payrollDetail.map((payroll) => (
                <Card key={payroll.id} className="border border-neuralops-very-light-blue">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={payroll.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-neuralops-gold text-white">
                          {payroll.employee.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-neuralops-dark-blue">{payroll.employee}</CardTitle>
                        <p className="text-neuralops-medium-blue">{payroll.position}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-neuralops-dark-blue mb-3">Devengos</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-neuralops-medium-blue">Salario Base:</span>
                            <span className="font-medium">${payroll.baseSalary.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neuralops-medium-blue">Horas Extra:</span>
                            <span className="font-medium text-green-600">${payroll.overtime.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neuralops-medium-blue">Dominicales:</span>
                            <span className="font-medium text-blue-600">${payroll.dominical.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neuralops-medium-blue">Bonificaciones:</span>
                            <span className="font-medium text-green-600">${payroll.bonuses.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium text-neuralops-dark-blue">Total Devengos:</span>
                            <span className="font-bold text-neuralops-dark-blue">
                              ${(payroll.baseSalary + payroll.overtime + payroll.dominical + payroll.bonuses).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neuralops-dark-blue mb-3">Deducciones</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-neuralops-medium-blue">Salud (4%):</span>
                            <span className="font-medium text-red-600">${payroll.deductions.health.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neuralops-medium-blue">Pensión (4%):</span>
                            <span className="font-medium text-red-600">${payroll.deductions.pension.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neuralops-medium-blue">Retención:</span>
                            <span className="font-medium text-red-600">${payroll.deductions.tax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium text-neuralops-dark-blue">Total Deducciones:</span>
                            <span className="font-bold text-red-600">${payroll.totalDeductions.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-neuralops-beige/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-neuralops-dark-blue">Salario Neto a Pagar:</span>
                        <span className="text-2xl font-bold text-neuralops-gold">${payroll.netSalary.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPayrollModalOpen(false)}>
                Cerrar
              </Button>
              <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                <Download className="h-4 w-4 mr-2" />
                Exportar Nómina
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialogo Análisis de Desempeño IA - Estilo Inventario */}
        <Dialog open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                IA - Análisis de Desempeño
              </DialogTitle>
              <DialogDescription>
                Analiza el rendimiento de empleados y sugiere mejoras
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                  <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Análisis Individual
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm"><strong>John Rueda:</strong></span>
                      <Badge className="bg-green-100 text-green-700">Excelente</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm"><strong>María González:</strong></span>
                      <Badge className="bg-blue-100 text-blue-700">Bueno</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm"><strong>Juan Pérez:</strong></span>
                      <Badge className="bg-yellow-100 text-yellow-700">Regular</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                  <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Tendencias IA
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm font-medium text-green-800">Productividad General</p>
                      <p className="text-xs text-green-600">↑ 15% vs trimestre anterior</p>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                      <p className="text-sm font-medium text-orange-800">Ausentismo</p>
                      <p className="text-xs text-orange-600">↑ 8% requiere atención</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Recomendaciones de IA
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Capacitación para Juan Pérez</p>
                      <p className="text-xs text-gray-600">Programar entrenamiento en habilidades técnicas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Reconocimiento para John Rueda</p>
                      <p className="text-xs text-gray-600">Considerar promoción o incentivo por excelente desempeño</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAnalysisOpen(false)}>
                Cerrar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <FileText className="mr-2 h-4 w-4" />
                Generar Reporte Completo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialogo Reclutamiento IA - Estilo Inventario */}
        <Dialog open={isRecrutaOpen} onOpenChange={setIsRecrutaOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                IA - Reclutamiento Inteligente
              </DialogTitle>
              <DialogDescription>
                Analiza CVs y encuentra los mejores candidatos automáticamente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Sube CVs para análisis automático con IA
                </p>
                <Button variant="outline" className="border-blue-300 text-blue-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Cargar Documentos
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Candidatos Analizados
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Ana Martínez:</strong> Ingeniera Industrial</span>
                    <Badge className="bg-green-100 text-green-700">95% match</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Carlos López:</strong> Técnico Mecánico</span>
                    <Badge className="bg-blue-100 text-blue-700">88% match</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Laura Silva:</strong> Supervisor</span>
                    <Badge className="bg-purple-100 text-purple-700">82% match</Badge>
                  </div>
                </div>
              </div>

              {isProcessing && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <span className="text-blue-800">Analizando CVs con IA...</span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRecrutaOpen(false)}>
                Cerrar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Programar Entrevistas
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
                IA - Análisis Predictivo
              </DialogTitle>
              <DialogDescription>
                Predice rotación de personal y optimiza gestión de talento
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Predicciones de Rotación
                  </h4>
                  <div className="space-y-3">
                    <div className="p-2 bg-red-50 border border-red-200 rounded">
                      <p className="text-sm font-medium text-red-800">Juan Pérez</p>
                      <p className="text-xs text-red-600">85% probabilidad de renuncia</p>
                      <p className="text-xs text-red-500">Factores: Baja satisfacción, pocas promociones</p>
                    </div>
                    <div className="p-2 bg-orange-50 border border-orange-200 rounded">
                      <p className="text-sm font-medium text-orange-800">Laura García</p>
                      <p className="text-xs text-orange-600">60% probabilidad de renuncia</p>
                      <p className="text-xs text-orange-500">Factores: Ofertas externas, carga de trabajo</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Métricas Clave
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border text-center">
                      <p className="text-lg font-bold text-green-600">12%</p>
                      <p className="text-xs text-green-500">Rotación Anual</p>
                    </div>
                    <div className="p-2 bg-white rounded border text-center">
                      <p className="text-lg font-bold text-blue-600">4.2</p>
                      <p className="text-xs text-blue-500">Satisfacción Promedio</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Acciones Recomendadas por IA
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Intervención urgente: Juan Pérez</p>
                      <p className="text-xs text-gray-600">Reunión 1:1 para plan de desarrollo y retención</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Programa de reconocimiento</p>
                      <p className="text-xs text-gray-600">Implementar incentivos para mejorar satisfacción general</p>
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
