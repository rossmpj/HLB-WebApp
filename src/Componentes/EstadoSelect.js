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
        var estado = [{id:"D", dato:"Disponible"}, 
                      {id:"O", dato:"Operativo"}, 
                      {id:"R", dato:"Reparado"}, 
                      {id:"ER", dato:"En revisión"}, 
                      {id:"B", dato:"De baja"}];
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
                datos={this.state.estados}
                initialValue={this.props.initialValue}></SelectComponent>
        )
    }
}
export default EstadoSelect;