import React, {useState} from 'react'
import "./DinnerBox.css"

function DinnerBox(props) {

    const [content, setContent] = useState(0);
    var info = null;

    if (content === 1) {
        info = <div>
            {props.card.location}
        </div>
    } else if (content === 2) {
        info = <p>fuck</p>
    } else if (content === 3) {
        info = <p>f</p>
    }


    return (
        <div className="box">
            <button onClick={props.state}>X</button>
            <h1>{props.card.title.toUpperCase()}</h1>
            <p>Ola Nordmann, 90129028</p>
            <p>Bakklandet</p>
            <p>01.01.21 kl: 1900</p>
            {/* <p>Location: {props.card.location}</p>
            <p>Host: {props.card.host}</p>
            <p>Capacity: {props.card.capacity}</p> */}
            <ul id="navigation">
                <li onClick={() => {
                    setContent(1)
                }}>Description</li>
                <li onClick={() => {
                    setContent(2)
                }}>Participants</li>
                <li onClick={() => {
                    setContent(3)
                }}>Allergies</li>
            </ul>  
            {info}
        
        </div>
    )
}

export default DinnerBox
