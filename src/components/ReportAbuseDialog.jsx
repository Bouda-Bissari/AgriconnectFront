import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "../configs/axiosClient.js"

// eslint-disable-next-line react/prop-types
export function ReportAbuseDialog({ service_id }) {
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await axios.post("/reports", {
        service_id,
        description
      })
      // Afficher le toast de succès après l'envoi réussi
      toast({
        title: "✅ Succès",
        description: "Signalement enregistré avec succès.",
        status: "success",
        duration: 5000, // Durée d'affichage en millisecondes
        style: {
          backgroundColor: '#4caf50',
          color: '#fff',
          fontFamily: 'poetsen',
        },
        transition: 'Bounce',
      })
      // Réinitialiser le formulaire ou fermer la boîte de dialogue après le succès
      setDescription("")
    } catch (err) {
      setError("Une erreur s'est produite lors de l'envoi du signalement.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-red-500 hover:bg-red-900 hover:text-white w-full">Signaler un abus</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Signaler un abus</DialogTitle>
          <DialogDescription>
            Veuillez fournir des détails sur l&apos;abus que vous souhaitez signaler.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez l'abus"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Envoi en cours..." : "Soumettre le signalement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
