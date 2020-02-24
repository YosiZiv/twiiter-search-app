import React from "react";
import TableRow from "./TableRow";
import "./Table.css";
const Table = ({ tweets, onClick }) => {
  return (
    <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Body</th>
            <th>Retweets</th>
          </tr>
        </thead>
        <tbody>
          {tweets.map(tweet => {
            const tdArray = []; // IMPORTENT  CODE LINE 19 -40 NEED REFACTORED OUTSIDE OF THE VIEW
            for (let key in tweet) {
              switch (key) {
                case "user":
                  tdArray[0] = <td key={tweet[key]}>{tweet[key]}</td>;
                  break;
                case "text":
                  tdArray[1] = <td key={tweet[key]}>{tweet[key]}</td>;
                  break;
                case "created_at":
                  tdArray[2] = <td key={tweet[key]}>{tweet[key]}</td>;
                case "retweet_count":
                  tdArray[3] = <td key={tweet[key]}>{tweet[key]}</td>;
                  break;
                default:
                  break;
              }
            }
            return (
              <tr
                data={tweet}
                key={tweet["id_str"]}
                onClick={() => onClick(tweet)}
              >
                {[...tdArray]}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
