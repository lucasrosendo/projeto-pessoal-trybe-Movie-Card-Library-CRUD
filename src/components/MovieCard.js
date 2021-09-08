import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class MovieCard extends React.Component {
  render() {
    const { movie: { title, storyline, imagePath, id } } = this.props;
    return (
      <div data-testid="movie-card">
        <h1>{ title }</h1>
        <p>{ storyline }</p>
        <img src={ imagePath } alt={ title } />
        <Link to={ `/movies/${id}` }>VER DETALHES</Link>
      </div>
    );
  }
}

const { shape, string } = PropTypes;

MovieCard.propTypes = {
  movie: shape({
    title: string,
    storyline: string,
    imagePath: string,
    id: string,
  }),
}.isRequired;
