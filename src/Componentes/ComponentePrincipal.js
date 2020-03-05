import React from 'react';
import SelectComponent from './SelectComponent'

class ComponentePrincipal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentes: []
        };
    }

    componentDidMount = () => {
        var comp = ["000001", "000002"];
        this.setState({ componentes: comp});
    }

    render() {
        return (
            <SelectComponent
                label="Asignar componente principal"
                name="componente"
                required={this.props.required}
                decorator={this.props.decorator}
                datos={this.state.componentes}></SelectComponent>
        )
    }
}
export default ComponentePrincipal;