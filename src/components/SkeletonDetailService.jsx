
const SkeletonDetailService = () => {
  return (
    <div className="my-40 animate-pulse">
      <section className="container mx-auto rounded-sm py-6 dark:bg-orange-900 dark:text-white">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="space-y-4 mt-6">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="flex justify-center items-center flex-col gap-3">
            <div className="w-full h-40 bg-gray-300 mt-4 rounded-md"></div>
            <div className="w-30 h-10 bg-gray-300 mt-4 rounded-md"></div>
            </div>
            

          </div>
          <div className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
            <div className="h-full w-full bg-gray-300 rounded"></div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkeletonDetailService;
