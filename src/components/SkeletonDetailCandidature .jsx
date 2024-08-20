
const SkeletonDetailCandidature = () => {
  return (
    <section className="container w-4/5 mx-auto max-w-6xl rounded-lg bg-gray-900 text-white shadow-lg p-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 border-4 rounded-xl p-5">
          <div className="h-8 bg-gray-700 rounded-md w-3/4 mx-auto"></div>
          <div className="h-6 bg-gray-600 rounded-md w-1/2 mx-auto"></div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
              <div className="h-6 bg-gray-600 rounded-md w-1/2"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
              <div className="h-6 bg-gray-600 rounded-md w-1/2"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
              <div className="h-6 bg-gray-600 rounded-md w-1/2"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
              <div className="h-6 bg-gray-600 rounded-md w-1/2"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
              <div className="h-6 bg-gray-600 rounded-md w-1/2"></div>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <div className="w-24 h-10 bg-gray-700 rounded-md"></div>
            <div className="w-24 h-10 bg-gray-700 rounded-md"></div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full h-72 bg-gray-700 rounded-lg"></div>
          <div className="w-full h-10 bg-gray-700 rounded-md"></div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonDetailCandidature;
