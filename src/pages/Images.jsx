import ImageGrid from "../components/ImagesGrid";
import Sidebar from "../components/Sidebar";

export default function Images() {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5 mx-4 my-4">
      <Sidebar active={1} />
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Uploaded Images
          </h3>
        </div>
        <ImageGrid />
      </div>
    </div>
  );
}
