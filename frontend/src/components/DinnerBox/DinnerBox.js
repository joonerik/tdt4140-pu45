import React, {useState} from 'react'
import "./DinnerBox.css"

function DinnerBox(props) {

    const [content, setContent] = useState(0);
    const color = "lightblue"
    var info = null;

    if (content === 1) {
        info = <div className="dinnerDetails">
            {props.card.location}
        </div>
    } else if (content === 2) {
        info = <div className="dinnerDetails">Participants</div>
    } else if (content === 3) {
        info = <div className="dinnerDetails">Allergies</div>
    }


    return (
        <div className="box">
            <button onClick={props.state}>X</button>
            <ul className="dinnerInfo">
                <h1>{props.card.title.toUpperCase()}</h1>
                <p>Ola Nordmann, 90129028</p>
                <p>Bakklandet</p>
                <p>01.01.21 kl: 1900</p>
            </ul>
            {/* <p>Location: {props.card.location}</p>
            <p>Host: {props.card.host}</p>
            <p>Capacity: {props.card.capacity}</p> */}
            <ul id="navigation">
                <li onClick={() => {
                    setContent(1)
                }} style={content === 1 ? {color} : null}>Description</li>
                <li onClick={() => {
                    setContent(2)
                }} style={content === 2 ? {color} : null}>Participants</li>
                <li onClick={() => {
                    setContent(3)
                }} style={content === 3 ? {color} : null} >Allergies</li>
            </ul>  
            {info}
        
        </div>
    )
}

export default DinnerBox
