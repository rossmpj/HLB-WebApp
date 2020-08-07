import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import Auth from '../Login/Auth';

// const PublicRouteByRol = ({component: Component, layout: Layout, ...props}) =>{
//     if(!Auth.getAuth()){
//         return (<Layout><Component {...props}/></Layout>)
//     }
//     if(Auth.isEmpleado()){
//         return (<Redirect to='/empleado' />)
//     }
//     if(Auth.isFinanzas()){
//         return (<Redirect to='/finanzas'/>)
//     }
//     return (<Redirect to='/sistemas' />)
// }
const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest}
        render={props => (!Auth.getAuth() ? (<Layout><Component {...props}/></Layout>) : (Auth.isEmpleado() ? (<Redirect to='/empleado'/>) : (Auth.isFinanzas() ? (<Redirect to='/finanzas'/>) : (<Redirect to='/sistemas'/>))))}/>
);
export default PublicRoute;