import React from "react";
import "./Table.css";
const Table = ({ tweets, onClick, createTweetsTable }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Body</th>
            <th>Retweets</th>
          </tr>
        </thead>
        <tbody>{createTweetsTable(tweets, onClick)}</tbody>
      </table>
    </>
  );
};
export default Table;
