import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar as CalendarIcon, Clock, User, Heart, Phone } from "lucide-react";

const appointments = [
  {
    id: 1,
    date: "2024-01-25",
    time: "09:00",
    client: "Marie Dubois",
    pet: "Bella",
    petType: "Chien",
    type: "Consultation générale",
    status: "confirmed",
    duration: 30,
    notes: "Contrôle annuel"
  },
  {
    id: 2,
    date: "2024-01-25",
    time: "10:30",
    client: "Jean Martin",
    pet: "Whiskers",
    petType: "Chat",
    type: "Suivi traitement",
    status: "confirmed", 
    duration: 45,
    notes: "Suivi infection urinaire"
  },
  {
    id: 3,
    date: "2024-01-25",
    time: "14:00",
    client: "Sophie Leroux",
    pet: "Rex",
    petType: "Chien",
    type: "Vaccination",
    status: "pending",
    duration: 20,
    notes: "Rappel vaccins"
  },
  {
    id: 4,
    date: "2024-01-26",
    time: "11:00",
    client: "Pierre Moreau",
    pet: "Luna",
    petType: "Chat",
    type: "Urgence",
    status: "urgent",
    duration: 60,
    notes: "Problème digestif aigu"
  }
];

const statusStyles = {
  confirmed: "bg-secondary text-secondary-foreground",
  pending: "bg-accent text-accent-foreground",
  urgent: "bg-destructive text-destructive-foreground",
  completed: "bg-muted text-muted-foreground"
};

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const matchesDate = selectedDate ? 
      aptDate.toDateString() === selectedDate.toDateString() : true;
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    
    return matchesDate && matchesStatus;
  });

  const todayAppointments = appointments.filter(apt => {
    const today = new Date();
    const aptDate = new Date(apt.date);
    return aptDate.toDateString() === today.toDateString();
  });

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Rendez-vous</h1>
          <p className="text-muted-foreground mt-2">
            Planifiez et gérez tous vos rendez-vous vétérinaires
          </p>
        </div>
        
        <Button className="gap-2 medical-glow">
          <Plus className="h-4 w-4" />
          Nouveau RDV
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendrier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border shadow"
              />
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Aujourd'hui ({todayAppointments.length})</h4>
                {todayAppointments.slice(0, 3).map((apt) => (
                  <div key={apt.id} className="text-sm p-2 border rounded">
                    <div className="font-medium">{apt.time} - {apt.pet}</div>
                    <div className="text-muted-foreground">{apt.client}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Filtres</span>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous statuts</SelectItem>
                    <SelectItem value="confirmed">Confirmé</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Rendez-vous du {selectedDate?.toLocaleDateString('fr-FR')} ({filteredAppointments.length})
            </h3>
            
            {filteredAppointments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  Aucun rendez-vous pour cette date
                </CardContent>
              </Card>
            ) : (
              filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-lg">{appointment.time}</span>
                          </div>
                          <Badge 
                            variant="outline"
                            className={statusStyles[appointment.status as keyof typeof statusStyles]}
                          >
                            {appointment.status === 'confirmed' ? 'Confirmé' :
                             appointment.status === 'pending' ? 'En attente' :
                             appointment.status === 'urgent' ? 'Urgent' : 'Terminé'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {appointment.duration} min
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{appointment.client}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Heart className="h-4 w-4 text-muted-foreground" />
                              <span>{appointment.pet} ({appointment.petType})</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium">Type:</span> {appointment.type}
                            </div>
                            <div>
                              <span className="font-medium">Notes:</span> {appointment.notes}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Phone className="h-4 w-4" />
                          Appeler
                        </Button>
                        <Button size="sm" variant="outline">
                          Modifier
                        </Button>
                        <Button size="sm">
                          Commencer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;