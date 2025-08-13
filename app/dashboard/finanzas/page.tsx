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
    DollarSign,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    FileText,
    TrendingUp,
    TrendingDown,
    CreditCard,
    Banknote,
    Receipt,
    Calculator,
    PieChart,
    BarChart3,
    Download,
    Upload,
    CheckCircle,
    XCircle,
    Clock,
    Building,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft,
    Brain,
    Sparkles,
    LineChart,
    Target,
    AlertTriangle,
    ShieldCheck,
    Zap,
} from "lucide-react"

// Datos de ingresos
const ingresos = [
    {
        id: "ING-001",
        concepto: "Venta de servicios - TechCorp",
        categoria: "Servicios",
        monto: "$450,000",
        fecha: "2024-08-10",
        estado: "Pagado",
        cliente: "TechCorp S.A.",
        metodoPago: "Transferencia",
        factura: "F-001234",
        descripcion: "Mantenimiento equipos industriales",
    },
    {
        id: "ING-002",
        concepto: "Venta productos - InnovateXYZ",
        categoria: "Productos",
        monto: "$280,000",
        fecha: "2024-08-08",
        estado: "Pendiente",
        cliente: "InnovateXYZ",
        metodoPago: "Cheque",
        factura: "F-001235",
        descripcion: "Repuestos y componentes",
    },
    {
        id: "ING-003",
        concepto: "Consultoría - GlobalSolutions",
        categoria: "Consultoría",
        monto: "$125,000",
        fecha: "2024-08-05",
        estado: "Pagado",
        cliente: "GlobalSolutions",
        metodoPago: "Transferencia",
        factura: "F-001236",
        descripcion: "Asesoría técnica especializada",
    },
]

// Datos de egresos
const egresos = [
    {
        id: "EGR-001",
        concepto: "Compra materiales",
        categoria: "Materiales",
        monto: "$180,000",
        fecha: "2024-08-09",
        estado: "Pagado",
        proveedor: "Distribuidora Norte",
        metodoPago: "Transferencia",
        ordenCompra: "OC-2024-045",
        descripcion: "Materiales para producción",
    },
    {
        id: "EGR-002",
        concepto: "Nómina de empleados",
        categoria: "Personal",
        monto: "$850,000",
        fecha: "2024-08-01",
        estado: "Pagado",
        proveedor: "Nómina Interna",
        metodoPago: "Transferencia",
        ordenCompra: "NOM-2024-08",
        descripcion: "Sueldos y beneficios personal",
    },
    {
        id: "EGR-003",
        concepto: "Servicios básicos",
        categoria: "Servicios",
        monto: "$45,000",
        fecha: "2024-08-05",
        estado: "Vencido",
        proveedor: "Empresa Eléctrica",
        metodoPago: "Débito automático",
        ordenCompra: "SB-2024-08",
        descripcion: "Electricidad y agua",
    },
]

// Datos de presupuesto
const presupuesto = [
    {
        categoria: "Ingresos por Servicios",
        presupuestado: 2500000,
        ejecutado: 1850000,
        porcentaje: 74,
        variacion: "+8%",
        tipo: "ingreso",
    },
    {
        categoria: "Ingresos por Productos",
        presupuestado: 1200000,
        ejecutado: 980000,
        porcentaje: 82,
        variacion: "+5%",
        tipo: "ingreso",
    },
    {
        categoria: "Gastos de Personal",
        presupuestado: 1500000,
        ejecutado: 1275000,
        porcentaje: 85,
        variacion: "-3%",
        tipo: "egreso",
    },
    {
        categoria: "Gastos Operacionales",
        presupuestado: 800000,
        ejecutado: 650000,
        porcentaje: 81,
        variacion: "-5%",
        tipo: "egreso",
    },
]

// Datos de flujo de caja
const flujoCaja = [
    { mes: "Ene", ingresos: 1200000, egresos: 900000, flujo: 300000 },
    { mes: "Feb", ingresos: 1350000, egresos: 1050000, flujo: 300000 },
    { mes: "Mar", ingresos: 1180000, egresos: 1120000, flujo: 60000 },
    { mes: "Abr", ingresos: 1420000, egresos: 1180000, flujo: 240000 },
    { mes: "May", ingresos: 1580000, egresos: 1250000, flujo: 330000 },
    { mes: "Jun", ingresos: 1650000, egresos: 1380000, flujo: 270000 },
    { mes: "Jul", ingresos: 1750000, egresos: 1420000, flujo: 330000 },
    { mes: "Ago", ingresos: 1850000, egresos: 1550000, flujo: 300000 },
]

function StatsCard({ title, value, change, icon: Icon, changeType }: any) {
    return (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-neuralops-gold" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                    {changeType === 'positive' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {change} vs mes anterior
                </p>
            </CardContent>
        </Card>
    )
}

function FlujoCajaChart() {
    const maxValue = Math.max(...flujoCaja.map(item => Math.max(item.ingresos, item.egresos)))

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-neuralops-dark-blue">Flujo de Caja</CardTitle>
                <CardDescription>Ingresos vs Egresos mensuales</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {flujoCaja.slice(-6).map((item, index) => (
                        <div key={item.mes} className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium text-neuralops-dark-blue">{item.mes}</span>
                                <div className="flex gap-4">
                                    <span className="text-neuralops-gold font-medium">${(item.ingresos / 1000).toFixed(0)}K</span>
                                    <span className="text-neuralops-medium-blue font-medium">${(item.egresos / 1000).toFixed(0)}K</span>
                                    <span className={`font-bold ${item.flujo > 0 ? 'text-neuralops-dark-blue' : 'text-gray-600'}`}>
                                        ${(item.flujo / 1000).toFixed(0)}K
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1 h-6">
                                <div
                                    className="bg-neuralops-gold rounded-l"
                                    style={{ width: `${(item.ingresos / maxValue) * 100}%` }}
                                />
                                <div
                                    className="bg-neuralops-medium-blue rounded-r"
                                    style={{ width: `${(item.egresos / maxValue) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-neuralops-gold rounded"></div>
                        <span className="text-neuralops-medium-blue">Ingresos</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-neuralops-medium-blue rounded"></div>
                        <span className="text-neuralops-medium-blue">Egresos</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function PresupuestoChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-neuralops-dark-blue">Ejecución Presupuestaria</CardTitle>
                <CardDescription>Presupuestado vs Ejecutado</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {presupuesto.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-neuralops-dark-blue">{item.categoria}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-neuralops-medium-blue">
                                        ${(item.ejecutado / 1000).toFixed(0)}K / ${(item.presupuestado / 1000).toFixed(0)}K
                                    </span>
                                    <span className={`text-xs font-medium ${item.variacion.startsWith('+') ? 'text-neuralops-dark-blue' : 'text-gray-600'}`}>
                                        {item.variacion}
                                    </span>
                                </div>
                            </div>
                            <div className="w-full bg-neuralops-very-light-blue rounded-full h-3 relative overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${item.tipo === 'ingreso' ? 'bg-neuralops-gold' : 'bg-neuralops-medium-blue'
                                        }`}
                                    style={{ width: `${item.porcentaje}%` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                                </div>
                            </div>
                            <div className="text-right text-xs text-neuralops-medium-blue">
                                {item.porcentaje}% ejecutado
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default function FinanzasPage() {
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
    const [isNewIngresoOpen, setIsNewIngresoOpen] = useState(false)
    const [isNewEgresoOpen, setIsNewEgresoOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    
    // Estados para IA - Estilo Inventario
    const [isAnalisisOpen, setIsAnalisisOpen] = useState(false)
    const [isPrediccionOpen, setIsPrediccionOpen] = useState(false)
    const [isRiesgoOpen, setIsRiesgoOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pagado":
                return "bg-green-100 text-green-800 border-green-200"
            case "Pendiente":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "Vencido":
                return "bg-red-100 text-red-800 border-red-200"
            case "Cancelado":
                return "bg-gray-100 text-gray-800 border-gray-200"
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
                            <h1 className="text-3xl font-bold mb-2">Módulo de Finanzas</h1>
                            <p className="text-neuralops-beige text-lg">Control financiero integral, presupuesto y flujo de caja</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <DollarSign className="h-8 w-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Actions */}
                <div className="flex justify-end items-center mb-6">
                    <div className="flex gap-2">
                        <Dialog open={isNewIngresoOpen} onOpenChange={setIsNewIngresoOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                                    <ArrowUpRight className="h-4 w-4 mr-2" />
                                    Registrar Ingreso
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Registrar Nuevo Ingreso</DialogTitle>
                                    <DialogDescription>
                                        Registra un ingreso en el sistema financiero
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="concepto-ingreso">Concepto</Label>
                                        <Input id="concepto-ingreso" placeholder="Ej: Venta de servicios" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="categoria-ingreso">Categoría</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar categoría" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="servicios">Servicios</SelectItem>
                                                <SelectItem value="productos">Productos</SelectItem>
                                                <SelectItem value="consultoria">Consultoría</SelectItem>
                                                <SelectItem value="otros">Otros</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="monto-ingreso">Monto</Label>
                                        <Input id="monto-ingreso" placeholder="$450,000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cliente-ingreso">Cliente</Label>
                                        <Input id="cliente-ingreso" placeholder="Nombre del cliente" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fecha-ingreso">Fecha</Label>
                                        <Input id="fecha-ingreso" type="date" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="metodo-pago">Método de Pago</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar método" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="transferencia">Transferencia</SelectItem>
                                                <SelectItem value="cheque">Cheque</SelectItem>
                                                <SelectItem value="efectivo">Efectivo</SelectItem>
                                                <SelectItem value="tarjeta">Tarjeta</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="factura">N° Factura</Label>
                                        <Input id="factura" placeholder="F-001234" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="estado-ingreso">Estado</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pagado">Pagado</SelectItem>
                                                <SelectItem value="pendiente">Pendiente</SelectItem>
                                                <SelectItem value="vencido">Vencido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="descripcion-ingreso">Descripción</Label>
                                        <Textarea id="descripcion-ingreso" placeholder="Descripción del ingreso..." />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsNewIngresoOpen(false)}>
                                        Cancelar
                                    </Button>
                                    <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                                        Registrar Ingreso
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isNewEgresoOpen} onOpenChange={setIsNewEgresoOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white">
                                    <ArrowDownLeft className="h-4 w-4 mr-2" />
                                    Registrar Egreso
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Registrar Nuevo Egreso</DialogTitle>
                                    <DialogDescription>
                                        Registra un egreso en el sistema financiero
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="concepto-egreso">Concepto</Label>
                                        <Input id="concepto-egreso" placeholder="Ej: Compra de materiales" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="categoria-egreso">Categoría</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar categoría" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="materiales">Materiales</SelectItem>
                                                <SelectItem value="personal">Personal</SelectItem>
                                                <SelectItem value="servicios">Servicios</SelectItem>
                                                <SelectItem value="equipos">Equipos</SelectItem>
                                                <SelectItem value="otros">Otros</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="monto-egreso">Monto</Label>
                                        <Input id="monto-egreso" placeholder="$180,000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="proveedor">Proveedor</Label>
                                        <Input id="proveedor" placeholder="Nombre del proveedor" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fecha-egreso">Fecha</Label>
                                        <Input id="fecha-egreso" type="date" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="metodo-pago-egreso">Método de Pago</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar método" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="transferencia">Transferencia</SelectItem>
                                                <SelectItem value="cheque">Cheque</SelectItem>
                                                <SelectItem value="efectivo">Efectivo</SelectItem>
                                                <SelectItem value="debito">Débito automático</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="orden-compra">Orden de Compra</Label>
                                        <Input id="orden-compra" placeholder="OC-2024-045" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="estado-egreso">Estado</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pagado">Pagado</SelectItem>
                                                <SelectItem value="pendiente">Pendiente</SelectItem>
                                                <SelectItem value="vencido">Vencido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="descripcion-egreso">Descripción</Label>
                                        <Textarea id="descripcion-egreso" placeholder="Descripción del egreso..." />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsNewEgresoOpen(false)}>
                                        Cancelar
                                    </Button>
                                    <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                                        Registrar Egreso
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
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
                            Análisis Financiero
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsPrediccionOpen(true)}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                        >
                            <LineChart className="h-4 w-4 mr-2 text-blue-500" />
                            Predicción Flujo
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsRiesgoOpen(true)}
                            className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400"
                        >
                            <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                            Evaluación Riesgo
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Ingresos del Mes"
                        value="$1,850,000"
                        change="+12%"
                        changeType="positive"
                        icon={TrendingUp}
                    />
                    <StatsCard
                        title="Egresos del Mes"
                        value="$1,550,000"
                        change="+8%"
                        changeType="negative"
                        icon={TrendingDown}
                    />
                    <StatsCard
                        title="Flujo Neto"
                        value="$300,000"
                        change="+15%"
                        changeType="positive"
                        icon={DollarSign}
                    />
                    <StatsCard
                        title="Cuentas por Cobrar"
                        value="$485,000"
                        change="-5%"
                        changeType="negative"
                        icon={Receipt}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FlujoCajaChart />
                    <PresupuestoChart />
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="ingresos" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4 bg-neuralops-very-light-blue">
                        <TabsTrigger value="ingresos" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Ingresos
                        </TabsTrigger>
                        <TabsTrigger value="egresos" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Egresos
                        </TabsTrigger>
                        <TabsTrigger value="presupuesto" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Presupuesto
                        </TabsTrigger>
                        <TabsTrigger value="reportes" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
                            Reportes
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="ingresos" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-neuralops-dark-blue">Gestión de Ingresos</CardTitle>
                                        <CardDescription>Registro y seguimiento de ingresos</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neuralops-medium-blue" />
                                            <Input
                                                placeholder="Buscar ingresos..."
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
                                                <SelectItem value="all">Todos los estados</SelectItem>
                                                <SelectItem value="Pagado">Pagado</SelectItem>
                                                <SelectItem value="Pendiente">Pendiente</SelectItem>
                                                <SelectItem value="Vencido">Vencido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Concepto</TableHead>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Categoría</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Factura</TableHead>
                                            <TableHead className="w-20">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {ingresos.map((ingreso) => (
                                            <TableRow key={ingreso.id} className="hover:bg-neuralops-beige/5">
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium text-neuralops-dark-blue">{ingreso.concepto}</div>
                                                        <div className="text-sm text-neuralops-medium-blue">{ingreso.id}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-neuralops-dark-blue">{ingreso.cliente}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-neuralops-gold text-neuralops-gold">
                                                        {ingreso.categoria}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-medium text-neuralops-dark-blue">{ingreso.monto}</TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(ingreso.estado)}>
                                                        {ingreso.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-neuralops-medium-blue">{ingreso.fecha}</TableCell>
                                                <TableCell className="text-neuralops-dark-blue">{ingreso.factura}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => setSelectedTransaction(ingreso)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Ver detalles
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Editar
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <FileText className="mr-2 h-4 w-4" />
                                                                Ver factura
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Download className="mr-2 h-4 w-4" />
                                                                Descargar PDF
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

                    <TabsContent value="egresos" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-neuralops-dark-blue">Gestión de Egresos</CardTitle>
                                <CardDescription>Registro y seguimiento de gastos</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Concepto</TableHead>
                                            <TableHead>Proveedor</TableHead>
                                            <TableHead>Categoría</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Orden</TableHead>
                                            <TableHead className="w-20">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {egresos.map((egreso) => (
                                            <TableRow key={egreso.id} className="hover:bg-neuralops-beige/5">
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium text-neuralops-dark-blue">{egreso.concepto}</div>
                                                        <div className="text-sm text-neuralops-medium-blue">{egreso.id}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-neuralops-dark-blue">{egreso.proveedor}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-red-500 text-red-600">
                                                        {egreso.categoria}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-medium text-neuralops-dark-blue">{egreso.monto}</TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(egreso.estado)}>
                                                        {egreso.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-neuralops-medium-blue">{egreso.fecha}</TableCell>
                                                <TableCell className="text-neuralops-dark-blue">{egreso.ordenCompra}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => setSelectedTransaction(egreso)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Ver detalles
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Editar
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <FileText className="mr-2 h-4 w-4" />
                                                                Ver comprobante
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Marcar como pagado
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

                    <TabsContent value="presupuesto" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-neuralops-dark-blue">Control Presupuestario</CardTitle>
                                <CardDescription>Seguimiento de ejecución presupuestaria por categoría</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {presupuesto.map((item, index) => (
                                        <div key={index} className="border border-neuralops-very-light-blue rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-medium text-neuralops-dark-blue">{item.categoria}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-medium ${item.variacion.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                                        {item.variacion}
                                                    </span>
                                                    <Badge className={item.tipo === 'ingreso' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                                                        {item.tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <p className="text-sm text-neuralops-medium-blue">Presupuestado</p>
                                                    <p className="font-medium text-neuralops-dark-blue">${(item.presupuestado / 1000).toFixed(0)}K</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-neuralops-medium-blue">Ejecutado</p>
                                                    <p className="font-medium text-neuralops-dark-blue">${(item.ejecutado / 1000).toFixed(0)}K</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-neuralops-medium-blue">Disponible</p>
                                                    <p className="font-medium text-neuralops-dark-blue">${((item.presupuestado - item.ejecutado) / 1000).toFixed(0)}K</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-neuralops-medium-blue">Progreso</span>
                                                    <span className="font-medium text-neuralops-dark-blue">{item.porcentaje}%</span>
                                                </div>
                                                <div className="w-full bg-neuralops-very-light-blue rounded-full h-3">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${item.porcentaje > 90
                                                                ? 'bg-red-500'
                                                                : item.porcentaje > 70
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-green-500'
                                                            }`}
                                                        style={{ width: `${Math.min(item.porcentaje, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reportes" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-neuralops-dark-blue">Reportes Disponibles</CardTitle>
                                    <CardDescription>Genera reportes financieros detallados</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[
                                            { name: "Estado de Resultados", description: "Ingresos y gastos del período", icon: BarChart3 },
                                            { name: "Flujo de Caja", description: "Movimientos de efectivo", icon: TrendingUp },
                                            { name: "Balance General", description: "Situación financiera actual", icon: Calculator },
                                            { name: "Análisis Presupuestario", description: "Comparativo presupuesto vs real", icon: PieChart },
                                            { name: "Cuentas por Cobrar", description: "Facturas pendientes de pago", icon: Receipt },
                                            { name: "Cuentas por Pagar", description: "Obligaciones pendientes", icon: CreditCard },
                                        ].map((report, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border border-neuralops-very-light-blue rounded-lg hover:bg-neuralops-beige/5">
                                                <div className="flex items-center gap-3">
                                                    <report.icon className="h-5 w-5 text-neuralops-gold" />
                                                    <div>
                                                        <p className="font-medium text-neuralops-dark-blue">{report.name}</p>
                                                        <p className="text-sm text-neuralops-medium-blue">{report.description}</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" className="border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white">
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Generar
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-neuralops-dark-blue">Resumen Financiero</CardTitle>
                                    <CardDescription>Indicadores clave del mes</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                                <p className="text-sm text-green-600">Total Ingresos</p>
                                                <p className="text-xl font-bold text-green-700">$1,850K</p>
                                            </div>
                                            <div className="text-center p-3 bg-red-50 rounded-lg">
                                                <p className="text-sm text-red-600">Total Egresos</p>
                                                <p className="text-xl font-bold text-red-700">$1,550K</p>
                                            </div>
                                        </div>

                                        <div className="text-center p-4 bg-neuralops-beige/20 rounded-lg">
                                            <p className="text-sm text-neuralops-medium-blue">Utilidad Neta</p>
                                            <p className="text-2xl font-bold text-neuralops-dark-blue">$300,000</p>
                                            <p className="text-sm text-green-600">+15% vs mes anterior</p>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-neuralops-medium-blue">Margen de Utilidad</span>
                                                <span className="font-medium text-neuralops-dark-blue">16.2%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-neuralops-medium-blue">Rotación de Cuentas por Cobrar</span>
                                                <span className="font-medium text-neuralops-dark-blue">45 días</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-neuralops-medium-blue">Liquidez Corriente</span>
                                                <span className="font-medium text-neuralops-dark-blue">2.1</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-neuralops-medium-blue">ROI Mensual</span>
                                                <span className="font-medium text-green-600">+8.5%</span>
                                            </div>
                                        </div>
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
