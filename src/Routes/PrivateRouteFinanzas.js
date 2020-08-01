import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Auth from '../Login/Auth'

 const PrivateRouteFinanzas = ({ component: Component, layout: Layout, ...rest}) =>(
    <Route {...rest} 
    render = { props => !Auth.getAuth() ? (<Redirect to='/login'/>) : (Auth.isEmpelado() ? (<Redirect to='/empleado'/>) : (Auth.isFinanzas() ?(<Layout><Component {...props}/></Layout>):(<Redirect to='/sistemas'/>)))}/>

);
export default PrivateRouteFinanzas;
