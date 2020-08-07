import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import Auth from '../Login/Auth'

// const HomeRouteByRol = () =>{
//     if(!Auth.getAuth()){
//         return (<Redirect to='/login'/>);
//     }
//     if(Auth.isEmpleado()){
//         return (<Redirect to='/empleado' />);
//     }
//     if(Auth.isFinanzas()){
//         return (<Redirect to='/finanzas'/>);
//     }
//     return (<Redirect to='/sistemas'/>);
// }

const HomeRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (!Auth.getAuth() ? <Redirect to='/login'/> : (Auth.isEmpleado() ? (<Redirect to='/empleado'/>) : (Auth.isFinanzas() ? (<Redirect to='/finanzas'/>) : (<Redirect to='/sistemas'/>))))}/>
);
export default HomeRoute;