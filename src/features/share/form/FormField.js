import React from "react"
import { useField } from "formik"
import clsx from "clsx"

const FormField = React.memo(function FormField({
  label,
  name,
  className,
  component: Component,
  ...props
}) {
  const [field, meta] = useField({ name, ...props })
  const errorMessage = (meta.touched && meta.error) ?? ""

  return (
    <div className="w-full h-full mb-5">
      {label && (
        <label size="sm" htmlFor={name} as="label" className="mb-2 text-left">
          {label}
        </label>
      )}
      <Component
        id={name}
        {...field}
        {...props}
        className={clsx(
          errorMessage &&
            "border-2 border-red-100 text-red-100 focus:outline-none",
          className
        )}
      />
      <span hidden={!errorMessage} className="block absolute text-red-100 mt-1">
        {errorMessage}
      </span>
    </div>
  )
})

export default FormField
