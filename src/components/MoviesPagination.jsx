import React from 'react'

const MoviesPagination = (props) => {
    const { pageData, setCurrentPage, currentPage } = props
    const className = props.className

    const renderPaginationItems = () => {
        if (!pageData || !pageData.total_pages) return null;

        const totalPages = 500;
        const items = [];

        // Function to create a page button
        const createPageButton = (pageNum) => (
            <li key={pageNum}>
                <button
                    className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight
                    ${currentPage === pageNum
                            ? 'text-blue-600 border-blue-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                    onClick={() => setCurrentPage(pageNum)}
                >
                    {pageNum}
                </button>
            </li>
        );

        // Calculate start and end page numbers to show
        let startPage = 1;
        let endPage = totalPages;
        const maxVisiblePages = 5;

        // Adjust the start and end page based on current page
        if (totalPages > maxVisiblePages) {
            // Current page should be in the middle when possible
            const middlePosition = Math.floor(maxVisiblePages / 2);

            if (currentPage > middlePosition) {
                startPage = currentPage - middlePosition;
                endPage = currentPage + (maxVisiblePages - middlePosition - 1);

                // Adjust if we're near the end
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
                }
            } else {
                // Near the beginning
                startPage = 1;
                endPage = Math.min(maxVisiblePages, totalPages);
            }
        }

        // Show first page if not included in the range
        if (startPage > 1) {
            items.push(createPageButton(1));

            // Add ellipsis if there's a gap
            if (startPage > 2) {
                items.push(
                    <li key="ellipsis-start" className="flex items-center justify-center px-3 h-8">
                        <span className="text-gray-500 dark:text-gray-400">...</span>
                    </li>
                );
            }
        }

        // Add the main page numbers
        for (let i = startPage; i <= endPage; i++) {
            items.push(createPageButton(i));
        }

        // Show last page if not included in the range
        if (endPage < totalPages) {
            // Add ellipsis if there's a gap
            if (endPage < totalPages - 1) {
                items.push(
                    <li key="ellipsis-end" className="flex items-center justify-center px-3 h-8">
                        <span className="text-gray-500 dark:text-gray-400">...</span>
                    </li>
                );
            }

            items.push(createPageButton(totalPages));
        }

        return items;
    };

    return (
        <div className={`flex justify-center items-center text-white/70 text-md my-5 w-full ${className}`}>
            <nav aria-label="Page navigation">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <button
                            className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight
                            text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100
                            hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>

                    {renderPaginationItems()}

                    <li>
                        <button
                            className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight
                            text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100
                            hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={!pageData || currentPage === pageData.total_pages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default MoviesPagination