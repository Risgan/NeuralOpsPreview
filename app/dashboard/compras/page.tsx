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
  ShoppingCart,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  FileText,
  Users,
  Clock,
  DollarSign,
  Package,
  X,
  Download,
  Truck,
  Receipt,
  CheckCircle,
  Brain,
  Bot,
  Sparkles,
  Scan,
  Zap,
  Upload,
  AlertCircle,
  Mic,
  Send,
  TrendingUp,
  BarChart3,
  UserCheck,
  Settings,
} from "lucide-react"

const purchaseRequests = [
  {
    id: "OC-2024-001",
    description: "Materias primas para producción",
    requestedBy: "María González",
    department: "Producción",
    status: "Pendiente",
    amount: "$15,000",
    date: "2024-01-15",
    priority: "Alta",
    avatar: "/placeholder.svg?height=32&width=32",
    items: [
      { name: "Acero inoxidable", quantity: 100, unit: "kg", unitPrice: 50 },
      { name: "Aluminio", quantity: 50, unit: "kg", unitPrice: 80 },
    ],
    justification: "Necesario para completar la orden de producción OP-2024-001",
  },
  {
    id: "OC-2024-002",
    description: "Equipos de seguridad industrial",
    requestedBy: "John Rueda",
    department: "SST",
    status: "Aprobada",
    amount: "$8,500",
    date: "2024-01-14",
    priority: "Media",
    avatar: "/placeholder.svg?height=32&width=32",
    items: [
      { name: "Cascos de seguridad", quantity: 20, unit: "unidad", unitPrice: 25 },
      { name: "Guantes industriales", quantity: 50, unit: "par", unitPrice: 15 },
    ],
    justification: "Reposición de equipos de protección personal",
  },
]

const quotations = [
  {
    id: "COT-001",
    supplier: "Proveedor ABC S.A.",
    product: "Materias primas",
    amount: "$14,500",
    validUntil: "2024-02-15",
    status: "Activa",
    discount: "5%",
    items: [
      { name: "Acero inoxidable", quantity: 100, unit: "kg", unitPrice: 48 },
      { name: "Aluminio", quantity: 50, unit: "kg", unitPrice: 76 },
    ],
    terms: "Pago a 30 días, entrega en 15 días hábiles",
    contact: "Juan Supplier",
    phone: "+57 300 111 2222",
  },
]

const suppliers = [
  {
    id: 1,
    name: "Proveedor ABC S.A.",
    category: "Materias Primas",
    contact: "contacto@proveedorabc.com",
    status: "Activo",
    rating: 4.5,
    orders: 24,
    totalAmount: "$125,000",
    address: "Calle 123 #45-67, Bogotá",
    phone: "+57 300 111 2222",
    taxId: "900123456-1",
    paymentTerms: "30 días",
  },
]

const stats = [
  {
    title: "Solicitudes Pendientes",
    value: "12",
    change: "+2",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Monto Total Mes",
    value: "$45,200",
    change: "+15%",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Proveedores Activos",
    value: "28",
    change: "+3",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Órdenes Completadas",
    value: "156",
    change: "+8%",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

export default function ComprasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null)
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false)
  const [isNewQuotationOpen, setIsNewQuotationOpen] = useState(false)
  const [isNewSupplierOpen, setIsNewSupplierOpen] = useState(false)
  const [isGenerateOCOpen, setIsGenerateOCOpen] = useState(false)
  const [isGenerateRemisionOpen, setIsGenerateRemisionOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Estados para funcionalidades de IA
  const [isOcrQuotationsOpen, setIsOcrQuotationsOpen] = useState(false)
  const [isPriceComparisonOpen, setIsPriceComparisonOpen] = useState(false)
  const [isAutoGeneratorOpen, setIsAutoGeneratorOpen] = useState(false)
  const [isSupplierEvaluationOpen, setIsSupplierEvaluationOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ocrFile, setOcrFile] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isChatAssistantOpen, setIsChatAssistantOpen] = useState(false)

  const [newRequest, setNewRequest] = useState({
    description: "",
    department: "",
    priority: "",
    justification: "",
    items: [{ name: "", quantity: "", unit: "", unitPrice: "" }],
  })

  const [newQuotation, setNewQuotation] = useState({
    supplier: "",
    product: "",
    amount: "",
    validUntil: "",
    discount: "",
    terms: "",
    items: [{ name: "", quantity: "", unit: "", unitPrice: "" }],
  })

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    category: "",
    contact: "",
    phone: "",
    address: "",
    taxId: "",
    paymentTerms: "",
  })

  const [ordenCompra, setOrdenCompra] = useState({
    proveedor: "",
    solicitudId: "",
    fechaEntrega: "",
    condicionesPago: "",
    observaciones: "",
    items: [],
  })

  const [remision, setRemision] = useState({
    ordenCompraId: "",
    transportadora: "",
    numeroGuia: "",
    fechaDespacho: "",
    responsableRecepcion: "",
    observaciones: "",
    items: [],
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Aprobada":
        return "bg-green-100 text-green-800 border-green-200"
      case "Rechazada":
        return "bg-red-100 text-red-800 border-red-200"
      case "Activa":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Vencida":
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  const addItem = (type: string) => {
    if (type === "request") {
      setNewRequest({
        ...newRequest,
        items: [...newRequest.items, { name: "", quantity: "", unit: "", unitPrice: "" }],
      })
    } else if (type === "quotation") {
      setNewQuotation({
        ...newQuotation,
        items: [...newQuotation.items, { name: "", quantity: "", unit: "", unitPrice: "" }],
      })
    }
  }

  const removeItem = (type: string, index: number) => {
    if (type === "request") {
      const newItems = newRequest.items.filter((_, i) => i !== index)
      setNewRequest({ ...newRequest, items: newItems })
    } else if (type === "quotation") {
      const newItems = newQuotation.items.filter((_, i) => i !== index)
      setNewQuotation({ ...newQuotation, items: newItems })
    }
  }

  const handleSubmitRequest = () => {
    console.log("Nueva solicitud:", newRequest)
    setIsNewRequestOpen(false)
    setNewRequest({
      description: "",
      department: "",
      priority: "",
      justification: "",
      items: [{ name: "", quantity: "", unit: "", unitPrice: "" }],
    })
  }

  const handleSubmitQuotation = () => {
    console.log("Nueva cotización:", newQuotation)
    setIsNewQuotationOpen(false)
    setNewQuotation({
      supplier: "",
      product: "",
      amount: "",
      validUntil: "",
      discount: "",
      terms: "",
      items: [{ name: "", quantity: "", unit: "", unitPrice: "" }],
    })
  }

  const handleSubmitSupplier = () => {
    console.log("Nuevo proveedor:", newSupplier)
    setIsNewSupplierOpen(false)
    setNewSupplier({
      name: "",
      category: "",
      contact: "",
      phone: "",
      address: "",
      taxId: "",
      paymentTerms: "",
    })
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Módulo de Compras</h1>
              <p className="text-neuralops-beige text-lg">Gestiona solicitudes, cotizaciones y proveedores</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <ShoppingCart className="h-8 w-8 text-white" />
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

          {/* OCR Cotizaciones */}
          <Dialog open={isOcrQuotationsOpen} onOpenChange={setIsOcrQuotationsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                <FileText className="h-4 w-4 mr-2" />
                OCR Cotizaciones
              </Button>
            </DialogTrigger>
          </Dialog>

          {/* Comparador de Precios */}
          <Dialog open={isPriceComparisonOpen} onOpenChange={setIsPriceComparisonOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                Comparador IA
              </Button>
            </DialogTrigger>
          </Dialog>

          {/* Generador Automático */}
          <Dialog open={isAutoGeneratorOpen} onOpenChange={setIsAutoGeneratorOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                <Zap className="h-4 w-4 mr-2" />
                Generador IA
              </Button>
            </DialogTrigger>
          </Dialog>

          {/* Asistente IA */}
          <Dialog open={isChatAssistantOpen} onOpenChange={setIsChatAssistantOpen}>
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

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger
              value="requests"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              Solicitudes
            </TabsTrigger>
            <TabsTrigger
              value="quotations"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              Cotizaciones
            </TabsTrigger>
            <TabsTrigger
              value="suppliers"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              Proveedores
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex items-center gap-2 data-[state=active]:bg-neuralops-gold data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4" />
              Historial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Solicitudes de Compra
                    </CardTitle>
                    <CardDescription>Gestiona las solicitudes de compra del sistema</CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar solicitudes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 border-neuralops-very-light-blue focus:border-neuralops-gold focus:ring-neuralops-gold"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40 border-neuralops-very-light-blue">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="approved">Aprobada</SelectItem>
                        <SelectItem value="rejected">Rechazada</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Dialog open={isGenerateOCOpen} onOpenChange={setIsGenerateOCOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-neuralops-medium-blue text-neuralops-medium-blue hover:bg-neuralops-medium-blue hover:text-white">
                          <FileText className="h-4 w-4 mr-2" />
                          Generar OC
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isGenerateRemisionOpen} onOpenChange={setIsGenerateRemisionOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-neuralops-dark-blue text-neuralops-dark-blue hover:bg-neuralops-dark-blue hover:text-white">
                          <Truck className="h-4 w-4 mr-2" />
                          Generar Remisión
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                          <Plus className="h-4 w-4 mr-2" />
                          Nueva Solicitud
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Nueva Solicitud de Compra</DialogTitle>
                          <DialogDescription>
                            Completa la información para crear una nueva solicitud de compra
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="description">Descripción</Label>
                              <Input
                                id="description"
                                value={newRequest.description}
                                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                                placeholder="Descripción de la solicitud"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="department">Departamento</Label>
                              <Select
                                value={newRequest.department}
                                onValueChange={(value) => setNewRequest({ ...newRequest, department: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar departamento" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="produccion">Producción</SelectItem>
                                  <SelectItem value="sst">SST</SelectItem>
                                  <SelectItem value="administracion">Administración</SelectItem>
                                  <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="priority">Prioridad</Label>
                            <Select
                              value={newRequest.priority}
                              onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}
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
                            <Label htmlFor="justification">Justificación</Label>
                            <Textarea
                              id="justification"
                              value={newRequest.justification}
                              onChange={(e) => setNewRequest({ ...newRequest, justification: e.target.value })}
                              placeholder="Justificación de la solicitud"
                              rows={3}
                            />
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label>Artículos</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItem("request")}
                                className="border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar Artículo
                              </Button>
                            </div>
                            {newRequest.items.map((item, index) => (
                              <div key={index} className="grid grid-cols-5 gap-2 items-end">
                                <div className="space-y-2">
                                  <Label>Nombre</Label>
                                  <Input
                                    value={item.name}
                                    onChange={(e) => {
                                      const newItems = [...newRequest.items]
                                      newItems[index].name = e.target.value
                                      setNewRequest({ ...newRequest, items: newItems })
                                    }}
                                    placeholder="Nombre del artículo"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Cantidad</Label>
                                  <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const newItems = [...newRequest.items]
                                      newItems[index].quantity = e.target.value
                                      setNewRequest({ ...newRequest, items: newItems })
                                    }}
                                    placeholder="0"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Unidad</Label>
                                  <Input
                                    value={item.unit}
                                    onChange={(e) => {
                                      const newItems = [...newRequest.items]
                                      newItems[index].unit = e.target.value
                                      setNewRequest({ ...newRequest, items: newItems })
                                    }}
                                    placeholder="kg, unidad, etc."
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Precio Unit.</Label>
                                  <Input
                                    type="number"
                                    value={item.unitPrice}
                                    onChange={(e) => {
                                      const newItems = [...newRequest.items]
                                      newItems[index].unitPrice = e.target.value
                                      setNewRequest({ ...newRequest, items: newItems })
                                    }}
                                    placeholder="0.00"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeItem("request", index)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  disabled={newRequest.items.length === 1}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleSubmitRequest}
                            className="bg-neuralops-gold hover:bg-neuralops-gold/90"
                          >
                            Crear Solicitud
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Solicitante</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-neuralops-beige/5">
                        <TableCell className="font-medium text-neuralops-dark-blue">{request.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-neuralops-dark-blue">{request.description}</div>
                            <div className="text-sm text-neuralops-medium-blue">{request.department}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={request.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-neuralops-gold text-white text-xs">
                                {request.requestedBy
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-neuralops-dark-blue">{request.requestedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                        </TableCell>
                        <TableCell className="font-medium text-neuralops-dark-blue">{request.amount}</TableCell>
                        <TableCell className="text-neuralops-medium-blue">{request.date}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="hover:bg-neuralops-beige/20">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedRequest(request)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedRequest(request)
                                  setIsEditMode(true)
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Generar Cotización
                              </DropdownMenuItem>
                              {request.status === "Aprobada" && (
                                <DropdownMenuItem onClick={() => {
                                  setOrdenCompra({...ordenCompra, solicitudId: request.id})
                                  setIsGenerateOCOpen(true)
                                }}>
                                  <Receipt className="h-4 w-4 mr-2" />
                                  Generar OC
                                </DropdownMenuItem>
                              )}
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

          <TabsContent value="quotations" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Cotizaciones
                    </CardTitle>
                    <CardDescription>Gestiona las cotizaciones de proveedores</CardDescription>
                  </div>
                  <Dialog open={isNewQuotationOpen} onOpenChange={setIsNewQuotationOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Cotización
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Nueva Cotización</DialogTitle>
                        <DialogDescription>Registra una nueva cotización de proveedor</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="supplier">Proveedor</Label>
                            <Input
                              id="supplier"
                              value={newQuotation.supplier}
                              onChange={(e) => setNewQuotation({ ...newQuotation, supplier: e.target.value })}
                              placeholder="Nombre del proveedor"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="product">Producto/Servicio</Label>
                            <Input
                              id="product"
                              value={newQuotation.product}
                              onChange={(e) => setNewQuotation({ ...newQuotation, product: e.target.value })}
                              placeholder="Descripción del producto"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="amount">Monto Total</Label>
                            <Input
                              id="amount"
                              value={newQuotation.amount}
                              onChange={(e) => setNewQuotation({ ...newQuotation, amount: e.target.value })}
                              placeholder="$0.00"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="validUntil">Válida Hasta</Label>
                            <Input
                              id="validUntil"
                              type="date"
                              value={newQuotation.validUntil}
                              onChange={(e) => setNewQuotation({ ...newQuotation, validUntil: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="discount">Descuento (%)</Label>
                            <Input
                              id="discount"
                              value={newQuotation.discount}
                              onChange={(e) => setNewQuotation({ ...newQuotation, discount: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="terms">Términos y Condiciones</Label>
                          <Textarea
                            id="terms"
                            value={newQuotation.terms}
                            onChange={(e) => setNewQuotation({ ...newQuotation, terms: e.target.value })}
                            placeholder="Términos de pago, entrega, etc."
                            rows={3}
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Artículos Cotizados</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addItem("quotation")}
                              className="border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Agregar Artículo
                            </Button>
                          </div>
                          {newQuotation.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-5 gap-2 items-end">
                              <div className="space-y-2">
                                <Label>Nombre</Label>
                                <Input
                                  value={item.name}
                                  onChange={(e) => {
                                    const newItems = [...newQuotation.items]
                                    newItems[index].name = e.target.value
                                    setNewQuotation({ ...newQuotation, items: newItems })
                                  }}
                                  placeholder="Nombre del artículo"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Cantidad</Label>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const newItems = [...newQuotation.items]
                                    newItems[index].quantity = e.target.value
                                    setNewQuotation({ ...newQuotation, items: newItems })
                                  }}
                                  placeholder="0"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Unidad</Label>
                                <Input
                                  value={item.unit}
                                  onChange={(e) => {
                                    const newItems = [...newQuotation.items]
                                    newItems[index].unit = e.target.value
                                    setNewQuotation({ ...newQuotation, items: newItems })
                                  }}
                                  placeholder="kg, unidad, etc."
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Precio Unit.</Label>
                                <Input
                                  type="number"
                                  value={item.unitPrice}
                                  onChange={(e) => {
                                    const newItems = [...newQuotation.items]
                                    newItems[index].unitPrice = e.target.value
                                    setNewQuotation({ ...newQuotation, items: newItems })
                                  }}
                                  placeholder="0.00"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem("quotation", index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                disabled={newQuotation.items.length === 1}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewQuotationOpen(false)}>
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleSubmitQuotation}
                          className="bg-neuralops-gold hover:bg-neuralops-gold/90"
                        >
                          Crear Cotización
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {quotations.map((quotation) => (
                    <Card
                      key={quotation.id}
                      className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-neuralops-dark-blue text-lg">{quotation.id}</h3>
                              <Badge className={getStatusColor(quotation.status)}>{quotation.status}</Badge>
                            </div>
                            <p className="text-neuralops-medium-blue mb-1">{quotation.supplier}</p>
                            <p className="text-sm text-neuralops-medium-blue">{quotation.product}</p>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-2xl font-bold text-neuralops-dark-blue">{quotation.amount}</span>
                              {quotation.discount !== "0%" && (
                                <Badge variant="outline" className="text-green-600 border-green-200">
                                  -{quotation.discount} descuento
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-neuralops-medium-blue mt-2">
                              Válida hasta: {quotation.validUntil}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="hover:bg-neuralops-beige/20">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedQuotation(quotation)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedQuotation(quotation)
                                  setIsEditMode(true)
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setOrdenCompra({...ordenCompra, proveedor: quotation.supplier})
                                setIsGenerateOCOpen(true)
                              }}>
                                <Receipt className="h-4 w-4 mr-2" />
                                Generar OC
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setRemision({...remision, ordenCompraId: quotation.id})
                                setIsGenerateRemisionOpen(true)
                              }}>
                                <Truck className="h-4 w-4 mr-2" />
                                Generar Remisión
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

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Proveedores
                    </CardTitle>
                    <CardDescription>Gestiona la base de datos de proveedores</CardDescription>
                  </div>
                  <Dialog open={isNewSupplierOpen} onOpenChange={setIsNewSupplierOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 shadow-md">
                        <Plus className="h-4 w-4 mr-2" />
                        Invitar Proveedor
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Nuevo Proveedor</DialogTitle>
                        <DialogDescription>Registra un nuevo proveedor en el sistema</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nombre de la Empresa</Label>
                            <Input
                              id="name"
                              value={newSupplier.name}
                              onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                              placeholder="Nombre del proveedor"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Categoría</Label>
                            <Select
                              value={newSupplier.category}
                              onValueChange={(value) => setNewSupplier({ ...newSupplier, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="materias-primas">Materias Primas</SelectItem>
                                <SelectItem value="equipos-seguridad">Equipos de Seguridad</SelectItem>
                                <SelectItem value="suministros-oficina">Suministros de Oficina</SelectItem>
                                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                                <SelectItem value="servicios">Servicios</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="contact">Email de Contacto</Label>
                            <Input
                              id="contact"
                              type="email"
                              value={newSupplier.contact}
                              onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                              placeholder="contacto@proveedor.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                              id="phone"
                              value={newSupplier.phone}
                              onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                              placeholder="+57 300 123 4567"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Dirección</Label>
                          <Input
                            id="address"
                            value={newSupplier.address}
                            onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                            placeholder="Dirección completa"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="taxId">NIT/RUT</Label>
                            <Input
                              id="taxId"
                              value={newSupplier.taxId}
                              onChange={(e) => setNewSupplier({ ...newSupplier, taxId: e.target.value })}
                              placeholder="123456789-0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="paymentTerms">Términos de Pago</Label>
                            <Select
                              value={newSupplier.paymentTerms}
                              onValueChange={(value) => setNewSupplier({ ...newSupplier, paymentTerms: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar términos" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="contado">Contado</SelectItem>
                                <SelectItem value="15-dias">15 días</SelectItem>
                                <SelectItem value="30-dias">30 días</SelectItem>
                                <SelectItem value="45-dias">45 días</SelectItem>
                                <SelectItem value="60-dias">60 días</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewSupplierOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSubmitSupplier} className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                          Registrar Proveedor
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {suppliers.map((supplier) => (
                    <Card
                      key={supplier.id}
                      className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-neuralops-gold/20">
                              <Users className="h-6 w-6 text-neuralops-gold" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-neuralops-dark-blue text-lg">{supplier.name}</h3>
                              <p className="text-neuralops-medium-blue">{supplier.category}</p>
                              <p className="text-sm text-neuralops-medium-blue">{supplier.contact}</p>
                              <div className="flex items-center gap-4 mt-3">
                                <Badge variant="outline" className="border-green-200 text-green-600">
                                  {supplier.status}
                                </Badge>
                                <span className="text-sm text-neuralops-medium-blue">⭐ {supplier.rating}</span>
                                <span className="text-sm text-neuralops-medium-blue">{supplier.orders} órdenes</span>
                                <span className="text-sm font-medium text-neuralops-dark-blue">
                                  {supplier.totalAmount}
                                </span>
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
                              <DropdownMenuItem onClick={() => setSelectedSupplier(supplier)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Perfil
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedSupplier(supplier)
                                  setIsEditMode(true)
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Solicitar Cotización
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

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-neuralops-gold/10 to-neuralops-beige/10">
                <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Historial de Compras
                </CardTitle>
                <CardDescription>Registro histórico de todas las transacciones</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-neuralops-medium-blue">
                  <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Historial de compras aparecerá aquí</p>
                  <p className="text-sm mt-2">
                    Los registros históricos se mostrarán una vez que se completen transacciones
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal para Ver Detalles de Solicitud */}
      <Dialog open={!!selectedRequest && !isEditMode} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de Solicitud - {selectedRequest?.id}</DialogTitle>
            <DialogDescription>Información completa de la solicitud de compra</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Descripción</Label>
                  <p className="text-neuralops-dark-blue">{selectedRequest.description}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Departamento</Label>
                  <p className="text-neuralops-dark-blue">{selectedRequest.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Solicitado por</Label>
                  <p className="text-neuralops-dark-blue">{selectedRequest.requestedBy}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Fecha</Label>
                  <p className="text-neuralops-dark-blue">{selectedRequest.date}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Estado</Label>
                  <Badge className={getStatusColor(selectedRequest.status)}>{selectedRequest.status}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Prioridad</Label>
                  <Badge className={getPriorityColor(selectedRequest.priority)}>{selectedRequest.priority}</Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-neuralops-medium-blue">Justificación</Label>
                <p className="text-neuralops-dark-blue mt-1">{selectedRequest.justification}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-neuralops-medium-blue">Artículos Solicitados</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Artículo</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Precio Unit.</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedRequest.items?.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>${item.unitPrice}</TableCell>
                          <TableCell>${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="text-right">
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Monto Total</Label>
                  <p className="text-2xl font-bold text-neuralops-dark-blue">{selectedRequest.amount}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>
              Cerrar
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">Aprobar Solicitud</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Ver Detalles de Cotización */}
      <Dialog open={!!selectedQuotation && !isEditMode} onOpenChange={() => setSelectedQuotation(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de Cotización - {selectedQuotation?.id}</DialogTitle>
            <DialogDescription>Información completa de la cotización</DialogDescription>
          </DialogHeader>
          {selectedQuotation && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Proveedor</Label>
                  <p className="text-neuralops-dark-blue">{selectedQuotation.supplier}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Producto/Servicio</Label>
                  <p className="text-neuralops-dark-blue">{selectedQuotation.product}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Monto Total</Label>
                  <p className="text-2xl font-bold text-neuralops-dark-blue">{selectedQuotation.amount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Válida Hasta</Label>
                  <p className="text-neuralops-dark-blue">{selectedQuotation.validUntil}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Estado</Label>
                  <Badge className={getStatusColor(selectedQuotation.status)}>{selectedQuotation.status}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Descuento</Label>
                  <p className="text-neuralops-dark-blue">{selectedQuotation.discount}%</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-neuralops-medium-blue">Términos y Condiciones</Label>
                <p className="text-neuralops-dark-blue mt-1">{selectedQuotation.terms}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-neuralops-medium-blue">Artículos Cotizados</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Artículo</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Precio Unit.</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedQuotation.items?.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>${item.unitPrice}</TableCell>
                          <TableCell>${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-neuralops-beige/10 rounded-lg">
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Contacto</Label>
                  <p className="text-neuralops-dark-blue">{selectedQuotation.contact}</p>
                  <p className="text-neuralops-medium-blue text-sm">{selectedQuotation.phone}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedQuotation(null)}>
              Cerrar
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">Aceptar Cotización</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Ver Detalles de Proveedor */}
      <Dialog open={!!selectedSupplier && !isEditMode} onOpenChange={() => setSelectedSupplier(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Perfil del Proveedor</DialogTitle>
            <DialogDescription>Información completa del proveedor</DialogDescription>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-full bg-neuralops-gold/20">
                  <Users className="h-8 w-8 text-neuralops-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neuralops-dark-blue">{selectedSupplier.name}</h3>
                  <p className="text-neuralops-medium-blue">{selectedSupplier.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="border-green-200 text-green-600">
                      {selectedSupplier.status}
                    </Badge>
                    <span className="text-sm text-neuralops-medium-blue">⭐ {selectedSupplier.rating}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Email</Label>
                  <p className="text-neuralops-dark-blue">{selectedSupplier.contact}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Teléfono</Label>
                  <p className="text-neuralops-dark-blue">{selectedSupplier.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Dirección</Label>
                  <p className="text-neuralops-dark-blue">{selectedSupplier.address}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">NIT/RUT</Label>
                  <p className="text-neuralops-dark-blue">{selectedSupplier.taxId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Términos de Pago</Label>
                  <p className="text-neuralops-dark-blue">{selectedSupplier.paymentTerms}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neuralops-medium-blue">Total Órdenes</Label>
                  <p className="text-neuralops-dark-blue">{selectedSupplier.orders}</p>
                </div>
              </div>
              <div className="p-4 bg-neuralops-beige/10 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <Label className="text-sm font-medium text-neuralops-medium-blue">Monto Total Facturado</Label>
                    <p className="text-2xl font-bold text-neuralops-dark-blue">{selectedSupplier.totalAmount}</p>
                  </div>
                  <div className="text-right">
                    <Label className="text-sm font-medium text-neuralops-medium-blue">Calificación</Label>
                    <p className="text-xl font-semibold text-neuralops-gold">⭐ {selectedSupplier.rating}/5.0</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
              Cerrar
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">Solicitar Cotización</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para Generar Orden de Compra */}
      <Dialog open={isGenerateOCOpen} onOpenChange={setIsGenerateOCOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-neuralops-dark-blue flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generar Orden de Compra
            </DialogTitle>
            <DialogDescription>
              Complete la información para generar una orden de compra oficial
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="oc-proveedor">Proveedor</Label>
                <Select value={ordenCompra.proveedor} onValueChange={(value) => setOrdenCompra({...ordenCompra, proveedor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proveedor-abc">Proveedor ABC S.A.</SelectItem>
                    <SelectItem value="distribuidora-xyz">Distribuidora XYZ</SelectItem>
                    <SelectItem value="suministros-norte">Suministros Norte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="oc-solicitud">Solicitud de Origen</Label>
                <Select value={ordenCompra.solicitudId} onValueChange={(value) => setOrdenCompra({...ordenCompra, solicitudId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar solicitud" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OC-2024-001">OC-2024-001 - Materias primas</SelectItem>
                    <SelectItem value="OC-2024-002">OC-2024-002 - Equipos de seguridad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="oc-fecha-entrega">Fecha de Entrega Esperada</Label>
                <Input
                  id="oc-fecha-entrega"
                  type="date"
                  value={ordenCompra.fechaEntrega}
                  onChange={(e) => setOrdenCompra({...ordenCompra, fechaEntrega: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oc-condiciones">Condiciones de Pago</Label>
                <Select value={ordenCompra.condicionesPago} onValueChange={(value) => setOrdenCompra({...ordenCompra, condicionesPago: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar condición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30-dias">30 días</SelectItem>
                    <SelectItem value="60-dias">60 días</SelectItem>
                    <SelectItem value="90-dias">90 días</SelectItem>
                    <SelectItem value="contado">Contado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="oc-observaciones">Observaciones y Términos Especiales</Label>
              <Textarea
                id="oc-observaciones"
                placeholder="Ingrese observaciones, términos especiales, condiciones de entrega, etc."
                value={ordenCompra.observaciones}
                onChange={(e) => setOrdenCompra({...ordenCompra, observaciones: e.target.value})}
                rows={3}
              />
            </div>

            <div className="border border-neuralops-very-light-blue rounded-lg p-4">
              <h4 className="text-lg font-semibold text-neuralops-dark-blue mb-4">Resumen de la Orden</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-neuralops-medium-blue">Número de OC:</p>
                  <p className="font-semibold text-neuralops-dark-blue">OC-2024-{String(Date.now()).slice(-3)}</p>
                </div>
                <div>
                  <p className="text-neuralops-medium-blue">Fecha de Emisión:</p>
                  <p className="font-semibold text-neuralops-dark-blue">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-neuralops-medium-blue">Estado:</p>
                  <Badge className="bg-yellow-100 text-yellow-800">Pendiente de Envío</Badge>
                </div>
                <div>
                  <p className="text-neuralops-medium-blue">Total Estimado:</p>
                  <p className="font-bold text-neuralops-gold text-lg">$15,000</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateOCOpen(false)}>
              Cancelar
            </Button>
            <Button variant="outline" className="border-neuralops-medium-blue text-neuralops-medium-blue">
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
              <Download className="h-4 w-4 mr-2" />
              Generar OC
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para Generar Remisión de Entrega */}
      <Dialog open={isGenerateRemisionOpen} onOpenChange={setIsGenerateRemisionOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-neuralops-dark-blue flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Generar Remisión de Entrega
            </DialogTitle>
            <DialogDescription>
              Complete la información para generar la remisión de entrega de mercancía
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rem-orden-compra">Orden de Compra</Label>
                <Select value={remision.ordenCompraId} onValueChange={(value) => setRemision({...remision, ordenCompraId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar OC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OC-2024-001">OC-2024-001 - Proveedor ABC S.A.</SelectItem>
                    <SelectItem value="OC-2024-002">OC-2024-002 - Distribuidora XYZ</SelectItem>
                    <SelectItem value="OC-2024-003">OC-2024-003 - Suministros Norte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rem-transportadora">Empresa Transportadora</Label>
                <Select value={remision.transportadora} onValueChange={(value) => setRemision({...remision, transportadora: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar transportadora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="servientrega">Servientrega</SelectItem>
                    <SelectItem value="tcc">TCC</SelectItem>
                    <SelectItem value="coordinadora">Coordinadora</SelectItem>
                    <SelectItem value="propio">Transporte Propio</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rem-guia">Número de Guía</Label>
                <Input
                  id="rem-guia"
                  placeholder="Ej: 123456789"
                  value={remision.numeroGuia}
                  onChange={(e) => setRemision({...remision, numeroGuia: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rem-fecha-despacho">Fecha de Despacho</Label>
                <Input
                  id="rem-fecha-despacho"
                  type="date"
                  value={remision.fechaDespacho}
                  onChange={(e) => setRemision({...remision, fechaDespacho: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rem-responsable">Responsable de Recepción</Label>
                <Input
                  id="rem-responsable"
                  placeholder="Nombre del responsable"
                  value={remision.responsableRecepcion}
                  onChange={(e) => setRemision({...remision, responsableRecepcion: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rem-estado">Estado de Entrega</Label>
                <Select defaultValue="en-transito">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-transito">En Tránsito</SelectItem>
                    <SelectItem value="entregado">Entregado</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="retenido">Retenido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rem-observaciones">Observaciones de Entrega</Label>
              <Textarea
                id="rem-observaciones"
                placeholder="Condiciones especiales de entrega, notas para el destinatario, etc."
                value={remision.observaciones}
                onChange={(e) => setRemision({...remision, observaciones: e.target.value})}
                rows={3}
              />
            </div>

            <div className="border border-neuralops-very-light-blue rounded-lg p-4">
              <h4 className="text-lg font-semibold text-neuralops-dark-blue mb-4">Detalles de la Remisión</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-neuralops-medium-blue">Número de Remisión:</p>
                  <p className="font-semibold text-neuralops-dark-blue">REM-2024-{String(Date.now()).slice(-3)}</p>
                </div>
                <div>
                  <p className="text-neuralops-medium-blue">Fecha de Emisión:</p>
                  <p className="font-semibold text-neuralops-dark-blue">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-neuralops-medium-blue">Estado:</p>
                  <Badge className="bg-blue-100 text-blue-800">Lista para Entrega</Badge>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-neuralops-beige/10 rounded-lg">
                <h5 className="font-medium text-neuralops-dark-blue mb-2">Items a Entregar:</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neuralops-medium-blue">Acero inoxidable</span>
                    <span className="text-neuralops-dark-blue">100 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neuralops-medium-blue">Aluminio</span>
                    <span className="text-neuralops-dark-blue">50 kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateRemisionOpen(false)}>
              Cancelar
            </Button>
            <Button variant="outline" className="border-neuralops-medium-blue text-neuralops-medium-blue">
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
              <Receipt className="h-4 w-4 mr-2" />
              Generar Remisión
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo OCR para Cotizaciones - Estilo Inventario */}
      <Dialog open={isOcrQuotationsOpen} onOpenChange={setIsOcrQuotationsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              IA - OCR de Cotizaciones
            </DialogTitle>
            <DialogDescription>
              Sube archivos de cotizaciones y la IA extraerá automáticamente los datos
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Arrastra cotizaciones aquí o haz clic para seleccionar
              </p>
              <Button variant="outline" className="border-purple-300 text-purple-600">
                <Upload className="h-4 w-4 mr-2" />
                Seleccionar Archivos
              </Button>
            </div>
            
            {isProcessing && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                  <span className="text-purple-800">Procesando con IA... Extrayendo datos de cotizaciones</span>
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
                  <span className="text-sm"><strong>Proveedor:</strong> ABC Materiales S.A.</span>
                  <Badge className="bg-green-100 text-green-700">98% confianza</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Producto:</strong> Acero Inoxidable</span>
                  <Badge className="bg-blue-100 text-blue-700">95% confianza</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Precio:</strong> $48.00/kg</span>
                  <Badge className="bg-purple-100 text-purple-700">93% confianza</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm"><strong>Válida hasta:</strong> 2024-02-15</span>
                  <Badge className="bg-orange-100 text-orange-700">90% confianza</Badge>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOcrQuotationsOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="mr-2 h-4 w-4" />
              Crear Cotización con IA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Comparador de Precios IA */}
      <Dialog open={isPriceComparisonOpen} onOpenChange={setIsPriceComparisonOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-neuralops-gold" />
              Comparador Inteligente de Precios
            </DialogTitle>
            <DialogDescription>
              Análisis automático de cotizaciones y comparación de proveedores con IA
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Análisis de Precios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-green-800">Mejor Precio</span>
                        <Badge className="bg-green-100 text-green-800">Recomendado</Badge>
                      </div>
                      <p className="text-lg font-bold text-green-700">Proveedor TechMetal S.A.</p>
                      <p className="text-green-600">$7,950.00 - Entrega: 12 días</p>
                      <p className="text-xs text-green-500">Ahorro: $550 vs promedio</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-blue-800">Mejor Tiempo</span>
                        <Badge className="bg-blue-100 text-blue-800">Rápido</Badge>
                      </div>
                      <p className="text-lg font-bold text-blue-700">Proveedor MetalRápido Ltda.</p>
                      <p className="text-blue-600">$8,200.00 - Entrega: 7 días</p>
                      <p className="text-xs text-blue-500">5 días más rápido que promedio</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-purple-800">Mejor Calidad</span>
                        <Badge className="bg-purple-100 text-purple-800">Premium</Badge>
                      </div>
                      <p className="text-lg font-bold text-purple-700">Proveedor SteelPremium Corp.</p>
                      <p className="text-purple-600">$8,500.00 - Entrega: 15 días</p>
                      <p className="text-xs text-purple-500">Calificación: 9.8/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Matriz de Decisión IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Proveedor</th>
                            <th className="text-center py-2">Precio</th>
                            <th className="text-center py-2">Tiempo</th>
                            <th className="text-center py-2">Calidad</th>
                            <th className="text-center py-2">Score IA</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          <tr className="border-b bg-green-50">
                            <td className="py-2 font-medium">TechMetal S.A.</td>
                            <td className="text-center py-2">95</td>
                            <td className="text-center py-2">85</td>
                            <td className="text-center py-2">90</td>
                            <td className="text-center py-2 font-bold text-green-600">92</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">MetalRápido Ltda.</td>
                            <td className="text-center py-2">80</td>
                            <td className="text-center py-2">98</td>
                            <td className="text-center py-2">85</td>
                            <td className="text-center py-2 font-bold text-blue-600">87</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">SteelPremium Corp.</td>
                            <td className="text-center py-2">75</td>
                            <td className="text-center py-2">70</td>
                            <td className="text-center py-2">98</td>
                            <td className="text-center py-2 font-bold text-purple-600">81</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="p-3 bg-neuralops-beige/10 rounded-lg">
                      <h5 className="font-medium text-neuralops-dark-blue mb-2">Factores Analizados por IA:</h5>
                      <ul className="text-sm text-neuralops-medium-blue space-y-1">
                        <li>• Historial de entregas del proveedor</li>
                        <li>• Calidad de productos anteriores</li>
                        <li>• Tendencias de precios del mercado</li>
                        <li>• Capacidad de producción</li>
                        <li>• Riesgo financiero del proveedor</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-neuralops-gold" />
                  Recomendación de IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gradient-to-r from-neuralops-beige/20 to-neuralops-gold/20 rounded-lg">
                  <h4 className="font-bold text-neuralops-dark-blue mb-2">Proveedor Recomendado: TechMetal S.A.</h4>
                  <p className="text-neuralops-medium-blue mb-3">
                    Basado en el análisis de múltiples factores, este proveedor ofrece la mejor combinación de precio, 
                    calidad y confiabilidad. Tiene un historial sólido y precios competitivos.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-white/50 rounded">
                      <p className="font-bold text-green-600">$550</p>
                      <p className="text-gray-600">Ahorro estimado</p>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded">
                      <p className="font-bold text-blue-600">98%</p>
                      <p className="text-gray-600">Confiabilidad</p>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded">
                      <p className="font-bold text-purple-600">12 días</p>
                      <p className="text-gray-600">Tiempo entrega</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPriceComparisonOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Generador Automático de Solicitudes */}
      <Dialog open={isAutoGeneratorOpen} onOpenChange={setIsAutoGeneratorOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-neuralops-gold" />
              Generador Automático de Solicitudes
            </DialogTitle>
            <DialogDescription>
              IA que crea solicitudes de compra basándose en stock bajo y patrones de consumo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Alertas de Stock Bajo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border-l-4 border-red-500">
                      <p className="font-medium text-red-800">Acero Inoxidable 316L</p>
                      <p className="text-sm text-red-600">Stock actual: 150 kg | Mínimo: 500 kg</p>
                      <p className="text-xs text-red-500">Consumo promedio: 50 kg/día</p>
                    </div>
                    <div className="p-3 bg-white rounded border-l-4 border-orange-500">
                      <p className="font-medium text-orange-800">Tornillos M8x20</p>
                      <p className="text-sm text-orange-600">Stock actual: 200 und | Mínimo: 1000 und</p>
                      <p className="text-xs text-orange-500">Consumo promedio: 80 und/día</p>
                    </div>
                    <div className="p-3 bg-white rounded border-l-4 border-yellow-500">
                      <p className="font-medium text-yellow-800">Pintura Anticorrosiva</p>
                      <p className="text-sm text-yellow-600">Stock actual: 25 L | Mínimo: 50 L</p>
                      <p className="text-xs text-yellow-500">Consumo promedio: 5 L/día</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-700 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Solicitudes Generadas por IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-green-800">SOL-AUTO-001</p>
                        <Badge className="bg-green-100 text-green-800">Generada</Badge>
                      </div>
                      <p className="text-sm text-green-600">Acero Inoxidable 316L - 1000 kg</p>
                      <p className="text-xs text-green-500">Urgencia: Alta | Entrega: 7 días</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-green-800">SOL-AUTO-002</p>
                        <Badge className="bg-green-100 text-green-800">Generada</Badge>
                      </div>
                      <p className="text-sm text-green-600">Tornillos M8x20 - 5000 und</p>
                      <p className="text-xs text-green-500">Urgencia: Media | Entrega: 10 días</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-green-800">SOL-AUTO-003</p>
                        <Badge className="bg-green-100 text-green-800">Generada</Badge>
                      </div>
                      <p className="text-sm text-green-600">Pintura Anticorrosiva - 100 L</p>
                      <p className="text-xs text-green-500">Urgencia: Media | Entrega: 5 días</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-neuralops-gold" />
                  Análisis Predictivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-700">$12,450</p>
                    <p className="text-blue-600 text-sm">Costo Total Proyectado</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-700">3</p>
                    <p className="text-green-600 text-sm">Solicitudes Automáticas</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-700">15%</p>
                    <p className="text-purple-600 text-sm">Reducción de Stockouts</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-neuralops-beige/10 rounded-lg">
                  <h5 className="font-medium text-neuralops-dark-blue mb-2">Algoritmo de IA considera:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neuralops-medium-blue">
                    <ul className="space-y-1">
                      <li>• Patrones históricos de consumo</li>
                      <li>• Estacionalidad de la demanda</li>
                      <li>• Tiempos de entrega de proveedores</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Órdenes de producción programadas</li>
                      <li>• Stock de seguridad dinámico</li>
                      <li>• Optimización de costos de pedido</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAutoGeneratorOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
              Aprobar Solicitudes Automáticas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Evaluación de Proveedores IA */}
      <Dialog open={isSupplierEvaluationOpen} onOpenChange={setIsSupplierEvaluationOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-neuralops-gold" />
              Evaluación Inteligente de Proveedores
            </DialogTitle>
            <DialogDescription>
              Sistema de IA que califica proveedores basándose en rendimiento histórico y múltiples factores
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Ranking de Proveedores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                          <span className="font-medium text-green-800">TechMetal S.A.</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-700">9.2/10</p>
                          <Badge className="bg-green-100 text-green-800">Excelente</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="text-green-600">Calidad: 9.5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-600">Tiempo: 9.0</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-600">Precio: 9.1</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                          <span className="font-medium text-blue-800">MetalRápido Ltda.</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-700">8.7/10</p>
                          <Badge className="bg-blue-100 text-blue-800">Muy Bueno</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="text-blue-600">Calidad: 8.5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-blue-600">Tiempo: 9.5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-blue-600">Precio: 8.1</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                          <span className="font-medium text-yellow-800">SteelBasic Corp.</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-yellow-700">7.3/10</p>
                          <Badge className="bg-yellow-100 text-yellow-800">Regular</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="text-yellow-600">Calidad: 7.0</p>
                        </div>
                        <div className="text-center">
                          <p className="text-yellow-600">Tiempo: 7.2</p>
                        </div>
                        <div className="text-center">
                          <p className="text-yellow-600">Precio: 7.8</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-neuralops-dark-blue">Análisis Detallado - TechMetal S.A.</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Órdenes Completadas</p>
                        <p className="text-xl font-bold text-gray-800">247</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Tasa de Cumplimiento</p>
                        <p className="text-xl font-bold text-gray-800">98.4%</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Tiempo Promedio</p>
                        <p className="text-xl font-bold text-gray-800">11.2 días</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Productos Defectuosos</p>
                        <p className="text-xl font-bold text-gray-800">0.8%</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Puntualidad en Entregas</span>
                          <span>95%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Calidad de Productos</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Competitividad de Precios</span>
                          <span>88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '88%'}}></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-neuralops-beige/10 rounded-lg">
                      <h5 className="font-medium text-neuralops-dark-blue mb-2">Predicciones IA:</h5>
                      <ul className="text-sm text-neuralops-medium-blue space-y-1">
                        <li>• Capacidad para pedidos grandes: Alta</li>
                        <li>• Riesgo de retrasos: Bajo (12%)</li>
                        <li>• Tendencia de precios: Estable</li>
                        <li>• Recomendación: Proveedor estratégico</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-neuralops-gold" />
                  Insights de IA sobre Proveedores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-2">Oportunidades</h5>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Negociar descuentos por volumen con TechMetal</li>
                      <li>• Consolidar pedidos para reducir costos</li>
                      <li>• Aprovechar velocidad de MetalRápido para urgencias</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h5 className="font-medium text-orange-800 mb-2">Riesgos</h5>
                    <ul className="text-sm text-orange-600 space-y-1">
                      <li>• SteelBasic muestra tendencia a retrasos</li>
                      <li>• Dependencia alta en TechMetal (65% pedidos)</li>
                      <li>• Precios de MetalRápido subiendo 3% mensual</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">Recomendaciones</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Diversificar con 2 proveedores adicionales</li>
                      <li>• Crear acuerdos marco con top 3</li>
                      <li>• Implementar evaluación mensual automática</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSupplierEvaluationOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
              Generar Reporte de Evaluación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Chatbot Asistente de Compras */}
      <Dialog open={isChatbotOpen} onOpenChange={setIsChatbotOpen}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-neuralops-gold" />
              Asistente Inteligente de Compras
            </DialogTitle>
            <DialogDescription>
              Consulta información sobre proveedores, cotizaciones, presupuestos y más
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex-1 border rounded-lg p-4 overflow-y-auto bg-gray-50 min-h-[300px]">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-neuralops-medium-blue" />
                  <p className="mb-4">¡Hola! Soy tu asistente de compras.</p>
                  <div className="space-y-2 text-left max-w-md mx-auto">
                    <p className="text-sm font-medium text-neuralops-dark-blue">Puedes preguntarme sobre:</p>
                    <ul className="text-sm text-neuralops-medium-blue space-y-1">
                      <li>• Estado de solicitudes de compra</li>
                      <li>• Información de proveedores</li>
                      <li>• Comparación de cotizaciones</li>
                      <li>• Presupuestos y gastos</li>
                      <li>• Políticas de compras</li>
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
                    { sender: 'user', text: '¿Cuáles son las solicitudes pendientes?' },
                    { sender: 'bot', text: 'Tienes 5 solicitudes pendientes: OC-2024-001 (Materias primas - $15,000), OC-2024-003 (Herramientas - $2,500), y 3 más. La más urgente es la OC-2024-001 que necesita aprobación hoy.' }
                  ])}
                >
                  Solicitudes Pendientes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setChatMessages([...chatMessages, 
                    { sender: 'user', text: 'Mejor proveedor para acero inoxidable' },
                    { sender: 'bot', text: 'Para acero inoxidable, TechMetal S.A. es tu mejor opción: calificación 9.2/10, precio competitivo $7.95/kg, entrega en 12 días. Tiene 98.4% de cumplimiento y excelente calidad.' }
                  ])}
                >
                  Mejor Proveedor
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setChatMessages([...chatMessages, 
                    { sender: 'user', text: '¿Cómo va el presupuesto de este mes?' },
                    { sender: 'bot', text: 'Presupuesto mensual: $50,000. Gastado: $32,150 (64.3%). Disponible: $17,850. Estás dentro del rango normal. Las compras más grandes fueron materias primas ($18,500) y herramientas ($8,200).' }
                  ])}
                >
                  Estado Presupuesto
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Pregunta sobre compras, proveedores, presupuestos..."
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
    </div>
  )
}
