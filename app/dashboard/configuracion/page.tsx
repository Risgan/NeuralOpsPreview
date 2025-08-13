"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Shield,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Settings,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
} from "lucide-react"

// Mock data
const users = [
  {
    id: 1,
    name: "John Rueda",
    email: "info@neuralops.com",
    role: "Administrador",
    department: "TI",
    status: "Activo",
    lastLogin: "2024-01-15 09:30",
    phone: "+57 300 123 4567",
    position: "Gerente de TI",
    hireDate: "2020-03-15",
    location: "Bogotá",
  },
  {
    id: 2,
    name: "María González",
    email: "maria@neuralops.com",
    role: "Supervisor",
    department: "Producción",
    status: "Activo",
    lastLogin: "2024-01-15 08:45",
    phone: "+57 304 581 6324",
    position: "Supervisora de Línea",
    hireDate: "2021-07-20",
    location: "Medellín",
  },
  {
    id: 3,
    name: "Juan Pérez",
    email: "juan@neuralops.com",
    role: "Operario",
    department: "Producción",
    status: "Inactivo",
    lastLogin: "2024-01-10 16:20",
    phone: "+57 302 345 6789",
    position: "Operario de Máquina",
    hireDate: "2022-01-10",
    location: "Cali",
  },
]

const roles = [
  {
    id: 1,
    name: "Administrador",
    description: "Acceso completo al sistema",
    users: 2,
    permissions: {
      compras: { read: true, write: true, delete: true },
      produccion: { read: true, write: true, delete: true },
      rrhh: { read: true, write: true, delete: true },
      sst: { read: true, write: true, delete: true },
      configuracion: { read: true, write: true, delete: true },
    },
  },
  {
    id: 2,
    name: "Supervisor",
    description: "Supervisión de operaciones",
    users: 5,
    permissions: {
      compras: { read: true, write: true, delete: false },
      produccion: { read: true, write: true, delete: false },
      rrhh: { read: true, write: false, delete: false },
      sst: { read: true, write: true, delete: false },
      configuracion: { read: false, write: false, delete: false },
    },
  },
  {
    id: 3,
    name: "Operario",
    description: "Acceso básico a operaciones",
    users: 15,
    permissions: {
      compras: { read: false, write: false, delete: false },
      produccion: { read: true, write: false, delete: false },
      rrhh: { read: false, write: false, delete: false },
      sst: { read: true, write: false, delete: false },
      configuracion: { read: false, write: false, delete: false },
    },
  },
]

const modules = [
  { id: "compras", name: "Compras", description: "Gestión de compras y proveedores" },
  { id: "produccion", name: "Producción", description: "Control de procesos productivos" },
  { id: "rrhh", name: "RRHH", description: "Recursos humanos y nómina" },
  { id: "sst", name: "SST", description: "Seguridad y salud en el trabajo" },
  { id: "configuracion", name: "Configuración", description: "Administración del sistema" },
]

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState("usuarios")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [isNewUserOpen, setIsNewUserOpen] = useState(false)
  const [isNewRoleOpen, setIsNewRoleOpen] = useState(false)
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    role: "",
    location: "",
  })

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {
      compras: { read: false, write: false, delete: false },
      produccion: { read: false, write: false, delete: false },
      rrhh: { read: false, write: false, delete: false },
      sst: { read: false, write: false, delete: false },
      configuracion: { read: false, write: false, delete: false },
    },
  })

  const handleCreateUser = async () => {
    setIsLoading(true)
    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Creating user:", newUser)
    setIsLoading(false)
    setIsNewUserOpen(false)
    setNewUser({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      role: "",
      location: "",
    })
  }

  const handleCreateRole = async () => {
    setIsLoading(true)
    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Creating role:", newRole)
    setIsLoading(false)
    setIsNewRoleOpen(false)
    setNewRole({
      name: "",
      description: "",
      permissions: {
        compras: { read: false, write: false, delete: false },
        produccion: { read: false, write: false, delete: false },
        rrhh: { read: false, write: false, delete: false },
        sst: { read: false, write: false, delete: false },
        configuracion: { read: false, write: false, delete: false },
      },
    })
  }

  const handleDeleteUser = async (userId: number) => {
    setIsLoading(true)
    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Deleting user:", userId)
    setIsLoading(false)
  }

  const handleDeleteRole = async (roleId: number) => {
    setIsLoading(true)
    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Deleting role:", roleId)
    setIsLoading(false)
  }

  const updateRolePermission = (module: string, permission: string, value: boolean) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module as keyof typeof prev.permissions],
          [permission]: value,
        },
      },
    }))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-gold">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Administración</h1>
              <p className="text-neuralops-beige text-lg">Gestión de usuarios, roles y permisos del sistema</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Settings className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-neuralops-very-light-blue p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("usuarios")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "usuarios"
                ? "bg-white text-neuralops-dark-blue shadow-sm"
                : "text-neuralops-medium-blue hover:text-neuralops-dark-blue"
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab("roles")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "roles"
                ? "bg-white text-neuralops-dark-blue shadow-sm"
                : "text-neuralops-medium-blue hover:text-neuralops-dark-blue"
            }`}
          >
            <Shield className="h-4 w-4 inline mr-2" />
            Roles y Permisos
          </button>
        </div>

      {/* Content */}
      {activeTab === "usuarios" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-neuralops-dark-blue">Gestión de Usuarios</CardTitle>
                <CardDescription>Administra los usuarios del sistema y sus permisos</CardDescription>
              </div>
              <Dialog open={isNewUserOpen} onOpenChange={setIsNewUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Nuevo Usuario
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                    <DialogDescription>
                      Completa la información para crear un nuevo usuario en el sistema
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="juan@neuralops.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={newUser.phone}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Cargo</Label>
                      <Input
                        id="position"
                        value={newUser.position}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, position: e.target.value }))}
                        placeholder="Ej: Analista de Sistemas"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Departamento</Label>
                      <Select
                        value={newUser.department}
                        onValueChange={(value) => setNewUser((prev) => ({ ...prev, department: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TI">Tecnología</SelectItem>
                          <SelectItem value="Producción">Producción</SelectItem>
                          <SelectItem value="RRHH">Recursos Humanos</SelectItem>
                          <SelectItem value="Compras">Compras</SelectItem>
                          <SelectItem value="SST">Seguridad y Salud</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Rol</Label>
                      <Select
                        value={newUser.role}
                        onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Administrador">Administrador</SelectItem>
                          <SelectItem value="Supervisor">Supervisor</SelectItem>
                          <SelectItem value="Operario">Operario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        value={newUser.location}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Ej: Bogotá, Colombia"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewUserOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateUser} disabled={isLoading}>
                      {isLoading ? "Creando..." : "Crear Usuario"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neuralops-medium-blue" />
                <Input
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-neuralops-dark-blue">{user.name}</div>
                        <div className="text-sm text-neuralops-medium-blue">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Activo" ? "default" : "secondary"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-neuralops-medium-blue">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog
                          open={isUserDetailsOpen && selectedUser?.id === user.id}
                          onOpenChange={(open) => {
                            setIsUserDetailsOpen(open)
                            if (!open) setSelectedUser(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detalles del Usuario</DialogTitle>
                              <DialogDescription>Información completa del usuario seleccionado</DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="grid grid-cols-2 gap-6 py-4">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                      <Users className="h-4 w-4 text-neuralops-gold" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue">Nombre</p>
                                      <p className="font-medium text-neuralops-dark-blue">{selectedUser.name}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                      <Mail className="h-4 w-4 text-neuralops-gold" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue">Email</p>
                                      <p className="font-medium text-neuralops-dark-blue">{selectedUser.email}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                      <Phone className="h-4 w-4 text-neuralops-gold" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue">Teléfono</p>
                                      <p className="font-medium text-neuralops-dark-blue">{selectedUser.phone}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                      <Briefcase className="h-4 w-4 text-neuralops-gold" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue">Cargo</p>
                                      <p className="font-medium text-neuralops-dark-blue">{selectedUser.position}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                      <Shield className="h-4 w-4 text-neuralops-gold" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue">Rol</p>
                                      <Badge variant="outline">{selectedUser.role}</Badge>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                      <Settings className="h-4 w-4 text-neuralops-gold" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue">Departamento</p>
                                      <p className="font-medium text-neuralops-dark-blue">{selectedUser.department}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                      <Calendar className="h-4 w-4 text-neuralops-gold" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue">Fecha de Ingreso</p>
                                      <p className="font-medium text-neuralops-dark-blue">{selectedUser.hireDate}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neuralops-gold/20 rounded-lg">
                                      <MapPin className="h-4 w-4 text-neuralops-gold" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-neuralops-medium-blue">Ubicación</p>
                                      <p className="font-medium text-neuralops-dark-blue">{selectedUser.location}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Dialog
                          open={isEditUserOpen && selectedUser?.id === user.id}
                          onOpenChange={(open) => {
                            setIsEditUserOpen(open)
                            if (!open) setSelectedUser(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Editar Usuario</DialogTitle>
                              <DialogDescription>Modifica la información del usuario</DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Nombre Completo</Label>
                                  <Input id="edit-name" defaultValue={selectedUser.name} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-email">Correo Electrónico</Label>
                                  <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-phone">Teléfono</Label>
                                  <Input id="edit-phone" defaultValue={selectedUser.phone} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-position">Cargo</Label>
                                  <Input id="edit-position" defaultValue={selectedUser.position} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-department">Departamento</Label>
                                  <Select defaultValue={selectedUser.department}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="TI">Tecnología</SelectItem>
                                      <SelectItem value="Producción">Producción</SelectItem>
                                      <SelectItem value="RRHH">Recursos Humanos</SelectItem>
                                      <SelectItem value="Compras">Compras</SelectItem>
                                      <SelectItem value="SST">Seguridad y Salud</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-role">Rol</Label>
                                  <Select defaultValue={selectedUser.role}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Administrador">Administrador</SelectItem>
                                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                                      <SelectItem value="Operario">Operario</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
                                Cancelar
                              </Button>
                              <Button onClick={() => setIsEditUserOpen(false)}>Guardar Cambios</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el usuario{" "}
                                <strong>{user.name}</strong> y todos sus datos asociados.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "roles" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-neuralops-dark-blue">Roles y Permisos</CardTitle>
                <CardDescription>Gestiona los roles del sistema y sus permisos</CardDescription>
              </div>
              <Dialog open={isNewRoleOpen} onOpenChange={setIsNewRoleOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-neuralops-gold hover:bg-neuralops-gold/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Rol
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Rol</DialogTitle>
                    <DialogDescription>Define un nuevo rol y configura sus permisos por módulo</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role-name">Nombre del Rol</Label>
                        <Input
                          id="role-name"
                          value={newRole.name}
                          onChange={(e) => setNewRole((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Ej: Coordinador"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role-description">Descripción</Label>
                        <Input
                          id="role-description"
                          value={newRole.description}
                          onChange={(e) => setNewRole((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Descripción del rol"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-neuralops-dark-blue mb-4">Permisos por Módulo</h4>
                      <div className="space-y-4">
                        {modules.map((module) => (
                          <div key={module.id} className="border border-neuralops-very-light-blue rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h5 className="font-medium text-neuralops-dark-blue">{module.name}</h5>
                                <p className="text-sm text-neuralops-medium-blue">{module.description}</p>
                              </div>
                            </div>
                            <div className="flex gap-6">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${module.id}-read`}
                                  checked={newRole.permissions[module.id as keyof typeof newRole.permissions]?.read}
                                  onCheckedChange={(checked) =>
                                    updateRolePermission(module.id, "read", checked as boolean)
                                  }
                                />
                                <Label htmlFor={`${module.id}-read`} className="text-sm">
                                  Leer
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${module.id}-write`}
                                  checked={newRole.permissions[module.id as keyof typeof newRole.permissions]?.write}
                                  onCheckedChange={(checked) =>
                                    updateRolePermission(module.id, "write", checked as boolean)
                                  }
                                />
                                <Label htmlFor={`${module.id}-write`} className="text-sm">
                                  Escribir
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${module.id}-delete`}
                                  checked={newRole.permissions[module.id as keyof typeof newRole.permissions]?.delete}
                                  onCheckedChange={(checked) =>
                                    updateRolePermission(module.id, "delete", checked as boolean)
                                  }
                                />
                                <Label htmlFor={`${module.id}-delete`} className="text-sm">
                                  Eliminar
                                </Label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewRoleOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateRole} disabled={isLoading}>
                      {isLoading ? "Creando..." : "Crear Rol"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neuralops-medium-blue" />
                <Input
                  placeholder="Buscar roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {filteredRoles.map((role) => (
                <Card key={role.id} className="border border-neuralops-very-light-blue">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-neuralops-dark-blue">{role.name}</h3>
                          <Badge variant="secondary">{role.users} usuarios</Badge>
                        </div>
                        <p className="text-neuralops-medium-blue mb-4">{role.description}</p>

                        <div className="grid grid-cols-5 gap-4">
                          {modules.map((module) => (
                            <div key={module.id} className="text-center">
                              <p className="text-xs font-medium text-neuralops-medium-blue mb-2">{module.name}</p>
                              <div className="space-y-1">
                                <div
                                  className={`w-2 h-2 rounded-full mx-auto ${
                                    role.permissions[module.id as keyof typeof role.permissions]?.read
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                  title="Leer"
                                />
                                <div
                                  className={`w-2 h-2 rounded-full mx-auto ${
                                    role.permissions[module.id as keyof typeof role.permissions]?.write
                                      ? "bg-blue-500"
                                      : "bg-gray-300"
                                  }`}
                                  title="Escribir"
                                />
                                <div
                                  className={`w-2 h-2 rounded-full mx-auto ${
                                    role.permissions[module.id as keyof typeof role.permissions]?.delete
                                      ? "bg-red-500"
                                      : "bg-gray-300"
                                  }`}
                                  title="Eliminar"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Dialog
                          open={isEditRoleOpen && selectedRole?.id === role.id}
                          onOpenChange={(open) => {
                            setIsEditRoleOpen(open)
                            if (!open) setSelectedRole(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedRole(role)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar Permisos
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Editar Permisos - {role.name}</DialogTitle>
                              <DialogDescription>Modifica los permisos del rol seleccionado</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              {modules.map((module) => (
                                <div key={module.id} className="border border-neuralops-very-light-blue rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <h5 className="font-medium text-neuralops-dark-blue">{module.name}</h5>
                                      <p className="text-sm text-neuralops-medium-blue">{module.description}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-6">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`edit-${module.id}-read`}
                                        defaultChecked={
                                          role.permissions[module.id as keyof typeof role.permissions]?.read
                                        }
                                      />
                                      <Label htmlFor={`edit-${module.id}-read`} className="text-sm">
                                        Leer
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`edit-${module.id}-write`}
                                        defaultChecked={
                                          role.permissions[module.id as keyof typeof role.permissions]?.write
                                        }
                                      />
                                      <Label htmlFor={`edit-${module.id}-write`} className="text-sm">
                                        Escribir
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`edit-${module.id}-delete`}
                                        defaultChecked={
                                          role.permissions[module.id as keyof typeof role.permissions]?.delete
                                        }
                                      />
                                      <Label htmlFor={`edit-${module.id}-delete`} className="text-sm">
                                        Eliminar
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>
                                Cancelar
                              </Button>
                              <Button onClick={() => setIsEditRoleOpen(false)}>Guardar Cambios</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar rol?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el rol{" "}
                                <strong>{role.name}</strong> y se reasignarán los usuarios a otros roles.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteRole(role.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  )
}
