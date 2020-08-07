import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from '../Login/Auth'

// const PrivateRouteByRolFinz = ({ component: Component, layout: Layout, ...props}) => {
//     if(!Auth.getAuth()){
//         return (<Redirect to='/login'/>);
//     }
//     else if(Auth.isEmpleado()){
//         return (<Redirect to='/empleado'/>);
//     }
//     else if(Auth.isFinanzas()){
//         return (<Layout><Component {...props}/></Layout>);
//     }
//     return (<Redirect to='/sistemas'/>);
// }


const PrivateRouteFinanzas = ({ component: Component, layout: Layout, ...rest}) =>(
    <Route {...rest} render = { props => (!Auth.getAuth() ? (<Redirect to='/login'/>) : (Auth.isEmpleado() ? (<Redirect to='/empleado'/>) : (Auth.isFinanzas() ? (<Layout><Component {...props}/></Layout>) : (<Redirect to='/sistemas'/>))))}/>
);
export default PrivateRouteFinanzas;
