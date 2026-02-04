import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const visiblePages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
    } else {
      visiblePages.push(1);

      if (currentPage > 4) visiblePages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) visiblePages.push(i);

      if (currentPage < totalPages - 3) visiblePages.push("...");
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  const pages = getPageNumbers();

  const baseBtn = "px-3 py-1 rounded-md text-sm font-medium border transition-colors";

  const activeBtn = "bg-indigo-600 text-white border-indigo-600 pointer-events-none";

  const inactiveBtn = "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";

  const disabledBtn = "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed";

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        className={`${baseBtn} ${
          currentPage === 1 ? disabledBtn : inactiveBtn
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-gray-400 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`${baseBtn} ${
              Number(page) === currentPage
                ? activeBtn
                : inactiveBtn
            }`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </button>
        )
      )}

      <button
        className={`${baseBtn} ${
          currentPage === totalPages ? disabledBtn : inactiveBtn
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
