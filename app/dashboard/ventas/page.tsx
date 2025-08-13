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
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Target,
  Users,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  MapPin,
  Building,
  UserPlus,
  ArrowRight,
  Zap,
  Handshake,
  Brain,
  Sparkles,
  Upload,
  BarChart3,
  Bot,
  Scan,
  MessageSquare,
} from "lucide-react"

// Estadísticas
const stats = [
  {
    title: "Leads Totales",
    value: "127",
    change: "+12%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Oportunidades Activas",
    value: "24",
    change: "+8%",
    changeType: "positive",
    icon: Target,
  },
  {
    title: "Pipeline Value",
    value: "$485,000",
    change: "+15%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Tasa de Conversión",
    value: "18.5%",
    change: "+2.3%",
    changeType: "positive",
    icon: TrendingUp,
  },
]

// Datos de leads
const leads = [
  {
    id: 1,
    name: "Ana Rodríguez",
    email: "ana@techcorp.com",
    company: "TechCorp S.A.",
    phone: "+57 304 581 6324",
    status: "Calificado",
    value: "$45,000",
    probability: 75,
    source: "Website",
    lastContact: "2024-08-10",
    nextAction: "Enviar propuesta",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Carlos López",
    email: "carlos@innovatelab.co",
    company: "InnovateLab",
    phone: "+57 302 345 6789",
    status: "Negociación",
    value: "$32,000",
    probability: 85,
    source: "Referido",
    lastContact: "2024-08-09",
    nextAction: "Reunión de cierre",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "María González",
    email: "maria@globalsolut.com",
    company: "GlobalSolutions",
    phone: "+57 303 456 7890",
    status: "Prospecto",
    value: "$28,000",
    probability: 60,
    source: "LinkedIn",
    lastContact: "2024-08-08",
    nextAction: "Llamada de seguimiento",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Funnel data
const funnelStages = [
  { stage: "Leads", count: 45, value: "$450,000", color: "bg-blue-500", percentage: 100 },
  { stage: "Calificados", count: 32, value: "$320,000", color: "bg-indigo-500", percentage: 71 },
  { stage: "Propuestas", count: 18, value: "$270,000", color: "bg-purple-500", percentage: 60 },
  { stage: "Negociación", count: 12, value: "$180,000", color: "bg-pink-500", percentage: 40 },
  { stage: "Cerrados", count: 8, value: "$120,000", color: "bg-green-500", percentage: 27 },
]

// Actividades recientes
const recentActivities = [
  { id: 1, type: "call", description: "Llamada con Ana Rodríguez - TechCorp", time: "Hace 2 horas", user: "Juan Pérez", status: "completed" },
  { id: 2, type: "email", description: "Propuesta enviada a GlobalSolutions", time: "Hace 4 horas", user: "María González", status: "sent" },
  { id: 3, type: "meeting", description: "Reunión programada con InnovateLab", time: "Hace 6 horas", user: "Carlos López", status: "scheduled" },
  { id: 4, type: "deal", description: "Oportunidad creada - StartupXYZ", time: "Hace 1 día", user: "Ana Martínez", status: "created" },
]

// Datos de oportunidades actualizadas
const opportunities = [
  {
    id: 1,
    client: "TechCorp S.A.",
    project: "Implementación ERP",
    value: 120000,
    stage: "Negociación",
    probability: 85,
    closingDate: "2024-08-25",
  },
  {
    id: 2,
    client: "InnovateLab",
    project: "Consultoría Digital",
    value: 85000,
    stage: "Propuesta",
    probability: 70,
    closingDate: "2024-09-15",
  },
  {
    id: 3,
    client: "GlobalSolutions",
    project: "Desarrollo App Móvil",
    value: 95000,
    stage: "Calificación",
    probability: 60,
    closingDate: "2024-10-05",
  },
  {
    id: 4,
    client: "StartupXYZ",
    project: "Plataforma E-commerce",
    value: 150000,
    stage: "Propuesta",
    probability: 75,
    closingDate: "2024-09-30",
  },
  {
    id: 5,
    client: "Corporación ABC",
    project: "Sistema de Gestión",
    value: 200000,
    stage: "Cerrado",
    probability: 95,
    closingDate: "2024-08-20",
  },
]

// Datos de pipeline mensual
const pipelineData = [
  { month: "Enero", opportunities: 8, value: 145000 },
  { month: "Febrero", opportunities: 12, value: 168000 },
  { month: "Marzo", opportunities: 15, value: 192000 },
  { month: "Abril", opportunities: 10, value: 156000 },
  { month: "Mayo", opportunities: 18, value: 234000 },
  { month: "Junio", opportunities: 22, value: 278000 },
]

function FunnelChart() {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-neuralops-dark-blue">Embudo de Ventas</CardTitle>
        <CardDescription>Pipeline de conversión actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelStages.map((stage) => (
            <div key={stage.stage} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neuralops-dark-blue">{stage.stage}</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-neuralops-dark-blue">{stage.count} leads</div>
                  <div className="text-xs text-neuralops-medium-blue">{stage.value}</div>
                </div>
              </div>
              <div className="w-full bg-neuralops-very-light-blue rounded-full h-3 relative overflow-hidden">
                <div
                  className={`h-full ${stage.color} transition-all duration-500 relative`}
                  style={{ width: `${stage.percentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RecentActivities() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />
      case "email": return <Mail className="h-4 w-4" />
      case "meeting": return <Calendar className="h-4 w-4" />
      case "deal": return <Handshake className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600"
      case "sent": return "text-blue-600"
      case "scheduled": return "text-yellow-600"
      case "created": return "text-purple-600"
      default: return "text-neuralops-medium-blue"
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-neuralops-dark-blue">Actividades Recientes</CardTitle>
        <CardDescription>Últimas acciones del equipo de ventas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className={`p-2 rounded-full bg-neuralops-beige/20 ${getActivityColor(activity.status)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neuralops-dark-blue truncate">{activity.description}</p>
                <p className="text-xs text-neuralops-medium-blue">{activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function VentasPage() {
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false)
  const [isNewOpportunityOpen, setIsNewOpportunityOpen] = useState(false)
  const [isCreateOpportunityOpen, setIsCreateOpportunityOpen] = useState(false)
  const [isLeadDetailsOpen, setIsLeadDetailsOpen] = useState(false)
  const [isOpportunityDetailsOpen, setIsOpportunityDetailsOpen] = useState(false)
  const [isEditLeadOpen, setIsEditLeadOpen] = useState(false)
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isCreateLeadOpen, setIsCreateLeadOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    source: "",
    notes: "",
  })
  const [newOpportunity, setNewOpportunity] = useState({
    title: "",
    client: "",
    project: "",
    value: "",
    stage: "Calificación",
    probability: 50,
    expectedClose: "",
    closingDate: "",
    description: "",
  })
  const [callData, setCallData] = useState({
    type: "Saliente",
    duration: 0,
    notes: "",
    followUp: "No",
  })
  const [callNotes, setCallNotes] = useState("")
  const [emailContent, setEmailContent] = useState({
    subject: "",
    body: "",
  })

  // Estados para funcionalidades de IA
  const [isLeadScoringOpen, setIsLeadScoringOpen] = useState(false)
  const [isPredictiveOpen, setIsPredictiveOpen] = useState(false)
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nuevo": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Prospecto": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Calificado": return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Negociación": return "bg-purple-100 text-purple-800 border-purple-200"
      case "Propuesta": return "bg-orange-100 text-orange-800 border-orange-200"
      case "Cerrado": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating lead:", newLead)
    setIsCreateLeadOpen(false)
    setNewLead({
      name: "",
      email: "",
      company: "",
      phone: "",
      source: "",
      notes: "",
    })
  }

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating opportunity:", newOpportunity)
    setIsCreateOpportunityOpen(false)
    setNewOpportunity({
      title: "",
      client: "",
      project: "",
      value: "",
      stage: "Calificación",
      probability: 50,
      expectedClose: "",
      closingDate: "",
      description: "",
    })
  }

  const handleCall = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Call data:", callData)
    setIsCallModalOpen(false)
    setCallData({
      type: "Saliente",
      duration: 0,
      notes: "",
      followUp: "No",
    })
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email content:", emailContent)
    setIsEmailModalOpen(false)
    setEmailContent({
      subject: "",
      body: "",
    })
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Módulo de Ventas</h1>
              <p className="text-neuralops-beige text-lg">Gestiona tu pipeline, leads y oportunidades de venta</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Botones de IA - Estilo Inventario */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsLeadScoringOpen(true)}
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-white/10 backdrop-blur-sm"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Scoring
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsPredictiveOpen(true)}
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-white/10 backdrop-blur-sm"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Predictivo
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsPersonalizationOpen(true)}
                  className="border-green-300 text-green-600 hover:bg-green-50 bg-white/10 backdrop-blur-sm"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Personalización
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 -mt-4">
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <Dialog open={isNewLeadOpen} onOpenChange={setIsNewLeadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Lead</DialogTitle>
                <DialogDescription>Agrega un nuevo prospecto al sistema</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input 
                    id="nombre" 
                    placeholder="Juan Pérez" 
                    value={newLead.name}
                    onChange={(e) => setNewLead(prev => ({...prev, name: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa *</Label>
                  <Input 
                    id="empresa" 
                    placeholder="Empresa ABC" 
                    value={newLead.company}
                    onChange={(e) => setNewLead(prev => ({...prev, company: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="juan@empresa.com" 
                    value={newLead.email}
                    onChange={(e) => setNewLead(prev => ({...prev, email: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input 
                    id="telefono" 
                    placeholder="+57 300 123 4567" 
                    value={newLead.phone}
                    onChange={(e) => setNewLead(prev => ({...prev, phone: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">Fuente</Label>
                  <Select value={newLead.source} onValueChange={(value) => setNewLead(prev => ({...prev, source: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Referido">Referido</SelectItem>
                      <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                      <SelectItem value="Llamada Fría">Llamada Fría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Notas adicionales..." 
                    value={newLead.notes}
                    onChange={(e) => setNewLead(prev => ({...prev, notes: e.target.value}))}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewLeadOpen(false)}>Cancelar</Button>
                <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90" onClick={handleCreateLead}>Crear Lead</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isNewOpportunityOpen} onOpenChange={setIsNewOpportunityOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white">
                <Target className="h-4 w-4 mr-2" />
                Nueva Oportunidad
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nueva Oportunidad</DialogTitle>
                <DialogDescription>Convierte un lead en oportunidad de negocio</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Proyecto *</Label>
                  <Input 
                    id="titulo" 
                    placeholder="Proyecto ABC" 
                    value={newOpportunity.project}
                    onChange={(e) => setNewOpportunity(prev => ({...prev, project: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente *</Label>
                  <Input 
                    id="cliente" 
                    placeholder="Empresa XYZ" 
                    value={newOpportunity.client}
                    onChange={(e) => setNewOpportunity(prev => ({...prev, client: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor Estimado *</Label>
                  <Input 
                    id="valor" 
                    placeholder="$50,000,000" 
                    value={newOpportunity.value}
                    onChange={(e) => setNewOpportunity(prev => ({...prev, value: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="probability">Probabilidad (%)</Label>
                  <Input 
                    id="probability" 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={newOpportunity.probability}
                    onChange={(e) => setNewOpportunity(prev => ({...prev, probability: Number(e.target.value)}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedClose">Fecha Esperada de Cierre</Label>
                  <Input 
                    id="expectedClose" 
                    type="date" 
                    value={newOpportunity.expectedClose}
                    onChange={(e) => setNewOpportunity(prev => ({...prev, expectedClose: e.target.value}))}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe la oportunidad..." 
                    value={newOpportunity.description}
                    onChange={(e) => setNewOpportunity(prev => ({...prev, description: e.target.value}))}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewOpportunityOpen(false)}>Cancelar</Button>
                <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90" onClick={handleCreateOpportunity}>Crear Oportunidad</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neuralops-medium-blue">{stat.title}</p>
                    <p className="text-2xl font-bold text-neuralops-dark-blue">{stat.value}</p>
                    <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <FunnelChart />
          <RecentActivities />
          
          {/* Quick Actions */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-neuralops-dark-blue">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-neuralops-gold/10 text-neuralops-gold hover:bg-neuralops-gold hover:text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Importar Leads
              </Button>
              <Button className="w-full justify-start bg-neuralops-gold/10 text-neuralops-gold hover:bg-neuralops-gold hover:text-white">
                <FileText className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
              <Button className="w-full justify-start bg-neuralops-gold/10 text-neuralops-gold hover:bg-neuralops-gold hover:text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Programar Seguimiento
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="leads" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
              <Target className="h-4 w-4 mr-2" />
              Oportunidades
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-neuralops-gold data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Pipeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-neuralops-dark-blue">Gestión de Leads</CardTitle>
                    <CardDescription>Prospectos y contactos comerciales</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Buscar leads..." className="w-64" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Nuevo">Nuevo</SelectItem>
                        <SelectItem value="Calificado">Calificado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Probabilidad</TableHead>
                      <TableHead>Última Actividad</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-neuralops-beige/5">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={lead.avatar} />
                              <AvatarFallback className="bg-neuralops-gold text-white">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-neuralops-dark-blue">{lead.name}</div>
                              <div className="text-sm text-neuralops-medium-blue">{lead.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-neuralops-dark-blue">{lead.company}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                        </TableCell>
                        <TableCell className="font-medium text-neuralops-dark-blue">{lead.value}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-neuralops-dark-blue">{lead.probability}%</div>
                            <div className="w-16 bg-neuralops-very-light-blue rounded-full h-2">
                              <div 
                                className="bg-neuralops-gold h-2 rounded-full" 
                                style={{ width: `${lead.probability}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-neuralops-medium-blue">{lead.lastContact}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                setSelectedLead(lead)
                                setIsLeadDetailsOpen(true)
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedLead(lead)
                                setIsEditLeadOpen(true)
                              }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedLead(lead)
                                setIsCallModalOpen(true)
                              }}>
                                <Phone className="mr-2 h-4 w-4" />
                                Llamar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedLead(lead)
                                setEmailContent({
                                  subject: `Seguimiento - ${lead.company}`,
                                  body: `Hola ${lead.name},\n\nEspero que te encuentres bien. Quería hacer seguimiento sobre...`
                                })
                                setIsEmailModalOpen(true)
                              }}>
                                <Mail className="mr-2 h-4 w-4" />
                                Enviar email
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

          <TabsContent value="opportunities" className="space-y-6">
            {/* <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Oportunidades</h2>
              <Button onClick={() => setIsCreateOpportunityOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Oportunidad
              </Button>
            </div> */}

            <Card>
              <CardHeader>
                <CardTitle>Lista de Oportunidades</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Proyecto</TableHead>
                      <TableHead>Valor Estimado</TableHead>
                      <TableHead>Etapa</TableHead>
                      <TableHead>Probabilidad</TableHead>
                      <TableHead>Fecha Estimada</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell className="font-medium">{opportunity.client}</TableCell>
                        <TableCell>{opportunity.project}</TableCell>
                        <TableCell>${opportunity.value.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              opportunity.stage === 'Calificación' ? 'outline' :
                              opportunity.stage === 'Propuesta' ? 'secondary' :
                              opportunity.stage === 'Negociación' ? 'default' :
                              'destructive'
                            }
                          >
                            {opportunity.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>{opportunity.probability}%</TableCell>
                        <TableCell>{opportunity.closingDate}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                setSelectedOpportunity(opportunity)
                                setIsOpportunityDetailsOpen(true)
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Generar propuesta
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

          <TabsContent value="pipeline" className="space-y-6">
            <h2 className="text-2xl font-bold">Análisis del Pipeline</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Oportunidades Totales</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{opportunities.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor Total Pipeline</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${opportunities.reduce((sum, opp) => sum + opp.value, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +15% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24%</div>
                  <p className="text-xs text-muted-foreground">
                    +3% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Promedio de Cierre</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45 días</div>
                  <p className="text-xs text-muted-foreground">
                    -5 días desde el mes pasado
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Etapa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Calificación', 'Propuesta', 'Negociación', 'Cerrado'].map((stage) => {
                      const stageOpps = opportunities.filter(opp => opp.stage === stage)
                      const percentage = (stageOpps.length / opportunities.length) * 100
                      return (
                        <div key={stage} className="flex items-center">
                          <div className="w-24 text-sm">{stage}</div>
                          <div className="flex-1 mx-4">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-neuralops-medium-blue h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 text-sm text-right">{stageOpps.length} ({Math.round(percentage)}%)</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento Mensual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pipelineData.map((month, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{month.month}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">
                            {month.opportunities} oportunidades
                          </span>
                          <span className="text-sm font-bold">
                            ${month.value?.toLocaleString() || '0'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        
        {/* Create Lead Modal */}
        <Dialog open={isCreateLeadOpen} onOpenChange={setIsCreateLeadOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Lead</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leadName">Nombre</Label>
                <Input
                  id="leadName"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadEmail">Email</Label>
                <Input
                  id="leadEmail"
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadPhone">Teléfono</Label>
                <Input
                  id="leadPhone"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadCompany">Empresa</Label>
                <Input
                  id="leadCompany"
                  value={newLead.company}
                  onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadSource">Fuente</Label>
                <select
                  id="leadSource"
                  value={newLead.source}
                  onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Web">Web</option>
                  <option value="Referido">Referido</option>
                  <option value="Llamada Fría">Llamada Fría</option>
                  <option value="Evento">Evento</option>
                  <option value="Redes Sociales">Redes Sociales</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateLeadOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Crear Lead</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Lead Details Modal */}
        <Dialog open={isLeadDetailsOpen} onOpenChange={setIsLeadDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles del Lead</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Nombre</Label>
                    <p className="text-sm text-muted-foreground">{selectedLead.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">{selectedLead.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Teléfono</Label>
                    <p className="text-sm text-muted-foreground">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Empresa</Label>
                    <p className="text-sm text-muted-foreground">{selectedLead.company}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Fuente</Label>
                    <p className="text-sm text-muted-foreground">{selectedLead.source}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Estado</Label>
                    <Badge variant={selectedLead.status === 'Nuevo' ? 'default' : 'secondary'}>
                      {selectedLead.status}
                    </Badge>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium">Historial de Actividad</Label>
                  <div className="mt-2 space-y-2">
                    <div className="text-sm p-2 bg-gray-50 rounded">
                      <span className="font-medium">Creado:</span> {selectedLead.createdAt}
                    </div>
                    <div className="text-sm p-2 bg-gray-50 rounded">
                      <span className="font-medium">Última actividad:</span> Hace 2 días
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Lead Modal */}
        <Dialog open={isEditLeadOpen} onOpenChange={setIsEditLeadOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Lead</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editLeadName">Nombre</Label>
                  <Input
                    id="editLeadName"
                    defaultValue={selectedLead.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editLeadEmail">Email</Label>
                  <Input
                    id="editLeadEmail"
                    type="email"
                    defaultValue={selectedLead.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editLeadPhone">Teléfono</Label>
                  <Input
                    id="editLeadPhone"
                    defaultValue={selectedLead.phone}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editLeadCompany">Empresa</Label>
                  <Input
                    id="editLeadCompany"
                    defaultValue={selectedLead.company}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editLeadStatus">Estado</Label>
                  <select
                    id="editLeadStatus"
                    defaultValue={selectedLead.status}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Calificado">Calificado</option>
                    <option value="Convertido">Convertido</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsEditLeadOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Guardar Cambios</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Opportunity Modal */}
        <Dialog open={isCreateOpportunityOpen} onOpenChange={setIsCreateOpportunityOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Nueva Oportunidad</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateOpportunity} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oppClient">Cliente</Label>
                <Input
                  id="oppClient"
                  value={newOpportunity.client}
                  onChange={(e) => setNewOpportunity({...newOpportunity, client: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oppProject">Proyecto</Label>
                <Input
                  id="oppProject"
                  value={newOpportunity.project}
                  onChange={(e) => setNewOpportunity({...newOpportunity, project: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oppValue">Valor Estimado</Label>
                <Input
                  id="oppValue"
                  type="number"
                  value={newOpportunity.value}
                  onChange={(e) => setNewOpportunity({...newOpportunity, value: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oppStage">Etapa</Label>
                <select
                  id="oppStage"
                  value={newOpportunity.stage}
                  onChange={(e) => setNewOpportunity({...newOpportunity, stage: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Calificación">Calificación</option>
                  <option value="Propuesta">Propuesta</option>
                  <option value="Negociación">Negociación</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="oppProbability">Probabilidad (%)</Label>
                <Input
                  id="oppProbability"
                  type="number"
                  min="0"
                  max="100"
                  value={newOpportunity.probability}
                  onChange={(e) => setNewOpportunity({...newOpportunity, probability: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oppClosingDate">Fecha Estimada de Cierre</Label>
                <Input
                  id="oppClosingDate"
                  type="date"
                  value={newOpportunity.closingDate}
                  onChange={(e) => setNewOpportunity({...newOpportunity, closingDate: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpportunityOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Crear Oportunidad</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Opportunity Details Modal */}
        <Dialog open={isOpportunityDetailsOpen} onOpenChange={setIsOpportunityDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles de la Oportunidad</DialogTitle>
            </DialogHeader>
            {selectedOpportunity && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Cliente</Label>
                    <p className="text-sm text-muted-foreground">{selectedOpportunity.client}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Proyecto</Label>
                    <p className="text-sm text-muted-foreground">{selectedOpportunity.project}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Valor Estimado</Label>
                    <p className="text-sm text-muted-foreground">${selectedOpportunity.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Etapa</Label>
                    <Badge>{selectedOpportunity.stage}</Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Probabilidad</Label>
                    <p className="text-sm text-muted-foreground">{selectedOpportunity.probability}%</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Fecha de Cierre</Label>
                    <p className="text-sm text-muted-foreground">{selectedOpportunity.closingDate}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium">Notas y Actividades</Label>
                  <div className="mt-2 space-y-2">
                    <div className="text-sm p-2 bg-gray-50 rounded">
                      <span className="font-medium">Reunión inicial:</span> Discutimos los requerimientos básicos del proyecto
                    </div>
                    <div className="text-sm p-2 bg-gray-50 rounded">
                      <span className="font-medium">Seguimiento:</span> Cliente solicitó propuesta técnica detallada
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Call Modal */}
        <Dialog open={isCallModalOpen} onOpenChange={setIsCallModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Llamada</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <form onSubmit={handleCall} className="space-y-4">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <p className="text-sm text-muted-foreground">{selectedLead.name} - {selectedLead.company}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="callType">Tipo de Llamada</Label>
                  <select
                    id="callType"
                    value={callData.type}
                    onChange={(e) => setCallData({...callData, type: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Saliente">Saliente</option>
                    <option value="Entrante">Entrante</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="callDuration">Duración (minutos)</Label>
                  <Input
                    id="callDuration"
                    type="number"
                    value={callData.duration}
                    onChange={(e) => setCallData({...callData, duration: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="callNotes">Notas de la Llamada</Label>
                  <textarea
                    id="callNotes"
                    value={callData.notes}
                    onChange={(e) => setCallData({...callData, notes: e.target.value})}
                    rows={4}
                    className="w-full p-2 border rounded-md"
                    placeholder="Resumen de la conversación..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="followUp">Seguimiento Requerido</Label>
                  <select
                    id="followUp"
                    value={callData.followUp}
                    onChange={(e) => setCallData({...callData, followUp: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="No">No</option>
                    <option value="Llamada">Nueva Llamada</option>
                    <option value="Email">Enviar Email</option>
                    <option value="Reunión">Agendar Reunión</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCallModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Registrar Llamada</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Email Modal */}
        <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Enviar Email</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label>Para</Label>
                  <p className="text-sm text-muted-foreground">{selectedLead.email} ({selectedLead.name})</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailSubject">Asunto</Label>
                  <Input
                    id="emailSubject"
                    value={emailContent.subject}
                    onChange={(e) => setEmailContent({...emailContent, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailBody">Mensaje</Label>
                  <textarea
                    id="emailBody"
                    value={emailContent.body}
                    onChange={(e) => setEmailContent({...emailContent, body: e.target.value})}
                    rows={8}
                    className="w-full p-2 border rounded-md"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsEmailModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Enviar Email</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialogo Lead Scoring IA - Estilo Inventario */}
        <Dialog open={isLeadScoringOpen} onOpenChange={setIsLeadScoringOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                IA - Lead Scoring Inteligente
              </DialogTitle>
              <DialogDescription>
                Califica automáticamente leads y prioriza los más prometedores
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Puntuación de Leads
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Ana Rodríguez - TechCorp:</strong></span>
                    <Badge className="bg-green-100 text-green-700">95 puntos</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Carlos López - InnovateTech:</strong></span>
                    <Badge className="bg-blue-100 text-blue-700">82 puntos</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>María González - StartupXYZ:</strong></span>
                    <Badge className="bg-yellow-100 text-yellow-700">67 puntos</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm"><strong>Pedro Silva - LocalBiz:</strong></span>
                    <Badge className="bg-red-100 text-red-700">34 puntos</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Factores de Puntuación IA
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm">Tamaño de empresa</span>
                      <span className="text-sm font-medium text-purple-600">25%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm">Industria objetivo</span>
                      <span className="text-sm font-medium text-purple-600">20%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm">Comportamiento web</span>
                      <span className="text-sm font-medium text-purple-600">15%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm">Presupuesto estimado</span>
                      <span className="text-sm font-medium text-purple-600">20%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm">Urgencia proyecto</span>
                      <span className="text-sm font-medium text-purple-600">15%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm">Engagement</span>
                      <span className="text-sm font-medium text-purple-600">5%</span>
                    </div>
                  </div>
                </div>
              </div>

              {isProcessing && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                    <span className="text-purple-800">Recalculando puntuaciones con IA...</span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsLeadScoringOpen(false)}>
                Cerrar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Target className="mr-2 h-4 w-4" />
                Aplicar Priorización
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialogo Análisis Predictivo - Estilo Inventario */}
        <Dialog open={isPredictiveOpen} onOpenChange={setIsPredictiveOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                IA - Análisis Predictivo de Ventas
              </DialogTitle>
              <DialogDescription>
                Predice probabilidades de cierre y optimiza estrategias de venta
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Predicciones de Cierre
                  </h4>
                  <div className="space-y-3">
                    <div className="p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm font-medium text-green-800">TechCorp - $45,000</p>
                      <p className="text-xs text-green-600">92% probabilidad de cierre</p>
                      <p className="text-xs text-green-500">Fecha estimada: 15 días</p>
                    </div>
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm font-medium text-blue-800">InnovateTech - $78,000</p>
                      <p className="text-xs text-blue-600">68% probabilidad de cierre</p>
                      <p className="text-xs text-blue-500">Fecha estimada: 28 días</p>
                    </div>
                    <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-sm font-medium text-yellow-800">StartupXYZ - $25,000</p>
                      <p className="text-xs text-yellow-600">45% probabilidad de cierre</p>
                      <p className="text-xs text-yellow-500">Requiere follow-up</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Proyección de Ingresos
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border text-center">
                      <p className="text-2xl font-bold text-blue-600">$156K</p>
                      <p className="text-xs text-blue-500">Este Mes</p>
                    </div>
                    <div className="p-2 bg-white rounded border text-center">
                      <p className="text-2xl font-bold text-green-600">$485K</p>
                      <p className="text-xs text-green-500">Próximos 3 Meses</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Recomendaciones de IA
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Acelerar TechCorp</p>
                      <p className="text-xs text-gray-600">Cliente listo para propuesta final</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <Clock className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Follow-up StartupXYZ</p>
                      <p className="text-xs text-gray-600">Sin contacto en 5 días - riesgo de pérdida</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Demo técnica InnovateTech</p>
                      <p className="text-xs text-gray-600">Programar presentación detallada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPredictiveOpen(false)}>
                Cerrar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="mr-2 h-4 w-4" />
                Programar Acciones
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialogo Personalización IA - Estilo Inventario */}
        <Dialog open={isPersonalizationOpen} onOpenChange={setIsPersonalizationOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-600" />
                IA - Personalización de Comunicaciones
              </DialogTitle>
              <DialogDescription>
                Genera contenido personalizado para cada cliente usando IA
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contenido Generado por IA
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Email para TechCorp</p>
                    <p className="text-xs text-gray-600 mt-1">
                      "Hola Ana, basándose en los desafíos de escalabilidad que mencionaste en nuestra última conversación, 
                      nuestra solución puede reducir sus tiempos de procesamiento en un 40%..."
                    </p>
                    <Badge className="bg-green-100 text-green-700 mt-2">95% relevancia</Badge>
                  </div>
                  <div className="p-3 bg-white border border-green-200 rounded">
                    <p className="text-sm font-medium text-green-800">Propuesta para InnovateTech</p>
                    <p className="text-xs text-gray-600 mt-1">
                      "Estimado Carlos, considerando su enfoque en innovación y su presupuesto de Q3, 
                      hemos diseñado un paquete que se adapta perfectamente a sus necesidades..."
                    </p>
                    <Badge className="bg-blue-100 text-blue-700 mt-2">88% relevancia</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Segmentación Inteligente
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm">Empresas Tech</span>
                      <Badge className="bg-blue-100 text-blue-700">12 leads</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm">Startups</span>
                      <Badge className="bg-purple-100 text-purple-700">8 leads</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm">Corporaciones</span>
                      <Badge className="bg-green-100 text-green-700">15 leads</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Optimización de Mensajes
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border text-center">
                      <p className="text-lg font-bold text-green-600">34%</p>
                      <p className="text-xs text-green-500">Tasa de Apertura</p>
                    </div>
                    <div className="p-2 bg-white rounded border text-center">
                      <p className="text-lg font-bold text-blue-600">12%</p>
                      <p className="text-xs text-blue-500">Tasa de Respuesta</p>
                    </div>
                  </div>
                </div>
              </div>

              {isProcessing && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin h-5 w-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
                    <span className="text-green-800">Generando contenido personalizado con IA...</span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPersonalizationOpen(false)}>
                Cerrar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Mail className="mr-2 h-4 w-4" />
                Enviar Campaña Personalizada
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
