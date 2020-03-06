import React from 'react';
import SelectComponent from './SelectComponent'

class TipoSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tipos: []
        };
    }

    componentDidMount = () => {
        var comp = ["Servidor", "UPS"];
        this.setState({ tipos: comp });
    }

    render() {
        return (
            <SelectComponent
                label="Tipo de equipo"
                name={this.props.id}
                class={this.props.class}
                required={this.props.required}
                decorator={this.props.decorator}
                datos={this.state.tipos}></SelectComponent>
        )
    }
}
export default TipoSelect;