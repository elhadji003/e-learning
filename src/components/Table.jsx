import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  margin: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 20px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: ${({ bgColor }) => bgColor || "#fff"};
    padding-top: 3rem;
    font-size: ${({ size }) => size || ""};
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

// Table Component
const Table = ({ data = [], columns = [], bgColor, size, color }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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
        <Container>
            <StyledTable bgColor={bgColor} size={size} color={color} className="rounded-lg">
                {/* Table header */}
                <thead>
                    <tr>
                        {Array.isArray(columns) &&
                            columns.map((column, index) => (
                                <th key={index}>{column.header}</th>
                            ))}
                    </tr>
                </thead>
                {/* Table body with current page data */}
                <tbody>
                    {Array.isArray(currentData) &&
                        currentData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>{row[column.accessor]}</td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </StyledTable>
            {/* Pagination numbers */}
            <div className="flex ms-auto mt-4 gap-3">
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
        </Container>
    );
};

export default Table;
