import React from "react";
import "../Stylesheets/Table.css";
import numeral from "numeral";

const Table = ({ countries }) => {
  return (
    <div className='table'>
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>
              <strong>{numeral(country.cases).format("0,0")}</strong>
            </strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
