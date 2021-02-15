import React from 'react'
import "./DinnerBox.css"

function DinnerBox(props) {

    return (
        <div onClick={props.state} className="box">
            <button onClick={props.state}>X</button>
            <h1>{props.card.title.toUpperCase()}</h1>
            <p>Descripton: {props.card.beskrivelse}</p>
            <p>Food: {props.card.food}</p>
            {/* <p>Location: {props.card.location}</p>
            <p>Host: {props.card.host}</p>
            <p>Capacity: {props.card.capacity}</p> */}
            <div className="navigation">
                <div onClick={() => {
                    console.log("press desc")
                }}>
                    <h2>Description</h2>
                </div>
                <div onClick={() => {
                    console.log("press desc")
                }}>
                    <h2>Participants</h2>
                </div>
                <div>
                    <h2>Allergies</h2>
                </div>
            </div>
        
        </div>
    )
}

export default DinnerBox
