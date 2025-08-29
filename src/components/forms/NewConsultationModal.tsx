import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface NewConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewConsultationModal({ open, onOpenChange }: NewConsultationModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    clientName: "",
    petName: "",
    date: "",
    weight: "",
    temperature: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    medications: "",
    followUp: "",
    cost: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Consultation enregistrée",
      description: `Consultation pour ${formData.petName} (${formData.clientName}) sauvegardée.`,
    });
    
    // Reset form
    setFormData({
      clientName: "",
      petName: "",
      date: "",
      weight: "",
      temperature: "",
      symptoms: "",
      diagnosis: "",
      treatment: "",
      medications: "",
      followUp: "",
      cost: "",
      notes: ""
    });
    
    onOpenChange(false);
  };

  // Get today's date in YYYY-MM-DD format for default date
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle Consultation</DialogTitle>
          <DialogDescription>
            Enregistrez une nouvelle consultation vétérinaire.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Nom du client"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="petName">Animal *</Label>
              <Input
                id="petName"
                value={formData.petName}
                onChange={handleChange}
                placeholder="Nom de l'animal"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date || today}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Poids (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={handleChange}
                placeholder="ex: 25.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Température (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="ex: 38.5"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptômes observés</Label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Décrivez les symptômes et observations..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnostic</Label>
            <Textarea
              id="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Diagnostic posé..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="treatment">Traitement administré</Label>
            <Textarea
              id="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="Traitements, injections, interventions..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medications">Médicaments prescrits</Label>
            <Textarea
              id="medications"
              value={formData.medications}
              onChange={handleChange}
              placeholder="Liste des médicaments avec posologie..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="followUp">Suivi recommandé</Label>
              <Input
                id="followUp"
                value={formData.followUp}
                onChange={handleChange}
                placeholder="ex: Contrôle dans 1 semaine"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">Coût (€)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={handleChange}
                placeholder="ex: 85.50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes additionnelles</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes diverses, recommandations..."
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer Consultation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}