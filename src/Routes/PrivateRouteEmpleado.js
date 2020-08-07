import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../Login/Auth'


// const PrivateRouteByRolEmp = ({component: Component, layout: Layout, ...props}) => {
//     if(!Auth.getAuth()){
//         return (<Redirect to='/login'/>)
//     }
//     if(Auth.isEmpleado()){
//         return (<Layout><Component {...props}/></Layout>)
//     }
//     if(Auth.isFinanzas()){
//         return (<Redirect to='/finanzas'/>)
//     }
//     return (<Redirect to='/sistemas'/>)
// }


const PrivateRouteEmpleado = ({component: Component, layout: Layout,...rest}) =>(
    
    <Route {...rest} 
    render = { props => (!Auth.getAuth() ? (<Redirect to='/login'/>) : (Auth.isEmpleado() ? (<Layout><Component {...props}/></Layout>) : (Auth.isFinanzas() ? (<Redirect to='/finanzas'/>) : (<Redirect to='/sistemas'/>))))}/>
);
export default PrivateRouteEmpleado;