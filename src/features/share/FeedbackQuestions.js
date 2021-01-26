/* eslint-disable @theorem/no-imports-down */
import useQuestions from "@/common/hooks/useQuestions"
import MultiStepForm from "@/features/share/form/MultiStepForm"

const questionsKey = "@honesto:questions"

function FeedbackQuestions({ userId }) {
  const { data: questions, error } = useQuestions()

  // const foo = JSON.parse(window.localStorage.getItem(questionsKey));

  const handleSubmit = (values) => {
    console.log({ values })
  }

  return (
    <>
      {questions ? (
        <MultiStepForm
          questions={questions}
          initialValues={{}}
          onSubmit={handleSubmit}
          userId={userId}
        />
      ) : (
        !error && <span>Loading...</span>
      )}
    </>
  )
}

export default FeedbackQuestions
