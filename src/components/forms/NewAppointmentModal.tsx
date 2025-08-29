import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface NewAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewAppointmentModal({ open, onOpenChange }: NewAppointmentModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    clientName: "",
    petName: "",
    date: "",
    time: "",
    type: "",
    duration: "30",
    reason: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Rendez-vous planifié",
      description: `RDV pour ${formData.petName} (${formData.clientName}) prévu le ${formData.date} à ${formData.time}.`,
    });
    
    // Reset form
    setFormData({
      clientName: "",
      petName: "",
      date: "",
      time: "",
      type: "",
      duration: "30",
      reason: "",
      notes: ""
    });
    
    onOpenChange(false);
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau Rendez-vous</DialogTitle>
          <DialogDescription>
            Planifiez un nouveau rendez-vous pour un client et son animal.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Heure *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type de consultation *</Label>
              <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de RDV" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation générale</SelectItem>
                  <SelectItem value="vaccination">Vaccination</SelectItem>
                  <SelectItem value="chirurgie">Chirurgie</SelectItem>
                  <SelectItem value="urgence">Urgence</SelectItem>
                  <SelectItem value="controle">Contrôle post-opératoire</SelectItem>
                  <SelectItem value="sterilisation">Stérilisation</SelectItem>
                  <SelectItem value="dentaire">Soins dentaires</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Durée (minutes)</Label>
              <Select value={formData.duration} onValueChange={(value) => handleSelectChange("duration", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 heure</SelectItem>
                  <SelectItem value="90">1h30</SelectItem>
                  <SelectItem value="120">2 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Motif de consultation</Label>
            <Input
              id="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="ex: Vaccination annuelle, boiterie..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Instructions spéciales, préparation nécessaire..."
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Planifier RDV
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}