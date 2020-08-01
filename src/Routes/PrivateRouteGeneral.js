import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../Login/Auth'

 const PrivateRouteGeneral = ({ component: Component, layout: Layout, ...rest}) =>(
    <Route {...rest} 
    render = { props => !Auth.getAuth() ? (<Redirect to='/login'/>) : (Auth.isEmpelado() ? (<Redirect to='/empleado'/>) : (Auth.isFinanzas() ?(<Redirect to='/finanzas'/>):(<Layout><Component {...props}/></Layout>)))}/>

);
export default PrivateRouteGeneral;

