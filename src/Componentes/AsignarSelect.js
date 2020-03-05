import React from 'react';
import SelectComponent from './SelectComponent'

class AsignarSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            empleados: []
        };
    }

    componentDidMount = () => {
        var empleado = ["Alicia Gris", "Daniel Sempere"];
        this.setState({ empleados: empleado });
    }

    render() {
        return (
            <SelectComponent
                label="Asignar a empleado"
                name="asignado"
                required={this.props.required}
                decorator={this.props.decorator}
                datos={this.state.empleados}></SelectComponent>
        )
    }
}
export default AsignarSelect;