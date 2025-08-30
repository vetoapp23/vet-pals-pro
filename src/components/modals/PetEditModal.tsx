import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pet, useClients } from "@/contexts/ClientContext";

interface PetEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet | null;
}

export function PetEditModal({ open, onOpenChange, pet }: PetEditModalProps) {
  const { updatePet, clients } = useClients();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    ownerId: 0,
    microchip: "",
    medicalNotes: "",
    status: "healthy" as "healthy" | "treatment" | "urgent"
  });

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name,
        type: pet.type,
        breed: pet.breed || "",
        age: pet.age || "",
        weight: pet.weight || "",
        color: pet.color || "",
        ownerId: pet.ownerId,
        microchip: pet.microchip || "",
        medicalNotes: pet.medicalNotes || "",
        status: pet.status
      });
    }
  }, [pet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'ownerId' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pet) return;
    
    const owner = clients.find(c => c.id === formData.ownerId);
    
    updatePet(pet.id, {
      ...formData,
      owner: owner?.name || pet.owner
    });
    
    toast({
      title: "Animal modifié",
      description: `Les informations de ${formData.name} ont été mises à jour.`,
    });
    
    onOpenChange(false);
  };

  if (!pet) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier Animal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'animal *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Type d'animal *</Label>
              <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chien">Chien</SelectItem>
                  <SelectItem value="Chat">Chat</SelectItem>
                  <SelectItem value="Lapin">Lapin</SelectItem>
                  <SelectItem value="Oiseau">Oiseau</SelectItem>
                  <SelectItem value="Reptile">Reptile</SelectItem>
                  <SelectItem value="Rongeur">Rongeur</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Race</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                placeholder="ex: 3 ans"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Poids (kg)</Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Couleur</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Propriétaire *</Label>
              <Select value={formData.ownerId.toString()} onValueChange={(value) => handleSelectChange("ownerId", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Statut de santé</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthy">En bonne santé</SelectItem>
                  <SelectItem value="treatment">En traitement</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="microchip">Numéro de puce électronique</Label>
            <Input
              id="microchip"
              value={formData.microchip}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medicalNotes">Notes médicales</Label>
            <Textarea
              id="medicalNotes"
              value={formData.medicalNotes}
              onChange={handleChange}
              placeholder="Allergies, conditions médicales, notes importantes..."
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Sauvegarder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}