import React, { useState }  from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./style/DinnerForm.css"
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch';
import NumberFormat from 'react-number-format';
import ReactPhoneInput from 'react-phone-input-material-ui';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
    buttonnode.style.cssText = "margin-left: 20px;"
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

function submitCourse(meal){
  const mealJson = {"description": meal}
  const promise = axios.post('http://iterasjon1.herokuapp.com/courses/', mealJson)
  const dataPromise = promise.then((res) => res.data)
  return dataPromise
}

function courseIsEmpty(currentMeals){
  return currentMeals.length === 0;
}

async function submitDinner() {
  console.log("Meals: " + meals)
  console.log("Meals length: " + meals.length)
  if (courseIsEmpty(meals)) {
    alert("Course can't be empty!")
    console.log("Course list is empty")
    return;
  }

  
  let coursesID = []
  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];
    let courseId = await submitCourse(meal).then(data => {
      return data.id
    });
    coursesID.push(courseId)
  }

  if (typeof coursesID[0] === 'number') {
    let data = collectInputData(...coursesID);
    if (data["other_allergens"] == null) {
      console.log("delete other field")
      delete data["other_allergens"]
    }
  
    await axios.post('https://iterasjon1.herokuapp.com/dinners/', data)
    .then((response) => {
      console.log(response);
      if (response.status === 201) {
        window.location.reload();
      }
    }, (error) => {
      console.log(error.request);
    });
  } else {
      console.log("No valid course(s)ID")
  }
}

function validateEmpty() {
  if (
    document.getElementById('hostName').value !== '' &&
    document.getElementById('email').value !== '' &&
    document.getElementById('phone').value !== '' &&
    document.getElementById('dinnerTitle').value !== '' &&
    document.getElementById('date').value !== '' &&
    document.getElementById('description').value !== '' &&
    document.getElementById('location').value !== '' &&
    document.getElementById('capacity').value !== ''
    ) {
      return true
    } else {
      return false
    }
}

function validateEmail(){
  let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  if (!pattern.test(document.getElementById('email').value)) {
    return false
  } return true
}

function collectInputData(...coursesID){
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

  return createJson(dinnerTitle, description, hostName, email, phone, capacity, location, date, coursesID, price, splitBill, gluten, lactose, nuts, shellfish, otherAllergy)
}

function createJson(t, d, h, em, tlf, cap, loc, date, coursesID, p, s_b, c_g, c_l, c_n, c_s, other){

  const courses = []
  coursesID.forEach(id => courses.push("https://iterasjon1.herokuapp.com/courses/" + JSON.stringify(id) + "/")) 

  return {
          title: t,
          description: d,
          host: h,
          email: em,
          phone: tlf,
          capacity: Number(cap),
          location: loc,
          date_event: date.toString(),
          courses: courses,
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
  const [value, setValue] = useState()

  return (
    <React.Fragment>
      <form>
      <Typography variant="h6" gutterBottom>
        Submit dinner
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
              label="Email"
              fullWidth
              autoComplete="email"
              type="email"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
        <NumberFormat
          customInput={TextField}
          id="phone"
          label="PhoneNumber"
          format="+47 ### ## ###"
          size="medium"
          variant="outlined"
          required
          fullWidth
        />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            id="dinnerTitle"
            label="Dinner title"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            variant="outlined"
            type="datetime-local"
            id="date"
            size="medium"
            inputProps={{
               min: new Date().toISOString()
               .slice(0, 16)
              }}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            id="description"
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
                        <NumberFormat
                          customInput={TextField}
                          format="###"
                          id="capacity" 
                          label="Capacity"
                          size="small"
                          hintText="Capacity"
                          variant="outlined"
                          required
                          />
                    </Grid>

                    <Grid item xs={6}>
                    {input ? 
                         <TextField
                            size="small"
                            type="float"
                            variant="outlined"
                            id="price"
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
          if (!validateEmpty()) {
            alert("Fields marked * can't be empty")
          } else if (!validateEmail()) {
            alert("Please enter valid email address")
          } else {
            submitDinner()
          }
          }} variant="contained">Submit</Button>
        </Grid>
      </Grid>
      </form>
    </React.Fragment>
  );
};