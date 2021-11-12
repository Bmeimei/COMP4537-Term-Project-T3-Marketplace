import { useTable } from "react-table";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, headIndex) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headIndex}>
            {headerGroup.headers.map((column, columnIndex) => (
              <th {...column.getHeaderProps()} key={columnIndex}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={rowIndex}>
              {row.cells.map((cell, cellIndex) => {
                return (
                  <td {...cell.getCellProps()} key={cellIndex}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
