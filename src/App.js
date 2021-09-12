import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { adminRoutes, clientRoutes } from 'routes';
import './App.css';
import PageNotFound from './containers/shared/PageNotFound/PageNotFound';
import ClientLayout from './layouts/ClientLayout';

function App() {
  const renderLayout = (routes, Layout) => {
    return routes.map(route => {
      const { path, component, exact, isPrivate } = route;
      return (
        <Layout
          path={path}
          component={component}
          exact={exact}
          isPrivate={isPrivate}
        />
      );
    });
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          //Hihi
          {renderLayout(clientRoutes, ClientLayout)}
          {/* {renderLayout(adminRoutes, AdminLayout)} */}
          {/* <Route path="/" component={Login} /> */}
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
