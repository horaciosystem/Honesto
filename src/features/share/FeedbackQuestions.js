import useQuestions from "@/common/hooks/useQuestions";
import MultiStepForm from "./MultiStepForm";

const questionsKey = "@honesto:questions";

function FeedbackQuestions({ userId }) {
  const { data: questions } = useQuestions();

  const foo = JSON.parse(window.localStorage.getItem(questionsKey));
  console.log({ foo });

  const handleSubmit = (values) => {
    console.log({ values });
  };

  return (
    <>
      {!questions && <span>Loading...</span>}
      <MultiStepForm
        questions={questions}
        initialValues={foo}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default FeedbackQuestions;
