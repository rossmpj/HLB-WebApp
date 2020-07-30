import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../Login/Auth'

 const PrivateRouteGeneral = ({ component: Component, layout: Layout, ...rest}) =>(
    <Route {...rest} 
    render = { props => !Auth.getAuth() ? (<Redirect to='/login'/>) : (Auth.getDataLog().user.rol.toLowerCase()==='empleado institucional' ? (<Redirect to='/empleado'/>) : (<Layout><Component {...props}/></Layout>))}/>

);
export default PrivateRouteGeneral;

