import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      filme: {},
    };
    this.resolveGetMovie = this.resolveGetMovie.bind(this); // faz a função ser vista pelo react
    this.deletarFilmes = this.deletarFilmes.bind(this); // faz a função ser vista pelo react
  }

  componentDidMount() { // faz a função ser executada ao montar o componente
    this.resolveGetMovie();
  }

  montaDetalhes = (filme) => { // toda essa estrutura ficaria dentro do render() { return (**aqui**)}
  // mas colocamos para fora e será chamada depois para deixar o ternário mas limpo (existem formas alternativas de chegar no mesmo resultado)
    const {
      title,
      storyline,
      imagePath,
      genre,
      rating,
      subtitle,
      id,
    } = filme;
    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <h1>{ title }</h1>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to="/">VOLTAR</Link>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/" onClick={ () => this.deletarFilmes(id) }>DELETAR</Link>
        {/* o delete só está passando o id do elemento clicado
        para a função deleteFilmes para ela fazer o trabalho */}
      </div>
    );
  }

  async deletarFilmes(id) {
    await movieAPI.deleteMovie(id);
  }

  async resolveGetMovie() {
    const { match: { params: { id } } } = this.props; // https://reactrouter.com/web/api/match - desestruturamos o match da propriedade de URL do React Router DOm para pegarmos o id passado como parâmetro.
    const filme = await movieAPI.getMovie(id); // passamos o id por parâmetro e chamaos a função getMovie da API passando o id como parãmetro.
    this.setState({
      loading: false,
      filme,
    });
  }

  render() {
    const { loading, filme } = this.state;
    return (
      loading ? <Loading /> : this.montaDetalhes(filme) // https://app.betrybe.com/course/front-end/ciclo-de-vida-de-componentes-e-react-router/react-router/22d8da78-d744-421e-b669-d72ff189e506/conteudos/b9c77c92-1f20-4a8d-95df-32d69e145217/componente-redirect/241af551-d81c-479d-a4d8-411b2f5bac5d?use_case=side_bar - Renderização condicional, se o estado loading for true, renderizamos o componente <Loading /> se não renderizamos o retorno da funcao montaDetalhes passando o filme como parâmetro.
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
