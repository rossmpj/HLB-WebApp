import React from 'react';
import SelectComponent from './SelectComponent'
import Axios from '../Servicios/AxiosTipo'

class ComponentePrincipal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentes: []
        };
    }

    componentDidMount = () => {
        Axios.mostrar_codigos().then(res => {
            this.setState({ componentes: res.data });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <SelectComponent
                label="Asignar componente principal"
                name="componente"
                class={this.props.class}
                required={this.props.required}
                decorator={this.props.decorator}
                datos={this.state.componentes}></SelectComponent>
        )
    }
}
export default ComponentePrincipal;