import { useState, useMemo } from "react";

export const usePagination = (data = [], initialRows = 10) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(initialRows);

    const paginatedData = useMemo(() => {
        const start = page * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
    }, [data, page, rowsPerPage]);

    const handlePageChange = (event, newPage) => setPage(newPage);

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const resetPagination = () => {
        setPage(0);
        setRowsPerPage(initialRows);
    };

    return {
        page,
        rowsPerPage,
        paginatedData,
        handlePageChange,
        handleRowsPerPageChange,
        resetPagination,
        total: data.length,
    };
};
