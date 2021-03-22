import React, {useState, useEffect} from 'react'
import axios from "axios";
import "./DinnerBox.css";

function DinnerBox(props) {

    // color for the content selectors when active
    const color = "#3f51b5"

    // states for content and courses
    const [content, setContent] = useState(null);
    const [courses, setCourses] = useState([]);
    
    // the useEffect takes place when the component renders
    useEffect(() => {
        // maps (for-loop) through the courses list to the dinner
        props.card.courses.map((url) => (
            // a get request to the url found in the courses attribute list
            axios.get(url).then((res) => {
                // when getting the res (result), the result, i.e., the name of the course
                // is appended to the list iteratively because of the map function 
                setCourses(previousCourses => [...previousCourses, res.data.description])
            })
        ))
    }, [])
    console.log(props.card.id)
    console.log(props.card.title)
    const API_URL = "http://localhost:8000/dinners/" + props.card.id;

    function joinDinner() {
        axios.patch(API_URL, {
            'participants': 'http://localhost:8000/users/3/'
        }).then((res) => {
            console.log("join success: " + res)
        }).catch((error) => {
            console.log(error.response)
        })
    }

    return (
        <div className="box">
            {/* when the button is clicked, it changes the showing state in DinnerList.
            It triggers the handleShowing function in DinnerList */}
            <button className="exitButton" onClick={props.state}>X</button>
            <button className="" onClick={joinDinner}>Join</button>
            {/* displays basic info for the dinner event  */}
            <ul className="dinnerInfo">
                <h1>{props.card.title}</h1>
                <li>HOST: {props.card.host}, {props.card.phone}</li>
                <li>E-MAIL: {props.card.email}</li>
                <li>LOCATION: {props.card.location}</li>
                <li>TIME: {(props.card.date_event).substring(0, 10) + " " + (props.card.date_event).substring(11, 16)}</li>
                {/* if the split_bill attribute is set to true, the total price is shown. Else, a default p tag is shown  */}
                <li>{props.card.split_bill === true ? <p>TOTAL PRICE: {props.card.price}</p> : <p>PRICE: Free</p>}</li>
            </ul>
            <div className="subSection">
                {/* this is the list for each selector. When pressed, it changes the state 
                of content to a specific number, which ultimately decides what to show */}
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
                {/* the state of content decided which component to display */}
                {content === 1 ? <DescriptionBox list={courses} content={props}/> : 
                content === 2 ? <ParticipantsBox content={props}/> :
                content === 3 ? <AllergiesBox content={props}/> :
                null}
            </div>
        
        </div>
    )
}

// Below are the different types of boxes depending on the content selected or wanted
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
