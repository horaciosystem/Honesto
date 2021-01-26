import { useApiFetch } from "@/lib/fetcher";

function useUsers({ initialData }) {
  return useApiFetch({ path: "users", initialData });
}

export default useUsers;
