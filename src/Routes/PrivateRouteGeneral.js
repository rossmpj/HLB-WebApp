import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../Login/Auth'

// const PrivateRouteByRolGen = ({component: Component, layout: Layout, ...props}) => {
//     if(!Auth.getAuth()){
//         return (<Redirect to='/login'/>);
//     }
//     if(Auth.isEmpleado()){
//         return (<Redirect to='/empleado'/>);
//     }
//     if(Auth.isFinanzas()){
//         return (<Redirect to='/finanzas'/>);
//     }
//     return (<Layout><Component {...props}/></Layout>);
// }

const PrivateRouteGeneral = ({ component: Component, layout: Layout, ...rest}) =>(
    <Route {...rest} render = { props => (!Auth.getAuth() ? (<Redirect to='/login'/>) : (Auth.isEmpleado() ? (<Redirect to='/empleado'/>) : (Auth.isFinanzas() ? (<Redirect to='/finanzas'/>) : (<Layout><Component {...props}/></Layout>))))}/>
);
export default PrivateRouteGeneral;

