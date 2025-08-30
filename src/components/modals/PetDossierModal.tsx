import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Stethoscope, Syringe, AlertCircle } from "lucide-react";
import { Pet } from "@/contexts/ClientContext";

interface PetDossierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Pet | null;
}

// Mock data for medical history
const getMedicalHistory = (petId: number) => [
  {
    id: 1,
    date: "2024-01-15",
    type: "Consultation",
    veterinarian: "Dr. Dupont",
    reason: "Contrôle de routine",
    diagnosis: "Animal en bonne santé",
    treatment: "Aucun traitement nécessaire",
    notes: "Poids stable, bon état général"
  },
  {
    id: 2,
    date: "2023-12-10",
    type: "Vaccination",
    veterinarian: "Dr. Martin",
    reason: "Rappel vaccinal annuel",
    diagnosis: "Vaccination effectuée",
    treatment: "Vaccin DHPP",
    notes: "Aucune réaction adverse observée"
  }
];

const getVaccinations = (petId: number) => [
  {
    id: 1,
    name: "Rage",
    date: "2023-12-10",
    nextDue: "2024-12-10",
    status: "À jour"
  },
  {
    id: 2,
    name: "DHPP",
    date: "2023-12-10",
    nextDue: "2024-12-10",
    status: "À jour"
  },
  {
    id: 3,
    name: "Lyme",
    date: "2023-06-15",
    nextDue: "2024-06-15",
    status: "Bientôt dû"
  }
];

export function PetDossierModal({ open, onOpenChange, pet }: PetDossierModalProps) {
  if (!pet) return null;

  const medicalHistory = getMedicalHistory(pet.id);
  const vaccinations = getVaccinations(pet.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dossier Médical - {pet.name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history" className="gap-2">
              <Stethoscope className="h-4 w-4" />
              Historique
            </TabsTrigger>
            <TabsTrigger value="vaccinations" className="gap-2">
              <Syringe className="h-4 w-4" />
              Vaccinations
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Alertes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Historique médical</h3>
              <Button size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Nouvelle Consultation
              </Button>
            </div>

            <div className="space-y-4">
              {medicalHistory.map((record) => (
                <Card key={record.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{record.type}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(record.date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.veterinarian}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">Motif:</span>
                      <p className="text-sm">{record.reason}</p>
                    </div>
                    <div>
                      <span className="font-medium">Diagnostic:</span>
                      <p className="text-sm">{record.diagnosis}</p>
                    </div>
                    <div>
                      <span className="font-medium">Traitement:</span>
                      <p className="text-sm">{record.treatment}</p>
                    </div>
                    {record.notes && (
                      <div>
                        <span className="font-medium">Notes:</span>
                        <p className="text-sm text-muted-foreground">{record.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vaccinations" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Statut vaccinal</h3>
              <Button size="sm" variant="outline" className="gap-2">
                <Syringe className="h-4 w-4" />
                Planifier Vaccination
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {vaccinations.map((vaccine) => (
                <Card key={vaccine.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{vaccine.name}</h4>
                      <Badge 
                        variant="outline"
                        className={
                          vaccine.status === 'À jour' ? 'bg-secondary text-secondary-foreground' :
                          vaccine.status === 'Bientôt dû' ? 'bg-accent text-accent-foreground' :
                          'bg-destructive text-destructive-foreground'
                        }
                      >
                        {vaccine.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dernière dose:</span>
                        <span>{new Date(vaccine.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prochaine dose:</span>
                        <span>{new Date(vaccine.nextDue).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <h3 className="text-lg font-semibold">Alertes et rappels</h3>
            
            <div className="space-y-4">
              <Card className="border-accent">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-accent" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Vaccination Lyme à renouveler</h4>
                      <p className="text-sm text-muted-foreground">
                        Le vaccin contre la maladie de Lyme expire le {new Date('2024-06-15').toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Planifier
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Contrôle annuel programmé</h4>
                      <p className="text-sm text-muted-foreground">
                        Prochain contrôle de routine prévu pour février 2024
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Confirmer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Imprimer Dossier
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}