export interface MockUser {
  id: string;
  email: string;
  password: string;
  role: 'PSYCHOLOGIST' | 'CLIENT';
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    specialty?: string;
    license?: string;
    rating?: number;
    sessions?: number;
    experience?: string;
    languages?: string[];
    modalities?: string[];
  };
}

export const mockUsers: MockUser[] = [
  // Psicólogos
  {
    id: "psy_1",
    email: "ana.garcia@mentesana.com",
    password: "123456",
    role: "PSYCHOLOGIST",
    profile: {
      firstName: "Ana",
      lastName: "García",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
      specialty: "Ansiedad y Depresión",
      license: "PSI-12345",
      rating: 4.9,
      sessions: 2840,
      experience: "8 años",
      languages: ["Español", "Inglés"],
      modalities: ["Avatar IA", "Videollamada", "Chat"]
    }
  },
  {
    id: "psy_2", 
    email: "carlos.ruiz@mentesana.com",
    password: "123456",
    role: "PSYCHOLOGIST",
    profile: {
      firstName: "Carlos",
      lastName: "Ruiz",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
      specialty: "Terapia de Pareja",
      license: "PSI-67890",
      rating: 4.8,
      sessions: 1950,
      experience: "6 años",
      languages: ["Español"],
      modalities: ["Videollamada", "Presencial"]
    }
  },
  {
    id: "psy_3",
    email: "maria.lopez@mentesana.com", 
    password: "123456",
    role: "PSYCHOLOGIST",
    profile: {
      firstName: "María",
      lastName: "López",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80",
      specialty: "Psicología Infantil",
      license: "PSI-11111",
      rating: 4.9,
      sessions: 3200,
      experience: "10 años",
      languages: ["Español", "Catalán"],
      modalities: ["Avatar IA", "Videollamada", "Presencial"]
    }
  },
  {
    id: "psy_4",
    email: "david.martinez@mentesana.com",
    password: "123456", 
    role: "PSYCHOLOGIST",
    profile: {
      firstName: "David",
      lastName: "Martínez",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
      specialty: "Adicciones",
      license: "PSI-22222",
      rating: 4.7,
      sessions: 1580,
      experience: "5 años",
      languages: ["Español", "Inglés"],
      modalities: ["Videollamada", "Chat", "Presencial"]
    }
  },

  // Pacientes/Clientes
  {
    id: "client_1",
    email: "juan.perez@email.com",
    password: "123456",
    role: "CLIENT", 
    profile: {
      firstName: "Juan",
      lastName: "Pérez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    }
  },
  {
    id: "client_2",
    email: "laura.gonzalez@email.com", 
    password: "123456",
    role: "CLIENT",
    profile: {
      firstName: "Laura",
      lastName: "González",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b550?auto=format&fit=crop&w=300&q=80"
    }
  },
  {
    id: "client_3",
    email: "miguel.rodriguez@email.com",
    password: "123456", 
    role: "CLIENT",
    profile: {
      firstName: "Miguel",
      lastName: "Rodríguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    }
  },
  {
    id: "client_4",
    email: "sofia.martinez@email.com",
    password: "123456",
    role: "CLIENT", 
    profile: {
      firstName: "Sofía",
      lastName: "Martínez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"
    }
  },
  {
    id: "client_5",
    email: "admin@mentesana.com",
    password: "admin123",
    role: "CLIENT",
    profile: {
      firstName: "Administrador",
      lastName: "Sistema",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
    }
  }
];

export const authenticateUser = (email: string, password: string): MockUser | null => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  return user || null;
};

export const getUserById = (id: string): MockUser | null => {
  return mockUsers.find(u => u.id === id) || null;
};

export const getPsychologists = (): MockUser[] => {
  return mockUsers.filter(u => u.role === 'PSYCHOLOGIST');
};

export const getClients = (): MockUser[] => {
  return mockUsers.filter(u => u.role === 'CLIENT');
};