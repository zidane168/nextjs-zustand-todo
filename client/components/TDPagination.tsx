import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export const PaginatedItems = ({ 
    itemsPerPage = 0,
    total = 0,
    offset = 0,
    setOffset,
    page,
    handleClickSearch

}) => {
 
    const [ pageCount, setPageCount ] = useState(0)

    useEffect(() => {
        const endOffset = offset + itemsPerPage
        setPageCount(Math.ceil(total / itemsPerPage))
    }, [offset, itemsPerPage, total])

    const handlePageClick  = (e) => {
        handleClickSearch(e, e.selected + 1)
    } 
  
    return (
      <> 
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          activeLinkClassName="bg-orange-500 p-4 rounded-md text-white"
          className="flex  justify-center space-x-4 mt-8" 
          renderOnZeroPageCount={null}
        />
      </>
    );
  }