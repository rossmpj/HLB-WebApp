import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Auth from '../Login/Auth'

const PrivateRouteEmpleado = ({component: Component, layout: Layout,...rest}) =>(
    
    <Route {...rest} 
    render = { props => !Auth.getAuth() ? (<Redirect to='/login'/>) : (Auth.getDataLog().user.rol.toLowerCase()!=='empleado institucional' ? (<Redirect to='/sistemas'/>) : (<Layout><Component {...props}/></Layout>))
    }/>


);
export default PrivateRouteEmpleado;