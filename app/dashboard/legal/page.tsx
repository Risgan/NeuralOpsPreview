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
import {
  Scale,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Upload,
  Copy,
  FileText,
  Calendar,
  User,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Gavel,
  FileSignature,
  Shield,
  Users,
  Briefcase,
  Brain,
  Sparkles,
  Scan,
  BookOpen,
  Target,
  Zap,
  BarChart3,
} from "lucide-react"

// Datos de templates de contratos
const contractTemplates = [
  {
    id: "TPL-001",
    nombre: "Contrato Laboral Indefinido",
    categoria: "Laboral",
    version: "v2.1",
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-07-20",
    estado: "Activo",
    usos: 45,
    descripcion: "Template estándar para contratos de trabajo a término indefinido",
    variables: ["nombre_empleado", "cargo", "salario", "fecha_inicio", "jornada"],
    creadoPor: "María González",
    departamento: "RRHH",
  },
  {
    id: "TPL-002",
    nombre: "Contrato de Servicios Profesionales",
    categoria: "Comercial",
    version: "v1.5",
    fechaCreacion: "2024-02-10",
    fechaActualizacion: "2024-06-15",
    estado: "Activo",
    usos: 23,
    descripcion: "Template para contratos de prestación de servicios con clientes",
    variables: ["nombre_cliente", "servicio", "valor", "plazo", "entregables"],
    creadoPor: "Carlos López",
    departamento: "Comercial",
  },
  {
    id: "TPL-003",
    nombre: "Acuerdo de Confidencialidad",
    categoria: "Legal",
    version: "v3.0",
    fechaCreacion: "2024-01-20",
    fechaActualizacion: "2024-08-01",
    estado: "Activo",
    usos: 67,
    descripcion: "NDA estándar para protección de información confidencial",
    variables: ["partes", "tipo_informacion", "vigencia", "penalidades"],
    creadoPor: "Ana Martínez",
    departamento: "Legal",
  },
  {
    id: "TPL-004",
    nombre: "Contrato Temporal",
    categoria: "Laboral",
    version: "v1.8",
    fechaCreacion: "2024-03-05",
    fechaActualizacion: "2024-05-20",
    estado: "Revision",
    usos: 12,
    descripcion: "Template para contratos de trabajo a término fijo",
    variables: ["nombre_empleado", "cargo", "salario", "fecha_inicio", "fecha_fin"],
    creadoPor: "Juan Pérez",
    departamento: "RRHH",
  },
]

// Datos de contratos generados
const generatedContracts = [
  {
    id: "CTR-001",
    template: "Contrato Laboral Indefinido",
    cliente: "Pedro Ramírez",
    cargo: "Desarrollador Senior",
    fechaGeneracion: "2024-08-10",
    estado: "Firmado",
    vigencia: "Indefinida",
    valor: "$4,500,000",
    responsable: "María González",
    archivo: "contrato-pedro-ramirez.pdf",
  },
  {
    id: "CTR-002",
    template: "Contrato de Servicios Profesionales",
    cliente: "TechCorp S.A.",
    cargo: "Consultoría IT",
    fechaGeneracion: "2024-08-08",
    estado: "Pendiente Firma",
    vigencia: "6 meses",
    valor: "$25,000,000",
    responsable: "Carlos López",
    archivo: "contrato-techcorp.pdf",
  },
  {
    id: "CTR-003",
    template: "Acuerdo de Confidencialidad",
    cliente: "InnovateXYZ",
    cargo: "NDA Proyecto Alpha",
    fechaGeneracion: "2024-08-05",
    estado: "Firmado",
    vigencia: "2 años",
    valor: "N/A",
    responsable: "Ana Martínez",
    archivo: "nda-innovatexyz.pdf",
  },
]

// Datos de variables legales
const legalVariables = [
  {
    id: "VAR-001",
    nombre: "nombre_empleado",
    descripcion: "Nombre completo del empleado",
    tipo: "Texto",
    requerida: true,
    valorDefecto: "",
    categoria: "Personal",
  },
  {
    id: "VAR-002",
    nombre: "salario_base",
    descripcion: "Salario base mensual",
    tipo: "Moneda",
    requerida: true,
    valorDefecto: "1300000",
    categoria: "Financiero",
  },
  {
    id: "VAR-003",
    nombre: "fecha_inicio",
    descripcion: "Fecha de inicio del contrato",
    tipo: "Fecha",
    requerida: true,
    valorDefecto: "",
    categoria: "Temporal",
  },
  {
    id: "VAR-004",
    nombre: "nombre_empresa",
    descripcion: "Razón social de la empresa",
    tipo: "Texto",
    requerida: true,
    valorDefecto: "NeuralOps SAS",
    categoria: "Empresarial",
  },
]

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("templates")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false)
  const [isGenerateContractOpen, setIsGenerateContractOpen] = useState(false)
  const [isTemplateDetailsOpen, setIsTemplateDetailsOpen] = useState(false)
  const [isContractDetailsOpen, setIsContractDetailsOpen] = useState(false)
  const [isNewVariableOpen, setIsNewVariableOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Estados para IA - Estilo Inventario
  const [isAnalisisOpen, setIsAnalisisOpen] = useState(false)
  const [isRevisionOpen, setIsRevisionOpen] = useState(false)
  const [isComplianceOpen, setIsComplianceOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const [newTemplate, setNewTemplate] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    contenido: "",
    variables: [""],
  })

  const [newContract, setNewContract] = useState({
    template: "",
    cliente: "",
    cargo: "",
    variables: {} as Record<string, string>,
  })

  const [newVariable, setNewVariable] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    requerida: false,
    valorDefecto: "",
    categoria: "",
  })

  const handleCreateTemplate = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Creating template:", newTemplate)
    setIsLoading(false)
    setIsNewTemplateOpen(false)
    setNewTemplate({
      nombre: "",
      categoria: "",
      descripcion: "",
      contenido: "",
      variables: [""],
    })
  }

  const handleGenerateContract = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Generating contract:", newContract)
    setIsLoading(false)
    setIsGenerateContractOpen(false)
    setNewContract({
      template: "",
      cliente: "",
      cargo: "",
      variables: {},
    })
  }

  const handleCreateVariable = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Creating variable:", newVariable)
    setIsLoading(false)
    setIsNewVariableOpen(false)
    setNewVariable({
      nombre: "",
      descripcion: "",
      tipo: "",
      requerida: false,
      valorDefecto: "",
      categoria: "",
    })
  }

  const addTemplateVariable = () => {
    setNewTemplate((prev) => ({
      ...prev,
      variables: [...prev.variables, ""],
    }))
  }

  const updateTemplateVariable = (index: number, value: string) => {
    setNewTemplate((prev) => ({
      ...prev,
      variables: prev.variables.map((variable, i) => (i === index ? value : variable)),
    }))
  }

  const removeTemplateVariable = (index: number) => {
    setNewTemplate((prev) => ({
      ...prev,
      variables: prev.variables.filter((_, i) => i !== index),
    }))
  }

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "Activo":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Activo</Badge>
      case "Revision":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">En Revisión</Badge>
      case "Inactivo":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Inactivo</Badge>
      case "Firmado":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Firmado</Badge>
      case "Pendiente Firma":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente Firma</Badge>
      case "Vencido":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Vencido</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{estado}</Badge>
    }
  }

  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case "Laboral":
        return <Users className="h-4 w-4 text-blue-600" />
      case "Comercial":
        return <Briefcase className="h-4 w-4 text-green-600" />
      case "Legal":
        return <Scale className="h-4 w-4 text-purple-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredTemplates = contractTemplates.filter(
    (template) =>
      template.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredContracts = generatedContracts.filter(
    (contract) =>
      contract.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredVariables = legalVariables.filter(
    (variable) =>
      variable.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Módulo Legal</h1>
              <p className="text-neuralops-beige text-lg">Gestión de templates, contratos y documentos legales</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Templates Activos</CardTitle>
              <FileText className="h-4 w-4 text-neuralops-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                +2 nuevos este mes
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contratos Generados</CardTitle>
              <FileSignature className="h-4 w-4 text-neuralops-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                +15 esta semana
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes Firma</CardTitle>
              <Clock className="h-4 w-4 text-neuralops-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-yellow-600 flex items-center gap-1">
                3 próximos a vencer
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Variables Configuradas</CardTitle>
              <Shield className="h-4 w-4 text-neuralops-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-blue-600 flex items-center gap-1">
                100% configuradas
              </p>
            </CardContent>
          </Card>
        </div>


        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="contratos">Contratos</TabsTrigger>
            <TabsTrigger value="variables">Variables</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Templates de Contratos</CardTitle>
                    <CardDescription>Gestiona los templates base para generar contratos</CardDescription>
                  </div>
                  <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Crear Nuevo Template</DialogTitle>
                        <DialogDescription>Define un nuevo template de contrato con sus variables</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-6 py-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="template-name">Nombre del Template</Label>
                            <Input
                              id="template-name"
                              value={newTemplate.nombre}
                              onChange={(e) => setNewTemplate(prev => ({...prev, nombre: e.target.value}))}
                              placeholder="Ej: Contrato de Trabajo"
                            />
                          </div>
                          <div>
                            <Label htmlFor="template-category">Categoría</Label>
                            <Select value={newTemplate.categoria} onValueChange={(value) => setNewTemplate(prev => ({...prev, categoria: value}))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Laboral">Laboral</SelectItem>
                                <SelectItem value="Comercial">Comercial</SelectItem>
                                <SelectItem value="Legal">Legal</SelectItem>
                                <SelectItem value="Servicios">Servicios</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="template-description">Descripción</Label>
                            <Textarea
                              id="template-description"
                              value={newTemplate.descripcion}
                              onChange={(e) => setNewTemplate(prev => ({...prev, descripcion: e.target.value}))}
                              placeholder="Describe el propósito del template"
                              rows={3}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label>Variables del Template</Label>
                              <Button type="button" variant="outline" size="sm" onClick={addTemplateVariable}>
                                <Plus className="h-3 w-3 mr-1" />
                                Agregar
                              </Button>
                            </div>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {newTemplate.variables.map((variable, index) => (
                                <div key={index} className="flex gap-2">
                                  <Input
                                    value={variable}
                                    onChange={(e) => updateTemplateVariable(index, e.target.value)}
                                    placeholder="nombre_variable"
                                    className="flex-1"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeTemplateVariable(index)}
                                  >
                                    ×
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="template-content">Contenido del Template</Label>
                          <Textarea
                            id="template-content"
                            value={newTemplate.contenido}
                            onChange={(e) => setNewTemplate(prev => ({...prev, contenido: e.target.value}))}
                            placeholder="Contenido del contrato con variables como {{nombre_empleado}}, {{salario}}, etc."
                            rows={15}
                            className="font-mono text-sm"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewTemplateOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateTemplate} disabled={isLoading}>
                          {isLoading ? "Creando..." : "Crear Template"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="laboral">Laboral</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Template</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Versión</TableHead>
                        <TableHead>Última Actualización</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Usos</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTemplates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {getCategoryIcon(template.categoria)}
                              <div>
                                <div className="font-medium">{template.nombre}</div>
                                <div className="text-sm text-gray-500">{template.descripcion}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{template.categoria}</TableCell>
                          <TableCell>{template.version}</TableCell>
                          <TableCell>{template.fechaActualizacion}</TableCell>
                          <TableCell>{getStatusBadge(template.estado)}</TableCell>
                          <TableCell>{template.usos}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {
                                  setSelectedTemplate(template)
                                  setIsTemplateDetailsOpen(true)
                                }}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contratos Tab */}
          <TabsContent value="contratos" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contratos Generados</CardTitle>
                    <CardDescription>Historial de contratos creados a partir de templates</CardDescription>
                  </div>
                  <Dialog open={isGenerateContractOpen} onOpenChange={setIsGenerateContractOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Generar Contrato
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Generar Nuevo Contrato</DialogTitle>
                        <DialogDescription>Selecciona un template y completa las variables</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="contract-template">Template Base</Label>
                          <Select value={newContract.template} onValueChange={(value) => setNewContract(prev => ({...prev, template: value}))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un template" />
                            </SelectTrigger>
                            <SelectContent>
                              {contractTemplates.map((template) => (
                                <SelectItem key={template.id} value={template.nombre}>
                                  {template.nombre} - {template.categoria}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contract-client">Cliente/Empleado</Label>
                            <Input
                              id="contract-client"
                              value={newContract.cliente}
                              onChange={(e) => setNewContract(prev => ({...prev, cliente: e.target.value}))}
                              placeholder="Nombre completo"
                            />
                          </div>
                          <div>
                            <Label htmlFor="contract-position">Cargo/Servicio</Label>
                            <Input
                              id="contract-position"
                              value={newContract.cargo}
                              onChange={(e) => setNewContract(prev => ({...prev, cargo: e.target.value}))}
                              placeholder="Título del cargo o servicio"
                            />
                          </div>
                        </div>
                        {newContract.template && (
                          <div className="space-y-3">
                            <Label>Variables del Template</Label>
                            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                              {contractTemplates
                                .find(t => t.nombre === newContract.template)
                                ?.variables.map((variable) => (
                                <div key={variable}>
                                  <Label htmlFor={`var-${variable}`} className="text-xs">
                                    {variable.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </Label>
                                  <Input
                                    id={`var-${variable}`}
                                    placeholder={`Valor para ${variable}`}
                                    value={newContract.variables[variable] || ""}
                                    onChange={(e) => setNewContract(prev => ({
                                      ...prev,
                                      variables: {
                                        ...prev.variables,
                                        [variable]: e.target.value
                                      }
                                    }))}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsGenerateContractOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleGenerateContract} disabled={isLoading}>
                          {isLoading ? "Generando..." : "Generar Contrato"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar contratos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="firmado">Firmado</SelectItem>
                      <SelectItem value="pendiente">Pendiente Firma</SelectItem>
                      <SelectItem value="vencido">Vencido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contrato</TableHead>
                        <TableHead>Cliente/Empleado</TableHead>
                        <TableHead>Template</TableHead>
                        <TableHead>Fecha Generación</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContracts.map((contract) => (
                        <TableRow key={contract.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{contract.id}</div>
                              <div className="text-sm text-gray-500">{contract.cargo}</div>
                            </div>
                          </TableCell>
                          <TableCell>{contract.cliente}</TableCell>
                          <TableCell>{contract.template}</TableCell>
                          <TableCell>{contract.fechaGeneracion}</TableCell>
                          <TableCell>{getStatusBadge(contract.estado)}</TableCell>
                          <TableCell>{contract.valor}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {
                                  setSelectedContract(contract)
                                  setIsContractDetailsOpen(true)
                                }}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileSignature className="h-4 w-4 mr-2" />
                                  Enviar para Firma
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Variables Tab */}
          <TabsContent value="variables" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Variables Legales</CardTitle>
                    <CardDescription>Gestiona las variables que se utilizan en los templates</CardDescription>
                  </div>
                  <Dialog open={isNewVariableOpen} onOpenChange={setIsNewVariableOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Variable
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Crear Nueva Variable</DialogTitle>
                        <DialogDescription>Define una nueva variable para usar en templates</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div>
                          <Label htmlFor="variable-name">Nombre de la Variable</Label>
                          <Input
                            id="variable-name"
                            value={newVariable.nombre}
                            onChange={(e) => setNewVariable(prev => ({...prev, nombre: e.target.value}))}
                            placeholder="nombre_variable"
                          />
                        </div>
                        <div>
                          <Label htmlFor="variable-type">Tipo</Label>
                          <Select value={newVariable.tipo} onValueChange={(value) => setNewVariable(prev => ({...prev, tipo: value}))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Texto">Texto</SelectItem>
                              <SelectItem value="Numero">Número</SelectItem>
                              <SelectItem value="Fecha">Fecha</SelectItem>
                              <SelectItem value="Moneda">Moneda</SelectItem>
                              <SelectItem value="Booleano">Booleano</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="variable-description">Descripción</Label>
                          <Textarea
                            id="variable-description"
                            value={newVariable.descripcion}
                            onChange={(e) => setNewVariable(prev => ({...prev, descripcion: e.target.value}))}
                            placeholder="Describe el propósito de la variable"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="variable-category">Categoría</Label>
                          <Select value={newVariable.categoria} onValueChange={(value) => setNewVariable(prev => ({...prev, categoria: value}))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Personal">Personal</SelectItem>
                              <SelectItem value="Financiero">Financiero</SelectItem>
                              <SelectItem value="Temporal">Temporal</SelectItem>
                              <SelectItem value="Empresarial">Empresarial</SelectItem>
                              <SelectItem value="Contacto">Contacto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="variable-default">Valor por Defecto</Label>
                          <Input
                            id="variable-default"
                            value={newVariable.valorDefecto}
                            onChange={(e) => setNewVariable(prev => ({...prev, valorDefecto: e.target.value}))}
                            placeholder="Valor por defecto (opcional)"
                          />
                        </div>
                        <div className="col-span-2 flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="variable-required"
                            checked={newVariable.requerida}
                            onChange={(e) => setNewVariable(prev => ({...prev, requerida: e.target.checked}))}
                          />
                          <Label htmlFor="variable-required">Variable requerida</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewVariableOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateVariable} disabled={isLoading}>
                          {isLoading ? "Creando..." : "Crear Variable"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar variables..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="financiero">Financiero</SelectItem>
                      <SelectItem value="temporal">Temporal</SelectItem>
                      <SelectItem value="empresarial">Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Variable</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Requerida</TableHead>
                        <TableHead>Valor por Defecto</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVariables.map((variable) => (
                        <TableRow key={variable.id}>
                          <TableCell>
                            <div>
                              <div className="font-mono font-medium">{variable.nombre}</div>
                              <div className="text-sm text-gray-500">{variable.descripcion}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{variable.tipo}</Badge>
                          </TableCell>
                          <TableCell>{variable.categoria}</TableCell>
                          <TableCell>
                            {variable.requerida ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-400" />
                            )}
                          </TableCell>
                          <TableCell>
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                              {variable.valorDefecto || "N/A"}
                            </code>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reportes Tab */}
          <TabsContent value="reportes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Uso de Templates</CardTitle>
                  <CardDescription>Templates más utilizados este mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Contrato Laboral Indefinido", uses: 45, change: "+12%" },
                      { name: "Acuerdo de Confidencialidad", uses: 67, change: "+25%" },
                      { name: "Contrato de Servicios", uses: 23, change: "+8%" },
                      { name: "Contrato Temporal", uses: 12, change: "-5%" },
                    ].map((template, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-neuralops-beige/10 rounded-lg">
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-500">{template.uses} usos</div>
                        </div>
                        <div className={`text-sm font-medium ${template.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {template.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estado de Contratos</CardTitle>
                  <CardDescription>Distribución por estado actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: "Firmado", count: 156, color: "bg-green-500" },
                      { status: "Pendiente Firma", count: 7, color: "bg-yellow-500" },
                      { status: "En Revisión", count: 3, color: "bg-blue-500" },
                      { status: "Vencido", count: 2, color: "bg-red-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.status}</span>
                          <span className="text-sm text-gray-500">{item.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${(item.count / 168) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximos Vencimientos</CardTitle>
                  <CardDescription>Contratos que requieren atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { client: "TechCorp S.A.", contract: "Servicios IT", days: 5, type: "renewal" },
                      { client: "Innovation Lab", contract: "NDA Proyecto", days: 12, type: "expiry" },
                      { client: "StartupXYZ", contract: "Consultoría", days: 18, type: "review" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            item.days <= 7 ? 'bg-red-500' : item.days <= 14 ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                          <div>
                            <div className="font-medium text-sm">{item.client}</div>
                            <div className="text-xs text-gray-500">{item.contract}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{item.days} días</div>
                          <div className="text-xs text-gray-500">
                            {item.type === 'renewal' ? 'Renovación' : 
                             item.type === 'expiry' ? 'Vencimiento' : 'Revisión'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimas acciones en el módulo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: "Contrato generado", detail: "Pedro Ramírez - Contrato Laboral", time: "Hace 2 horas", user: "María González" },
                      { action: "Template actualizado", detail: "Contrato de Servicios v1.6", time: "Hace 4 horas", user: "Carlos López" },
                      { action: "Contrato firmado", detail: "TechCorp S.A. - Servicios IT", time: "Hace 6 horas", user: "Ana Martínez" },
                      { action: "Variable creada", detail: "direccion_trabajo", time: "Hace 1 día", user: "Juan Pérez" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-2">
                        <div className="w-2 h-2 bg-neuralops-gold rounded-full mt-2" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{activity.action}</div>
                          <div className="text-xs text-gray-500">{activity.detail}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {activity.time} • {activity.user}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Template Details Modal */}
        {selectedTemplate && (
          <Dialog open={isTemplateDetailsOpen} onOpenChange={setIsTemplateDetailsOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {getCategoryIcon(selectedTemplate.categoria)}
                  {selectedTemplate.nombre}
                </DialogTitle>
                <DialogDescription>{selectedTemplate.descripcion}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Información General</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">ID:</span>
                        <span className="text-sm font-medium">{selectedTemplate.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Categoría:</span>
                        <span className="text-sm font-medium">{selectedTemplate.categoria}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Versión:</span>
                        <span className="text-sm font-medium">{selectedTemplate.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Estado:</span>
                        {getStatusBadge(selectedTemplate.estado)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Usos:</span>
                        <span className="text-sm font-medium">{selectedTemplate.usos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Creado por:</span>
                        <span className="text-sm font-medium">{selectedTemplate.creadoPor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Departamento:</span>
                        <span className="text-sm font-medium">{selectedTemplate.departamento}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Variables del Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedTemplate.variables.map((variable: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                              {`{{${variable}}}`}
                            </code>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Preview del Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 p-4 rounded-lg h-96 overflow-y-auto">
                        <div className="text-sm font-mono whitespace-pre-wrap">
                          {`CONTRATO DE TRABAJO

Entre {{nombre_empresa}}, identificada con NIT {{nit_empresa}}, domiciliada en {{direccion_empresa}}, quien en adelante se denominará EL EMPLEADOR, y {{nombre_empleado}}, identificado(a) con cédula de ciudadanía número {{cedula_empleado}}, domiciliado(a) en {{direccion_empleado}}, quien en adelante se denominará EL TRABAJADOR, se ha convenido celebrar el presente contrato de trabajo, que se regirá por las siguientes cláusulas:

PRIMERA. OBJETO: EL TRABAJADOR se obliga a prestar sus servicios personales a EL EMPLEADOR en el cargo de {{cargo}}, desempeñando las siguientes funciones: {{funciones}}.

SEGUNDA. DURACIÓN: El presente contrato es a término {{tipo_contrato}} y tendrá una duración de {{duracion}} a partir del {{fecha_inicio}}.

TERCERA. SALARIO: EL EMPLEADOR pagará a EL TRABAJADOR la suma de {{salario}} mensual como salario básico.

CUARTA. JORNADA DE TRABAJO: La jornada ordinaria de trabajo será de {{jornada}} horas {{tipo_jornada}}.

En constancia de lo anterior, se firma el presente contrato en {{ciudad}}, a los {{fecha_firma}}.

_________________________          _________________________
EL EMPLEADOR                        EL TRABAJADOR`}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTemplateDetailsOpen(false)}>
                  Cerrar
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Contract Details Modal */}
        {selectedContract && (
          <Dialog open={isContractDetailsOpen} onOpenChange={setIsContractDetailsOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <FileSignature className="h-6 w-6 text-neuralops-gold" />
                  <div>
                    <div>Contrato {selectedContract.id}</div>
                    <div className="text-sm font-normal text-gray-500">{selectedContract.cliente}</div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Información del Contrato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">ID:</span>
                        <span className="text-sm font-medium">{selectedContract.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Template:</span>
                        <span className="text-sm font-medium">{selectedContract.template}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Cliente/Empleado:</span>
                        <span className="text-sm font-medium">{selectedContract.cliente}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Cargo/Servicio:</span>
                        <span className="text-sm font-medium">{selectedContract.cargo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Responsable:</span>
                        <span className="text-sm font-medium">{selectedContract.responsable}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Estado y Vigencia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Estado:</span>
                        {getStatusBadge(selectedContract.estado)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Fecha Generación:</span>
                        <span className="text-sm font-medium">{selectedContract.fechaGeneracion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Vigencia:</span>
                        <span className="text-sm font-medium">{selectedContract.vigencia}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Valor:</span>
                        <span className="text-sm font-medium">{selectedContract.valor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Archivo:</span>
                        <span className="text-sm font-medium">{selectedContract.archivo}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Acciones Disponibles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3 flex-wrap">
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileSignature className="h-4 w-4 mr-2" />
                        Enviar para Firma
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsContractDetailsOpen(false)}>
                  Cerrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Dialogo Análisis Documental IA - Estilo Inventario */}
      <Dialog open={isAnalisisOpen} onOpenChange={setIsAnalisisOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              IA - Análisis Documental Inteligente
            </DialogTitle>
            <DialogDescription>
              Análisis automatizado de contratos y documentos legales
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Sube documentos legales para análisis automático
              </p>
              <Button variant="outline" className="border-purple-300 text-purple-600">
                <Upload className="h-4 w-4 mr-2" />
                Subir Documentos
              </Button>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Análisis Completados
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Contrato Servicios TechCorp:</strong> 95% completo</span>
                  <Badge className="bg-green-100 text-green-700">Aprobado</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Acuerdo NDA Cliente-X:</strong> Cláusula ambigua</span>
                  <Badge className="bg-orange-100 text-orange-700">Revisar</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Template Prestación:</strong> Actualización requerida</span>
                  <Badge className="bg-red-100 text-red-700">Acción</Badge>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Insights de IA
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Scale className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Cláusulas estándar identificadas</p>
                    <p className="text-xs text-gray-600">87% conformidad con templates corporativos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Términos de pago inconsistentes</p>
                    <p className="text-xs text-gray-600">Revisar cláusula 4.2 - conflicto con política estándar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Gavel className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Jurisdicción recomendada</p>
                    <p className="text-xs text-gray-600">Sugerir jurisdicción local para mejor enforcement</p>
                  </div>
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                  <span className="text-purple-800">Analizando documentos con IA...</span>
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
              Generar Reporte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Revisión Inteligente IA - Estilo Inventario */}
      <Dialog open={isRevisionOpen} onOpenChange={setIsRevisionOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              IA - Revisión Inteligente de Contratos
            </DialogTitle>
            <DialogDescription>
              Revisión automatizada con sugerencias de mejora y correcciones
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <Scan className="h-4 w-4" />
                  Estado de Revisión
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">Documentos pendientes:</span>
                    <Badge className="bg-orange-100 text-orange-700">5</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">Revisiones completadas:</span>
                    <Badge className="bg-green-100 text-green-700">18</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm">Requieren atención:</span>
                    <Badge className="bg-red-100 text-red-700">3</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Métricas de Calidad
                </h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-blue-600">92%</p>
                    <p className="text-xs text-blue-500">Precisión IA</p>
                  </div>
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-green-600">4.2h</p>
                    <p className="text-xs text-green-500">Tiempo ahorrado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Sugerencias de Mejora
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Simplificar cláusula de terminación</p>
                    <p className="text-xs text-gray-600">Reducir complejidad legal para mejor comprensión</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Actualizar referencias normativas</p>
                    <p className="text-xs text-gray-600">3 normas citadas han sido actualizadas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fortalecer cláusulas de confidencialidad</p>
                    <p className="text-xs text-gray-600">Agregar protección específica para datos sensibles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevisionOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Edit className="mr-2 h-4 w-4" />
              Aplicar Sugerencias
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Compliance IA - Estilo Inventario */}
      <Dialog open={isComplianceOpen} onOpenChange={setIsComplianceOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-600" />
              IA - Sistema de Compliance Inteligente
            </DialogTitle>
            <DialogDescription>
              Monitoreo automático de cumplimiento normativo y regulatorio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Estado de Compliance
                </h4>
                <div className="text-center p-4">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">96</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">Compliance Score</p>
                  <p className="text-xs text-green-500">Excelente nivel de cumplimiento</p>
                </div>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Auditorías Pendientes
                </h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-green-600">2</p>
                    <p className="text-xs text-green-500">Auditorías programadas</p>
                  </div>
                  <div className="p-2 bg-white rounded border text-center">
                    <p className="text-lg font-bold text-blue-600">0</p>
                    <p className="text-xs text-blue-500">Incumplimientos</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Alertas Normativas
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm">GDPR - Protección de datos:</span>
                  <Badge className="bg-green-100 text-green-700">Cumple</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm">ISO 27001 - Seguridad:</span>
                  <Badge className="bg-green-100 text-green-700">Cumple</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm">Normativa laboral local:</span>
                  <Badge className="bg-yellow-100 text-yellow-700">Revisar</Badge>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Recomendaciones de Compliance
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Actualizar política de retención de datos</p>
                    <p className="text-xs text-gray-600">Nueva normativa requiere ajustes en periodo de retención</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Programar capacitación compliance</p>
                    <p className="text-xs text-gray-600">Personal requiere actualización en nuevas regulaciones</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded border">
                  <FileSignature className="h-4 w-4 text-purple-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Revisar contratos internacionales</p>
                    <p className="text-xs text-gray-600">Cambios regulatorios afectan cláusulas de transferencia</p>
                  </div>
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
                  <span className="text-green-800">Evaluando compliance con IA...</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsComplianceOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Shield className="mr-2 h-4 w-4" />
              Generar Informe Compliance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
