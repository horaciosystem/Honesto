import clsx from "clsx";

function RoundedImage({ src, alt, className }) {
  return (
    <img
      alt={alt}
      src={src}
      className={clsx("rounded-full w-5 h-5", className)}
    />
  );
}

export default RoundedImage;
