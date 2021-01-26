import useUsers from "@/common/hooks/useUsers"
import { Formik, Form } from "formik"
import { useEffect, useState } from "react"
import FormField from "./FormField"
import RateInput from "./RateInput"

function MultiStepForm({ questions, onSubmit, initialValues = {}, userId }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentQuestion = questions[currentIndex]

  return (
    <>
      <h2 className="font-semibold text-3xl">{currentQuestion.label}</h2>
      <UserDetails userId={userId} />
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ submitForm }) => (
          <Form className="flex flex-col max-h-96" style={{ height: "500px" }}>
            <div className="space-y-6 md:space-y-10 mt-4 md:mt-6 flex-grow px-4 pb-16">
              <QuestionField question={currentQuestion} />
            </div>
            <div className="flex justify-end space-x-3 flex-grow-0 flex-shrink-0 border-t border-gray-200 p-4">
              <button
                type="button"
                onClick={() => setCurrentIndex((prevState) => prevState - 1)}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                type="button"
                className={currentQuestion.required ? "none" : "block"}
                hidden={currentIndex === questions.length}
              >
                Skip
              </button>
              <button
                type="button"
                onClick={() => {
                  if (currentIndex === questions.length) {
                    submitForm()
                  } else {
                    setCurrentIndex((prevState) => prevState + 1)
                  }
                }}
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

function QuestionField({ question: { id: name, label, type }, question }) {
  if (type === "scale") {
    return <FieldSet name={name} label={label} component={RateInput} />
  }

  if (type === "multipleChoice") {
    // return (
    //   <FieldSet
    //     name={name}
    //     label={label}
    //     options={question.options}
    //     component={MultipleInput}
    //   />
    // );
    return "multipleChoice"
  }

  return (
    <div className="mx-auto">
      <FormField name={name} component={TextInput} />
    </div>
  )
}

function FieldSet({ label, name, component, ...props }) {
  return (
    <fieldset className="space-y-4 flex flex-col items-center">
      <FormField name={name} component={component} {...props} />
    </fieldset>
  )
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="px-3 py-2 bg-inverse focus:bg-white w-full md:max-w-xl block md:mx-auto"
      placeholder="Type here"
    />
  )
}

function UserDetails({ userId }) {
  const { data } = useUsers()
  const user = data?.find((it) => it.id === userId)

  return (
    <p hidden={!user} className="uppercase text-gray-500 text-xs">
      {`share your feedback for ${user?.firstName} ${user?.lastName}`}
    </p>
  )
}

export default MultiStepForm
