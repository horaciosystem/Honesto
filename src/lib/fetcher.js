import useSWR from "swr";
import fetch from "unfetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_PATH = process.env.NEXT_PUBLIC_API_PATH;

const fetcher = (path) =>
  fetch(new URL(`${BASE_PATH}${path}`, BASE_URL)).then((r) => r.json());

export function useApiFetch({ path }) {
  return useSWR(path, fetcher);
}
