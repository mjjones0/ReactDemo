import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import {initialMovies} from '../movies';
import {additionalMovies} from '../movies';
import AddMovie from './AddMovie';
import SortField from './SortField';

class App extends Component {
	constructor() {
		super();
	 
		this.state = {
			movies: initialMovies
		};
		
		this.loadAdditionalMovies = this.loadAdditionalMovies.bind(this);
		this.addMovieToGallery = this.addMovieToGallery.bind(this);
		this.sortBy = this.sortBy.bind(this);
	}
	loadAdditionalMovies() {
		var currentMovies = { ...this.state.movies };
		var newMovies = Object.assign( currentMovies, additionalMovies );
 
		this.setState({ movies: newMovies });
	}
	addMovieToGallery( movie ) {
		var ts = Date.now();
		var newMovie = {};
		newMovie[ 'movie' + ts ] = movie;
		var currentMovies = { ...this.state.movies };
		var newMovies = Object.assign( currentMovies, newMovie );
		this.setState({ movies: newMovies });
	}
	sortBy( type ) {
		var currentMoviesArray = [ ];
		for (var key in this.state.movies) {
			if (this.state.movies.hasOwnProperty(key)) {
				currentMoviesArray.push(this.state.movies[key]);
			}
		}
		currentMoviesArray.sort(function (a, b) {
			if (type === "title") {
				return a.title.localeCompare(b.title)
			} else if (type === "year") {
				return a.year.localeCompare(b.year);
			} else /* description */ {
				return a.description.localeCompare(b.description);
			}
		});
		var moviesSorted = {};
		for (var i = 0; i < currentMoviesArray.length; ++i) {
			moviesSorted['movie' + i] = currentMoviesArray[i];
		}
		this.setState({ movies: moviesSorted });
	}
	render() {
		return (
			<div className="App">
				<Header text="David's Movie Mojo App!"/>
				<SortField sorter={this.sortBy} />
				<div className="movies">
					{
						Object
							.keys(this.state.movies)
							.map(key => <Movie key={key} meta={this.state.movies[key]} />)
					}
        </div>
				<div className="add-movies"><button onClick={this.loadAdditionalMovies}>Load more...</button></div>
				<AddMovie addMovie={this.addMovieToGallery} />
			</div>
		);
	}
}

export default App;
