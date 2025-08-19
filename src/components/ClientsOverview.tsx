import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Mail, MapPin, Plus } from "lucide-react";

const recentClients = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "06 12 34 56 78",
    city: "Paris",
    pets: 2,
    lastVisit: "Il y a 3 jours"
  },
  {
    id: 2,
    name: "Jean Martin",
    email: "jean.martin@email.com", 
    phone: "06 98 76 54 32",
    city: "Lyon",
    pets: 1,
    lastVisit: "Il y a 1 semaine"
  },
  {
    id: 3,
    name: "Sophie Leroux",
    email: "sophie.leroux@email.com",
    phone: "06 45 67 89 12",
    city: "Marseille", 
    pets: 3,
    lastVisit: "Il y a 2 jours"
  }
];

export function ClientsOverview() {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Clients Récents</CardTitle>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Client
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentClients.map((client) => (
          <div 
            key={client.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <h4 className="font-medium">{client.name}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                    {client.city}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right space-y-2">
              <Badge variant="secondary">
                {client.pets} animal{client.pets > 1 ? 'ux' : ''}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {client.lastVisit}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}