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
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email) {
      setError("Por favor, ingresa tu correo electrónico")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Por favor, ingresa un email válido")
      setIsLoading(false)
      return
    }

    // Simulación de envío de email
    setTimeout(() => {
      setIsSuccess(true)
      setIsLoading(false)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neuralops-dark-blue via-neuralops-medium-blue to-neuralops-light-blue flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-6 text-center pb-8">
              <div className="flex justify-center">
                <Image src="/logo.png" alt="NeuralOps" width={200} height={80} className="h-16 w-auto" />
              </div>
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-neuralops-dark-blue">¡Correo Enviado!</CardTitle>
                <CardDescription className="text-neuralops-medium-blue mt-2">
                  Revisa tu bandeja de entrada
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">
                  Hemos enviado las instrucciones para restablecer tu contraseña a <strong>{email}</strong>. Si no
                  recibes el correo en unos minutos, revisa tu carpeta de spam.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="w-full border-neuralops-gold text-neuralops-gold hover:bg-neuralops-gold hover:text-white"
                >
                  Enviar nuevamente
                </Button>

                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="w-full text-neuralops-medium-blue hover:text-neuralops-gold hover:bg-neuralops-beige/20"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al inicio de sesión
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
              <CardTitle className="text-2xl font-bold text-neuralops-dark-blue">Recuperar Contraseña</CardTitle>
              <CardDescription className="text-neuralops-medium-blue mt-2">
                Ingresa tu correo para recibir instrucciones
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

              <Button
                type="submit"
                className="w-full bg-neuralops-gold hover:bg-neuralops-gold/90 text-white font-medium py-2.5"
                disabled={isLoading}
              >
                {isLoading ? "Enviando instrucciones..." : "Enviar Instrucciones"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-neuralops-medium-blue hover:text-neuralops-gold transition-colors text-sm font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio de sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
