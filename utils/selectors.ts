import { Reservation } from "./types";

export const selectReservation = (
  data: Reservation[],
  reservationId: string
) => {
  const activeReservation =
    data.length > 0
      ? data.find(({ id, approved }) => id === reservationId && approved)
      : undefined;

  if (!activeReservation) return undefined;
  return {
    title: activeReservation.name,
    startDate: activeReservation.startDate,
    endDate: activeReservation.endDate,
    participants: activeReservation.participants,
  };
};

export const selectApprovedReservations = (data: Reservation[]) => {
  return data.filter(({ approved }) => approved);
};
