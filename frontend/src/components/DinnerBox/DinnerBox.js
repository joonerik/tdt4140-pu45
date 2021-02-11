import React from 'react'
import "./DinnerBox.css"

function DinnerBox(props) {

    return (
        <div onClick={props.state} className="box">
            <button onClick={props.state}>X</button>
            <h1>{props.card.title.toUpperCase()}</h1>
            <p>Descripton: {props.card.beskrivelse}</p>
            <p>Food: {props.card.food}</p>
            <p>Location: {props.card.location}</p>
            <p>Host: {props.card.host}</p>
            <p>Capacity: {props.card.capacity}</p>
            {console.log("DinnerBox is rendered")}
        </div>
    )
}

export default DinnerBox
