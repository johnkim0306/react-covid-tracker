import React from "react";
import "./Table.css";
import numeral from "numeral";
import { sortData2 } from "./util";

function Table2({ countries }) {

    console.log(countries);
    //let countries2 = sortData2(countries);

    countries.sort( (a,b) => (a.deaths > b.deaths ? -1 : 1 ));

  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.deaths).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table2;
