import React from "react";
import DinnerBox from "../DinnerBox/DinnerBox";
import "./DinnerList.css";
import { Table } from "@material-ui/core";
import { Button } from "@material-ui/core";
// fields = ['title', 'beskrivelse', 'food', 'location', 'host', 'capacity']

function handleClick(message) {
  console.log("Joined " + message);
}

function DinnerList(props) {
  return (
    <div>
      <Table>
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
                    console.log("Hey");
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
