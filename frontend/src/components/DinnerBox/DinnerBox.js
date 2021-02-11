import React, {useState} from 'react'
import "./DinnerBox.css"

function DinnerBox(props) {

    // const handleClick = () => {
    //     props.state = false
    // }
    return (
        <div onClick={props.state} className="box">
            <h1>hello</h1>
            <h1>{props.card.title}</h1>
            {console.log("DinnerBox is rendered")}
            <button onClick={props.state}>X</button>
        </div>
    )
}

export default DinnerBox
