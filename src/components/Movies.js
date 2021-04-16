import React, { Component } from 'react';
import Movie from './Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {
    Container, Grid, Button
} from 'semantic-ui-react'

class Movies extends Component {

    state = {
        isLoaded: false,
        loadInit: false,
        movies: [],
        image_base_url: '',
        page: 1
    }

    render() {
        const children = [];

        this.state.movies.map((movie) =>
            children.push(<MovieComponent key={movie.id}
                title={movie.title}
                release_date={movie.release_date}
                description={movie.overview}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
                image={movie.poster_path}
                image_base_url={this.state.image_base_url} />)
        );

        if (!this.state.loadInit) {
            return (
                <Grid>
                    <Grid.Column textAlign="center">
                        <ButtonContainer addChild={this.onAddChild} />
                    </Grid.Column>
                </Grid>
            )
        }
        if (this.state.loadInit && !this.state.isLoaded) {
            return (
                <MovieListComponent>
                    <Grid>
                        <Grid.Column textAlign="center">
                            <FontAwesomeIcon icon={faSpinner} spin size="6x" />
                        </Grid.Column>
                    </Grid>
                </MovieListComponent>
            );
        } else {
            return (
                <MovieListComponent>
                    {children}
                </MovieListComponent>
            );
        }
    }

    onAddChild = () => {
        if (!this.state.loadInit) {
            //Fetch API-configuration for correct image-URL base
            fetch(process.env.REACT_APP_MOVIEDB_API_URL +
                '/' + process.env.REACT_APP_MOVIEDB_API_VERSION +
                '/' + process.env.REACT_APP_MOVIEDB_API_CONFIGURATION +
                '?api_key=' + process.env.REACT_APP_MOVIEDB_API_KEY)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            image_base_url: result.images.base_url.concat(result.images.logo_sizes[2]),
                            loadInit: true
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }

        setTimeout(() => {
            fetch(process.env.REACT_APP_MOVIEDB_API_URL +
                '/' + process.env.REACT_APP_MOVIEDB_API_VERSION +
                '/' + process.env.REACT_APP_MOVIEDB_API_POPULAR_MOVIES +
                '?api_key=' + process.env.REACT_APP_MOVIEDB_API_KEY +
                '&page=' + this.state.page)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            movies: this.state.movies.concat(result.results),
                            page: this.state.page + 1
                        });
                        //Call API until 5 pages in total have been fetched and concatenated to the list of movies
                        //API will only return 20 movies / page
                        if (this.state.page < 6) {
                            this.onAddChild()
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        //Set short delay on API-call in order for loading symbol to be displayed
        }, 300);
    }
}

const MovieListComponent = props => (
    <Container>
        {props.children}
    </Container>
);

const ButtonContainer = props => (
    <Button onClick={props.addChild}>Fetch movies</Button>
)

const MovieComponent = props => (
    <Movie
        title={props.title}
        release_date={props.release_date}
        description={props.description}
        vote_average={props.vote_average}
        vote_count={props.vote_count}
        image={props.image}
        image_base_url={props.image_base_url} />
);

export default Movies;