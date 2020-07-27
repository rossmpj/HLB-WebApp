
const Auth = {
    //isAuthenticated: false,
    authenticate(data) {
        console.log(data)
        localStorage.setItem('userdata',JSON.stringify(data))
        //this.isAuthenticated = true;
    },
    logout() {
        //this.isAuthenticated = false;
        localStorage.removeItem('userdata');
    },
    getAuth() {
       // return this.isAuthenticated;
       console.log(localStorage.getItem('userdata') , 'loclal')
       return localStorage.getItem('userdata') !== null && localStorage.getItem('userdata') !== undefined;
    },
    getDataLog(){
        return localStorage.getItem('userdata') === null || localStorage.getItem('userdata') === undefined ? {} : JSON.parse(localStorage.getItem('userdata')) ;
    }
};
export default Auth;