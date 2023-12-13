import { useCallback, useEffect, useState } from "react";
import { Reservation } from "../utils/types";
import useAuthFetch from "./useAuthFetch";

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

  const url = `/api/reservations?month=${month}&year=${year}&from=${from}`;

  const fetchReservations = useCallback(
    useAuthFetch<{ data: Reservation[] }>(url),
    [url]
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
