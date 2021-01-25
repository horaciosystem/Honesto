import { Formik, Form } from "formik";
import { useState } from "react";
import FormField from "./FormField";
import RateInput from "./RateInput";

function MultiStepForm({ questions, onSubmit, initialValues = {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  /* {"type":"scale",
  "required":true,
  "label":"How much do you trust this person to deliver high quality work?",
  "id":"d4fb213d-222b-48b7-b193-03a79f6c652e"}
  */
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {() => (
        <Form className="flex flex-col">
          <div className="space-y-6 md:space-y-10 mt-4 md:mt-6 flex-grow px-4 pb-16">
            <QuestionField question={currentQuestion} />
          </div>
          <div className="flex justify-end space-x-3 flex-grow-0 flex-shrink-0 border-t border-gray-200 p-4">
            <button type="button">Previous</button>
            <button
              type="button"
              className={currentQuestion.required ? "none" : "block"}
            >
              Skip
            </button>
            <button type="button">Next</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function QuestionField({ question: { name, label, type }, question }) {
  if (type === "scale") {
    return <FieldSet name={name} label={label} component={RateInput} />;
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
  }

  return (
    <div className="mx-auto">
      <label htmlFor={name} className="block mb-2 text-center">
        {label}
      </label>
      <FormField name={name} component={TextInput} />
    </div>
  );
}

function FieldSet({ label, name, component }) {
  return (
    <fieldset className="space-y-4 flex flex-col items-center">
      <legend htmlFor={name} className="block text-center">
        {label}
      </legend>
      <FormField name={name} component={component} />
    </fieldset>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="px-3 py-2 bg-inverse focus:bg-white w-full md:max-w-xl block md:mx-auto"
      placeholder="Type here"
    />
  );
}

export default MultiStepForm;
