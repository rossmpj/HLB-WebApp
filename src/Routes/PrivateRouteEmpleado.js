import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Auth from '../Login/Auth'

const PrivateRouteEmpleado = ({component: Component, layout: Layout,...rest}) =>(
    
    <Route {...rest} 
    render = { props => !Auth.getAuth() ? (<Redirect to='/login'/>) : (Auth.isEmpelado() ? (<Layout><Component {...props}/></Layout>):( Auth.isEmpelado() ? (<Redirect to='/empleado'/>) : (Auth.isFinanzas() ?(<Redirect to='/finanzas'/>):(<Redirect to='/sistemas'/>)))) }/>
);
export default PrivateRouteEmpleado;