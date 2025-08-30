import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Heart, User, Calendar, Camera, Stethoscope, Eye, Edit } from "lucide-react";
import { NewPetModal } from "@/components/forms/NewPetModal";
import { NewConsultationModal } from "@/components/forms/NewConsultationModal";
import { PetViewModal } from "@/components/modals/PetViewModal";
import { PetEditModal } from "@/components/modals/PetEditModal";
import { PetDossierModal } from "@/components/modals/PetDossierModal";
import { ClientProvider, useClients, Pet } from "@/contexts/ClientContext";

const statusStyles = {
  healthy: "bg-secondary text-secondary-foreground",
  treatment: "bg-accent text-accent-foreground", 
  urgent: "bg-destructive text-destructive-foreground"
};

const PetsContent = () => {
  const { pets } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showPetModal, setShowPetModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState(false);

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         pet.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || pet.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || pet.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleView = (pet: Pet) => {
    setSelectedPet(pet);
    setShowViewModal(true);
  };

  const handleEdit = (pet: Pet) => {
    setSelectedPet(pet);
    setShowEditModal(true);
  };

  const handleEditFromView = () => {
    setShowViewModal(false);
    setShowEditModal(true);
  };

  const handleShowDossier = (pet: Pet) => {
    setSelectedPet(pet);
    setShowDossierModal(true);
  };

  const handleShowDossierFromView = () => {
    setShowViewModal(false);
    setShowDossierModal(true);
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Animaux</h1>
          <p className="text-muted-foreground mt-2">
            Suivez tous les animaux et leurs informations médicales
          </p>
        </div>
        
        <Button className="gap-2 medical-glow" onClick={() => setShowPetModal(true)}>
          <Plus className="h-4 w-4" />
          Nouvel Animal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher et filtrer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder="Rechercher par nom, race ou propriétaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          
          <div className="flex gap-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="chien">Chien</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="oiseau">Oiseau</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                <SelectItem value="healthy">En bonne santé</SelectItem>
                <SelectItem value="treatment">En traitement</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPets.map((pet) => (
          <Card key={pet.id} className="card-hover">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary-glow text-primary-foreground">
                        <Heart className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="text-xl font-semibold">{pet.name}</h3>
                      <p className="text-muted-foreground">{pet.breed}</p>
                      <Badge 
                        variant="outline"
                        className={statusStyles[pet.status as keyof typeof statusStyles]}
                      >
                        {pet.status === 'healthy' ? 'En bonne santé' : 
                         pet.status === 'treatment' ? 'En traitement' : 'Urgent'}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Photo
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span> {pet.type}
                  </div>
                  <div>
                    <span className="font-medium">Âge:</span> {pet.age}
                  </div>
                  <div>
                    <span className="font-medium">Poids:</span> {pet.weight}
                  </div>
                  <div>
                    <span className="font-medium">Couleur:</span> {pet.color}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Propriétaire: {pet.owner}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Prochain RDV: {pet.nextAppointment ? new Date(pet.nextAppointment).toLocaleDateString('fr-FR') : 'Aucun'}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Vaccinations:</h4>
                  <div className="flex gap-1 flex-wrap">
                    {pet.vaccinations && pet.vaccinations.length > 0 ? (
                      pet.vaccinations.map((vacc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {vacc}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">Aucune vaccination enregistrée</span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => handleView(pet)}>
                    <Eye className="h-4 w-4" />
                    Voir
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => handleEdit(pet)}>
                    <Edit className="h-4 w-4" />
                    Modifier
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleShowDossier(pet)}>
                    Voir Dossier
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => setShowConsultationModal(true)}>
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Nouvelle Consultation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <NewPetModal 
        open={showPetModal} 
        onOpenChange={setShowPetModal} 
      />
      
      <NewConsultationModal 
        open={showConsultationModal} 
        onOpenChange={setShowConsultationModal} 
      />
      
      <PetViewModal
        open={showViewModal}
        onOpenChange={setShowViewModal}
        pet={selectedPet}
        onEdit={handleEditFromView}
        onShowDossier={handleShowDossierFromView}
      />
      
      <PetEditModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        pet={selectedPet}
      />
      
      <PetDossierModal
        open={showDossierModal}
        onOpenChange={setShowDossierModal}
        pet={selectedPet}
      />
    </div>
  );
};

const Pets = () => {
  return (
    <ClientProvider>
      <PetsContent />
    </ClientProvider>
  );
};

export default Pets;