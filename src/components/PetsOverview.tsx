import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Plus, Calendar } from "lucide-react";
import { useState } from "react";
import { NewPetModal } from "@/components/forms/NewPetModal";

const recentPets = [
  {
    id: 1,
    name: "Bella",
    type: "Chien",
    breed: "Golden Retriever",
    age: "3 ans",
    owner: "Marie Dubois",
    nextAppointment: "Demain 14h30",
    status: "healthy"
  },
  {
    id: 2,
    name: "Whiskers", 
    type: "Chat",
    breed: "Persan",
    age: "5 ans",
    owner: "Jean Martin",
    nextAppointment: "Vendredi 10h00",
    status: "treatment"
  },
  {
    id: 3,
    name: "Rex",
    type: "Chien", 
    breed: "Berger Allemand",
    age: "7 ans",
    owner: "Sophie Leroux",
    nextAppointment: "Lundi 16h00",
    status: "healthy"
  }
];

const statusStyles = {
  healthy: "bg-secondary text-secondary-foreground",
  treatment: "bg-accent text-accent-foreground", 
  urgent: "bg-destructive text-destructive-foreground"
};

export function PetsOverview() {
  const [showPetModal, setShowPetModal] = useState(false);
  
  return (
    <>
      <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Animaux Récents</CardTitle>
        <Button size="sm" className="gap-2" onClick={() => setShowPetModal(true)}>
          <Plus className="h-4 w-4" />
          Nouvel Animal
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPets.map((pet) => (
          <div 
            key={pet.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary-glow text-primary-foreground">
                  <Heart className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{pet.name}</h4>
                  <Badge 
                    variant="outline" 
                    className={statusStyles[pet.status as keyof typeof statusStyles]}
                  >
                    {pet.status === 'healthy' ? 'En bonne santé' : 
                     pet.status === 'treatment' ? 'En traitement' : 'Urgent'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{pet.type} • {pet.breed} • {pet.age}</p>
                  <p>Propriétaire: {pet.owner}</p>
                </div>
              </div>
            </div>
            
            <div className="text-right space-y-2">
              <div className="flex items-center gap-1 text-sm">
                <Calendar className="h-3 w-3" />
                {pet.nextAppointment}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
    
    <NewPetModal 
      open={showPetModal} 
      onOpenChange={setShowPetModal} 
    />
    </>
  );
}