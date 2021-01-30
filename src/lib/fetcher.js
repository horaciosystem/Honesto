import fetch from "isomorphic-fetch"
import { useQuery } from "react-query"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const fetcher = async ({ queryKey }) => {
  const path = queryKey[0]
  const res = await fetch(`${BASE_URL}/${path}`)
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    error.status = res.status
    throw error
  }
  return res.json()
}

export function useApiFetch({ path }) {
  return useQuery(path, fetcher)
}
