import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, History as HistoryIcon, Pill, Calendar, FileText, Heart, Download } from "lucide-react";

const medicalHistory = [
  {
    id: 1,
    date: "2024-01-20",
    petName: "Bella",
    petType: "Chien",
    client: "Marie Dubois",
    type: "consultation",
    title: "Consultation générale",
    veterinarian: "Dr. Dupont",
    details: "Excellent état de santé, vaccins à jour",
    prescriptions: ["Vermifuge mensuel"]
  },
  {
    id: 2,
    date: "2024-01-18",
    petName: "Whiskers",
    petType: "Chat", 
    client: "Jean Martin",
    type: "treatment",
    title: "Traitement cystite",
    veterinarian: "Dr. Martin",
    details: "Cystite idiopathique féline en cours de traitement",
    prescriptions: ["Meloxicam 0.5mg", "Aliment thérapeutique"]
  },
  {
    id: 3,
    date: "2024-01-15",
    petName: "Rex",
    petType: "Chien",
    client: "Sophie Leroux", 
    type: "vaccination",
    title: "Vaccination annuelle",
    veterinarian: "Dr. Dupont",
    details: "DHPP + Rage administrés",
    prescriptions: []
  }
];

const prescriptionHistory = [
  {
    id: 1,
    date: "2024-01-20",
    petName: "Bella",
    client: "Marie Dubois",
    medication: "Vermifuge Milbemax",
    dosage: "1 comprimé",
    frequency: "1 fois par mois",
    duration: "En continu",
    veterinarian: "Dr. Dupont",
    status: "active"
  },
  {
    id: 2,
    date: "2024-01-18",
    petName: "Whiskers",
    client: "Jean Martin",
    medication: "Meloxicam",
    dosage: "0.5mg",
    frequency: "1/2 comprimé par jour",
    duration: "5 jours",
    veterinarian: "Dr. Martin",
    status: "completed"
  },
  {
    id: 3,
    date: "2024-01-10",
    petName: "Rex",
    client: "Sophie Leroux",
    medication: "Antibiotique Amoxicilline",
    dosage: "250mg",
    frequency: "2 fois par jour",
    duration: "7 jours",
    veterinarian: "Dr. Dupont",
    status: "completed"
  }
];

const typeStyles = {
  consultation: "bg-primary text-primary-foreground",
  treatment: "bg-accent text-accent-foreground",
  vaccination: "bg-secondary text-secondary-foreground",
  surgery: "bg-destructive text-destructive-foreground"
};

const statusStyles = {
  active: "bg-secondary text-secondary-foreground",
  completed: "bg-muted text-muted-foreground",
  discontinued: "bg-destructive text-destructive-foreground"
};

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPet, setFilterPet] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filteredHistory = medicalHistory.filter(item => {
    const matchesSearch = item.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPet = filterPet === "all" || item.petName.toLowerCase().includes(filterPet.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    
    return matchesSearch && matchesPet && matchesType;
  });

  const filteredPrescriptions = prescriptionHistory.filter(item => {
    const matchesSearch = item.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.medication.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPet = filterPet === "all" || item.petName.toLowerCase().includes(filterPet.toLowerCase());
    
    return matchesSearch && matchesPet;
  });

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Historiques Médicaux</h1>
          <p className="text-muted-foreground mt-2">
            Consultez l'historique complet des soins et prescriptions
          </p>
        </div>
        
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exporter Données
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher dans les historiques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input 
              placeholder="Rechercher par animal, client ou traitement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            
            <Select value={filterPet} onValueChange={setFilterPet}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les animaux</SelectItem>
                <SelectItem value="bella">Bella</SelectItem>
                <SelectItem value="whiskers">Whiskers</SelectItem>
                <SelectItem value="rex">Rex</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="consultation">Consultations</SelectItem>
                <SelectItem value="treatment">Traitements</SelectItem>
                <SelectItem value="vaccination">Vaccinations</SelectItem>
                <SelectItem value="surgery">Chirurgies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="medical" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="medical" className="gap-2">
            <HistoryIcon className="h-4 w-4" />
            Historique Médical
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="gap-2">
            <Pill className="h-4 w-4" />
            Prescriptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="medical" className="space-y-4">
          <h3 className="text-lg font-semibold">
            Historique médical ({filteredHistory.length} entrées)
          </h3>
          
          {filteredHistory.map((item) => (
            <Card key={item.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(item.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <Badge 
                        variant="outline"
                        className={typeStyles[item.type as keyof typeof typeStyles]}
                      >
                        {item.type === 'consultation' ? 'Consultation' :
                         item.type === 'treatment' ? 'Traitement' :
                         item.type === 'vaccination' ? 'Vaccination' : 'Chirurgie'}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {item.petName} ({item.petType})
                        </span>
                        <span>Client: {item.client}</span>
                        <span>Vétérinaire: {item.veterinarian}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm">{item.details}</p>
                    
                    {item.prescriptions.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm flex items-center gap-1">
                          <Pill className="h-4 w-4" />
                          Prescriptions:
                        </h5>
                        <div className="flex gap-2 flex-wrap">
                          {item.prescriptions.map((prescription, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {prescription}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Détails
                    </Button>
                    <Button size="sm" variant="outline">
                      Imprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <h3 className="text-lg font-semibold">
            Historique des prescriptions ({filteredPrescriptions.length} entrées)
          </h3>
          
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(prescription.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <Badge 
                        variant="outline"
                        className={statusStyles[prescription.status as keyof typeof statusStyles]}
                      >
                        {prescription.status === 'active' ? 'Actif' :
                         prescription.status === 'completed' ? 'Terminé' : 'Arrêté'}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold">{prescription.medication}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {prescription.petName}
                        </span>
                        <span>Client: {prescription.client}</span>
                        <span>Prescrit par: {prescription.veterinarian}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Dosage:</span> {prescription.dosage}
                      </div>
                      <div>
                        <span className="font-medium">Fréquence:</span> {prescription.frequency}
                      </div>
                      <div>
                        <span className="font-medium">Durée:</span> {prescription.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Renouveler
                    </Button>
                    <Button size="sm" variant="outline">
                      Imprimer
                    </Button>
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

export default History;