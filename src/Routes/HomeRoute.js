import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import Auth from '../Login/Auth'
const HomeRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render={
            
            (props) => !Auth.getAuth() ? (<Redirect to='/login' />) : (Auth.isEmpelado() ? (<Redirect to='/empleado' />) : (Auth.isFinanzas() ? (<Redirect to='/finanzas'/>): (<Redirect to='/sistemas' />)))
        } />
);
export default HomeRoute;