import Home from "../containers/clients/Home/Home";
import MovieDetails from "../containers/clients/MovieDetails/MovieDetails";

export const clientRoutes = [
    {
      path: '/',
      component: Home,
      exact: true,
      isPrivate: false,
    },
    
    {
      path: '/movie-detail/:movieId',
      component: MovieDetails,
      exact: false,
      isPrivate: false,
    },
  ];
  
  export const adminRoutes = [
   
  ];