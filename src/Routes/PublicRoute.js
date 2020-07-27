import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Auth from '../Login/Auth';

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest}
        render={props => !Auth.getAuth() ? (<Layout><Component {...props}/></Layout>) : (Auth.getDataLog().user.rol.toLowerCase() === 'empleado institucional' ? (<Redirect to='/empleado' />) : (<Redirect to='/sistemas' />))
        } />
);
export default PublicRoute;

// export default class PublicRoute extends React.Component{
//     render(){
//         console.log('entra pub')
//         const auth = FuncionesAuxiliares.getLocalStorageInfo();
//         const Component = this.props.component
//         const Layout = this.props.layout
//         return(
//            <Route {...this.props.rest}
//         render={props => auth === null || auth === undefined ? (<Layout><Component {...props}/></Layout>) : (auth.user.rol.toLowerCase() === 'empleado' ? (<Redirect to='/empleado' />) : (<Redirect to='/sistemas' />))
//         } />
//         );
//     }
// }