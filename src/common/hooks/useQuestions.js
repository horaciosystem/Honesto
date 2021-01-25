import { useApiFetch } from "@/lib/fetcher";

function useQuestions() {
  return useApiFetch({ path: "questions" });
}

export default useQuestions;
