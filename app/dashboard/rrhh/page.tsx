"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
              <Users className="h-12 w-12 text-white" />
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

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger
              value="employees"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              Empleados
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
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                Ver Ausencias
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
      </div>
    </div>
  )
}
