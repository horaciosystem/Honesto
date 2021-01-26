import useSWR from "swr"
import fetch from "isomorphic-fetch"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const fetcher = async (path) => {
  const res = await fetch(`${BASE_URL}/${path}`)
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    error.status = res.status
    throw error
  }
  return res.json()
}

export function useApiFetch({ path, initialData }) {
  return useSWR(path, fetcher, { initialData })
}
