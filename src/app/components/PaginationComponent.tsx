import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const MAX_PAGE_LINKS = 5;

  const getPageLinks = () => {
    const links = [];
    let startPage: number, endPage: number;

    if (totalPages <= MAX_PAGE_LINKS) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(MAX_PAGE_LINKS / 2)) {
        startPage = 1;
        endPage = MAX_PAGE_LINKS;
      } else if (currentPage + Math.floor(MAX_PAGE_LINKS / 2) >= totalPages) {
        startPage = totalPages - MAX_PAGE_LINKS + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(MAX_PAGE_LINKS / 2);
        endPage = currentPage + Math.floor(MAX_PAGE_LINKS / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Add ellipsis and page numbers
    if (startPage > 1) {
      links.unshift(
        <Pagination.Ellipsis
          key="ellipsis-start"
          onClick={() => onPageChange(1)}
        />
      );
    }
    if (endPage < totalPages) {
      links.push(
        <Pagination.Ellipsis
          key="ellipsis-end"
          onClick={() => onPageChange(totalPages)}
        />
      );
    }

    return links;
  };

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      />
      {getPageLinks()}
      <Pagination.Next
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      />
    </Pagination>
  );
}
