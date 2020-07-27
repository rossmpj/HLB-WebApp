import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Auth from '../Login/Auth'
const HomeRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render={
            
            (props) => !Auth.getAuth() ? (<Redirect to='/login' />) : (Auth.getDataLog().user.rol.toLowerCase() === 'empleado institucional' ? (<Redirect to='/empleado' />) : (<Redirect to='/sistemas' />))
        } />
);
export default HomeRoute;

// export default class HomeRoute extends React.Component{
//     render(){
//         console.log('entra home')
//         const token = FuncionesAuxiliares.getLocalStorageInfo();
//         const Component = this.props.component
//         return(
//                 <Route {...this.props.rest}
//         render={
            
//             (props) => token === null || token === undefined ? (<Redirect to='/login' />) : (token.user.rol.toLowerCase() === 'empleado' ? (<Redirect to='/empleado' />) : (<Redirect to='/sistemas' />))
//         } />
//         );
//     }
// }