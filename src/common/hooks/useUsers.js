import { useApiFetch } from "@/lib/fetcher";

function useUsers() {
  return useApiFetch({ path: "users" });
}

export default useUsers;
