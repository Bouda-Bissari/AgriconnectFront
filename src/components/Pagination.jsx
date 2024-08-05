/* eslint-disable react/prop-types */

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    const pages = [];
    
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center mt-6">
            <nav aria-label="Page navigation">
                <ul className="inline-flex items-center space-x-2">
                    {pages.map((page) => (
                        <li key={page}>
                            <button
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    page === currentPage
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-blue-600 border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
