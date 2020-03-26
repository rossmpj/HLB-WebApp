import React from 'react';
import SelectComponent from './SelectComponent'
import Axios from '../Servicios/AxiosTipo'

class AsignarSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            empleados: []
        };
    }

    componentDidMount = () => {
        let registro = [];
        Axios.mostrar_empleados().then(res => {
            res.data.forEach(function (dato) {
                let users = {
                    dato: dato.nombre.concat(" ", dato.apellido),
                    id: dato.id
                }
                registro.push(users);
            });
            this.setState({ empleados: registro});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <SelectComponent
                label="Asignar a empleado"
                name={this.props.id}
                class={this.props.class}
                required={this.props.required}
                decorator={this.props.decorator}
                datos={this.state.empleados}></SelectComponent>
        )
    }
}
export default AsignarSelect;