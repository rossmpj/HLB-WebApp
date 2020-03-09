import React from 'react';
import SelectComponent from './SelectComponent'

class EstadoSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            estados: []
        };
    }

    componentDidMount = () => {
        var estado = ["Disponible", "En uso", "En revisión", "De baja"];
        this.setState({ estados: estado});
    }

    render() {
        return (
            <SelectComponent
                label="Estado"
                name={this.props.id}
                class={this.props.class}
                required={this.props.required}
                decorator={this.props.decorator}
                datos={this.state.estados}></SelectComponent>
        )
    }
}
export default EstadoSelect;