"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validación básica
    if (!email || !password) {
      setError("Por favor, completa todos los campos")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Por favor, ingresa un email válido")
      setIsLoading(false)
      return
    }

    // Simulación de autenticación
    setTimeout(() => {
      if (email === "admin@neuralops.com" && password === "password") {
        window.location.href = "/dashboard"
      } else {
        setError("Credenciales incorrectas. Intenta nuevamente.")
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-light-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-6 text-center pb-8">
            <div className="flex justify-center">
              <Image src="/logo.png" alt="NeuralOps" width={200} height={80} className="h-16 w-auto" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-neuralops-dark-blue">Iniciar Sesión</CardTitle>
              <CardDescription className="text-neuralops-medium-blue mt-2">
                Accede a tu plataforma NeuralOps
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-neuralops-dark-blue font-medium">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-neuralops-medium-blue" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@neuralops.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-neuralops-very-light-blue focus:border-neuralops-gold focus:ring-neuralops-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-neuralops-dark-blue font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neuralops-medium-blue" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-neuralops-very-light-blue focus:border-neuralops-gold focus:ring-neuralops-gold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neuralops-medium-blue hover:text-neuralops-dark-blue"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-neuralops-gold hover:bg-neuralops-gold/90 text-white font-medium py-2.5"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-neuralops-medium-blue hover:text-neuralops-gold transition-colors text-sm font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="text-center text-xs text-neuralops-medium-blue">
              <p>Credenciales de prueba:</p>
              <p>Email: admin@neuralops.com</p>
              <p>Contraseña: password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
