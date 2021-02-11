import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import DinnerBox from "../DinnerBox/DinnerBox"

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
    axios.get("https://dinnerpool.herokuapp.com/dinners/").then((res) => {
      this.setState({ events: res.data });
      console.log("hola");
    });
  }
  
  render() {
    return (
      <div>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {this.state.events.length > 0 &&
              // use event id as key instead
              this.state.events.map((card, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography>{card.location}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
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
