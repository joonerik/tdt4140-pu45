import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextArea from '@material-ui/core/TextareaAutosize'
import "./style/DinnerForm.css"
import Button from '@material-ui/core/Button'
import { Box } from '@material-ui/core';

export default function AddressForm() {
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
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            id="phone"
            name="phone"
            label="Phone"
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
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
            <TextField
              required
              variant="outlined"
              id="mealInput"
              name="mealInput"
              label="Meal"
              fullWidth
            />
        </Grid>
        <Grid container direction="column" justify="flex-start" alignItems="flex-start" item xs={6}>
          <Typography gutterBottom>
            Allergies:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="checkAllergySoy"
              />
            }
            label="Soy"
            />
          <FormControlLabel
            control={
              <Checkbox
                name="checkAllergyGluten"
              />
            }
            label="Gluten"
            />
          <FormControlLabel
            control={
              <Checkbox
                name="checkAllergyLactose"
              />
            }
            label="Lactose"
            />
            <Grid container direction="row" justify="flex-start" alignItems="center" style={{flexWrap:"nowrap"}}>
              <Grid item>
                <FormControlLabel
                control={
                  <Checkbox
                    name="checkAllergyLactose"
                  />
                }
                />
              </Grid>
              
              <Grid item>
                <TextField
                  required
                  variant="outlined"
                  id="mealInput"
                  name="mealInput"
                  label="Meal"
                  size="small"
                />
              </Grid>
            </Grid>
            

        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">Register</Button>
          
        </Grid>
        
        
      </Grid>
    </React.Fragment>
  );
}