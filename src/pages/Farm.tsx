import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Tractor, Users2, AlertTriangle, Calendar, MapPin, Phone } from "lucide-react";

const farms = [
  {
    id: 1,
    name: "Ferme des Prairies",
    owner: "Pierre Durand",
    address: "123 Route de la Campagne, 45000 Orléans",
    phone: "02 38 45 67 89",
    email: "p.durand@fermedespra.fr",
    type: "Élevage bovin",
    totalAnimals: 85,
    lastVisit: "2024-01-15",
    status: "active",
    veterinarian: "Dr. Dupont"
  },
  {
    id: 2,
    name: "Élevage Martin",
    owner: "Jean-Luc Martin",
    address: "456 Chemin des Champs, 41000 Blois", 
    phone: "02 54 78 90 12",
    email: "jl.martin@elevagemartin.fr",
    type: "Élevage porcin",
    totalAnimals: 150,
    lastVisit: "2024-01-10",
    status: "active",
    veterinarian: "Dr. Martin"
  },
  {
    id: 3,
    name: "Ferme Avicole Leroux",
    owner: "Marie Leroux",
    address: "789 Avenue des Volailles, 37000 Tours",
    phone: "02 47 12 34 56", 
    email: "m.leroux@avicole-leroux.fr",
    type: "Élevage avicole",
    totalAnimals: 2500,
    lastVisit: "2024-01-18",
    status: "attention",
    veterinarian: "Dr. Dupont"
  }
];

const livestock = [
  {
    id: 1,
    farmId: 1,
    farmName: "Ferme des Prairies",
    category: "Bovins",
    count: 85,
    breeds: ["Holstein", "Charolaise"],
    healthStatus: "good",
    vaccinations: "À jour",
    nextCheck: "2024-02-15"
  },
  {
    id: 2,
    farmId: 2,
    farmName: "Élevage Martin", 
    category: "Porcins",
    count: 150,
    breeds: ["Large White", "Landrace"],
    healthStatus: "good",
    vaccinations: "À jour",
    nextCheck: "2024-02-10"
  },
  {
    id: 3,
    farmId: 3,
    farmName: "Ferme Avicole Leroux",
    category: "Volailles",
    count: 2500,
    breeds: ["Poules pondeuses", "Poulets de chair"],
    healthStatus: "attention",
    vaccinations: "Retard",
    nextCheck: "2024-01-25"
  }
];

const interventions = [
  {
    id: 1,
    date: "2024-01-20",
    farmName: "Ferme des Prairies",
    type: "Vaccination",
    animals: "15 bovins",
    veterinarian: "Dr. Dupont",
    description: "Vaccination contre la fièvre aphteuse",
    status: "completed",
    followUp: "Contrôle dans 6 mois"
  },
  {
    id: 2,
    date: "2024-01-18",
    farmName: "Ferme Avicole Leroux",
    type: "Urgence",
    animals: "50 poules",
    veterinarian: "Dr. Dupont", 
    description: "Traitement infection respiratoire",
    status: "ongoing",
    followUp: "Suivi hebdomadaire"
  },
  {
    id: 3,
    date: "2024-01-15",
    farmName: "Élevage Martin",
    type: "Contrôle",
    animals: "Tous les porcins",
    veterinarian: "Dr. Martin",
    description: "Contrôle sanitaire trimestriel",
    status: "completed",
    followUp: "Prochain contrôle en avril"
  }
];

const statusStyles = {
  active: "bg-secondary text-secondary-foreground",
  attention: "bg-accent text-accent-foreground",
  urgent: "bg-destructive text-destructive-foreground"
};

const healthStyles = {
  good: "bg-secondary text-secondary-foreground",
  attention: "bg-accent text-accent-foreground",
  poor: "bg-destructive text-destructive-foreground"
};

const Farm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || farm.type.toLowerCase().includes(filterType.toLowerCase());
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Exploitations</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les fermes, élevages et interventions vétérinaires
          </p>
        </div>
        
        <Button className="gap-2 medical-glow">
          <Plus className="h-4 w-4" />
          Nouvelle Exploitation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <Tractor className="h-12 w-12 text-primary mx-auto mb-4" />
            <div className="text-2xl font-bold">{farms.length}</div>
            <div className="text-sm text-muted-foreground">Exploitations</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Users2 className="h-12 w-12 text-secondary mx-auto mb-4" />
            <div className="text-2xl font-bold">
              {livestock.reduce((sum, item) => sum + item.count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Animaux suivis</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-4" />
            <div className="text-2xl font-bold">
              {farms.filter(f => f.status === 'attention').length}
            </div>
            <div className="text-sm text-muted-foreground">Alertes actives</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher et filtrer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input 
              placeholder="Rechercher par nom, propriétaire ou type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type d'élevage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="bovin">Élevage bovin</SelectItem>
                <SelectItem value="porcin">Élevage porcin</SelectItem>
                <SelectItem value="avicole">Élevage avicole</SelectItem>
                <SelectItem value="ovin">Élevage ovin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="farms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="farms" className="gap-2">
            <Tractor className="h-4 w-4" />
            Exploitations
          </TabsTrigger>
          <TabsTrigger value="livestock" className="gap-2">
            <Users2 className="h-4 w-4" />
            Cheptel
          </TabsTrigger>
          <TabsTrigger value="interventions" className="gap-2">
            <Calendar className="h-4 w-4" />
            Interventions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="farms" className="space-y-4">
          <h3 className="text-lg font-semibold">
            Exploitations ({filteredFarms.length})
          </h3>
          
          {filteredFarms.map((farm) => (
            <Card key={farm.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl font-semibold">{farm.name}</h4>
                      <Badge 
                        variant="outline"
                        className={statusStyles[farm.status as keyof typeof statusStyles]}
                      >
                        {farm.status === 'active' ? 'Actif' : 
                         farm.status === 'attention' ? 'Attention' : 'Urgent'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p><strong>Propriétaire:</strong> {farm.owner}</p>
                        <p className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {farm.address}
                        </p>
                        <p className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {farm.phone}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p><strong>Type:</strong> {farm.type}</p>
                        <p><strong>Animaux:</strong> {farm.totalAnimals}</p>
                        <p><strong>Vétérinaire:</strong> {farm.veterinarian}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Dernière visite: {new Date(farm.lastVisit).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Voir Détails
                    </Button>
                    <Button size="sm">
                      Planifier Visite
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="livestock" className="space-y-4">
          <h3 className="text-lg font-semibold">
            Cheptel par exploitation
          </h3>
          
          {livestock.map((item) => (
            <Card key={item.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-4">
                      <h4 className="text-lg font-semibold">{item.category}</h4>
                      <Badge variant="secondary">{item.count} animaux</Badge>
                      <Badge 
                        variant="outline"
                        className={healthStyles[item.healthStatus as keyof typeof healthStyles]}
                      >
                        {item.healthStatus === 'good' ? 'Bon état' :
                         item.healthStatus === 'attention' ? 'Attention' : 'Problème'}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground">{item.farmName}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Races:</span>
                        <div className="mt-1">
                          {item.breeds.map((breed, index) => (
                            <Badge key={index} variant="outline" className="mr-1 text-xs">
                              {breed}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Vaccinations:</span> {item.vaccinations}
                      </div>
                      <div>
                        <span className="font-medium">Prochain contrôle:</span>
                        <br />
                        {new Date(item.nextCheck).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Voir Registre
                    </Button>
                    <Button size="sm">
                      Programmer Visite
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="interventions" className="space-y-4">
          <h3 className="text-lg font-semibold">
            Interventions récentes ({interventions.length})
          </h3>
          
          {interventions.map((intervention) => (
            <Card key={intervention.id} className="card-hover">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <h4 className="text-lg font-semibold">{intervention.type}</h4>
                        <Badge 
                          variant="outline"
                          className={intervention.status === 'completed' ? 
                            'bg-secondary text-secondary-foreground' : 
                            'bg-accent text-accent-foreground'}
                        >
                          {intervention.status === 'completed' ? 'Terminé' : 'En cours'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(intervention.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span>{intervention.farmName}</span>
                        <span>{intervention.veterinarian}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Animaux concernés:</span> {intervention.animals}
                    </div>
                    <div>
                      <span className="font-medium">Suivi:</span> {intervention.followUp}
                    </div>
                  </div>
                  
                  <p className="text-sm">{intervention.description}</p>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline">
                      Voir Rapport
                    </Button>
                    <Button size="sm" variant="outline">
                      Modifier
                    </Button>
                    {intervention.status === 'ongoing' && (
                      <Button size="sm">
                        Nouvelle Intervention
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Farm;