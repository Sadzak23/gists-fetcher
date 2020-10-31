import React from "react";

interface Props {
  pageNo: number;
  setPageNo: (pageNo: number) => void;
}

export const Pagination: React.FC<Props> = ({ pageNo, setPageNo }) => {
  const onPreviousPage = () => setPageNo(pageNo - 1);
  const onNextPage = () => setPageNo(pageNo + 1);

  return (
    <div className="flex-center">
      <button
        className="button-pagination"
        disabled={pageNo === 1}
        onClick={onPreviousPage}
      >
        {"<"}
      </button>
      <p className="page-number">{pageNo}</p>
      <button className="button-pagination" onClick={onNextPage}>
        {">"}
      </button>
    </div>
  );
};
