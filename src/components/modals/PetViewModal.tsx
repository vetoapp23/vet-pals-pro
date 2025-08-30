import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, User, Calendar, Edit, FileText, Camera } from "lucide-react";
import { Pet } from "@/contexts/ClientContext";
import { useState } from "react";

interface PetViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet | null;
  onEdit: () => void;
  onShowDossier: () => void;
}

export function PetViewModal({ open, onOpenChange, pet, onEdit, onShowDossier }: PetViewModalProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!pet) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profil Animal</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary-glow text-primary-foreground">
                  {photoPreview ? (
                    <img src={photoPreview} alt={pet.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <Heart className="h-12 w-12" />
                  )}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Button size="sm" variant="outline" className="gap-2 w-full" asChild>
                    <span>
                      <Camera className="h-4 w-4" />
                      {photoPreview ? 'Changer photo' : 'Ajouter photo'}
                    </span>
                  </Button>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold">{pet.name}</h2>
                <Badge 
                  variant="outline"
                  className={
                    pet.status === 'healthy' ? 'bg-secondary text-secondary-foreground' :
                    pet.status === 'treatment' ? 'bg-accent text-accent-foreground' : 
                    'bg-destructive text-destructive-foreground'
                  }
                >
                  {pet.status === 'healthy' ? 'En bonne santé' : 
                   pet.status === 'treatment' ? 'En traitement' : 'Urgent'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Type:</span>
                  <p className="text-muted-foreground">{pet.type}</p>
                </div>
                <div>
                  <span className="font-medium">Race:</span>
                  <p className="text-muted-foreground">{pet.breed || 'Non spécifiée'}</p>
                </div>
                <div>
                  <span className="font-medium">Âge:</span>
                  <p className="text-muted-foreground">{pet.age || 'Non spécifié'}</p>
                </div>
                <div>
                  <span className="font-medium">Poids:</span>
                  <p className="text-muted-foreground">{pet.weight || 'Non spécifié'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="font-medium">Couleur:</span>
                <p className="text-muted-foreground">{pet.color || 'Non spécifiée'}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-medium">Propriétaire:</span>
                  <p className="text-muted-foreground">{pet.owner}</p>
                </div>
              </div>
              
              {pet.microchip && (
                <div>
                  <span className="font-medium">Puce électronique:</span>
                  <p className="text-muted-foreground font-mono">{pet.microchip}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {pet.lastVisit && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Dernière visite:</span>
                    <p className="text-muted-foreground">{new Date(pet.lastVisit).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              )}
              
              {pet.nextAppointment && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Prochain RDV:</span>
                    <p className="text-muted-foreground">{new Date(pet.nextAppointment).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {pet.vaccinations && pet.vaccinations.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Vaccinations</h3>
              <div className="flex gap-2 flex-wrap">
                {pet.vaccinations.map((vacc, index) => (
                  <Badge key={index} variant="outline">
                    {vacc}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {pet.medicalNotes && (
            <div className="space-y-2">
              <h3 className="font-semibold">Notes médicales</h3>
              <p className="text-muted-foreground p-3 bg-muted/30 rounded-lg">{pet.medicalNotes}</p>
            </div>
          )}
          
          <div className="flex justify-between gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onShowDossier} className="gap-2">
              <FileText className="h-4 w-4" />
              Voir Dossier Médical
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fermer
              </Button>
              <Button onClick={onEdit} className="gap-2">
                <Edit className="h-4 w-4" />
                Modifier
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}