import React, {useState, useEffect} from 'react'
import axios from "axios";
import "./DinnerBox.css";

function DinnerBox(props) {

    const [content, setContent] = useState(null);
    const color = "#3f51b5"
    
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        props.card.courses.map((url) => (
            axios.get(url).then((res) => {
                setCourses(previousCourses => [...previousCourses, res.data.description])
            })
        ))
    }, [])

    return (
        <div className="box">
            <button className="exitButton" onClick={props.state}>X</button>
            <ul className="dinnerInfo">
                <h1>{props.card.title}</h1>
                <li>HOST: {props.card.host}, {props.card.phone}</li>
                <li>E-MAIL: {props.card.email}</li>
                <li>LOCATION: {props.card.location}</li>
                <li>TIME: {(props.card.date_event).substring(0, 10) + " " + (props.card.date_event).substring(11, 16)}</li>
                <li>{props.card.split_bill === true ? <p>TOTAL PRICE: {props.card.price}</p> : <p>PRICE: Free</p>}</li>
            </ul>
            <div className="subSection">
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
                {content === 1 ? <DescriptionBox list={courses} content={props}/> : 
                content === 2 ? <ParticipantsBox content={props}/> :
                content === 3 ? <AllergiesBox content={props}/> :
                null}
            </div>
        
        </div>
    )
}

function DescriptionBox(props) {
    return (
        <div className="dinnerDetails">
            <ul>
                <li style={{ fontWeight: 'bold' }}>Description</li>
                <li>{props.content.card.description}</li>
                {props.list.map((course, count) => (
                    <li style={{listStyle: 'circle', textIndent:'10px'}} key={count}>{course}</li>
                ))}
            </ul>
        </div>
    )
}

function ParticipantsBox(props) {
    return (
        <div className="dinnerDetails">
            <ul>
                <li style={{ fontWeight: 'bold' }}>Capacity: {props.content.card.capacity}</li>
                <li>Participants: <p style={{ fontStyle: 'italic' }}>None</p></li>
            </ul>
        </div>
    )
}

function AllergiesBox(props) {
    return (
        <div className="dinnerDetails">
            <ul>
                <li style={{ fontWeight: 'bold' }}>Allergies</li>
                {props.content.card.contains_gluten === true ? <li>Gluten</li> : null}
                {props.content.card.contains_lactose === true ? <li>Lactose</li> : null}
                {props.content.card.contains_nut === true ? <li>Nuts</li> : null}
                {props.content.card.contains_shellfish === true ? <li>Shellfish</li> : null}
                <li>Other: {props.content.card.other_allergens}</li>
            </ul>
        </div>
    )
}

export default DinnerBox
