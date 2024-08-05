/* eslint-disable react/prop-types */

const JobCard = ({ type, location, title, deadline, jobId, price, imageUrl }) => {
  return (
    <div className="mx-auto mt-2 md:w-60  bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full md:h-56 h-32 object-cover"
          />
        ) : (
          <div className={`h-56 bg-${type === 'work' ? 'green' : 'blue'}-600 flex items-center justify-center`}>
            <svg
              aria-hidden="true"
              role="img"
              className="md:h-24 md:w-24 h-12 w-12 text-white"
              width="32"
              height="32"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
              ></path>
            </svg>
          </div>
        )}
        <div className={`absolute inset-0 flex items-end justify-center p-4 ${type === 'work' ? 'bg-green-600' : 'bg-blue-600'} bg-opacity-50`}>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-50">{title}</p>
            <p className="text-sm text-gray-100">{location}</p>
            <div className="mt-2">
              <span className="border rounded-full py-1 px-3 text-xs font-semibold text-gray-100">
                {type === 'work' ? 'Service de travail' : 'Matériel'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 space-y-2">
        <div className="flex items-center">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-green-600"
          >
            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <p className="ml-2 text-sm font-medium text-gray-800">
            Date limite : {deadline ? deadline : 'Non spécifiée'}
          </p>
        </div>
        <div className="flex items-center">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-800"
          >
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="ml-2 text-sm font-medium text-gray-800">
            ID du service : {jobId}
          </p>
        </div>
        <div className="flex items-center">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-800"
          >
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="ml-2 text-sm font-medium text-gray-800">
            Prix : {price ? `$${price}` : 'Non spécifié'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
