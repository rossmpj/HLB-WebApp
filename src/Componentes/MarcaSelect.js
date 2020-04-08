import React from 'react';
import SelectComponent from './SelectComponent'
import Axios from '../Servicios/AxiosTipo'

class MarcaSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            marcas: []
        };
    }

    componentDidMount = () => {
        let registro = [];
        Axios.mostrar_marcas().then(res => {
            res.data.forEach(function (dato) {
                let users = {
                    id: dato.id_marca,
                    dato: dato.nombre
                }
                registro.push(users);
            });
            this.setState({ marcas: registro });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <SelectComponent
                label="Marca"
                name={this.props.id}
                class={this.props.class}
                required={this.props.required}
                decorator={this.props.decorator}
                datos={this.state.marcas}
                initialValue={this.props.initialValue}></SelectComponent>
        )
    }
}
export default MarcaSelect;