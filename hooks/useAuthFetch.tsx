import { createURL } from "@/utils/heplers";
import { useAuth } from "@clerk/nextjs";

export default function useAuthFetch<T>(url: string): () => Promise<T> {
  const { getToken } = useAuth();

  const authFetch = async () => {
    const res = await fetch(
      new Request(createURL(url), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
      })
    );

    if (res.ok) {
      return (await res.json()) as Promise<T>;
    } else {
      throw new Error("Something went wrong on API server!");
    }
  };

  return authFetch;
}
