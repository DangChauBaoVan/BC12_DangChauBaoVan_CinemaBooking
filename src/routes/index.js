
import Dashboard from "containers/admin/Dashboard/Dashboard";
import AddMovie from "containers/admin/Movie/AddMovie/AddMovie";
import CreateShowTime from "containers/admin/Movie/CreateShowTime/CreateShowTime";
import EditMovie from "containers/admin/Movie/EditMovie/EditMovie";
import Movie from "containers/admin/Movie/Movie";
import User from "containers/admin/User/User";
import SeatPlan from "containers/clients/Seat-Plan/SeatPlan";
import UserInfo from "containers/clients/UserInfo/UserInfo";
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
    {
      path: '/seat-plan/:showTimeId',
      component: SeatPlan,
      exact: false,
      isPrivate: true,
    },
    {
      path: '/user-info',
      component: UserInfo,
      exact: false,
      isPrivate: true,
    },
  ];
  
  export const adminRoutes = [
    {
      path: '/admin',
      component: Dashboard,
      exact: true,
      isPrivate: true,
    },
    {
      path: '/admin/user',
      component: User,
      exact: false,
      isPrivate: true,
    },
    {
      path: '/admin/movie',
      component: Movie,
      exact: false,
      isPrivate: true,
    },
    {
      path: '/admin/addmovie',
      component: AddMovie,
      exact: false,
      isPrivate: true,
    },
    {
      path: '/admin/editmovie/:id',
      component: EditMovie,
      exact: false,
      isPrivate: true,
    },
    {
      path: '/admin/showtime/:id',
      component: CreateShowTime,
      exact: false,
      isPrivate: true,
    },
  ];