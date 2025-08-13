"use client"

import { useState } from "react"
import {
  Building2,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Upload,
  Download,
  Target,
  Eye as Vision,
  Heart,
  Users,
  Award,
  FileText,
  Image,
  Settings,
  Globe,
  Brain,
  Sparkles,
  BarChart3,
  LineChart,
  TrendingUp,
  Lightbulb,
  Zap,
  CheckCircle,
  AlertTriangle,
  MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
// import {
//   Building2,
//   Plus,
//   Search,
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Upload,
//   Download,
//   Target,
//   Eye as Vision,
//   Heart,
//   Users,
//   Award,
//   FileText,
//   Image,
//   Settings,
//   Globe,
//   MapPin,
// } from "lucide-react"

// Datos de la empresa
const companyInfo = {
  name: "NeuralOps SAS",
  logo: "/logo.png",
  website: "www.neuralops.com",
  address: "Calle 123 #45-67, Bogotá, Colombia",
  phone: "+57 1 234 5678",
  email: "info@neuralops.com",
  nit: "900.123.456-7",
  vision: "Ser la empresa líder en soluciones tecnológicas innovadoras que transformen digitalmente a las organizaciones en Colombia y Latinoamérica para el año 2030.",
  mission: "Desarrollar y implementar soluciones tecnológicas de vanguardia que optimicen los procesos empresariales, mejoren la eficiencia operacional y generen valor agregado a nuestros clientes.",
  values: [
    {
      id: 1,
      name: "Innovación",
      description: "Buscamos constantemente nuevas formas de mejorar y evolucionar",
      icon: "💡"
    },
    {
      id: 2,
      name: "Excelencia",
      description: "Nos comprometemos con la calidad en cada proyecto",
      icon: "⭐"
    },
    {
      id: 3,
      name: "Integridad",
      description: "Actuamos con honestidad y transparencia en todas nuestras relaciones",
      icon: "🤝"
    },
    {
      id: 4,
      name: "Trabajo en Equipo",
      description: "Colaboramos efectivamente para alcanzar objetivos comunes",
      icon: "👥"
    }
  ]
}

// Políticas de la empresa
const policies = [
  {
    id: 1,
    title: "Política de Calidad",
    category: "Calidad",
    version: "2.1",
    dateCreated: "2024-01-15",
    lastUpdated: "2024-06-20",
    status: "Vigente",
    description: "Establece los lineamientos para mantener los estándares de calidad en todos los procesos."
  },
  {
    id: 2,
    title: "Código de Ética",
    category: "Ética",
    version: "1.3",
    dateCreated: "2023-08-10",
    lastUpdated: "2024-03-15",
    status: "Vigente",
    description: "Define los principios éticos y conductuales que rigen el comportamiento organizacional."
  },
  {
    id: 3,
    title: "Política de Seguridad de la Información",
    category: "Seguridad",
    version: "3.0",
    dateCreated: "2024-02-01",
    lastUpdated: "2024-07-10",
    status: "Vigente",
    description: "Establece las medidas de protección de la información confidencial de la empresa."
  }
]

// Certificaciones
const certifications = [
  {
    id: 1,
    name: "ISO 9001:2015",
    category: "Calidad",
    issuedBy: "ICONTEC",
    issuedDate: "2023-06-15",
    expiryDate: "2026-06-15",
    status: "Vigente",
    description: "Certificación en Sistema de Gestión de Calidad"
  },
  {
    id: 2,
    name: "ISO 27001:2013",
    category: "Seguridad",
    issuedBy: "SGS",
    issuedDate: "2023-08-20",
    expiryDate: "2026-08-20",
    status: "Vigente",
    description: "Certificación en Sistema de Gestión de Seguridad de la Información"
  }
]

function StatsCard({ title, value, change, icon: Icon, changeType }: any) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neuralops-medium-blue">{title}</p>
            <p className="text-2xl font-bold text-neuralops-dark-blue">{value}</p>
            <p className={`text-sm ${changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-neuralops-medium-blue'}`}>
              {change}
            </p>
          </div>
          <div className="p-3 rounded-full bg-neuralops-gold/20">
            <Icon className="h-6 w-6 text-neuralops-gold" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function GerenciaPage() {
  const [isEditVisionOpen, setIsEditVisionOpen] = useState(false)
  const [isEditMissionOpen, setIsEditMissionOpen] = useState(false)
  const [isNewPolicyOpen, setIsNewPolicyOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Estados para IA - Estilo Inventario
  const [isAnalisisOpen, setIsAnalisisOpen] = useState(false)
  const [isInsightsOpen, setIsInsightsOpen] = useState(false)
  const [isEstrategiaOpen, setIsEstrategiaOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Vigente":
        return "bg-green-100 text-green-800 border-green-200"
      case "Vencido":
        return "bg-red-100 text-red-800 border-red-200"
      case "Por vencer":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
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
              <h1 className="text-3xl font-bold mb-2">Módulo de Gerencia</h1>
              <p className="text-neuralops-beige text-lg">Gestión corporativa, visión, misión y políticas empresariales</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Building2 className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 -mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Políticas Activas"
            value="12"
            change="3 actualizadas"
            changeType="neutral"
            icon={FileText}
          />
          <StatsCard
            title="Certificaciones"
            value="5"
            change="2 por renovar"
            changeType="neutral"
            icon={Award}
          />
          <StatsCard
            title="Años de Operación"
            value="8"
            change="Desde 2017"
            changeType="positive"
            icon={Building2}
          />
          <StatsCard
            title="Empleados"
            value="248"
            change="+12 este año"
            changeType="positive"
            icon={Users}
          />
        </div>

        {/* Botones IA - Estilo Inventario */}
        <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Herramientas de Inteligencia Artificial
          </h2>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsAnalisisOpen(true)}
              className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
            >
              <Brain className="h-4 w-4 mr-2 text-purple-500" />
              Análisis Empresarial
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsInsightsOpen(true)}
              className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
            >
              <Lightbulb className="h-4 w-4 mr-2 text-blue-500" />
              Insights Gerenciales
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEstrategiaOpen(true)}
              className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400"
            >
              <Target className="h-4 w-4 mr-2 text-green-500" />
              Estrategia IA
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="corporativo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger
              value="corporativo"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <Building2 className="h-4 w-4" />
              Información Corporativa
            </TabsTrigger>
            <TabsTrigger
              value="vision-mision"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <Target className="h-4 w-4" />
              Visión y Misión
            </TabsTrigger>
            <TabsTrigger
              value="politicas"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              Políticas
            </TabsTrigger>
            <TabsTrigger
              value="certificaciones"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <Award className="h-4 w-4" />
              Certificaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="corporativo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Logo e Identidad Visual
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center p-8 bg-neuralops-beige/20 rounded-lg">
                    <img 
                      src={companyInfo.logo} 
                      alt="Logo de la empresa" 
                      className="h-20 w-auto"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Cambiar Logo
                    </Button>
                    <Button variant="outline" className="border-neuralops-gold text-neuralops-gold">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Información de la Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue font-medium">Razón Social:</span>
                      <span className="text-neuralops-dark-blue">{companyInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue font-medium">NIT:</span>
                      <span className="text-neuralops-dark-blue">{companyInfo.nit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue font-medium">Sitio Web:</span>
                      <span className="text-neuralops-dark-blue">{companyInfo.website}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue font-medium">Teléfono:</span>
                      <span className="text-neuralops-dark-blue">{companyInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neuralops-medium-blue font-medium">Email:</span>
                      <span className="text-neuralops-dark-blue">{companyInfo.email}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Información
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Dirección de la Empresa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-neuralops-dark-blue">{companyInfo.address}</span>
                  <Button variant="outline" className="border-neuralops-gold text-neuralops-gold">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vision-mision" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <Vision className="h-5 w-5" />
                      Visión Empresarial
                    </CardTitle>
                    <Dialog open={isEditVisionOpen} onOpenChange={setIsEditVisionOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="border-neuralops-gold text-neuralops-gold">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Editar Visión Empresarial</DialogTitle>
                          <DialogDescription>Actualiza la visión de la empresa</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Textarea 
                            defaultValue={companyInfo.vision}
                            className="min-h-32"
                            placeholder="Ingresa la visión de la empresa..."
                          />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditVisionOpen(false)}>
                            Cancelar
                          </Button>
                          <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                            Guardar Cambios
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neuralops-dark-blue leading-relaxed">{companyInfo.vision}</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Misión Empresarial
                    </CardTitle>
                    <Dialog open={isEditMissionOpen} onOpenChange={setIsEditMissionOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="border-neuralops-gold text-neuralops-gold">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Editar Misión Empresarial</DialogTitle>
                          <DialogDescription>Actualiza la misión de la empresa</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Textarea 
                            defaultValue={companyInfo.mission}
                            className="min-h-32"
                            placeholder="Ingresa la misión de la empresa..."
                          />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditMissionOpen(false)}>
                            Cancelar
                          </Button>
                          <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                            Guardar Cambios
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neuralops-dark-blue leading-relaxed">{companyInfo.mission}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Valores Corporativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companyInfo.values.map((value) => (
                    <div key={value.id} className="p-4 bg-neuralops-beige/10 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{value.icon}</span>
                        <h3 className="font-semibold text-neuralops-dark-blue">{value.name}</h3>
                      </div>
                      <p className="text-neuralops-medium-blue text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Valor
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="politicas" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue">Políticas y Procedimientos</CardTitle>
                    <CardDescription>Gestión de documentos normativos de la empresa</CardDescription>
                  </div>
                  <Dialog open={isNewPolicyOpen} onOpenChange={setIsNewPolicyOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Política
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Crear Nueva Política</DialogTitle>
                        <DialogDescription>Agrega una nueva política o procedimiento</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Título</Label>
                          <Input id="title" placeholder="Política de..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Categoría</Label>
                          <Input id="category" placeholder="Calidad, Ética, etc." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="version">Versión</Label>
                          <Input id="version" placeholder="1.0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date">Fecha de Creación</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="description">Descripción</Label>
                          <Textarea id="description" placeholder="Descripción de la política..." />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewPolicyOpen(false)}>
                          Cancelar
                        </Button>
                        <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                          Crear Política
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Política</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Versión</TableHead>
                      <TableHead>Fecha Creación</TableHead>
                      <TableHead>Última Actualización</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-20">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {policies.map((policy) => (
                      <TableRow key={policy.id} className="hover:bg-neuralops-beige/5">
                        <TableCell>
                          <div>
                            <div className="font-medium text-neuralops-dark-blue">{policy.title}</div>
                            <div className="text-sm text-neuralops-medium-blue">{policy.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-neuralops-gold text-neuralops-gold">
                            {policy.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-neuralops-dark-blue">{policy.version}</TableCell>
                        <TableCell className="text-neuralops-medium-blue">{policy.dateCreated}</TableCell>
                        <TableCell className="text-neuralops-medium-blue">{policy.lastUpdated}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(policy.status)}>
                            {policy.status}
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
                                Ver documento
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
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

          <TabsContent value="certificaciones" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-neuralops-dark-blue">Certificaciones y Acreditaciones</CardTitle>
                <CardDescription>Gestión de certificaciones empresariales</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificación</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Emitido Por</TableHead>
                      <TableHead>Fecha Emisión</TableHead>
                      <TableHead>Fecha Vencimiento</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-20">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certifications.map((cert) => (
                      <TableRow key={cert.id} className="hover:bg-neuralops-beige/5">
                        <TableCell>
                          <div>
                            <div className="font-medium text-neuralops-dark-blue">{cert.name}</div>
                            <div className="text-sm text-neuralops-medium-blue">{cert.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-neuralops-gold text-neuralops-gold">
                            {cert.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-neuralops-dark-blue">{cert.issuedBy}</TableCell>
                        <TableCell className="text-neuralops-medium-blue">{cert.issuedDate}</TableCell>
                        <TableCell className="text-neuralops-medium-blue">{cert.expiryDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(cert.status)}>
                            {cert.status}
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
                                Ver certificado
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
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

      {/* Dialogo Análisis Empresarial IA - Estilo Inventario */}
      <Dialog open={isAnalisisOpen} onOpenChange={setIsAnalisisOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              IA - Análisis Empresarial Integral
            </DialogTitle>
            <DialogDescription>
              Análisis inteligente del rendimiento empresarial y métricas clave
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  KPIs Principales
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">ROI Anual:</span>
                    <Badge className="bg-green-100 text-green-700">18.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">Eficiencia Operacional:</span>
                    <Badge className="bg-blue-100 text-blue-700">87%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">Satisfacción Cliente:</span>
                    <Badge className="bg-green-100 text-green-700">92%</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Tendencias Detectadas
                </h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-green-600">↗ +15%</p>
                    <p className="text-xs text-green-500">Crecimiento trimestral</p>
                  </div>
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-purple-600">94%</p>
                    <p className="text-xs text-purple-500">Retención empleados</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Análisis de IA
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Crecimiento sostenible identificado</p>
                    <p className="text-xs text-gray-600">Expansión recomendada en Q4 basada en tendencias</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Users className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Optimización recursos humanos</p>
                    <p className="text-xs text-gray-600">Reasignar 3 empleados área A aumentaría productividad 12%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Área de atención: Inventarios</p>
                    <p className="text-xs text-gray-600">Nivel de stock 15% sobre óptimo - revisar políticas</p>
                  </div>
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                  <span className="text-purple-800">Analizando datos empresariales con IA...</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAnalisisOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <FileText className="mr-2 h-4 w-4" />
              Generar Dashboard Ejecutivo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Insights Gerenciales IA - Estilo Inventario */}
      <Dialog open={isInsightsOpen} onOpenChange={setIsInsightsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              IA - Insights Gerenciales Avanzados
            </DialogTitle>
            <DialogDescription>
              Descubrimientos inteligentes para la toma de decisiones estratégicas
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 text-center">
                <h4 className="font-medium text-blue-800 mb-2">Oportunidades</h4>
                <p className="text-2xl font-bold text-blue-600">7</p>
                <p className="text-xs text-blue-500">Identificadas</p>
              </div>
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 text-center">
                <h4 className="font-medium text-blue-800 mb-2">Riesgos</h4>
                <p className="text-2xl font-bold text-orange-600">3</p>
                <p className="text-xs text-orange-500">Por mitigar</p>
              </div>
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 text-center">
                <h4 className="font-medium text-blue-800 mb-2">Impacto</h4>
                <p className="text-2xl font-bold text-green-600">+22%</p>
                <p className="text-xs text-green-500">Potencial mejora</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Insights Prioritarios
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Automatización procesos:</strong> 40% tiempo ahorrado</span>
                  <Badge className="bg-green-100 text-green-700">Alto Impacto</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Nuevos mercados:</strong> Potencial +$2.5M ingresos</span>
                  <Badge className="bg-blue-100 text-blue-700">Oportunidad</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Capacitación equipo:</strong> ROI 180% en 6 meses</span>
                  <Badge className="bg-purple-100 text-purple-700">Estratégico</Badge>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Recomendaciones Ejecutivas
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Implementar dashboard tiempo real</p>
                    <p className="text-xs text-gray-600">Mejorar toma de decisiones reduciendo tiempo respuesta 60%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Diversificar portfolio servicios</p>
                    <p className="text-xs text-gray-600">3 nichos identificados con demanda creciente 45%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Building2 className="h-4 w-4 text-purple-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Expandir infraestructura digital</p>
                    <p className="text-xs text-gray-600">Inversión $500K generaría ahorro $1.2M anual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInsightsOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Lightbulb className="mr-2 h-4 w-4" />
              Plan de Acción
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Estrategia IA - Estilo Inventario */}
      <Dialog open={isEstrategiaOpen} onOpenChange={setIsEstrategiaOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-600" />
              IA - Planificación Estratégica Inteligente
            </DialogTitle>
            <DialogDescription>
              Desarrolla estrategias empresariales basadas en análisis predictivo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Objetivos Estratégicos
                </h4>
                <div className="space-y-3">
                  <div className="p-2 bg-white border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Crecimiento Sostenible</p>
                    <p className="text-xs text-green-600">Meta: 25% anual - Progreso: 67%</p>
                  </div>
                  <div className="p-2 bg-white border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Innovación Digital</p>
                    <p className="text-xs text-green-600">Meta: 80% procesos - Progreso: 45%</p>
                  </div>
                  <div className="p-2 bg-white border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Expansión Mercados</p>
                    <p className="text-xs text-green-600">Meta: 3 nuevos - Progreso: 33%</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Proyecciones IA
                </h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-green-600">2026</p>
                    <p className="text-xs text-green-500">Liderazgo sectorial</p>
                  </div>
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-blue-600">$12M</p>
                    <p className="text-xs text-blue-500">Ingresos proyectados</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Plan Estratégico Generado por IA
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fase 1: Optimización Interna (Q1-Q2)</p>
                    <p className="text-xs text-gray-600">Automatizar procesos clave y capacitar equipos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fase 2: Expansión Controlada (Q3)</p>
                    <p className="text-xs text-gray-600">Ingresar 2 mercados identificados con bajo riesgo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Zap className="h-4 w-4 text-purple-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fase 3: Innovación Disruptiva (Q4)</p>
                    <p className="text-xs text-gray-600">Lanzar plataforma digital y servicios premium</p>
                  </div>
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
                  <span className="text-green-800">Generando estrategia con IA...</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEstrategiaOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Target className="mr-2 h-4 w-4" />
              Implementar Estrategia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
