import React from "react";
import DinnerBox from "../DinnerBox/DinnerBox";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./DinnerList.css";
// fields = ['title', 'beskrivelse', 'food', 'location', 'host', 'capacity']

function handleClick(message) {
  console.log("Joined " + message);
}

function DinnerList(props) {
  return (
    <div class="d-flex justify-content-center align-items-center">
      <Table className="table" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Beskrivelse</th>
            <th>Food</th>
            <th>Location</th>
            <th>Host</th>
            <th>Capacity</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          {props.overview.overview.map((i) => (
            <tr>
              <td>{i.title}</td>
              <td>{i.description}</td>
              <td>{i.location}</td>
              <td>{i.course}</td>
              <td>{i.host}</td>
              <td>{i.capacity}</td>
              <td>
                {" "}
                <Button
                  onClick={() => {
                    handleClick(i.title);
                  }}
                >
                  Join
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DinnerList;
