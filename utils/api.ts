import { Reservation } from "./types";

const createURL = (path: string) => window.location.origin + path;

export async function getReservationsForMonth(
  month: number
): Promise<{ data: Reservation[] }> {
  const res = await fetch(
    new Request(createURL(`/api/reservations/month/${month}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  // TODO: Validate user / send cookie?
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
}
