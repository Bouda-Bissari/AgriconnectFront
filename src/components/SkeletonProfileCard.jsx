
const SkeletonProfileCard = () => {
    return (
        <div className="w-full bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col justify-center items-center animate-pulse">
          <div className="mb-4">
            <div className="bg-gray-700 rounded-full h-36 w-36"></div>
          </div>
          <div className="text-center mb-4">
            <div className="bg-gray-700 h-6 w-3/4 mb-2 rounded"></div>
            <div className="bg-gray-600 h-4 w-1/2 rounded"></div>
          </div>
          <div className="w-full">
            <div className="bg-gray-600 h-10 w-full rounded"></div>
          </div>
        </div>
      );
};

export default SkeletonProfileCard;
