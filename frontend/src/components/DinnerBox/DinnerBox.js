import React from 'react'

function DinnerBox(props) {
    return (
        <div>
            <h1>hello</h1>
            <h1>{props.card.title}</h1>
            {console.log("DinnerBox is rendered")}
        </div>
    )
}

export default DinnerBox
