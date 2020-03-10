import React from 'react';
import InputComp from './InputComponent'

import CapacComp from './CapacidadComponent'

import DescrComp from './DescripcionComponent'

class CollapseData extends React.Component {

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
            <div>
                <InputComp label="Código"           id={"codigo_dd"} class="form2col" decorator={this.props.decorator} />
                <MarcaComp required={true} id={"marca_dd"}  class="form2col" decorator={this.props.decorator} />
                <InputComp label="Modelo"          id={"modelo_dd"} class="form2col" decorator={this.props.decorator} />
                <InputComp label="Número de serie" id={"nserie_dd"} class="form2col" decorator={this.props.decorator} />
                <CapacComp label="Capacidad"       id={"capac_dd"}  class="form2col" decorator={this.props.decorator} />
                <InputComp label="Tipo"            id={"tipo_dd"}   class="form2col" decorator={this.props.decorator} />
                <DescrComp label="Descripción"     id={"descr_dd"}  class="form2col" decorator={this.props.decorator} />  
            </div>
            
        )
    }
}
export default CollapseData;