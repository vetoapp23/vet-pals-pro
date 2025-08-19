import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Calendar } from "lucide-react";
import heroImage from "@/assets/vet-hero.jpg";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden gradient-hero rounded-2xl p-8 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-primary">
                Gestion Vétérinaire Complète
              </span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight">
              Bienvenue sur votre
              <span className="gradient-primary bg-clip-text text-transparent block">
                Dashboard VetPro
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              Gérez efficacement vos clients, leurs animaux, les rendez-vous et consultations. 
              Votre pratique vétérinaire optimisée en un seul endroit.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button size="lg" className="gap-2 medical-glow">
              <Users className="h-5 w-5" />
              Nouveau Client
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="lg" className="gap-2">
              <Calendar className="h-5 w-5" />
              Planifier RDV
            </Button>
          </div>
          
          <div className="flex gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">847</div>
              <div className="text-sm text-muted-foreground">Clients actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">1,234</div>
              <div className="text-sm text-muted-foreground">Animaux suivis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">23</div>
              <div className="text-sm text-muted-foreground">RDV aujourd'hui</div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <img 
            src={heroImage}
            alt="Vétérinaire professionnel examinant un chien"
            className="w-96 h-64 object-cover rounded-xl shadow-medical"
          />
        </div>
      </div>
    </div>
  );
}