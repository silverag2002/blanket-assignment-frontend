export default function ImageGrid({ images }) {
  const files = [
    {
      source:
        "data:image/png;base64,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",
      title: "CRED",
      size: "2MB",
    },
  ];
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
