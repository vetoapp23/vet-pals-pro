import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, FileText, Heart, User, Calendar, Pill, Thermometer } from "lucide-react";
import { NewConsultationModal } from "@/components/forms/NewConsultationModal";

const consultations = [
  {
    id: 1,
    date: "2024-01-20",
    client: "Marie Dubois",
    pet: "Bella",
    petType: "Chien",
    veterinarian: "Dr. Dupont",
    reason: "Consultation générale",
    diagnosis: "Excellent état de santé",
    treatment: "Aucun traitement nécessaire",
    prescriptions: ["Vermifuge - 1 comprimé/mois"],
    weight: "28.5 kg",
    temperature: "38.2°C",
    notes: "Animal très coopératif. Propriétaire attentif.",
    followUp: "Contrôle dans 6 mois"
  },
  {
    id: 2,
    date: "2024-01-18",
    client: "Jean Martin",
    pet: "Whiskers",
    petType: "Chat",
    veterinarian: "Dr. Martin",
    reason: "Problème urinaire",
    diagnosis: "Cystite idiopathique féline",
    treatment: "Traitement anti-inflammatoire",
    prescriptions: [
      "Meloxicam 0.5mg - 1/2 comprimé/jour pendant 5 jours",
      "Aliment thérapeutique urinaire"
    ],
    weight: "4.2 kg",
    temperature: "38.8°C",
    notes: "Chat stressé, recommander enrichissement environnemental",
    followUp: "Contrôle dans 1 semaine"
  },
  {
    id: 3,
    date: "2024-01-15",
    client: "Sophie Leroux",
    pet: "Rex",
    petType: "Chien",
    veterinarian: "Dr. Dupont",
    reason: "Vaccination annuelle",
    diagnosis: "Bonne condition physique",
    treatment: "Vaccination DHPP + Rage",
    prescriptions: ["Carnet de vaccination mis à jour"],
    weight: "31.8 kg",
    temperature: "38.1°C",
    notes: "Légère prise de poids, ajuster l'alimentation",
    followUp: "Rappel vaccin dans 1 an"
  }
];

const Consultations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [showNewConsultation, setShowNewConsultation] = useState(false);

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.pet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterPeriod === "all") return matchesSearch;
    
    const consultationDate = new Date(consultation.date);
    const today = new Date();
    const daysAgo = (today.getTime() - consultationDate.getTime()) / (1000 * 3600 * 24);
    
    switch (filterPeriod) {
      case "week":
        return matchesSearch && daysAgo <= 7;
      case "month":
        return matchesSearch && daysAgo <= 30;
      case "quarter":
        return matchesSearch && daysAgo <= 90;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Consultations</h1>
          <p className="text-muted-foreground mt-2">
            Gérez et consultez tous les dossiers médicaux
          </p>
        </div>
        
        <Button 
          className="gap-2 medical-glow"
          onClick={() => setShowNewConsultation(true)}
        >
          <Plus className="h-4 w-4" />
          Nouvelle Consultation
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
          <div className="flex gap-4">
            <Input 
              placeholder="Rechercher par client, animal ou motif..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les périodes</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {showNewConsultation && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Nouvelle Consultation
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowNewConsultation(false)}
              >
                Annuler
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Client</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marie">Marie Dubois</SelectItem>
                    <SelectItem value="jean">Jean Martin</SelectItem>
                    <SelectItem value="sophie">Sophie Leroux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Animal</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un animal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bella">Bella (Chien)</SelectItem>
                    <SelectItem value="whiskers">Whiskers (Chat)</SelectItem>
                    <SelectItem value="rex">Rex (Chien)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Poids (kg)</label>
                <Input placeholder="Ex: 25.5" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Température (°C)</label>
                <Input placeholder="Ex: 38.5" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Vétérinaire</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Dr..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dupont">Dr. Dupont</SelectItem>
                    <SelectItem value="martin">Dr. Martin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Motif de consultation</label>
                <Input placeholder="Ex: Consultation générale, vaccination..." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Diagnostic</label>
                <Textarea placeholder="Décrivez votre diagnostic..." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Traitement prescrit</label>
                <Textarea placeholder="Décrivez le traitement..." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes complémentaires</label>
                <Textarea placeholder="Notes et observations..." />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button className="flex-1">
                Enregistrer la consultation
              </Button>
              <Button variant="outline" className="flex-1">
                Enregistrer et imprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Consultations récentes ({filteredConsultations.length})
        </h3>
        
        {filteredConsultations.map((consultation) => (
          <Card key={consultation.id} className="card-hover">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h4 className="text-lg font-semibold">{consultation.pet}</h4>
                      <Badge variant="secondary">{consultation.petType}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(consultation.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {consultation.client}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {consultation.veterinarian}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-4 w-4 text-primary" />
                      {consultation.temperature}
                    </div>
                    <span>{consultation.weight}</span>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h5 className="font-medium">Motif:</h5>
                    <p className="text-sm">{consultation.reason}</p>
                    
                    <h5 className="font-medium">Diagnostic:</h5>
                    <p className="text-sm">{consultation.diagnosis}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium">Traitement:</h5>
                    <p className="text-sm">{consultation.treatment}</p>
                    
                    <h5 className="font-medium flex items-center gap-1">
                      <Pill className="h-4 w-4" />
                      Prescriptions:
                    </h5>
                    <ul className="text-sm space-y-1">
                      {consultation.prescriptions.map((prescription, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full"></span>
                          {prescription}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {consultation.notes && (
                  <div className="space-y-2">
                    <h5 className="font-medium">Notes:</h5>
                    <p className="text-sm bg-muted p-3 rounded">{consultation.notes}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    Suivi: {consultation.followUp}
                  </span>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Imprimer
                    </Button>
                    <Button size="sm" variant="outline">
                      Modifier
                    </Button>
                    <Button size="sm">
                      Nouveau suivi
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <NewConsultationModal 
        open={showNewConsultation} 
        onOpenChange={setShowNewConsultation} 
      />
    </div>
  );
};

export default Consultations;