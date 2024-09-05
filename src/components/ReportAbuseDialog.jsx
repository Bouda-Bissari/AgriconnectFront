import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "../configs/axiosClient.js";

// eslint-disable-next-line react/prop-types
export function ReportAbuseDialog({ service_id }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/reports", {
        service_id,
        description,
      });
      // Afficher le toast de succès après l'envoi réussi
      toast({
        title: "✅ Succès",
        description: "Signalement enregistré avec succès.",
        status: "success",
        duration: 5000, // Durée d'affichage en millisecondes
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
          fontFamily: "poetsen",
        },
        transition: "Bounce",
      });
      // Réinitialiser le formulaire ou fermer la boîte de dialogue après le succès
      setDescription("");
    } catch (err) {
      setError("Une erreur s'est produite lors de l'envoi du signalement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <svg
          fill="#ffa500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          enableBackground="new 0 0 52 52"
          xmlSpace="preserve"
          stroke="#ffa500"
          className="absolute -top-5 right-3 cursor-pointer w-7 h-7 mr-2 sm:mr-6 "
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path d="M22.8,45.7v1c0,1.2-0.9,2.1-2.1,2.1h0H4.1c-1.2,0-2.1-0.9-2.1-2.1l0,0v-1c0-2.5,3-4.1,5.7-5.3 c0.1,0,0.2-0.1,0.3-0.2c0.2-0.1,0.5-0.1,0.7,0c1.1,0.7,2.4,1.1,3.8,1.1c1.3,0,2.6-0.4,3.8-1.1c0.2-0.1,0.4-0.1,0.6,0 c0.1,0,0.2,0.1,0.3,0.2C19.9,41.7,22.8,43.2,22.8,45.7z"></path>
              <ellipse cx="12.4" cy="33.7" rx="5.2" ry="5.7"></ellipse>
              <path d="M34.8,3.2L34.8,3.2c-8.5,0-15.3,6.5-15.3,14.5c0,2.5,0.7,5,2,7.2c0.1,0.2,0.2,0.5,0.2,0.8L20,30.3 c-0.2,0.6,0.2,1.1,0.7,1.3c0.2,0.1,0.4,0.1,0.6,0l4.5-1.6c0.3-0.1,0.6-0.1,0.8,0.1c2.4,1.4,5.2,2.2,8,2.2c8.5,0,15.3-6.6,15.3-14.6 C50,9.7,43.1,3.2,34.8,3.2z M33.7,8.9h3v7l-0.3,4.6H34l-0.2-4.6V8.9z M35.2,26.2c-1.4,0-1.8-0.8-1.8-1.8c0-1,0.4-1.8,1.8-1.8 c1.4,0,1.8,0.8,1.8,1.8C37.1,25.4,36.6,26.2,35.2,26.2z"></path>
            </g>
          </g>
        </svg>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Signaler un abus</DialogTitle>
          <DialogDescription>
            Veuillez fournir des détails sur l&apos;abus que vous souhaitez
            signaler.
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
  );
}
