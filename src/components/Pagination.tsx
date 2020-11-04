import React from "react";

interface Props {
  pageNo: number;
  totalPages: number;
  setPageNo: (pageNo: number) => void;
}

export const Pagination: React.FC<Props> = ({
  pageNo,
  setPageNo,
  totalPages,
}) => {
  const pagesToShow = (): (string | number)[] => {
    if (pageNo < 3 || pageNo > totalPages - 2) {
      return [1, 2, "...", totalPages - 1, totalPages];
    } else if (pageNo === 3) {
      return [1, 2, pageNo, "...", totalPages - 1, totalPages];
    } else if (pageNo === totalPages - 2) {
      return [1, 2, "...", pageNo, totalPages - 1, totalPages];
    } else return [1, 2, "...", pageNo, "...", totalPages - 1, totalPages];
  };

  return (
    <div className="flex-right">
      {pagesToShow().map((page, i) => {
        if (typeof page === "number") {
          return (
            <button
              key={page}
              className={"page-number pagination"}
              disabled={page === pageNo || !page}
              onClick={() => setPageNo(page)}
            >
              {page}
            </button>
          );
        } else {
          return (
            <p className="pagination" key={page + i}>
              ...
            </p>
          );
        }
      })}
      <button
        className="button-pagination"
        disabled={pageNo === 1}
        onClick={() => setPageNo(pageNo - 1)}
      >
        {"<"}
      </button>
      <button
        className="button-pagination"
        disabled={pageNo === totalPages}
        onClick={() => setPageNo(pageNo + 1)}
      >
        {">"}
      </button>
    </div>
  );
};
