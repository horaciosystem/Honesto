import clsx from "clsx"

function PageColumn({ children, size }) {
  const pageSize =
    {
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
    }[size] || "max-w-screen-md"

  return <div className={clsx("mx-auto", pageSize)}>{children}</div>
}

export default PageColumn
