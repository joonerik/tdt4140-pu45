import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./style/DinnerForm.css"
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch';

import axios from "axios"


let meals = [];

function addMeal(e) {
  e.preventDefault();

  let mealInput = document.getElementById("mealInput").value; // Get input from mealInput
  let mealList = document.getElementById("mealList"); // Get mealList

  /* Save list element as String object */
  meals.push(mealInput)
  
  document.getElementById("mealInput").value = ""; // Empty input field
  mealList.innerHTML = ""; // empty list

  // Fill list with meals
  meals.forEach((meal) => {
    let node = document.createElement("LI");
    let textnode = document.createTextNode(meal);
    let buttonnode = document.createElement("BUTTON")
    buttonnode.innerHTML = "X";
    buttonnode.addEventListener('click', function(){
      meals.splice(meals.indexOf(meal), 1);
      loadMealList();
    })
    node.appendChild(textnode);
    node.appendChild(buttonnode);
    mealList.appendChild(node);
  })

}

function loadMealList(){
  let mealList = document.getElementById("mealList"); // Get mealList
  mealList.innerHTML = "";
  meals.forEach((meal) => {
    let node = document.createElement("LI");
    let textnode = document.createTextNode(meal);
    let buttonnode = document.createElement("BUTTON")
    buttonnode.innerHTML = "X";
    buttonnode.addEventListener('click', function(){
      meals.splice(meals.indexOf(meal), 1);
      loadMealList();
    })
    node.appendChild(textnode);
    node.appendChild(buttonnode);
    mealList.appendChild(node);
  })
}


function submitCourse(){
  // this submitCourse to be looped for each meal in meals[] list with
  // some type of logic (concerned about possible errors in dinner POST after course POST)
  // ie. able to add courses in DB while no dinner
  console.log("Meals list: " + meals)
  const jsonCourse = {"description": meals.toString()}
  console.log("Meal: " + jsonCourse)
  const promise = axios.post('http://iterasjon1.herokuapp.com/courses/', jsonCourse)
  const dataPromise = promise.then((res) => res.data)
  return dataPromise
}

function courseIsEmpty(){
  return meals.length() === 0;
}

function validateForm(e){
  if (courseIsEmpty()){
    console.log("Can't submit dinner without course")
    e.preventDefault()
  }
  else {
    console.log("submitdinner")
    submitDinner()
  }
}

async function submitDinner() {

  console.log("Submit dinner");
  let courseId = await submitCourse().then(data => {
    return data.id
  });
  if (typeof courseId === 'number') {
    let data = collectInputData(courseId);
    if (data["other_allergens"] == null) {
      console.log("delete other field")
      delete data["other_allergens"]
    }
    console.log(data);
  
    await axios.post('https://iterasjon1.herokuapp.com/dinners/', data)
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error.request);
    });
  } else {
    console.log("No valid courseID which currently is " + courseId)
  }
}

function collectInputData(coursesId){
  let hostName = document.getElementById("hostName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let dinnerTitle = document.getElementById("dinnerTitle").value;
  let date = document.getElementById("date").value;
  let description = document.getElementById("description").value;
  let location = document.getElementById("location").value;
  let capacity = document.getElementById("capacity").value;
  

  let lactose = document.getElementById("checkAllergyLactose").checked;
  let nuts = document.getElementById("checkAllergyNuts").checked;
  let gluten = document.getElementById("checkAllergyGluten").checked;
  let shellfish = document.getElementById("checkAllergyShellfish").checked;
  let otherAllergy = null;

  let otherAllergyCheckbox = document.getElementById("checkAllergyOther").checked;

  if (otherAllergyCheckbox){
    otherAllergy = document.getElementById("otherAllergy").value;
    if (otherAllergy === "") {
      otherAllergy = "none"
    }
  }
  
  let splitBill = document.getElementById("splitBill").checked;
  let price = 0;
  
  if (splitBill){
    price = document.getElementById("price").value;
  }

  return createJson(dinnerTitle, description, hostName, email, phone, capacity, location, date, coursesId, price, splitBill, gluten, lactose, nuts, shellfish, otherAllergy)
}

// currently this is in use. Note the hard-coded date
function createJson(t, d, h, em, tlf, cap, loc, date, id, p, s_b, c_g, c_l, c_n, c_s, other){
  return{
          title: t,
          description: d,
          host: h,
          email: em,
          phone: tlf,
          capacity: Number(cap),
          location: loc,
          date_event: date.toString(),
          courses: ["https://iterasjon1.herokuapp.com/courses/" + JSON.stringify(id) + "/"],
          price: Number(p),
          split_bill: Boolean(s_b),
          contains_gluten: Boolean(c_g),
          contains_lactose: Boolean(c_l),
          contains_nut: Boolean(c_n),
          contains_shellfish: Boolean(c_s),
          other_allergens: other
        }
}

export default function AddressForm() {

  const[input, setInput] = useState(false)

  return (
    <React.Fragment>
      <form>
      <Typography variant="h6" gutterBottom>
        Register dinner
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            id="hostName"
            name="hostName"
            label="Host name"
            fullWidth
            autoComplete="given-name"
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            type="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            id="phone"
            name="phone"
            label="Phone"
            autoComplete="tel"
            type="phone"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            id="dinnerTitle"
            name="dinnerTitle"
            label="Dinner title"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            variant="outlined"
            type="datetime-local"
            id="date"
            name="date"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            id="location"
            name="location"
            label="Location"
            type="address"
            location="adress-line"
            fullWidth
          />
        </Grid>

        <Grid container direction="column" justify="flex-start" alignItems="flex-start" item xs={12} sm={6}>
          <Grid container item>
            <Grid item container direction="row" alignItems="center" justify="flex-start">
              <Grid item xs={10} sm={8}>
                <TextField
                  variant="outlined"
                  id="mealInput"
                  name="mealInput"
                  label="Meal"
                  size="small"
                  fullWidth
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addMeal(event);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={2} sm={4}>
                <Button variant="contained" onClick={addMeal} >Add</Button>
              </Grid>
            </Grid>
            {/* INSERT LIST HERE */}
            <ul id="mealList">

            </ul>
          </Grid>
        </Grid>

        
        <Grid container direction="column" justify="flex-start" alignItems="flex-start" item xs={12} sm={6}>
          <Typography gutterBottom>
            Allergies:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="checkAllergyGluten"
                id="checkAllergyGluten"
              />
            }
            label="Gluten"
            />
          <FormControlLabel
            control={
              <Checkbox
                name="checkAllergyShellfish"
                id="checkAllergyShellfish"
              />
            }
            label="Shellfish"
            />
          <FormControlLabel
            control={
              <Checkbox
                name="checkAllergyLactose"
                id="checkAllergyLactose"
              />
            }
            label="Lactose"
            />
            <FormControlLabel
            control={
              <Checkbox
                name="checkAllergyNuts"
                id="checkAllergyNuts"
              />
            }
            label="Nuts"
            />
            <Grid container direction="row" justify="flex-start" alignItems="center" style={{flexWrap:"nowrap"}}>
              <Grid item>
                <FormControlLabel
                control={
                  <Checkbox
                    name="checkAllergyOther"
                    id="checkAllergyOther"
                  />
                }
                />
              </Grid>
              
              <Grid item>
                <TextField
                  variant="outlined"
                  id="otherAllergy"
                  name="otherAllergy"
                  label="Allergy"
                  size="small"
                />
              </Grid>
            </Grid>
           </Grid>

           <Grid item container direction="column" xs={12} sm={6}>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          type="number" 
                          id="capacity"
                          name="Capacity" 
                          label="Capacity"
                          size="small"   
                          required
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                    {input ? 
                         <TextField
                            size="small"
                            type="float"
                            variant="outlined"
                            id="price"
                            name="price"
                            label="Price"
                          >
                          </TextField>
                        
                      :null}
                    </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            name="splitBill"
                            id="splitBill"
                            color="primary"

                            onChange={()=>(
                              setInput(value=>!value)
                            )}
                          />
                        }
                        label="Split bill"
                        labelPlacement="start"
                      />
                      
                    </Grid>

                    
           </Grid>

        <Grid item xs={12}>
        <Button onClick={() => {
            submitDinner()
            console.log("submit button clicked")
          }} variant="contained">Register</Button>

          
        </Grid>
      </Grid>
      </form>
    </React.Fragment>
  );
}