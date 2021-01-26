import useUsers from "@/common/hooks/useUsers"
import clsx from "clsx"
import { Formik, Form } from "formik"
import { useEffect, useReducer, useRef } from "react"
import FormField from "./FormField"
import RateInput from "./RateInput"

function navigationReducer(state, action) {
  switch (action.type) {
    case "PREVIOUS": {
      if (state.currentIndex > 0) {
        return { ...state, currentIndex: state.currentIndex - 1 }
      }
      return state
    }
    case "NEXT": {
      if (state.currentIndex === state.questionsLength - 1) {
        return { ...state, effect: "submit" }
      }
      return { ...state, currentIndex: state.currentIndex + 1 }
    }
    case "SKIP": {
      if (state.currentIndex < state.questionsLength - 1) {
        return { ...state, currentIndex: state.currentIndex + 1 }
      }
      return state
    }
    case "RESET": {
      return { ...state, effect: null }
    }
    default:
      return state
  }
}

function MultiStepForm({ questions, onSubmit, initialValues, userId }) {
  const [state, dispatch] = useReducer(navigationReducer, {
    currentIndex: 0,
    effect: null,
    questionsLength: questions.length,
  })
  const currentQuestion = questions[state.currentIndex]
  const formRef = useRef(null)

  useEffect(() => {
    if (state.effect === "submit") {
      formRef.current.submitForm().then(() => dispatch({ type: "RESET" }))
    }
  }, [state.effect])

  return (
    <>
      <h2 className="font-semibold text-3xl">{currentQuestion.label}</h2>
      <UserDetails userId={userId} />
      <Formik
        innerRef={formRef}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        {() => (
          <Form
            className="flex items-center justify-center flex-col max-h-96"
            style={{ height: "500px" }}
          >
            <div className="mb-12">
              <QuestionField question={currentQuestion} />
            </div>
            <div className="w-full grid grid-cols-3">
              <div className="flex justify-center">
                <Button
                  onClick={() => dispatch({ type: "PREVIOUS" })}
                  disabled={state.currentIndex === 0}
                >
                  Previous
                </Button>
              </div>
              <div className="flex justify-center">
                <Button
                  hidden={state.currentIndex === state.questionsLength - 1}
                  onClick={() => dispatch({ type: "SKIP" })}
                >
                  Skip
                </Button>
              </div>
              <div className="flex justify-center">
                <Button onClick={() => dispatch({ type: "NEXT" })}>Next</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div>{`${state.currentIndex + 1}/${state.questionsLength}`}</div>
    </>
  )
}

function Button({ children, disabled, className, ...props }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        "bg-white text-black py-2 w-36 border rounded focus:outline-none focus:ring-2 focus:ring-offset-2",
        disabled && "cursor-not-allowed ",
        className
      )}
      {...props}
    >
      {children}
    </button>
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
    <textarea
      {...props}
      placeholder="Say something"
      rows={10}
      cols={100}
      className="px-2 pt-1 block w-full rounded border"
      style={{ resize: "none" }}
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
