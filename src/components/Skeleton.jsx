
const Skeleton = () => {
  return (
    <div className="mx-auto mt-2 md:w-60 bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Image Skeleton with SVG */}
      <div className="relative">
        <div className="w-full md:h-56 h-32 bg-gray-300 flex items-center justify-center animate-pulse">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-end justify-center p-4 bg-gray-400 bg-opacity-50">
          <div className="text-center">
            <div className="h-4 bg-gray-300 rounded-full w-3/4 mx-auto animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-300 rounded-full w-1/2 mx-auto animate-pulse"></div>
            <div className="mt-2">
              <div className="h-4 bg-gray-300 rounded-full w-1/3 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Details Skeleton */}
      <div className="p-4 space-y-2">
        <div className="flex items-center">
          <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="ml-2 h-4 bg-gray-300 rounded-full w-3/4 animate-pulse"></div>
        </div>
        <div className="flex items-center">
          <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="ml-2 h-4 bg-gray-300 rounded-full w-2/3 animate-pulse"></div>
        </div>
        <div className="flex items-center">
          <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="ml-2 h-4 bg-gray-300 rounded-full w-1/2 animate-pulse"></div>
        </div>

        {/* View Details Button Skeleton */}
        <div className="mt-4 w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default Skeleton;
