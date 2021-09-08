import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { movie: { title, storyline, id, imagePath } } = this.props;
    return (
      <div data-testid="movie-card" className="card">
        <div className="card-container">
          <img src={ imagePath } alt={ title } className="card-image" />
          <h1>{title}</h1>
          <p className="card-storyline">{storyline}</p>
          <p><Link to={ `movies/${id}` }>VER DETALHES</Link></p>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    storyline: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
