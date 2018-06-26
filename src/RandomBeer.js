import React, { Component } from "react";
import { Grid, Image, Segment, Button, Icon } from "semantic-ui-react";
import { getRandomBeer } from "./crud";
import { Link } from "react-router-dom";

class AllBeer extends Component {
  constructor() {
    super();

    this.state = {
      beers: []
    };
  }

  componentDidMount() {
    getRandomBeer().then(data => {
      let beers = [];
      for (let key in data) {
        beers.push(data[key]);
      }
      this.setState(state => {
        return {
          beers: beers
        };
      });
    });
  }

  newBeer = () => {
    getRandomBeer().then(data => {
      let beers = [];
      for (let key in data) {
        beers.push(data[key]);
      }
      this.setState(state => {
        return {
          beers: beers
        };
      });
    });
  };

  render() {
    let { beers } = this.state;
    return (
      <div>
        <Segment textAlign={"center"} inverted>
          <Button
            as={Link}
            to={"/random"}
            content={"Random Brewskie"}
            size={"massive"}
            onClick={this.newBeer}
            floated={"left"}
            color={"olive"}
          />
          <Button
            as={Link}
            to={""}
            content={"Go Back"}
            size={"mini"}
            onClick={this.newBeer}
            floated={"right"}
            color={"olive"}
          />
          <h1 style={{ fontFamily: "Metal Mania", fontSize: 70 }}>
            R a n d o m B e e r s
          </h1>
        </Segment>
        <Grid celled>
          {beers.map(beer => (
            <Grid.Row key={beer.id}>
              <Grid.Column width={5}>
                <Image src={beer.image_url} alt="beer pic" />
              </Grid.Column>
              <Grid.Column width={10}>
                <h2 style={{ fontFamily: "Metal Mania" }}>
                  {beer.name} <br />
                </h2>
                <h3 style={{ fontFamily: "Metal Mania" }}>
                  {beer.tagline}__IBU:{beer.ibu}__{beer.abv}%
                </h3>
                <br />
                {beer.first_brewed}

                <hr />
                <h3 style={{ fontFamily: "Metal Mania" }}>Description </h3>
                <p style={{ fontSize: 20 }}>
                  <br />
                  {beer.description}
                  <br />
                </p>
                <hr />
                <ul>
                  <h3 style={{ fontFamily: "Metal Mania" }}>Food Pairing</h3>
                  {beer.food_pairing.map(food => <li>{food}</li>)}
                </ul>

                <hr />
                <Grid.Column>
                  <h3 style={{ fontFamily: "Metal Mania" }}>Ingredients</h3>
                  <Grid.Row>
                    <ul>
                      <h4 style={{ fontFamily: "Metal Mania" }}>Hops</h4>
                      {beer.ingredients.hops.map(hop => (
                        <li key={hop.id}>
                          {hop.name}| added-{hop.add} |{hop.attribute}
                        </li>
                      ))}
                    </ul>
                  </Grid.Row>
                  <Grid.Row>
                    <ul>
                      <h4 style={{ fontFamily: "Metal Mania" }}>Malt</h4>
                      {beer.ingredients.malt.map(mal => (
                        <li key={mal.id}>{mal.name} </li>
                      ))}
                    </ul>
                  </Grid.Row>
                  <Grid.Row>
                    <ul>
                      <h4 style={{ fontFamily: "Metal Mania" }}>Yeast</h4>
                      <li>{beer.ingredients.yeast}</li>
                    </ul>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </div>
    );
  }
}
export default AllBeer;
