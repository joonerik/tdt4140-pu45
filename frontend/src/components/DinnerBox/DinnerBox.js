import React, {useState} from 'react'
import "./DinnerBox.css"

function DinnerBox(props) {

    // const [state, setState] = useState(false)
    return (
        <div className="box">
            <h1>hello</h1>
            <h1>{props.card.title}</h1>
            {console.log("DinnerBox is rendered")}
            {/* <button onClick={() => setState(true)}>X</button>
            {this.state ? null : <h1>fh</h1>} */}
        </div>
    )
}

export default DinnerBox
