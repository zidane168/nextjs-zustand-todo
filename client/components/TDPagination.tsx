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

    const router = useRouter();
    const [ pageCount, setPageCount ] = useState(0)

    useEffect(() => {
        const endOffset = offset + itemsPerPage
        setPageCount(Math.ceil(total / itemsPerPage))
    }, [offset, itemsPerPage, total])

    const handlePageClick  = (e) => {
        handleClickSearch(e, e.selected + 1)
    }
 
 
    // Invoke when user click to request another page.
    // const handlePageClick = (event) => {
    //   const newOffset = (event.selected * itemsPerPage) % items.length;
    //   console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    //   );
    //   setItemOffset(newOffset);
    // };
  
    return (
      <> 
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }