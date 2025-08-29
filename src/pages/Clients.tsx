import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Phone, Mail, MapPin, Eye, Edit, Heart } from "lucide-react";
import { NewClientModal } from "@/components/forms/NewClientModal";

const clients = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "06 12 34 56 78",
    address: "123 Rue de la Paix, 75001 Paris",
    city: "Paris",
    pets: [
      { name: "Bella", type: "Chien", breed: "Golden Retriever" },
      { name: "Minou", type: "Chat", breed: "Européen" }
    ],
    lastVisit: "2024-01-15",
    totalVisits: 12
  },
  {
    id: 2,
    name: "Jean Martin",
    email: "jean.martin@email.com", 
    phone: "06 98 76 54 32",
    address: "45 Avenue des Roses, 69000 Lyon",
    city: "Lyon",
    pets: [
      { name: "Whiskers", type: "Chat", breed: "Persan" }
    ],
    lastVisit: "2024-01-10",
    totalVisits: 8
  },
  {
    id: 3,
    name: "Sophie Leroux",
    email: "sophie.leroux@email.com",
    phone: "06 45 67 89 12",
    address: "78 Boulevard Maritime, 13000 Marseille",
    city: "Marseille", 
    pets: [
      { name: "Rex", type: "Chien", breed: "Berger Allemand" },
      { name: "Luna", type: "Chat", breed: "Maine Coon" },
      { name: "Kiwi", type: "Oiseau", breed: "Perruche" }
    ],
    lastVisit: "2024-01-18",
    totalVisits: 15
  }
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showClientModal, setShowClientModal] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Clients</h1>
          <p className="text-muted-foreground mt-2">
            Gérez tous vos clients et leurs informations
          </p>
        </div>
        
        <Button className="gap-2 medical-glow" onClick={() => setShowClientModal(true)}>
          <Plus className="h-4 w-4" />
          Nouveau Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher un client
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            placeholder="Rechercher par nom, email ou ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-xl font-semibold">{client.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {client.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {client.address}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Heart className="h-4 w-4 text-primary" />
                        Animaux ({client.pets.length})
                      </h4>
                      <div className="flex gap-2 flex-wrap">
                        {client.pets.map((pet, index) => (
                          <Badge key={index} variant="secondary" className="gap-1">
                            {pet.name} - {pet.type} ({pet.breed})
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-6 text-sm">
                      <span>
                        <strong>Dernière visite:</strong> {new Date(client.lastVisit).toLocaleDateString('fr-FR')}
                      </span>
                      <span>
                        <strong>Total visites:</strong> {client.totalVisits}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Voir
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <NewClientModal 
        open={showClientModal} 
        onOpenChange={setShowClientModal} 
      />
    </div>
  );
};

export default Clients;