import { useCallback, useEffect, useState } from "react";
import { getReservationsForMonth } from "./api";
import { Reservation } from "./types";

export default function useQueryReservations({
  month,
  year,
  from,
}: {
  month?: number;
  year?: number;
  from?: string;
}) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchReservations = useCallback(
    () => getReservationsForMonth({ month, year, from }),
    [month, year]
  );

  useEffect(() => {
    async function getData() {
      try {
        const data = (await fetchReservations())?.data;
        setReservations(data);
      } catch (e) {
        console.log(e);
      }
    }

    getData();
  }, [fetchReservations]);

  return reservations;
}
