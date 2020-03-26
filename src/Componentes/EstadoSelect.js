import React from 'react';
import SelectComponent from './SelectComponent'

class EstadoSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            estados: []
        };
    }
    //Temporal
    componentDidMount = () => {
        var estado = [{id:"Disponible", dato:"Disponible"}, 
                      {id:"Operativo", dato:"Operativo"}, 
                      {id:"Reparado", dato:"Reparado"}, 
                      {id:"En revisión", dato:"En revisión"}, 
                      {id:"De baja", dato:"De baja"}];
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