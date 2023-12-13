"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ActiveReservationContext = [
  string | null,
  Dispatch<SetStateAction<string | null>>
];

const throwError = () => {
  throw new Error("Provider is missing!");
};

const ActiveReservationContext = createContext<ActiveReservationContext>([
  null,
  throwError,
]);

export const ActiveReservationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const activeReservationState = useState<null | string>(null);

  return (
    <ActiveReservationContext.Provider value={activeReservationState}>
      {children}
    </ActiveReservationContext.Provider>
  );
};

export default function useActiveReservation(): ActiveReservationContext {
  const [activeReservation, setActiveReservation] = useContext(
    ActiveReservationContext
  );

  return [activeReservation, setActiveReservation];
}
