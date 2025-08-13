"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    Wrench,
    Cog,
    Factory,
    HardDrive,
    Settings,
    FileText,
    Calendar,
    User,
    Building,
    ShoppingBag,
    Receipt,
    Archive,
    Download,
    Upload,
    Send,
    Clock,
    CheckSquare,
    DollarSign,
    MapPin,
    Filter,
    Camera,
    Scan,
    Brain,
    Bot,
    Zap,
    MessageCircle,
    ScanLine,
    Sparkles,
    FileImage,
    Mic,
} from "lucide-react"

// Datos del inventario general - repuestos, materias primas, herramientas, etc.
const inventarioItems = [
    {
        id: "INV-001",
        codigo: "REP-001",
        nombre: "Rodamiento SKF 6205",
        categoria: "Repuestos",
        subcategoria: "Rodamientos",
        stock: 45,
        minimo: 20,
        optimo: 60,
        maximo: 100,
        precio: 25000,
        bodega: "Almacén Principal",
        ubicacion: "A-12-03",
        proveedor: "SKF Colombia",
        estado: "Disponible",
        fechaUltimaEntrada: "2025-08-10",
        fechaUltimaSalida: "2025-08-12",
        unidadMedida: "Unidad",
        fechaVencimiento: null,
        lote: "LOT-2025-001"
    },
    {
        id: "INV-002",
        codigo: "MP-001",
        nombre: "Acero Inoxidable 316L",
        categoria: "Materias Primas",
        subcategoria: "Metales",
        stock: 2500,
        minimo: 1000,
        optimo: 3000,
        maximo: 5000,
        precio: 8500,
        bodega: "Bodega Materiales",
        ubicacion: "B-05-01",
        proveedor: "Acerias Paz del Rio",
        estado: "Disponible",
        fechaUltimaEntrada: "2025-08-08",
        fechaUltimaSalida: "2025-08-11",
        unidadMedida: "Kg",
        fechaVencimiento: null,
        lote: "MP-2025-008"
    },
    {
        id: "INV-003",
        codigo: "HER-001",
        nombre: "Taladro Industrial Bosch",
        categoria: "Herramientas",
        subcategoria: "Herramientas Eléctricas",
        stock: 8,
        minimo: 5,
        optimo: 12,
        maximo: 20,
        precio: 450000,
        bodega: "Almacén Herramientas",
        ubicacion: "C-02-15",
        proveedor: "Bosch Colombia",
        estado: "Disponible",
        fechaUltimaEntrada: "2025-07-25",
        fechaUltimaSalida: "2025-08-09",
        unidadMedida: "Unidad",
        fechaVencimiento: null,
        lote: "HER-2025-003"
    },
    {
        id: "INV-004",
        codigo: "REP-002",
        nombre: "Banda Transportadora 1200mm",
        categoria: "Repuestos",
        subcategoria: "Bandas y Correas",
        stock: 3,
        minimo: 2,
        optimo: 8,
        maximo: 15,
        precio: 1200000,
        bodega: "Almacén Principal",
        ubicacion: "A-08-01",
        proveedor: "Continental Belting",
        estado: "Stock Bajo",
        fechaUltimaEntrada: "2025-07-15",
        fechaUltimaSalida: "2025-08-10",
        unidadMedida: "Metro",
        fechaVencimiento: null,
        lote: "BAND-2025-002"
    },
    {
        id: "INV-005",
        codigo: "SUB-001",
        nombre: "Lubricante Industrial Shell",
        categoria: "Suministros",
        subcategoria: "Lubricantes",
        stock: 24,
        minimo: 15,
        optimo: 30,
        maximo: 50,
        precio: 85000,
        bodega: "Bodega Químicos",
        ubicacion: "D-03-08",
        proveedor: "Shell Colombia",
        estado: "Disponible",
        fechaUltimaEntrada: "2025-08-05",
        fechaUltimaSalida: "2025-08-11",
        unidadMedida: "Galón",
        fechaVencimiento: "2026-12-31",
        lote: "LUB-2025-012"
    },
    {
        id: "INV-006",
        codigo: "OF-001",
        nombre: "Papel Bond Carta 75gr",
        categoria: "Suministros Oficina",
        subcategoria: "Papelería",
        stock: 120,
        minimo: 50,
        optimo: 150,
        maximo: 300,
        precio: 12000,
        bodega: "Almacén Oficina",
        ubicacion: "E-01-05",
        proveedor: "Papelería Nacional",
        estado: "Disponible",
        fechaUltimaEntrada: "2025-08-01",
        fechaUltimaSalida: "2025-08-12",
        unidadMedida: "Resma",
        fechaVencimiento: null,
        lote: "PAP-2025-015"
    }
];

// Movimientos de inventario (entradas y salidas)
const movimientosInventario = [
    {
        id: "MOV-001",
        fecha: "2025-08-12",
        tipo: "Salida",
        item: "Rodamiento SKF 6205",
        codigo: "REP-001",
        cantidad: 5,
        motivo: "Mantenimiento Línea 3",
        solicitante: "Juan Pérez",
        departamento: "Mantenimiento",
        numeroOrden: "OT-2025-089",
        bodega: "Almacén Principal",
        observaciones: "Cambio programado motor principal"
    },
    {
        id: "MOV-002",
        fecha: "2025-08-10",
        tipo: "Entrada",
        item: "Rodamiento SKF 6205",
        codigo: "REP-001",
        cantidad: 30,
        motivo: "Compra",
        solicitante: "María García",
        departamento: "Compras",
        numeroOrden: "OC-2025-156",
        bodega: "Almacén Principal",
        observaciones: "Orden de compra regular"
    },
    {
        id: "MOV-003",
        fecha: "2025-08-11",
        tipo: "Salida",
        item: "Acero Inoxidable 316L",
        codigo: "MP-001",
        cantidad: 150,
        motivo: "Producción",
        solicitante: "Carlos López",
        departamento: "Producción",
        numeroOrden: "OP-2025-234",
        bodega: "Bodega Materiales",
        observaciones: "Fabricación tanque 500L"
    },
    {
        id: "MOV-004",
        fecha: "2025-08-09",
        tipo: "Salida",
        item: "Taladro Industrial Bosch",
        codigo: "HER-001",
        cantidad: 1,
        motivo: "Préstamo",
        solicitante: "Ana Rodríguez",
        departamento: "Mantenimiento",
        numeroOrden: "PR-2025-045",
        bodega: "Almacén Herramientas",
        observaciones: "Préstamo temporal 15 días"
    },
    {
        id: "MOV-005",
        fecha: "2025-08-08",
        tipo: "Entrada",
        item: "Acero Inoxidable 316L",
        codigo: "MP-001",
        cantidad: 500,
        motivo: "Compra",
        solicitante: "María García",
        departamento: "Compras",
        numeroOrden: "OC-2025-148",
        bodega: "Bodega Materiales",
        observaciones: "Compra trimestral planificada"
    }
];

// Solicitudes de compra
const solicitudesCompra = [
    {
        id: "SC-001",
        fecha: "2025-08-13",
        solicitante: "Pedro Martínez",
        departamento: "Mantenimiento",
        estado: "Pendiente",
        urgencia: "Alta",
        justificacion: "Stock crítico para mantenimiento preventivo",
        items: [
            { codigo: "REP-002", nombre: "Banda Transportadora 1200mm", cantidad: 5, precioEstimado: 1200000 },
            { codigo: "REP-003", nombre: "Motor Eléctrico 5HP", cantidad: 2, precioEstimado: 2500000 }
        ],
        totalEstimado: 11000000,
        fechaRequerida: "2025-08-20",
        observaciones: "Requerido para mantenimiento programado del 25 de agosto"
    },
    {
        id: "SC-002",
        fecha: "2025-08-12",
        solicitante: "Laura Fernández",
        departamento: "Producción",
        estado: "Aprobada",
        urgencia: "Media",
        justificacion: "Reposición stock normal",
        items: [
            { codigo: "MP-001", nombre: "Acero Inoxidable 316L", cantidad: 1000, precioEstimado: 8500 },
            { codigo: "MP-002", nombre: "Aluminio 6061", cantidad: 500, precioEstimado: 12000 }
        ],
        totalEstimado: 14500000,
        fechaRequerida: "2025-08-25",
        observaciones: "Para producción del próximo mes"
    },
    {
        id: "SC-003",
        fecha: "2025-08-11",
        solicitante: "Roberto Silva",
        departamento: "Calidad",
        estado: "En Proceso",
        urgencia: "Baja",
        justificacion: "Actualización equipos de medición",
        items: [
            { codigo: "INS-001", nombre: "Calibrador Digital Mitutoyo", cantidad: 3, precioEstimado: 850000 },
            { codigo: "INS-002", nombre: "Micrómetro 0-25mm", cantidad: 2, precioEstimado: 450000 }
        ],
        totalEstimado: 3450000,
        fechaRequerida: "2025-09-01",
        observaciones: "Renovación equipos de metrología"
    }
];

// Órdenes de compra
const ordenesCompra = [
    {
        id: "OC-2025-156",
        fecha: "2025-08-05",
        proveedor: "SKF Colombia",
        estado: "Recibida",
        solicitudCompra: "SC-001-ANT",
        fechaEntrega: "2025-08-10",
        fechaRecepcion: "2025-08-10",
        total: 750000,
        items: [
            { codigo: "REP-001", nombre: "Rodamiento SKF 6205", cantidad: 30, precioUnitario: 25000, subtotal: 750000 }
        ],
        observaciones: "Entrega completa y conforme"
    },
    {
        id: "OC-2025-148",
        fecha: "2025-08-01",
        proveedor: "Acerias Paz del Rio",
        estado: "Recibida",
        solicitudCompra: "SC-002-ANT",
        fechaEntrega: "2025-08-08",
        fechaRecepcion: "2025-08-08",
        total: 4250000,
        items: [
            { codigo: "MP-001", nombre: "Acero Inoxidable 316L", cantidad: 500, precioUnitario: 8500, subtotal: 4250000 }
        ],
        observaciones: "Material conforme a especificaciones"
    },
    {
        id: "OC-2025-162",
        fecha: "2025-08-10",
        proveedor: "Bosch Colombia",
        estado: "En Tránsito",
        solicitudCompra: "SC-003",
        fechaEntrega: "2025-08-15",
        fechaRecepcion: null,
        total: 2700000,
        items: [
            { codigo: "HER-002", nombre: "Amoladora Angular 900W", cantidad: 6, precioUnitario: 450000, subtotal: 2700000 }
        ],
        observaciones: "Pendiente de recepción"
    }
];


// Solicitudes de inventario (generales - no solo EPP)
const solicitudes = [
    {
        id: "SOL-001",
        numeroSolicitud: "SR-2025-001",
        empleadoSolicitante: "Carlos López",
        area: "Mantenimiento",
        fechaSolicitud: "2025-08-10",
        estado: "Aprobada",
        tipo: "Interno",
        urgencia: "Alta",
        totalItems: 3,
        itemsSolicitados: [
            { codigo: "REP-001", nombre: "Rodamiento SKF 6205", cantidad: 5, cantidadAprobada: 5, stock: 45 },
            { codigo: "HER-001", nombre: "Taladro Industrial Bosch", cantidad: 1, cantidadAprobada: 1, stock: 8 },
            { codigo: "SUB-001", nombre: "Lubricante Industrial Shell", cantidad: 2, cantidadAprobada: 2, stock: 24 },
        ],
        justificacion: "Mantenimiento preventivo línea de producción 3",
        fechaEntrega: "2025-08-12",
        observaciones: "Entrega realizada completamente"
    },
    {
        id: "SOL-002",
        numeroSolicitud: "SR-2025-002",
        empleadoSolicitante: "María González",
        area: "Producción",
        fechaSolicitud: "2025-08-12",
        estado: "Pendiente",
        tipo: "Interno",
        urgencia: "Media",
        totalItems: 2,
        itemsSolicitados: [
            { codigo: "MP-001", nombre: "Acero Inoxidable 316L", cantidad: 200, cantidadAprobada: 0, stock: 2500 },
            { codigo: "OF-001", nombre: "Papel Bond Carta 75gr", cantidad: 10, cantidadAprobada: 0, stock: 120 },
        ],
        justificacion: "Producción orden especial cliente ABC",
        fechaEntrega: null,
        observaciones: "Pendiente de aprobación"
    },
    {
        id: "SOL-003",
        numeroSolicitud: "SR-2025-003",
        empleadoSolicitante: "Pedro Martínez",
        area: "Mantenimiento",
        fechaSolicitud: "2025-08-13",
        estado: "Rechazada",
        tipo: "Compra",
        urgencia: "Alta",
        totalItems: 2,
        itemsSolicitados: [
            { codigo: "REP-002", nombre: "Banda Transportadora 1200mm", cantidad: 5, cantidadAprobada: 0, stock: 3 },
            { codigo: "REP-003", nombre: "Motor Eléctrico 5HP", cantidad: 2, cantidadAprobada: 0, stock: 0 },
        ],
        justificacion: "Stock insuficiente para mantenimiento crítico",
        fechaEntrega: null,
        observaciones: "Rechazada - Crear solicitud de compra"
    }
];

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
];

// Recepciones de órdenes de compra
const recepcionesOC = [
    {
        id: "REC-001",
        ordenCompra: "OC-2025-162",
        fecha: "2025-08-15",
        proveedor: "Bosch Colombia",
        estado: "Pendiente Recepción",
        fechaLlegada: "2025-08-15",
        recibidoPor: null,
        items: [
            { 
                codigo: "HER-002", 
                nombre: "Amoladora Angular 900W", 
                cantidadOrdenada: 6, 
                cantidadRecibida: 0,
                cantidadConforme: 0,
                cantidadDefectuosa: 0,
                observaciones: "Pendiente de llegada"
            }
        ],
        observaciones: "Esperando llegada del proveedor",
        documentos: ["Factura", "Remisión"]
    },
    {
        id: "REC-002",
        ordenCompra: "OC-2025-156",
        fecha: "2025-08-10",
        proveedor: "SKF Colombia",
        estado: "Recepción Completa",
        fechaLlegada: "2025-08-10",
        recibidoPor: "Ana Rodríguez",
        items: [
            { 
                codigo: "REP-001", 
                nombre: "Rodamiento SKF 6205", 
                cantidadOrdenada: 30, 
                cantidadRecibida: 30,
                cantidadConforme: 30,
                cantidadDefectuosa: 0,
                observaciones: "Recepción conforme, items en perfecto estado"
            }
        ],
        observaciones: "Recepción exitosa, productos ingresados a inventario",
        documentos: ["Factura", "Remisión", "Certificado de Calidad"]
    },
    {
        id: "REC-003",
        ordenCompra: "OC-2025-148",
        fecha: "2025-08-08",
        proveedor: "Acerias Paz del Rio",
        estado: "Recepción Parcial",
        fechaLlegada: "2025-08-08",
        recibidoPor: "Carlos López",
        items: [
            { 
                codigo: "MP-001", 
                nombre: "Acero Inoxidable 316L", 
                cantidadOrdenada: 500, 
                cantidadRecibida: 480,
                cantidadConforme: 475,
                cantidadDefectuosa: 5,
                observaciones: "5 kg con oxidación superficial - apartados para devolución"
            }
        ],
        observaciones: "Recepción mayormente conforme, gestionar devolución de material defectuoso",
        documentos: ["Factura", "Remisión", "Reporte de No Conformidad"]
    }
];

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
    
    // Estados para funcionalidades de IA
    const [isOCROpen, setIsOCROpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [isPredictiveOpen, setIsPredictiveOpen] = useState(false)
    const [isAutoClassifyOpen, setIsAutoClassifyOpen] = useState(false)
    const [ocrProcessing, setOCRProcessing] = useState(false)
    const [chatMessages, setChatMessages] = useState<any[]>([
        { type: 'bot', message: '¡Hola! Soy tu asistente de inventario. ¿En qué puedo ayudarte?' }
    ])

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

            <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold space-y-4">
                <div className="px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div className="text-white">
                            <h1 className="text-3xl font-bold mb-2">Sistema de Inventario General</h1>
                            <p className="text-neuralops-beige text-lg">Control integral de repuestos, materias primas, herramientas y suministros</p>
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
                                                <SelectItem value="repuestos">Repuestos</SelectItem>
                                                <SelectItem value="materias-primas">Materias Primas</SelectItem>
                                                <SelectItem value="herramientas">Herramientas</SelectItem>
                                                <SelectItem value="suministros">Suministros</SelectItem>
                                                <SelectItem value="oficina">Suministros de Oficina</SelectItem>
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
                                                <SelectItem value="kg">Kilogramo</SelectItem>
                                                <SelectItem value="metro">Metro</SelectItem>
                                                <SelectItem value="litro">Litro</SelectItem>
                                                <SelectItem value="galon">Galón</SelectItem>
                                                <SelectItem value="par">Par</SelectItem>
                                                <SelectItem value="caja">Caja</SelectItem>
                                                <SelectItem value="resma">Resma</SelectItem>
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
                                    <DialogTitle>Crear Solicitud de Compra</DialogTitle>
                                    <DialogDescription>Solicita elementos de inventario</DialogDescription>
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

                {/* Botones de Funcionalidades IA */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                            <Sparkles className="h-3 w-3 text-purple-600" />
                            <span className="text-xs font-medium text-purple-700">Funciones IA</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {/* OCR para Facturas */}
                        <Dialog open={isOCROpen} onOpenChange={setIsOCROpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                                    <Scan className="h-4 w-4 mr-2" />
                                    OCR Facturas
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Brain className="h-5 w-5 text-purple-600" />
                                        IA - Procesamiento OCR de Facturas
                                    </DialogTitle>
                                    <DialogDescription>
                                        Sube una imagen de factura y la IA extraerá automáticamente los datos
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
                                        <Camera className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Arrastra una imagen aquí o haz clic para seleccionar
                                        </p>
                                        <Button variant="outline" className="border-purple-300 text-purple-600">
                                            <FileImage className="h-4 w-4 mr-2" />
                                            Seleccionar Archivo
                                        </Button>
                                    </div>
                                    {ocrProcessing && (
                                        <div className="bg-purple-50 p-4 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                                                <span className="text-purple-700">Procesando imagen con IA...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-blue-800 mb-2">Datos Extraídos por IA:</h4>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div><strong>Proveedor:</strong> SKF Colombia</div>
                                            <div><strong>Factura #:</strong> FC-2025-001234</div>
                                            <div><strong>Fecha:</strong> 2025-08-13</div>
                                            <div><strong>Total:</strong> $750,000</div>
                                            <div className="col-span-2"><strong>Items:</strong> Rodamiento SKF 6205 (30 unidades)</div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsOCROpen(false)}>Cancelar</Button>
                                    <Button className="bg-purple-600 hover:bg-purple-700">Importar Datos</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Clasificación Automática */}
                        <Dialog open={isAutoClassifyOpen} onOpenChange={setIsAutoClassifyOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                                    <Zap className="h-4 w-4 mr-2" />
                                    Auto-Clasificar
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Brain className="h-5 w-5 text-blue-600" />
                                        IA - Clasificación Automática de Productos
                                    </DialogTitle>
                                    <DialogDescription>
                                        La IA analizará la descripción del producto y sugerirá la categoría óptima
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Descripción del Producto</Label>
                                        <Textarea 
                                            placeholder="Ej: Tornillo hexagonal de acero inoxidable M8x20mm para uso industrial"
                                            className="min-h-20"
                                        />
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                                            <Sparkles className="h-4 w-4" />
                                            Sugerencias de IA:
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between p-2 bg-white rounded border">
                                                <span className="text-sm"><strong>Categoría:</strong> Repuestos &gt; Elementos de Fijación</span>
                                                <Badge className="bg-green-100 text-green-700">95% confianza</Badge>
                                            </div>
                                            <div className="flex items-center justify-between p-2 bg-white rounded border">
                                                <span className="text-sm"><strong>Bodega sugerida:</strong> Almacén Principal</span>
                                                <Badge className="bg-blue-100 text-blue-700">88% confianza</Badge>
                                            </div>
                                            <div className="flex items-center justify-between p-2 bg-white rounded border">
                                                <span className="text-sm"><strong>Proveedor recomendado:</strong> Acerias Paz del Rio</span>
                                                <Badge className="bg-purple-100 text-purple-700">82% confianza</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsAutoClassifyOpen(false)}>Cancelar</Button>
                                    <Button className="bg-blue-600 hover:bg-blue-700">Aplicar Sugerencias</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Análisis Predictivo */}
                        <Dialog open={isPredictiveOpen} onOpenChange={setIsPredictiveOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    IA Predictiva
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Brain className="h-5 w-5 text-green-600" />
                                        IA - Análisis Predictivo de Inventario
                                    </DialogTitle>
                                    <DialogDescription>
                                        Predicciones de demanda y alertas de reorden basadas en IA
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card className="border-red-200">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-sm text-red-700">⚠️ Alertas Críticas</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <div className="text-xs p-2 bg-red-50 rounded">
                                                    <strong>Rodamiento SKF 6205:</strong> Stock agotado en 12 días
                                                </div>
                                                <div className="text-xs p-2 bg-red-50 rounded">
                                                    <strong>Banda Transportadora:</strong> Solicitar YA - Stock crítico
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-yellow-200">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-sm text-yellow-700">📊 Predicciones</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <div className="text-xs p-2 bg-yellow-50 rounded">
                                                    <strong>Acero Inox 316L:</strong> Aumento demanda 25% próximo mes
                                                </div>
                                                <div className="text-xs p-2 bg-yellow-50 rounded">
                                                    <strong>Lubricantes:</strong> Patrón estacional detectado
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                                            <Sparkles className="h-4 w-4" />
                                            Recomendaciones IA para Compras:
                                        </h4>
                                        <div className="space-y-2">
                                            {[
                                                { producto: "Rodamiento SKF 6205", cantidad: 60, urgencia: "Alta", ahorro: "$15,000" },
                                                { producto: "Acero Inoxidable 316L", cantidad: 800, urgencia: "Media", ahorro: "$8,500" },
                                                { producto: "Lubricante Shell", cantidad: 40, urgencia: "Baja", ahorro: "$3,200" },
                                            ].map((rec, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                                                    <div>
                                                        <span className="font-medium text-sm">{rec.producto}</span>
                                                        <div className="text-xs text-gray-600">Cantidad óptima: {rec.cantidad} unidades</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <Badge className={`${
                                                            rec.urgencia === 'Alta' ? 'bg-red-100 text-red-700' :
                                                            rec.urgencia === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-green-100 text-green-700'
                                                        } text-xs`}>
                                                            {rec.urgencia}
                                                        </Badge>
                                                        <div className="text-xs text-green-600">Ahorro: {rec.ahorro}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsPredictiveOpen(false)}>Cerrar</Button>
                                    <Button className="bg-green-600 hover:bg-green-700">Generar Órdenes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Chatbot de Inventario */}
                        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Asistente IA
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl h-[600px] flex flex-col">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Bot className="h-5 w-5 text-purple-600" />
                                        Asistente IA de Inventario
                                    </DialogTitle>
                                    <DialogDescription>
                                        Pregunta sobre stock, ubicaciones, proveedores o cualquier consulta de inventario
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex-1 overflow-hidden flex flex-col">
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
                                        {chatMessages.map((msg, index) => (
                                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                                                    msg.type === 'user' 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'bg-white border border-gray-200'
                                                }`}>
                                                    {msg.type === 'bot' && (
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Bot className="h-3 w-3 text-purple-600" />
                                                            <span className="text-xs font-medium text-purple-600">IA Assistant</span>
                                                        </div>
                                                    )}
                                                    <p className="text-sm">{msg.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Input 
                                            placeholder="Pregunta algo como: ¿Dónde está el rodamiento SKF 6205?"
                                            className="flex-1"
                                        />
                                        <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
                                            <Send className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="outline">
                                            <Mic className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <Button variant="outline" size="sm" className="text-xs">
                                            ¿Stock del rodamiento SKF?
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-xs">
                                            ¿Cuándo llega la OC-2025-162?
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-xs">
                                            Items con stock bajo
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 space-y-4">
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
                    <TabsList className="grid w-full grid-cols-5 bg-neuralops-very-light-blue">
                        <TabsTrigger value="inventario" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Stock e Inventario
                        </TabsTrigger>
                        <TabsTrigger value="solicitudes" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Solicitudes
                        </TabsTrigger>
                        <TabsTrigger value="compras" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Órdenes de Compra
                        </TabsTrigger>
                        <TabsTrigger value="recepciones" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Recepciones
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
                                        <CardDescription>Gestión de stock general - repuestos, materias primas, herramientas y suministros</CardDescription>
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
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-neuralops-dark-blue">{item.nombre}</span>
                                                                {item.codigo === "REP-001" && (
                                                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 rounded-full">
                                                                        <Brain className="h-3 w-3 text-purple-600" />
                                                                        <span className="text-xs text-purple-600 font-medium">IA Alert</span>
                                                                    </div>
                                                                )}
                                                                {item.codigo === "MP-001" && (
                                                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 rounded-full">
                                                                        <TrendingUp className="h-3 w-3 text-blue-600" />
                                                                        <span className="text-xs text-blue-600 font-medium">↗ Demanda</span>
                                                                    </div>
                                                                )}
                                                            </div>
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
                                                            <div className="border-t my-1"></div>
                                                            <div className="px-2 py-1 text-xs font-medium text-purple-600 flex items-center gap-2">
                                                                <Sparkles className="h-3 w-3" />
                                                                Funciones IA
                                                            </div>
                                                            <DropdownMenuItem className="text-purple-600">
                                                                <Brain className="mr-2 h-4 w-4" />
                                                                Predicción de Demanda
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-purple-600">
                                                                <TrendingUp className="mr-2 h-4 w-4" />
                                                                Análisis de Rotación
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-purple-600">
                                                                <Zap className="mr-2 h-4 w-4" />
                                                                Optimizar Stock
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
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-neuralops-dark-blue">Solicitudes de Inventario</CardTitle>
                                        <CardDescription>Gestión de solicitudes internas y solicitudes de compra</CardDescription>
                                    </div>
                                    <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Nueva Solicitud
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {solicitudes.map((solicitud) => (
                                        <Card key={solicitud.id} className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-full ${
                                                            solicitud.urgencia === 'Alta' ? 'bg-red-100' :
                                                            solicitud.urgencia === 'Media' ? 'bg-yellow-100' :
                                                            'bg-green-100'
                                                        }`}>
                                                            <ClipboardList className={`h-5 w-5 ${
                                                                solicitud.urgencia === 'Alta' ? 'text-red-600' :
                                                                solicitud.urgencia === 'Media' ? 'text-yellow-600' :
                                                                'text-green-600'
                                                            }`} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-neuralops-dark-blue">{solicitud.numeroSolicitud}</h3>
                                                            <p className="text-neuralops-medium-blue text-sm">{solicitud.empleadoSolicitante} - {solicitud.area}</p>
                                                            <div className="flex items-center gap-4 mt-2">
                                                                <span className="text-sm text-neuralops-medium-blue">
                                                                    Fecha: {solicitud.fechaSolicitud}
                                                                </span>
                                                                <Badge variant="outline" className={`text-xs ${
                                                                    solicitud.urgencia === 'Alta' ? 'border-red-500 text-red-600' :
                                                                    solicitud.urgencia === 'Media' ? 'border-yellow-500 text-yellow-600' :
                                                                    'border-green-500 text-green-600'
                                                                }`}>
                                                                    {solicitud.urgencia}
                                                                </Badge>
                                                                <Badge variant="outline" className={`text-xs ${
                                                                    solicitud.tipo === 'Interno' ? 'border-blue-500 text-blue-600' :
                                                                    'border-purple-500 text-purple-600'
                                                                }`}>
                                                                    {solicitud.tipo}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge className={getStatusColor(solicitud.estado)}>
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
                                                                {solicitud.tipo === 'Compra' && solicitud.estado === 'Rechazada' && (
                                                                    <DropdownMenuItem>
                                                                        <Send className="h-4 w-4 mr-2" />
                                                                        Enviar a Compras
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="text-sm text-neuralops-medium-blue bg-neuralops-beige/10 p-3 rounded">
                                                        <strong>Justificación:</strong> {solicitud.justificacion}
                                                    </div>
                                                    
                                                    <div>
                                                        <h4 className="text-sm font-medium text-neuralops-dark-blue mb-2">
                                                            Items Solicitados ({solicitud.totalItems})
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {solicitud.itemsSolicitados.map((item, index) => (
                                                                <div key={index} className="flex justify-between items-center p-3 bg-white border border-neuralops-very-light-blue rounded">
                                                                    <div className="flex-1">
                                                                        <div className="text-sm font-medium text-neuralops-dark-blue">{item.nombre}</div>
                                                                        <div className="text-xs text-neuralops-medium-blue">{item.codigo} • Stock actual: {item.stock}</div>
                                                                    </div>
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="text-center">
                                                                            <div className="text-sm font-medium text-neuralops-dark-blue">{item.cantidad}</div>
                                                                            <div className="text-xs text-neuralops-medium-blue">Solicitado</div>
                                                                        </div>
                                                                        <div className="text-center">
                                                                            <div className="text-sm font-medium text-green-600">{item.cantidadAprobada}</div>
                                                                            <div className="text-xs text-neuralops-medium-blue">Aprobado</div>
                                                                        </div>
                                                                        {solicitud.estado === 'Aprobada' && item.cantidadAprobada > 0 && (
                                                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                                                        )}
                                                                        {item.stock < item.cantidad && (
                                                                            <AlertTriangle className="h-4 w-4 text-red-500"  />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {solicitud.observaciones && (
                                                        <div className="text-sm text-neuralops-medium-blue">
                                                            <strong>Observaciones:</strong> {solicitud.observaciones}
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="compras" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-neuralops-dark-blue">Órdenes de Compra</CardTitle>
                                        <CardDescription>Seguimiento de órdenes de compra y su estado</CardDescription>
                                    </div>
                                    {/* <div className="flex gap-2">
                                        <Button variant="outline" className="border-neuralops-medium-blue text-neuralops-medium-blue hover:bg-neuralops-medium-blue hover:text-white">
                                            <Send className="h-4 w-4 mr-2" />
                                            Crear Solicitud Compra
                                        </Button>
                                        <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                                            <Receipt className="h-4 w-4 mr-2" />
                                            Nueva OC
                                        </Button>
                                    </div> */}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nº Orden</TableHead>
                                            <TableHead>Proveedor</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Fecha Entrega</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead className="w-20">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {ordenesCompra.map((orden) => (
                                            <TableRow key={orden.id} className="hover:bg-neuralops-beige/5">
                                                <TableCell className="font-medium text-neuralops-dark-blue">
                                                    {orden.id}
                                                </TableCell>
                                                <TableCell className="text-neuralops-dark-blue">{orden.proveedor}</TableCell>
                                                <TableCell className="text-neuralops-medium-blue">{orden.fecha}</TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(orden.estado)}>
                                                        {orden.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-neuralops-medium-blue">
                                                    <div>
                                                        <div>{orden.fechaEntrega}</div>
                                                        {orden.fechaRecepcion && (
                                                            <div className="text-xs text-green-600">
                                                                Recibido: {orden.fechaRecepcion}
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium text-neuralops-dark-blue">
                                                    ${orden.total.toLocaleString()}
                                                </TableCell>
                                                <TableCell className="text-center">{orden.items.length}</TableCell>
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
                                                                <FileText className="mr-2 h-4 w-4" />
                                                                Ver documento
                                                            </DropdownMenuItem>
                                                            {orden.estado === 'En Tránsito' && (
                                                                <DropdownMenuItem>
                                                                    <Package className="mr-2 h-4 w-4" />
                                                                    Registrar llegada
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuItem>
                                                                <Truck className="mr-2 h-4 w-4" />
                                                                Seguimiento
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

                    <TabsContent value="recepciones" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-neuralops-dark-blue">Recepciones de Inventario</CardTitle>
                                        <CardDescription>Control de recepción de órdenes de compra y actualización de inventario</CardDescription>
                                    </div>
                                    <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                                        <Download className="h-4 w-4 mr-2" />
                                        Registrar Recepción
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recepcionesOC.map((recepcion) => (
                                        <Card key={recepcion.id} className="border border-neuralops-very-light-blue hover:shadow-md transition-shadow">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-full ${
                                                            recepcion.estado === 'Recepción Completa' ? 'bg-green-100' :
                                                            recepcion.estado === 'Recepción Parcial' ? 'bg-yellow-100' :
                                                            'bg-blue-100'
                                                        }`}>
                                                            <Package className={`h-5 w-5 ${
                                                                recepcion.estado === 'Recepción Completa' ? 'text-green-600' :
                                                                recepcion.estado === 'Recepción Parcial' ? 'text-yellow-600' :
                                                                'text-blue-600'
                                                            }`} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-neuralops-dark-blue">{recepcion.ordenCompra}</h3>
                                                            <p className="text-neuralops-medium-blue text-sm">{recepcion.proveedor}</p>
                                                            <div className="flex items-center gap-4 mt-2">
                                                                <span className="text-sm text-neuralops-medium-blue">
                                                                    <Calendar className="h-3 w-3 inline mr-1" />
                                                                    Llegada: {recepcion.fechaLlegada}
                                                                </span>
                                                                {recepcion.recibidoPor && (
                                                                    <span className="text-sm text-neuralops-medium-blue">
                                                                        <User className="h-3 w-3 inline mr-1" />
                                                                        Por: {recepcion.recibidoPor}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge className={getStatusColor(recepcion.estado)}>
                                                            {recepcion.estado}
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
                                                                <DropdownMenuItem>
                                                                    <FileText className="h-4 w-4 mr-2" />
                                                                    Ver Documentos
                                                                </DropdownMenuItem>
                                                                {recepcion.estado === 'Pendiente Recepción' && (
                                                                    <DropdownMenuItem>
                                                                        <CheckSquare className="h-4 w-4 mr-2" />
                                                                        Confirmar Recepción
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuItem>
                                                                    <Upload className="h-4 w-4 mr-2" />
                                                                    Actualizar Inventario
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-neuralops-dark-blue mb-2">
                                                            Items Recibidos
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {recepcion.items.map((item, index) => (
                                                                <div key={index} className="bg-white border border-neuralops-very-light-blue rounded p-3">
                                                                    <div className="flex justify-between items-start">
                                                                        <div className="flex-1">
                                                                            <div className="text-sm font-medium text-neuralops-dark-blue">{item.nombre}</div>
                                                                            <div className="text-xs text-neuralops-medium-blue">{item.codigo}</div>
                                                                        </div>
                                                                        <div className="grid grid-cols-3 gap-4 text-center">
                                                                            <div>
                                                                                <div className="text-sm font-medium text-neuralops-dark-blue">{item.cantidadOrdenada}</div>
                                                                                <div className="text-xs text-neuralops-medium-blue">Ordenado</div>
                                                                            </div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-blue-600">{item.cantidadRecibida}</div>
                                                                                <div className="text-xs text-neuralops-medium-blue">Recibido</div>
                                                                            </div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-green-600">{item.cantidadConforme}</div>
                                                                                <div className="text-xs text-neuralops-medium-blue">Conforme</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {item.cantidadDefectuosa > 0 && (
                                                                        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                                                                            <AlertTriangle className="h-3 w-3 inline mr-1" />
                                                                            {item.cantidadDefectuosa} unidades defectuosas
                                                                        </div>
                                                                    )}
                                                                    {item.observaciones && (
                                                                        <div className="mt-2 text-xs text-neuralops-medium-blue">
                                                                            {item.observaciones}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="text-sm text-neuralops-medium-blue bg-neuralops-beige/10 p-3 rounded">
                                                        <strong>Observaciones:</strong> {recepcion.observaciones}
                                                    </div>

                                                    <div className="flex items-center gap-2 text-xs text-neuralops-medium-blue">
                                                        <FileText className="h-3 w-3" />
                                                        <span>Documentos: {recepcion.documentos.join(", ")}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
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
                                    <CardTitle className="text-neuralops-dark-blue">Costos Inventario por Departamento</CardTitle>
                                    <CardDescription>Análisis de consumo y costos por área de la empresa</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[
                                            { departamento: "Mantenimiento", consumo: "45%", costo: "$8.5M", items: 245 },
                                            { departamento: "Producción", consumo: "35%", costo: "$6.2M", items: 180 },
                                            { departamento: "Calidad", consumo: "12%", costo: "$2.1M", items: 85 },
                                            { departamento: "Administración", consumo: "8%", costo: "$1.4M", items: 120 },
                                        ].map((dept, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-neuralops-beige/10 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-neuralops-dark-blue">{dept.departamento}</p>
                                                    <p className="text-sm text-neuralops-medium-blue">{dept.items} items • {dept.consumo} del total</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-neuralops-dark-blue">{dept.costo}</p>
                                                    <p className="text-xs text-neuralops-medium-blue">consumo mensual</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-neuralops-dark-blue">Inventario por Categoría</CardTitle>
                                    <CardDescription>Distribución del stock por tipo de inventario</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { categoria: "Repuestos", items: 450, valor: "$12.5M", color: "bg-blue-500" },
                                            { categoria: "Materias Primas", items: 280, valor: "$8.9M", color: "bg-green-500" },
                                            { categoria: "Herramientas", items: 185, valor: "$3.2M", color: "bg-yellow-500" },
                                            { categoria: "Suministros", items: 320, valor: "$2.1M", color: "bg-red-500" },
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

                        {/* Reportes adicionales de inventario */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-neuralops-dark-blue">Rotación de Inventario</CardTitle>
                                    <CardDescription>Productos con mayor movimiento</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[
                                            { producto: "Rodamientos SKF", rotacion: "Alta", movimientos: 45 },
                                            { producto: "Acero Inoxidable", rotacion: "Alta", movimientos: 38 },
                                            { producto: "Lubricantes Shell", rotacion: "Media", movimientos: 22 },
                                            { producto: "Papel Bond", rotacion: "Media", movimientos: 18 },
                                        ].map((item, index) => (
                                            <div key={index} className="space-y-1">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-neuralops-dark-blue">{item.producto}</span>
                                                    <span className="text-sm text-neuralops-medium-blue">{item.movimientos} mov/mes</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-full bg-neuralops-very-light-blue rounded-full h-1.5">
                                                        <div 
                                                            className={`h-1.5 rounded-full ${
                                                                item.rotacion === 'Alta' ? 'bg-green-500' : 
                                                                item.rotacion === 'Media' ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                            style={{ width: `${(item.movimientos / 50) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs font-medium ${
                                                        item.rotacion === 'Alta' ? 'text-green-600' : 
                                                        item.rotacion === 'Media' ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                        {item.rotacion}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-neuralops-dark-blue">Estado del Stock</CardTitle>
                                    <CardDescription>Distribución por niveles de inventario</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                                <div className="text-lg font-bold text-green-600">75%</div>
                                                <div className="text-xs text-green-600">Stock Normal</div>
                                            </div>
                                            <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                                <div className="text-lg font-bold text-yellow-600">18%</div>
                                                <div className="text-xs text-yellow-600">Stock Bajo</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-red-50 rounded-lg">
                                                <div className="text-lg font-bold text-red-600">5%</div>
                                                <div className="text-xs text-red-600">Stock Crítico</div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-lg font-bold text-gray-600">2%</div>
                                                <div className="text-xs text-gray-600">Agotado</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-neuralops-dark-blue">Próximos Vencimientos</CardTitle>
                                    <CardDescription>Productos que requieren atención</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[
                                            { item: "Lubricante Shell Lote A", dias: 25, cantidad: 50, categoria: "Suministros" },
                                            { item: "Químicos Limpieza Lote B", dias: 45, cantidad: 30, categoria: "Suministros" },
                                            { item: "Soldadura E6013 Lote C", dias: 68, cantidad: 100, categoria: "Materias Primas" },
                                            { item: "Adhesivos 3M Lote D", dias: 85, cantidad: 25, categoria: "Suministros" },
                                        ].map((item, index) => (
                                            <div key={index} className="flex justify-between items-center p-2 bg-neuralops-beige/5 rounded">
                                                <div>
                                                    <div className="text-sm font-medium text-neuralops-dark-blue">{item.item}</div>
                                                    <div className="text-xs text-neuralops-medium-blue">{item.cantidad} unidades • {item.categoria}</div>
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

                        {/* Reporte de eficiencia adicional */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-neuralops-dark-blue">Proveedores Top</CardTitle>
                                    <CardDescription>Proveedores con mayor volumen de compras</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[
                                            { proveedor: "SKF Colombia", compras: "$2.8M", entregas: 95, confiabilidad: "Excelente" },
                                            { proveedor: "Acerias Paz del Rio", compras: "$2.1M", entregas: 88, confiabilidad: "Buena" },
                                            { proveedor: "Bosch Colombia", compras: "$1.6M", entregas: 92, confiabilidad: "Excelente" },
                                            { proveedor: "Shell Colombia", compras: "$1.2M", entregas: 85, confiabilidad: "Buena" },
                                        ].map((prov, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border border-neuralops-very-light-blue rounded">
                                                <div>
                                                    <p className="font-medium text-neuralops-dark-blue">{prov.proveedor}</p>
                                                    <p className="text-sm text-neuralops-medium-blue">{prov.entregas}% entregas a tiempo</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-neuralops-dark-blue">{prov.compras}</p>
                                                    <p className={`text-xs ${
                                                        prov.confiabilidad === 'Excelente' ? 'text-green-600' : 
                                                        prov.confiabilidad === 'Buena' ? 'text-blue-600' : 'text-yellow-600'
                                                    }`}>
                                                        {prov.confiabilidad}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-neuralops-dark-blue">Tendencias de Consumo</CardTitle>
                                    <CardDescription>Variación mensual por categoría</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { categoria: "Repuestos", tendencia: "↗", variacion: "+12%", color: "text-green-600" },
                                            { categoria: "Materias Primas", tendencia: "→", variacion: "+2%", color: "text-blue-600" },
                                            { categoria: "Herramientas", tendencia: "↘", variacion: "-5%", color: "text-red-600" },
                                            { categoria: "Suministros", tendencia: "↗", variacion: "+8%", color: "text-green-600" },
                                        ].map((cat, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-neuralops-beige/5 rounded">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{cat.tendencia}</span>
                                                    <span className="text-sm font-medium text-neuralops-dark-blue">{cat.categoria}</span>
                                                </div>
                                                <span className={`text-sm font-medium ${cat.color}`}>
                                                    {cat.variacion}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Nueva sección de Insights IA */}
                        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                            <CardHeader>
                                <CardTitle className="text-neuralops-dark-blue flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-purple-600" />
                                    Insights de Inteligencia Artificial
                                </CardTitle>
                                <CardDescription>Análisis automático y recomendaciones generadas por IA</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-2 bg-red-100 rounded-full">
                                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                            </div>
                                            <h4 className="font-medium text-red-700">Alertas Críticas</h4>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="p-2 bg-red-50 rounded border-l-2 border-red-200">
                                                <strong>Rodamiento SKF 6205:</strong> Stock se agotará en 12 días según patrón de consumo
                                            </div>
                                            <div className="p-2 bg-red-50 rounded border-l-2 border-red-200">
                                                <strong>Banda Transportadora:</strong> Solicitar inmediatamente - demanda inesperada detectada
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-2 bg-blue-100 rounded-full">
                                                <TrendingUp className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <h4 className="font-medium text-blue-700">Oportunidades</h4>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="p-2 bg-blue-50 rounded border-l-2 border-blue-200">
                                                <strong>Compra por volumen:</strong> Ahorrar $45,000 comprando ahora vs. compras mensuales
                                            </div>
                                            <div className="p-2 bg-blue-50 rounded border-l-2 border-blue-200">
                                                <strong>Negociación:</strong> SKF Colombia - momento óptimo para renovar contrato
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-2 bg-green-100 rounded-full">
                                                <Sparkles className="h-4 w-4 text-green-600" />
                                            </div>
                                            <h4 className="font-medium text-green-700">Optimizaciones</h4>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="p-2 bg-green-50 rounded border-l-2 border-green-200">
                                                <strong>Reorganización:</strong> Mover lubricantes a bodega principal - 30% menos tiempo de búsqueda
                                            </div>
                                            <div className="p-2 bg-green-50 rounded border-l-2 border-green-200">
                                                <strong>Automatización:</strong> 15 productos candidatos para reorden automático
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 bg-white p-4 rounded-lg border border-purple-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-medium text-purple-700 flex items-center gap-2">
                                            <Bot className="h-4 w-4" />
                                            Acciones Recomendadas por IA
                                        </h4>
                                        <Badge className="bg-purple-100 text-purple-700">Actualizado hace 2 horas</Badge>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Button variant="outline" className="justify-start border-purple-200 text-purple-700 hover:bg-purple-50">
                                            <Send className="h-4 w-4 mr-2" />
                                            Generar 3 solicitudes de compra urgentes
                                        </Button>
                                        <Button variant="outline" className="justify-start border-purple-200 text-purple-700 hover:bg-purple-50">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Programar revisión de contratos (Q4)
                                        </Button>
                                        <Button variant="outline" className="justify-start border-purple-200 text-purple-700 hover:bg-purple-50">
                                            <ArrowUpDown className="h-4 w-4 mr-2" />
                                            Optimizar ubicaciones de 23 items
                                        </Button>
                                        <Button variant="outline" className="justify-start border-purple-200 text-purple-700 hover:bg-purple-50">
                                            <Settings className="h-4 w-4 mr-2" />
                                            Configurar alertas automáticas
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
