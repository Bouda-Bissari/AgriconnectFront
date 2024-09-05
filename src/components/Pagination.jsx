/* eslint-disable react/prop-types */
const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  // Define range for pagination
  const range = 2; // Number of page numbers to show on each side of the current page
  const startPage = Math.max(1, currentPage - range);
  const endPage = Math.min(totalPages, currentPage + range);

  return (
    <div className="flex justify-center mt-6">
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center space-x-2">
          {/* Previous button */}
          <li>
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "text-blue-600 border-gray-300 bg-white hover:bg-gray-100"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {/* First page */}
          {startPage > 1 && (
            <>
              <li>
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                    currentPage === 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-blue-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  1
                </button>
              </li>
              {startPage > 2 && (
                <li>
                  <span className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-500 border-gray-300">...</span>
                </li>
              )}
            </>
          )}

          {/* Page numbers */}
          {pages
            .filter((page) => page >= startPage && page <= endPage)
            .map((page) => (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                    page === currentPage
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

          {/* Last page */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li>
                  <span className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-500 border-gray-300">...</span>
                </li>
              )}
              <li>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                    currentPage === totalPages
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          {/* Next button */}
          <li>
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "text-blue-600 border-gray-300 bg-white hover:bg-gray-100"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
