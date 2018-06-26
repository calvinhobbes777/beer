import React, { Component } from "react";
import { Grid, Image, Segment, Button, Icon } from "semantic-ui-react";
import { getBeer } from "./crud";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      beers: []
    };
  }

  componentDidMount() {
    getBeer(this.props.match.params.page || 1, 10).then(data => {
      this.setState(state => {
        return {
          beers: data
        };
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    getBeer(nextProps.match.params.page, 10).then(data => {
      this.setState(state => {
        return {
          beers: data
        };
      });
    });
  }
  pagenav = clickE => {
    let { page } = this.props.match.params;

    window.scrollTo(0, 0);

    page = Number(page) || 1;

    let button = clickE.target.name;

    if (button === "foreward") {
      page += 1;

      this.props.history.push(`/${page}`);
    } else if (button === "back") {
      page -= 1;

      this.props.history.push(`/${page}`);
    }
  };

  render() {
    let { beers } = this.state;
    let page = Number(this.props.match.params.page) || 1;
    return (
      <div>
        <Segment textAlign={"center"} inverted>
          <Button
            as={Link}
            to={"/random"}
            content={"Random Brewskie"}
            size={"massive"}
            floated={"left"}
            color={"olive"}
          />
          <h1 style={{ fontFamily: "Metal Mania", fontSize: 70 }}>B e e r</h1>
        </Segment>
        {page < 24 && (
          <Button
            onClick={this.pagenav}
            content={">"}
            name={"foreward"}
            size={"massive"}
            color={"olive"}
            floated={"right"}
          />
        )}
        {page > 1 && (
          <Button
            onClick={this.pagenav}
            content={"<"}
            name={"back"}
            size={"massive"}
            color={"olive"}
            floated={"right"}
          />
        )}
        <Grid celled>
          {beers.map &&
            beers.map(beer => (
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
                  <h3 style={{ fontFamily: "Metal Mania" }}>Ingredients</h3>
                  <Grid.Row style={{ display: "flex" }}>
                    <Grid.Column>
                      <ul>
                        <h4 style={{ fontFamily: "Metal Mania" }}>Hops</h4>
                        {beer.ingredients.hops.map(hop => (
                          <li key={hop.id}>
                            {hop.name}| added-{hop.add} |{hop.attribute}
                          </li>
                        ))}
                      </ul>
                    </Grid.Column>
                    <Grid.Column>
                      <ul>
                        <h4 style={{ fontFamily: "Metal Mania" }}>Malt</h4>
                        {beer.ingredients.malt.map(mal => (
                          <li key={mal.id}>{mal.name} </li>
                        ))}
                      </ul>
                    </Grid.Column>
                    <Grid.Column>
                      <ul>
                        <h4 style={{ fontFamily: "Metal Mania" }}>Yeast</h4>
                        <li>{beer.ingredients.yeast}</li>
                      </ul>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            ))}
        </Grid>
        {page < 24 && (
          <Button
            onClick={this.pagenav}
            content={">"}
            name={"foreward"}
            size={"massive"}
            color={"olive"}
            floated={"right"}
          />
        )}
        {page > 1 && (
          <Button
            onClick={this.pagenav}
            content={"<"}
            name={"back"}
            size={"massive"}
            color={"olive"}
            floated={"right"}
          />
        )}
      </div>
    );
  }
}
export default Home;
