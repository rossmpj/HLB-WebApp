import React from 'react';
import SelectComponent from './SelectComponent'
import MetodosAxios from '../Servicios/AxiosIp'

class IpSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: []
        };
    }

    componentDidMount = () => {
      let datos = [];
      MetodosAxios.ips_libres().then(res => {
      res.data.forEach(function (registro) {
        let ip = {
          id: registro.id_ip,
          dato: registro.direccion_ip
        }
        datos.push(ip);
      });
      this.setState({ ip: datos });
    });
    }
    
    render() {
        return (
           <SelectComponent 
           label="Dirección IP" 
           name= {this.props.id}
           class={this.props.class}
           required={this.props.required}
           decorator={this.props.decorator} 
           datos={this.state.ip}
           initialValue={this.props.initialValue}></SelectComponent>
        )
    }
}
export default IpSelect;