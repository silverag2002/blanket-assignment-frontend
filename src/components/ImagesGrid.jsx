import { useEffect } from "react";

export default function ImageGrid({ images }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {images?.length > 0 &&
        images.map((file, index) => (
          <li key={file} className="relative">
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <img
                src={file}
                alt=""
                className="object-cover pointer-events-none group-hover:opacity-75"
              />
            </div>
          </li>
        ))}
    </ul>
  );
}
