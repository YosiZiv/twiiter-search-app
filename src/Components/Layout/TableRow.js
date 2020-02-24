import React from "react";
import Table from "./Table";

const TableRow = ({ html, tweet }) => <tr tweet={tweet}>{html}</tr>;
export default TableRow;
