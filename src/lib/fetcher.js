import useSWR from "swr";
import fetch from "unfetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = (path) =>
  fetch(`${BASE_URL}/${path}`).then((r) => r.json());

export function useApiFetch({ path }) {
  const { error, ...rest } = useSWR(path, fetcher);
  if (error) {
    console.error(error);
  }

  return rest;
}
