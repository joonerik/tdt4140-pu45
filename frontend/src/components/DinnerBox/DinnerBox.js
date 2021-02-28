import React, {useState, useEffect} from 'react'
import axios from "axios";
import "./DinnerBox.css"

function DinnerBox(props) {

    const [content, setContent] = useState(null);
    const color = "lightblue"
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

    if (content === 1) {
        info = <div className="dinnerDetails">
            <ul>
                <li>Description: {props.card.description}</li>
                {courses.map((course, count) => (
                    <li key={count}>{course}{console.log(course)}</li>
                ))}
            </ul>
        </div>
    } else if (content === 2) {
        info = <div className="dinnerDetails">
            <h3>Capacity: {props.card.capacity}</h3>
            <h4>Participants: </h4>
        </div>
    } else if (content === 3) {
        info = <div className="dinnerDetails">
            <ul>
                <li>{`${props.card.contains_gluten}`}</li>
                <li>{String(props.card.contains_nut)}</li>
                <li>{props.card.contains_gluten.toString()}</li>
                <li>Other: {props.card.other_allergens}</li>
            </ul>
        </div>
    }


    return (
        <div className="box">
            <button onClick={props.state}>X</button>
            <ul className="dinnerInfo">
                <h1>{props.card.title}</h1>
                <p>{props.card.host}, {props.card.phone}</p>
                <p>{props.card.email}</p>
                <p>{props.card.location}</p>
                <p>{props.card.date_event}</p>
                <p>Split bill: {String(props.card.split_bill)}</p>
                <p>Price: {props.card.price}</p>
            </ul>
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
