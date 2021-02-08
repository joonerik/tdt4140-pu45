import React from "react";
import DinnerBox from "../DinnerBox/DinnerBox";
import Table from "react-bootstrap/Table";

function DinnerList(props) {
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Location</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {props.overview.overview.map((i) => (
            <tr>
              <td>{i.location}</td>
              <td>{i.course}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DinnerList;
