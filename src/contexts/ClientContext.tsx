import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Client {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  notes?: string;
  pets: Pet[];
  lastVisit: string;
  totalVisits: number;
}

export interface Pet {
  id: number;
  name: string;
  type: string;
  breed?: string;
  age?: string;
  weight?: string;
  color?: string;
  microchip?: string;
  medicalNotes?: string;
  photo?: string;
  ownerId: number;
  owner: string;
  status: 'healthy' | 'treatment' | 'urgent';
  lastVisit?: string;
  nextAppointment?: string;
  vaccinations?: string[];
}

interface ClientContextType {
  clients: Client[];
  pets: Pet[];
  addClient: (clientData: Omit<Client, 'id' | 'pets' | 'lastVisit' | 'totalVisits'>) => void;
  addPet: (petData: Omit<Pet, 'id'>) => void;
  updateClient: (id: number, clientData: Partial<Client>) => void;
  updatePet: (id: number, petData: Partial<Pet>) => void;
  getClientById: (id: number) => Client | undefined;
  getPetById: (id: number) => Pet | undefined;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

const initialClients: Client[] = [
  {
    id: 1,
    name: "Marie Dubois",
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@email.com",
    phone: "06 12 34 56 78",
    address: "123 Rue de la Paix",
    city: "Paris",
    postalCode: "75001",
    pets: [],
    lastVisit: "2024-01-15",
    totalVisits: 12
  },
  {
    id: 2,
    name: "Jean Martin",
    firstName: "Jean",
    lastName: "Martin",
    email: "jean.martin@email.com",
    phone: "06 98 76 54 32",
    address: "45 Avenue des Roses",
    city: "Lyon",
    postalCode: "69000",
    pets: [],
    lastVisit: "2024-01-10",
    totalVisits: 8
  },
  {
    id: 3,
    name: "Sophie Leroux",
    firstName: "Sophie",
    lastName: "Leroux",
    email: "sophie.leroux@email.com",
    phone: "06 45 67 89 12",
    address: "78 Boulevard Maritime",
    city: "Marseille",
    postalCode: "13000",
    pets: [],
    lastVisit: "2024-01-18",
    totalVisits: 15
  }
];

const initialPets: Pet[] = [
  {
    id: 1,
    name: "Bella",
    type: "Chien",
    breed: "Golden Retriever",
    age: "3 ans",
    weight: "28 kg",
    color: "Doré",
    ownerId: 1,
    owner: "Marie Dubois",
    status: "healthy",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25",
    microchip: "982000123456789",
    vaccinations: ["Rage", "DHPP", "Lyme"]
  },
  {
    id: 2,
    name: "Whiskers",
    type: "Chat", 
    breed: "Persan",
    age: "5 ans",
    weight: "4.5 kg",
    color: "Blanc",
    ownerId: 2,
    owner: "Jean Martin",
    status: "treatment",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-22",
    microchip: "982000987654321",
    vaccinations: ["Rage", "FVRCP"]
  },
  {
    id: 3,
    name: "Rex",
    type: "Chien",
    breed: "Berger Allemand", 
    age: "7 ans",
    weight: "32 kg",
    color: "Noir et feu",
    ownerId: 3,
    owner: "Sophie Leroux",
    status: "healthy",
    lastVisit: "2024-01-18",
    nextAppointment: "2024-02-01",
    microchip: "982000555444333",
    vaccinations: ["Rage", "DHPP", "Bordetella"]
  }
];

export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [pets, setPets] = useState<Pet[]>(initialPets);

  const addClient = (clientData: Omit<Client, 'id' | 'pets' | 'lastVisit' | 'totalVisits'>) => {
    const newClient: Client = {
      ...clientData,
      name: `${clientData.firstName} ${clientData.lastName}`,
      id: Math.max(...clients.map(c => c.id), 0) + 1,
      pets: [],
      lastVisit: new Date().toISOString().split('T')[0],
      totalVisits: 0
    };
    setClients(prev => [...prev, newClient]);
  };

  const addPet = (petData: Omit<Pet, 'id'>) => {
    const newPet: Pet = {
      ...petData,
      id: Math.max(...pets.map(p => p.id), 0) + 1,
      status: petData.status || 'healthy',
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setPets(prev => [...prev, newPet]);
    
    // Update client's pets array
    setClients(prev => prev.map(client => 
      client.id === petData.ownerId 
        ? { ...client, pets: [...client.pets, newPet] }
        : client
    ));
  };

  const updateClient = (id: number, clientData: Partial<Client>) => {
    setClients(prev => prev.map(client => 
      client.id === id 
        ? { ...client, ...clientData, name: clientData.firstName && clientData.lastName ? `${clientData.firstName} ${clientData.lastName}` : client.name }
        : client
    ));
  };

  const updatePet = (id: number, petData: Partial<Pet>) => {
    setPets(prev => prev.map(pet => 
      pet.id === id ? { ...pet, ...petData } : pet
    ));
  };

  const getClientById = (id: number) => clients.find(c => c.id === id);
  const getPetById = (id: number) => pets.find(p => p.id === id);

  return (
    <ClientContext.Provider value={{
      clients,
      pets,
      addClient,
      addPet,
      updateClient,
      updatePet,
      getClientById,
      getPetById
    }}>
      {children}
    </ClientContext.Provider>
  );
}

export const useClients = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};