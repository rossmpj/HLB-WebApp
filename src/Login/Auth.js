
const Auth = {
    authenticate(data) {
        localStorage.setItem('userdata',JSON.stringify(data))
    },
    logout() {
        localStorage.removeItem('userdata');
    },
    getAuth() {
        // console.log(localStorage.getItem('userdata'),'hhh')
        return localStorage.getItem('userdata') !== null && localStorage.getItem('userdata') !== undefined;
    },
    getDataLog(){
        return JSON.parse(localStorage.getItem('userdata')) ;
    },
    isNotSistemas(){
        let json_user = JSON.parse(localStorage.getItem('userdata'));
        return json_user.user.rol.toLowerCase().indexOf('empleado') > -1 || json_user.user.rol.toLowerCase().indexOf('finanzas') > -1
    },
    isFinanzas(){
        return JSON.parse(localStorage.getItem('userdata')).user.rol.toLowerCase().indexOf('finanzas') > -1
    },
    isEmpleado(){
        return JSON.parse(localStorage.getItem('userdata')).user.rol.toLowerCase().indexOf('empleado') > -1
    } 
};
export default Auth;