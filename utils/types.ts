export type Reservation = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  participants: number;
  familyTree: string;
  approved: boolean;
};
