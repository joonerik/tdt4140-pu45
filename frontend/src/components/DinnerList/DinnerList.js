import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import DinnerBox from "../DinnerBox/DinnerBox";
import { Link } from "react-router-dom";

function convert(date) {
  return date.substring(0, 10) + " " + date.substring(11, 16)
}

function DinnerList() {
  const [events, setEvents] = useState([]);
  const [showing, setShowing] = useState(false);
  const [id, setId] = useState(null);

  function handleShowing(event) {
    setShowing(value => !value);
  }

  useEffect(() => {
    axios.get("http://iterasjon1.herokuapp.com/dinners/").then((res) => {
      setEvents(res.data)
    });
  }, [])
  return (
    <div>
      <Container maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/login">
                <Card style={{ height: '100%' }}>
                  <CardContent>
                      <AddIcon style={{ color: "green", fontSize:"100px", paddingTop: "15px" }} ></AddIcon>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          {events.length > 0 &&
            // use event id as key instead
            events.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" align="left">{convert(card.date_event)}</Typography>
                    <Typography align="left" gutterBottom variant="h4" component="h2">
                      {card.title}
                    </Typography>
                    <Typography variant="h6" align="left">{card.location}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        handleShowing()
                        setId(i)
                        console.log(i)
                      }}
                    >
                      See more
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {showing ? <DinnerBox state={handleShowing} card={events[id]}/> : null}
        </Grid>
      </Container>
    </div>
  )
}

export default DinnerList
