import { Reservation } from "./types";

const createURL = (path: string) => window.location.origin + path;

export async function getReservationsForMonth({
  month,
  year,
  from,
}: {
  month?: number;
  year?: number;
  from?: string;
}): Promise<{ data: Reservation[] }> {
  const res = await fetch(
    new Request(
      createURL(`/api/reservations?month=${month}&year=${year}&from=${from}`),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  );

  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
}
