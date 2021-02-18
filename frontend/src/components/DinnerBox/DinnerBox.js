import React, {useState, useEffect} from 'react'
import axios from "axios";
import "./DinnerBox.css"

function DinnerBox(props) {

    const [content, setContent] = useState(null);
    const color = "#3f51b5"
    var info = null;
    

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        props.card.courses.map((url) => (
            axios.get(url).then((res) => {
                if (!courses.includes(res.data.description)) {
                    setCourses([...courses, res.data.description])
                }
            })
        ))
    }, [courses])

    // const allergies = [(props.card.contains_lactose), String(props.card.contains_lactose)]

    if (content === 1) {
        info = <div className="dinnerDetails">
            <ul>
                <li>{props.card.description}</li>
                {courses.map((course, count) => (
                    <li key={count}>{course}{console.log(course)}</li>
                ))}
            </ul>
        </div>
    } else if (content === 2) {
        info = <div className="dinnerDetails">
            <h5>Capacity: {props.card.capacity}</h5>
            <p>Participants: </p>
        </div>
    } else if (content === 3) {
        info = <div className="dinnerDetails">
            <ul>
                <li style={{ fontWeight: 'bold' }}>Allergies</li>
                {props.card.contains_gluten === true ? <li>Gluten</li> : null}
                {props.card.contains_lactose === true ? <li>Lactose</li> : null}
                {props.card.contains_nut === true ? <li>Nuts</li> : null}
                {props.card.contains_shellfish === true ? <li>Shellfish</li> : null}
                <li>Other: {props.card.other_allergens}</li>
            </ul>
        </div>
    }


    return (
        <div className="box">
            <button onClick={props.state}>X</button>
            <ul className="dinnerInfo">
                <h1>{props.card.title}</h1>
                <p>HOST: {props.card.host}, {props.card.phone}</p>
                <p>E-MAIL: {props.card.email}</p>
                <p>LOCATION: {props.card.location}</p>
                <p>TIME: {props.card.date_event}</p>
                <p>SPLIT BILL: {String(props.card.split_bill)}</p>
                <p>PRICE: {props.card.price}</p>
            </ul>
            <ul id="navigation">
                <li className="navigationlink" onClick={() => {
                    setContent(1)
                }} style={content === 1 ? {color} : null}>Description</li>
                <li className="navigationlink" onClick={() => {
                    setContent(2)
                }} style={content === 2 ? {color} : null}>Participants</li>
                <li className="navigationlink" onClick={() => {
                    setContent(3)
                }} style={content === 3 ? {color} : null} >Allergies</li>
            </ul>  
            {info}
        
        </div>
    )
}

export default DinnerBox
