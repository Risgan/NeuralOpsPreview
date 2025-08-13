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
              <ShoppingCart className="h-12 w-12 text-white" />
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
    </div>
  )
}
