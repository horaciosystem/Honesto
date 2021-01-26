import clsx from "clsx"
import { useState } from "react"

function RoundedImage({ src, alt, className, placeholder }) {
  const [image, setImage] = useState(src)

  return (
    <img
      alt={alt}
      src={image}
      className={clsx("rounded-full w-10 h-10 object-cover", className)}
      onError={() => setImage(placeholder)}
    />
  )
}

export default RoundedImage
