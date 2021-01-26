import clsx from "clsx"

const RATE_OPTIONS = Array.from(Array(10), (_, index) => index + 1)

export default function RateInput({ name, value = 0, onChange }) {
  return (
    <div className="flex items-center space-x-1">
      {RATE_OPTIONS.map((it) => {
        const checked = it <= value
        const checkName = `${name}–${it}`

        return (
          <label
            key={checkName}
            htmlFor={checkName}
            className="group flex items-center justify-center min-h-action rounded-md 
             text-white cursor-pointer"
          >
            <input
              type="checkbox"
              name={checkName}
              id={checkName}
              checked={checked}
              onChange={() => onChange(it)}
              aria-label={`rate this person with ${it}`}
              className="hidden"
            />
            <div
              className={clsx(
                "w-16 h-16",
                checked
                  ? "bg-purple-600 hover:bg-purple-400"
                  : "bg-gray-300 hover:bg-purple-600"
              )}
            />
          </label>
        )
      })}
    </div>
  )
}
