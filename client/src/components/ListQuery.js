import React, { Fragment, useEffect, useState } from "react";

import EditQuery from "./EditQuery";

const ListQuery = () => {
  const [querys, setQuery] = useState([]);

  const deleteQuery = async id => {
    try {
      const deleteQuery = await fetch(`http://localhost:5000/query/${id}`, {
        method: "DELETE"
      });

      setQuery(querys.filter(query => query.query_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getQuery = async () => {
    try {
      const response = await fetch("http://localhost:5000/query");
      const jsonData = await response.json();

      setQuery(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getQuery();
  }, []);

  console.log(querys);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {querys.map(query => (
            <tr key={query.query_id}>
              <td>{query.description}</td>
              <td>
                <EditQuery query={query} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteQuery(query.query_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListQuery;
