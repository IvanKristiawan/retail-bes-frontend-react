import React from "react";
import "bulma/css/bulma.css";

const Pagination = ({
  currentPage,
  postsPerPage,
  totalPosts,
  screenSize,
  paginate,
}) => {
  const pageNumbers = [];
  const maxPage = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  if(totalPosts===0) {
    return null;
  }

  return (
    <nav className="pagination is-rounded" role="navigation">
      <ul className="pagination-list">
        <li>
          <a
            className="pagination-link"
            onClick={() => paginate(1)}
            style={{
              background: currentPage === 1 ? "blue" : "",
              color: currentPage === 1 ? "white" : "black",
            }}
          >
            1
          </a>
        </li>
        <li style={{ visibility: maxPage === 1 ? "hidden" : "visible" }}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        {pageNumbers
          .filter((val) => {
            if (screenSize <= 600) {
              if (val != 1 && val < currentPage + 2 && val >= currentPage - 1) {
                return val;
              }
            } else {
              if (val != 1 && val < currentPage + 4 && val >= currentPage - 3) {
                return val;
              }
            }
          })
          .map((number) => (
            <li key={number}>
              <a
                onClick={() => paginate(number)}
                className="pagination-link"
                style={{
                  background: number === currentPage ? "blue" : "",
                  color: number === currentPage ? "white" : "black",
                }}
              >
                {number}
              </a>
            </li>
          ))}
        <li style={{visibility: maxPage === 1 ? "hidden" : "visible"}}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li style={{visibility: maxPage === 1 ? "hidden" : "visible"}}>
          <a className="pagination-link" onClick={() => paginate(maxPage)}>
            {maxPage}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
