interface counselee {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  email: string;
  maritalStatus: string;
  address: string;
  profession: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: string;
  harinamInitiationPlace: string;
  chantingRounds: string;
  chantingStartedThisRoundsDate: string;
  recommendedBy: string;
  currentCounselor: counselee;
  husband: counselee;
  connectedToCounselorSince: string;
  children: [
    {
      name: string;
      age: number;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

interface counselor {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  email: string;
  maritalStatus: string;
  address: string;
  profession: string;
  chantingRounds: number;
  chantingStartedThisRoundsDate: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: string;
  harinamInitiationPlace: string;
  children: [
    {
      name: string;
      age: number;
    }
  ];
  createdAt: string;
  updatedAt: string;
  husband: counselor;
}
