import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextArea from '@material-ui/core/TextareaAutosize'
import "./style/DinnerForm.css"
import Button from '@material-ui/core/Button'
import { Box } from '@material-ui/core';
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

async function submitCourse(){
  
  let courses = {
    "description": meals
  }

  let id = await axios.post("https://iterasjon1.herokuapp.com/courses/", courses).then((response) => {
    console.log(response.data)
    let id = response.data["id"];
    return id
  })
  return id
}


async function submitDinner(){


  console.log("Submit dinner");
  let courseId = submitCourse();
  console.log(courseId);
  let data = collectInputData(courseId);
  console.log(data);

  await axios.post('https://iterasjon1.herokuapp.com/dinners/', data)
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });


}


function collectInputData(coursesId){
  console.log("collect data")
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
  let otherAllergy = "";

  let otherAllergyCheckbox = document.getElementById("checkAllergyOther").checked;

  if (otherAllergyCheckbox){
    otherAllergy = document.getElementById("otherAllergy").value;
  }
  
  let splitBill = document.getElementById("splitBill").checked;
  let price = 0;
  
  if (splitBill){
    price = document.getElementById("price").value;
  }

  
  return createJson(dinnerTitle, description, hostName, email, phone, capacity, location, date, coursesId, price, splitBill, gluten, lactose, nuts, shellfish, otherAllergy)
}

function createJson(title, description, host, email, phone, capacity, location, date_event, coursesId, price, splitBill, contains_gluten, contains_lactose, contains_nut, contains_shellfish, other_allergens){
  console.log("create json");
  return{
          "title": title,
          "description": description,
          "host": host,
          "email": email,
          "phone": phone,
          "capacity": capacity,
          "location": location,
          "date_event": date_event,
          "courses": "https://dinnerpool.herokuapp.com/courses/" + coursesId + "/",
          "price": price,
          "split_bill": splitBill,
          "contains_gluten": contains_gluten,
          "contains_lactose": contains_lactose,
          "contains_nut": contains_nut,
          "contains_shellfish": contains_shellfish,
          "other_allergens": other_allergens
        }
}


export default function AddressForm() {
  const[input,setInput]=useState(false)
  return (
    <React.Fragment>
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
            type="date"
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
          <Button onClick={() => { submitDinner() }} variant="contained">Register</Button>
          
        </Grid>
      </Grid>
    </React.Fragment>
  );
}