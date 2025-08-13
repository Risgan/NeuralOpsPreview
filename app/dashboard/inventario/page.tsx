"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    Package,
    Plus,
    Search,
    MoreHorizontal,
    Eye,
    Edit,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle,
    XCircle,
    ArrowUpDown,
    Truck,
    BarChart3,
    ShoppingCart,
    ClipboardList,
    Package2,
    AlertCircle,
} from "lucide-react"

// Datos del inventario basados en el script SQL
const inventarioItems = [
    {
        id: "INV-001",
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
        id: "INV-002",
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
        id: "INV-003",
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
]

// Solicitudes de inventario
const solicitudes = [
    {
        id: "SOL-001",
        numeroSolicitud: "SR-2024-001",
        empleadoSolicitante: "Carlos López",
        area: "Mantenimiento",
        fechaSolicitud: "2024-08-10",
        estado: "Aprobada",
        totalItems: 5,
        itemsSolicitados: [
            { nombre: "Casco de Seguridad", cantidad: 2, aprobado: 2 },
            { nombre: "Guantes de Nitrilo", cantidad: 10, aprobado: 8 },
            { nombre: "Gafas de Seguridad", cantidad: 3, aprobado: 3 },
        ]
    },
    {
        id: "SOL-002",
        numeroSolicitud: "SR-2024-002",
        empleadoSolicitante: "María González",
        area: "Producción",
        fechaSolicitud: "2024-08-08",
        estado: "Pendiente",
        totalItems: 3,
        itemsSolicitados: [
            { nombre: "Mascarillas N95", cantidad: 20, aprobado: 0 },
            { nombre: "Protectores Auditivos", cantidad: 5, aprobado: 0 },
        ]
    },
]

// Transferencias entre bodegas
const transferencias = [
    {
        id: "TR-001",
        numeroTransferencia: "TR-2024-001",
        bodegaOrigen: "Bodega Central",
        bodegaDestino: "Bodega Norte",
        fechaSolicitud: "2024-08-09",
        estado: "Completada",
        itemsTransferidos: 12,
        responsable: "Juan Pérez",
    },
    {
        id: "TR-002",
        numeroTransferencia: "TR-2024-002",
        bodegaOrigen: "Bodega Sur",
        bodegaDestino: "Bodega Central",
        fechaSolicitud: "2024-08-11",
        estado: "En tránsito",
        itemsTransferidos: 8,
        responsable: "Ana Martínez",
    },
]

function StatsCard({ title, value, change, icon: Icon, changeType, color = "text-neuralops-gold" }: any) {
    return (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs ${changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-neuralops-medium-blue'} flex items-center gap-1`}>
                    {changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
                    {changeType === 'negative' && <TrendingDown className="h-3 w-3" />}
                    {change}
                </p>
            </CardContent>
        </Card>
    )
}

export default function InventarioPage() {
    const [selectedItem, setSelectedItem] = useState<any>(null)
    const [isNewItemOpen, setIsNewItemOpen] = useState(false)
    const [isNewSolicitudOpen, setIsNewSolicitudOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Disponible":
                return "bg-green-100 text-green-800 border-green-200"
            case "Stock Bajo":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "Agotado":
                return "bg-red-100 text-red-800 border-red-200"
            case "Vencido":
                return "bg-gray-100 text-gray-800 border-gray-200"
            case "Aprobada":
                return "bg-green-100 text-green-800 border-green-200"
            case "Pendiente":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "Rechazada":
                return "bg-red-100 text-red-800 border-red-200"
            case "Completada":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "En tránsito":
                return "bg-purple-100 text-purple-800 border-purple-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getStockIcon = (item: any) => {
        if (item.stock <= item.minimo) {
            return <AlertTriangle className="h-4 w-4 text-red-500" />
        } else if (item.stock >= item.optimo) {
            return <CheckCircle className="h-4 w-4 text-green-500" />
        } else {
            return <AlertCircle className="h-4 w-4 text-yellow-500" />
        }
    }

    const getStockPercentage = (item: any) => {
        return Math.min((item.stock / item.maximo) * 100, 100)
    }

    return (
        <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}

            <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold">
                <div className="px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div className="text-white">
                            <h1 className="text-3xl font-bold mb-2">Módulo de Inventario</h1>
                            <p className="text-neuralops-beige text-lg">Control de stock, EPP, solicitudes y transferencias</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <Package className="h-8 w-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Actions */}
                <div className="flex justify-end items-center mb-6">
                    <div className="flex gap-2">
                        <Dialog open={isNewItemOpen} onOpenChange={setIsNewItemOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nuevo Producto
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                                    <DialogDescription>Registra un nuevo producto en el inventario</DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="codigo">Código</Label>
                                        <Input id="codigo" placeholder="CAS-001" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre">Nombre del Producto</Label>
                                        <Input id="nombre" placeholder="Casco de Seguridad" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="categoria">Categoría</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar categoría" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cabeza">Protección de la cabeza</SelectItem>
                                                <SelectItem value="ocular">Protección ocular</SelectItem>
                                                <SelectItem value="manos">Protección de manos</SelectItem>
                                                <SelectItem value="pies">Protección de pies</SelectItem>
                                                <SelectItem value="respiratoria">Protección respiratoria</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="unidad">Unidad de Medida</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar unidad" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="unidad">Unidad</SelectItem>
                                                <SelectItem value="par">Par</SelectItem>
                                                <SelectItem value="caja">Caja</SelectItem>
                                                <SelectItem value="metro">Metro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock Inicial</Label>
                                        <Input id="stock" type="number" placeholder="150" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="precio">Precio Unitario</Label>
                                        <Input id="precio" placeholder="$15,000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="minimo">Stock Mínimo</Label>
                                        <Input id="minimo" type="number" placeholder="50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="optimo">Stock Óptimo</Label>
                                        <Input id="optimo" type="number" placeholder="200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="maximo">Stock Máximo</Label>
                                        <Input id="maximo" type="number" placeholder="300" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bodega">Bodega</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar bodega" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="central">Bodega Central</SelectItem>
                                                <SelectItem value="norte">Bodega Norte</SelectItem>
                                                <SelectItem value="sur">Bodega Sur</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lote">Lote</Label>
                                        <Input id="lote" placeholder="LOT-2024-001" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vencimiento">Fecha de Vencimiento</Label>
                                        <Input id="vencimiento" type="date" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsNewItemOpen(false)}>
                                        Cancelar
                                    </Button>
                                    <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                                        Registrar Producto
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isNewSolicitudOpen} onOpenChange={setIsNewSolicitudOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white">
                                    <ClipboardList className="h-4 w-4 mr-2" />
                                    Nueva Solicitud
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Crear Solicitud de EPP</DialogTitle>
                                    <DialogDescription>Solicita elementos de protección personal</DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="empleado">Empleado Solicitante</Label>
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
                                        <Label htmlFor="area">Área</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar área" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                                                <SelectItem value="produccion">Producción</SelectItem>
                                                <SelectItem value="operaciones">Operaciones</SelectItem>
                                                <SelectItem value="calidad">Calidad</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-2 space-y-4">
                                        <Label>Elementos Solicitados</Label>
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((index) => (
                                                <div key={index} className="grid grid-cols-3 gap-2">
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccionar producto" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="casco">Casco de Seguridad</SelectItem>
                                                            <SelectItem value="gafas">Gafas de Seguridad</SelectItem>
                                                            <SelectItem value="guantes">Guantes de Nitrilo</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Input placeholder="Cantidad" type="number" />
                                                    <Input placeholder="Observaciones" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsNewSolicitudOpen(false)}>
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
                        title="Total Productos"
                        value="1,247"
                        change="+23 nuevos"
                        changeType="positive"
                        icon={Package}
                    />
                    <StatsCard
                        title="Stock Bajo"
                        value="15"
                        change="3 críticos"
                        changeType="negative"
                        icon={AlertTriangle}
                        color="text-red-500"
                    />
                    <StatsCard
                        title="Solicitudes Pendientes"
                        value="8"
                        change="+2 esta semana"
                        changeType="neutral"
                        icon={ClipboardList}
                    />
                    <StatsCard
                        title="Valor Inventario"
                        value="$45.2M"
                        change="+5.2%"
                        changeType="positive"
                        icon={BarChart3}
                    />
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="inventario" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4 bg-neuralops-very-light-blue">
                        <TabsTrigger value="inventario" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Stock e Inventario
                        </TabsTrigger>
                        <TabsTrigger value="solicitudes" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Solicitudes EPP
                        </TabsTrigger>
                        <TabsTrigger value="transferencias" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Transferencias
                        </TabsTrigger>
                        <TabsTrigger value="reportes" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Reportes
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="inventario" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-neuralops-dark-blue">Control de Inventario</CardTitle>
                                        <CardDescription>Gestión de stock y elementos de protección personal</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neuralops-medium-blue" />
                                            <Input
                                                placeholder="Buscar productos..."
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
                                                <SelectItem value="Stock Bajo">Stock Bajo</SelectItem>
                                                <SelectItem value="Agotado">Agotado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Producto</TableHead>
                                            <TableHead>Categoría</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Bodega</TableHead>
                                            <TableHead>Precio</TableHead>
                                            <TableHead>Lote</TableHead>
                                            <TableHead className="w-20">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {inventarioItems.map((item) => (
                                            <TableRow key={item.id} className="hover:bg-neuralops-beige/5">
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        {getStockIcon(item)}
                                                        <div>
                                                            <div className="font-medium text-neuralops-dark-blue">{item.nombre}</div>
                                                            <div className="text-sm text-neuralops-medium-blue">{item.codigo}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-neuralops-gold text-neuralops-gold">
                                                        {item.categoria}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-neuralops-dark-blue">{item.stock}</span>
                                                            <span className="text-sm text-neuralops-medium-blue">/ {item.maximo}</span>
                                                        </div>
                                                        <div className="w-16 bg-neuralops-very-light-blue rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full transition-all duration-500 ${item.stock <= item.minimo
                                                                        ? 'bg-red-500'
                                                                        : item.stock >= item.optimo
                                                                            ? 'bg-green-500'
                                                                            : 'bg-yellow-500'
                                                                    }`}
                                                                style={{ width: `${getStockPercentage(item)}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(item.estado)}>
                                                        {item.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-neuralops-dark-blue">{item.bodega}</TableCell>
                                                <TableCell className="font-medium text-neuralops-dark-blue">{item.precio}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="text-sm text-neuralops-dark-blue">{item.lote}</div>
                                                        <div className="text-xs text-neuralops-medium-blue">Vence: {item.fechaVencimiento}</div>
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
                                                            <DropdownMenuItem onClick={() => setSelectedItem(item)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Ver detalles
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Editar
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                                                Movimiento
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Truck className="mr-2 h-4 w-4" />
                                                                Transferir
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

                    <TabsContent value="solicitudes" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-neuralops-dark-blue">Solicitudes de EPP</CardTitle>
                                <CardDescription>Gestión de solicitudes de elementos de protección personal</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {solicitudes.map((solicitud) => (
                                        <div key={solicitud.id} className="border border-neuralops-very-light-blue rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-medium text-neuralops-dark-blue">{solicitud.numeroSolicitud}</h3>
                                                    <p className="text-sm text-neuralops-medium-blue">
                                                        {solicitud.empleadoSolicitante} - {solicitud.area}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge className={getStatusColor(solicitud.estado)}>
                                                        {solicitud.estado}
                                                    </Badge>
                                                    <span className="text-sm text-neuralops-medium-blue">{solicitud.fechaSolicitud}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium text-neuralops-dark-blue">Items Solicitados ({solicitud.totalItems})</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                                    {solicitud.itemsSolicitados.map((item, index) => (
                                                        <div key={index} className="flex justify-between items-center p-2 bg-neuralops-beige/10 rounded">
                                                            <span className="text-sm text-neuralops-dark-blue">{item.nombre}</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs text-neuralops-medium-blue">
                                                                    {item.aprobado}/{item.cantidad}
                                                                </span>
                                                                {solicitud.estado === 'Aprobada' && (
                                                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                                                )}
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

                    <TabsContent value="transferencias" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-neuralops-dark-blue">Transferencias entre Bodegas</CardTitle>
                                <CardDescription>Control de movimientos de inventario entre ubicaciones</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>N° Transferencia</TableHead>
                                            <TableHead>Origen</TableHead>
                                            <TableHead>Destino</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Responsable</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead className="w-20">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transferencias.map((transferencia) => (
                                            <TableRow key={transferencia.id} className="hover:bg-neuralops-beige/5">
                                                <TableCell className="font-medium text-neuralops-dark-blue">
                                                    {transferencia.numeroTransferencia}
                                                </TableCell>
                                                <TableCell className="text-neuralops-dark-blue">{transferencia.bodegaOrigen}</TableCell>
                                                <TableCell className="text-neuralops-dark-blue">{transferencia.bodegaDestino}</TableCell>
                                                <TableCell className="text-center">{transferencia.itemsTransferidos}</TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(transferencia.estado)}>
                                                        {transferencia.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-neuralops-dark-blue">{transferencia.responsable}</TableCell>
                                                <TableCell className="text-neuralops-medium-blue">{transferencia.fechaSolicitud}</TableCell>
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
                                                                <Truck className="mr-2 h-4 w-4" />
                                                                Seguimiento
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Confirmar recepción
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
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
