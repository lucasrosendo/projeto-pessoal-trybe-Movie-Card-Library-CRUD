import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

export default class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
    this.removeMovie = this.removeMovie.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    movieAPI.getMovie(id).then((result) => {
      this.setState({
        movies: result,
        loading: false,
      });
    });
  }

  async removeMovie(id) {
    await movieAPI.deleteMovie(id);
  }

  render() {
    // Change the condition to check the state
    const { loading, movies } = this.state;
    if (loading) return <Loading />;

    const { title, storyline, imagePath, genre, rating, subtitle, id } = movies;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Title: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <Link to="/" onClick={ () => this.removeMovie(id) }>DELETAR</Link>
      </div>
    );
  }
}

const { shape, string } = PropTypes;

MovieDetails.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }),
}.isRequired;
