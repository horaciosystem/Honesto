/* eslint-disable @theorem/no-imports-down */
import useQuestions from "@/common/hooks/useQuestions";
import MultiStepForm from "@/features/share/form/MultiStepForm";

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
      {questions ? (
        <MultiStepForm
          questions={questions}
          initialValues={foo}
          onSubmit={handleSubmit}
        />
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}

export default FeedbackQuestions;
