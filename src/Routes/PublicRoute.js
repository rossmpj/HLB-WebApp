import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import Auth from '../Login/Auth';

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest}
        render={props => !Auth.getAuth() ? (<Layout><Component {...props}/></Layout>) : (Auth.getDataLog().user.rol.toLowerCase() === 'empleado institucional' ? (<Redirect to='/empleado' />) : (<Redirect to='/sistemas' />))
        } />
);
export default PublicRoute;