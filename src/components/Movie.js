import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {
  Grid,
  Header,
  Image,
} from 'semantic-ui-react'

class Movie extends Component {
  render() {
    const { title,
      release_date,
      description,
      vote_average,
      vote_count,
      image,
      image_base_url
    } = this.props;

    return (
      <Grid>
        <Grid.Column width={3}>
          <Image src={image_base_url + image} />
        </Grid.Column>
        <Grid.Column width={13}>
          <div>
            <div>
              <div>
                <Header as='h4'>{title}</Header>
              </div>
              <div>
                <p>
                  <span>{release_date}</span>
                </p>
                <p>{description}</p>
                <p><FontAwesomeIcon icon={faStar} color="#e3be00" /> {vote_average}/10 ({vote_count} votes)</p>
              </div>
            </div>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Movie;