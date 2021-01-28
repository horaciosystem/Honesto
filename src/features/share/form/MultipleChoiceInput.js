import clsx from "clsx"

export default function MultipleChoiceInput({
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((it) => {
        const checked = Array.isArray(value) && value.includes(String(it.value))

        return (
          <label
            key={it.value}
            htmlFor={it.value}
            className={clsx(
              "w-full group cursor-pointer px-10 py-4 rounded",
              checked ? "bg-gray-600 text-white" : "bg-gray-200 text-black"
            )}
          >
            <input
              type="checkbox"
              name={name}
              value={it.value}
              id={it.value}
              checked={checked}
              onChange={onChange}
              className="hidden"
            />
            <p>{it.label}</p>
          </label>
        )
      })}
    </div>
  )
}
