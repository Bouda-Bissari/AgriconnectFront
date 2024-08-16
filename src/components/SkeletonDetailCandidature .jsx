const SkeletonDetailCandidature = () => {
    return (
      <section className="container w-4/5 mx-auto rounded-sm py-6 bg-gray-900 dark:bg-gray-800 text-white dark:text-white animate-pulse">
        <div className="grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-8 px-6 mx-auto lg:px-8">
          <div className="space-y-4">
            <div className="h-8 bg-gray-700 rounded-md w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded-md w-5/6 mx-auto"></div>
  
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded-md w-1/2"></div>
              </div>
  
              <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded-md w-1/2"></div>
              </div>
  
              <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded-md w-1/2"></div>
              </div>
  
              <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded-md w-1/2"></div>
              </div>
  
              <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded-md w-1/2"></div>
              </div>
            </div>
          </div>
          <div className="h-80 bg-gray-700 rounded-md"></div>
        </div>
  
        <div className="flex justify-center mt-6 space-x-4">
          <div className="bg-gray-700 h-10 w-24 rounded-full"></div>
          <div className="bg-gray-700 h-10 w-24 rounded-full"></div>
        </div>
      </section>
    );
  };
  
  export default SkeletonDetailCandidature;
  