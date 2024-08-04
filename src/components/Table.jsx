import React, { useState } from "react";

const Table = ({ data = [], columns = [], bgColor, size, color }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Fonction pour afficher les données de la page courante
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Fonction pour changer de page
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                <thead className="bg-indigo-600 text-white">
                    <tr className={`bg-${bgColor} text-${color}`}>
                        {Array.isArray(columns) &&
                            columns.map((column, index) => (
                                <th key={index} className={`p-5 border-b ${size}`}>
                                    {column.header}
                                </th>
                            ))}
                    </tr>
                </thead>
                {/* Table body with current page data */}
                <tbody>
                    {Array.isArray(currentData) &&
                        currentData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-100">
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="p-2 border-b text-center">
                                        {row[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
            {/* Pagination numbers */}
            <div className="flex mt-4 gap-3 ms-auto">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <div
                        key={index}
                        className={`border bg-white shadow-lg w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${currentPage === index + 1 ? "bg-orange-300 text-black" : ""
                            }`}
                        onClick={() => changePage(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;
