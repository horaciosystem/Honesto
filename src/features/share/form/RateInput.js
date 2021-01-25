import clsx from "clsx";

const RATE_OPTIONS = [1, 2, 3, 4, 5];

export default function RateInput({ name, value = 0, onChange }) {
  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      {RATE_OPTIONS.map((it) => {
        const checked = it <= value;
        const checkName = `${name}–${it}`;

        return (
          <label
            key={checkName}
            htmlFor={checkName}
            className="group flex items-center justify-center min-h-action w-12 rounded-md 
            hover:text-tertiary-lighten text-white cursor-pointer"
          >
            <input
              type="checkbox"
              name={checkName}
              size="sm"
              id={checkName}
              checked={checked}
              onChange={() => onChange(it)}
              aria-label={`rate this with ${it}`}
              className="hidden"
            />
            <div
              className={clsx(
                checked
                  ? "text-tertiary group-hover:text-tertiary-lighten"
                  : "stroke-black group-hover:stroke-current stroke-2 group-hover:stroke-0"
              )}
            />
          </label>
        );
      })}
    </div>
  );
}
