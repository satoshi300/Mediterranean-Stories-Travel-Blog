import React from "react";
import "../style/Pagination.css";

function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 0) return null;

    const navElements = [];
    for (let i = 1; i <= totalPages; i++) {
        navElements.push(
            <button
                key={i}
                type="button"
                className={`pagination__button${i === page ? " pagination__button--active" : ""}`}
                aria-label={`Page ${i}`}
                aria-current={i === page ? "page" : undefined}
                onClick={() => onPageChange(i)}
            >{i}</button>
        );
    }

    return (
        <nav className="pagination" aria-label="Blog pagination">
            <button
                className="pagination__button pagination__direction"
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >Previous</button>
            <div className="pagination__pages">{navElements}</div>
            <button
                className="pagination__button pagination__direction"
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
            >Next</button>
        </nav>
    )
}

export default Pagination;
