"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type SelectedDatesContext = [
  {
    startDate: string | null;
    endDate: string | null;
  } | null,
  Dispatch<
    SetStateAction<{
      startDate: string | null;
      endDate: string | null;
    } | null>
  >
];

type SelectedDatesContextError = [
  string | null,
  Dispatch<SetStateAction<string | null>>
];

const throwError = () => {
  throw new Error("Provider is missing!");
};

const SelectedDatesContext = createContext<SelectedDatesContext>([
  null,
  throwError,
]);

const SelectedDatesContextError = createContext<SelectedDatesContextError>([
  null,
  throwError,
]);

export const SelectedDateProvider = ({ children }: { children: ReactNode }) => {
  const selectedDatesState = useState<null | {
    startDate: string | null;
    endDate: string | null;
  }>(null);

  const errorState = useState<string | null>(null);
  return (
    <SelectedDatesContext.Provider value={selectedDatesState}>
      <SelectedDatesContextError.Provider value={errorState}>
        {children}
      </SelectedDatesContextError.Provider>
    </SelectedDatesContext.Provider>
  );
};

export default function useSelectDates() {
  const [selectedDates, setSelectedDates] = useContext(SelectedDatesContext);
  const [isError, setIsError] = useContext(SelectedDatesContextError);

  return { selectedDates, setSelectedDates, isError, setIsError };
}
