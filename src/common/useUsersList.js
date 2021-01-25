import { useApiFetch } from "@/lib/fetcher";

function useUsersList() {
  return useApiFetch({ path: "users" });
}

export default useUsersList;
