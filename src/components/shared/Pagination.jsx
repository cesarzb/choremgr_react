const Pagination = ({ page, setPage, pageItems }) => {
  const PAGE_ITEMS_LIMIT = 8;

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (pageItems === PAGE_ITEMS_LIMIT) {
      setPage(page + 1);
    }
  };
  return (
    <div className="flex justify-center gap-2">
      <div className="flex">
        <div
          onClick={handlePrevious}
          disabled={page <= 1}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:cursor-pointer"
        >
          Previous
        </div>

        <div
          onClick={handleNext}
          disabled={pageItems < PAGE_ITEMS_LIMIT}
          className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:cursor-pointer"
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default Pagination;
