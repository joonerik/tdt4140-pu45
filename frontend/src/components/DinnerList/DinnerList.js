import React from "react";
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

export default class DinnerList extends React.Component {
  state = {
    events: [],
    isShowing : false,
    id : null,
  };
  
  modifyState = () =>{
    this.setState({isShowing: !this.state.isShowing})   
}

  componentDidMount() {
    axios.get("http://iterasjon1.herokuapp.com/dinners/").then((res) => {
      this.setState({ events: res.data });
    });
  }
  
  render() {
    return (
      <div>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="link" to="/add">
                  <Card style={{ height: '200px' }} >
                    <CardContent>
                        <AddIcon style={{ color: "green", fontSize:"100px", marginTop: "25px" }} ></AddIcon>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            {this.state.events.length > 0 &&
              this.state.events.map((card, i) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card style={{ height: '200px', position: 'relative' }}>
                    <CardContent>
                      <Typography variant="subtitle2" align="left">{convert(card.date_event)}</Typography>
                      <Typography align="left" gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography variant="h6" align="left">{card.location}</Typography>
                    </CardContent>
                    <CardActions style={{ position: 'absolute', bottom: '0'}}>
                      <Button
                        component={Link}
                        size="small"
                        color="primary"
                        onClick={() => {
                          this.modifyState()
                          this.setState(({id: i}))
                        }}
                      >
                        See more
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              {this.state.isShowing ? <DinnerBox state={this.modifyState} card={this.state.events[this.state.id]}/> : null}
          </Grid>
        </Container>
      </div>
    );
  }
}
