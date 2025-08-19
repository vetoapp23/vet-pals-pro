import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, Calendar, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Clients Total",
    value: "847",
    change: "+12%",
    icon: Users,
    color: "primary"
  },
  {
    title: "Animaux Suivis",
    value: "1,234",
    change: "+8%", 
    icon: Heart,
    color: "secondary"
  },
  {
    title: "RDV Aujourd'hui",
    value: "23",
    change: "+3%",
    icon: Calendar,
    color: "accent"
  },
  {
    title: "Revenus Mois",
    value: "€15,420",
    change: "+15%",
    icon: TrendingUp,
    color: "primary"
  }
];

export function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 text-${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-secondary font-medium">{stat.change}</span> vs mois dernier
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}