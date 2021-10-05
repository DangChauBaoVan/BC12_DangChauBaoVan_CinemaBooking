import HomeCarousel from 'components/HomeCarousel/HomeCarousel'
import React, { Component } from 'react'
import MovieList from './MovieList/MovieList'

export default class Home extends Component {
    render() {
        return (
            <div>
               <HomeCarousel/>
                <MovieList/>
            </div>
        )
    }
}
