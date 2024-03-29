/* eslint-disable @theorem/no-imports-down */
import useQuestions from "@/common/hooks/useQuestions"
import MultiStepForm from "@/features/share/form/MultiStepForm"
import { useEffect, useState } from "react"

const questionsKey = "@honesto:questions"

function persistValues(values) {
  const currentValues = JSON.parse(window.localStorage.getItem(questionsKey))
  window.localStorage.setItem(
    questionsKey,
    JSON.stringify({ ...values, ...currentValues })
  )
}

function FeedbackQuestions({ userId }) {
  const { data: questions, isLoading } = useQuestions()
  const [view, setView] = useState("form")
  const [userAnswers, setUserAnswers] = useState({})

  const handleSubmit = (values) => {
    persistValues({ [userId]: values })
    setView("feedback")
  }

  useEffect(() => {
    //load only on client side because the page can be rendered in the server side.
    const storage = JSON.parse(window.localStorage.getItem(questionsKey))
    const answers = storage?.[userId] ?? {}
    setUserAnswers(answers)
  }, [userId])

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <>
      {view === "form" ? (
        <MultiStepForm
          questions={questions}
          initialValues={userAnswers}
          onSubmit={handleSubmit}
          userId={userId}
        />
      ) : (
        <div>
          <h2 className="font-semibold text-3xl">
            Thank you for sharing your feedback!
          </h2>
          <p className="text-sm">
            Continue to give feedback to other team members.
          </p>
        </div>
      )}
    </>
  )
}

export default FeedbackQuestions
