import React from 'react';
import SelectComponent from './SelectComponent'

class MarcaSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            marcas: []
        };
    }

    componentDidMount = () => {
        var marca = ["HP", "Dell"];
        this.setState({ marcas: marca});
    }

    render() {
        return (
            <SelectComponent
                label="Marca"
                name="marca"
                required={this.props.required}
                decorator={this.props.decorator}
                datos={this.state.marcas}></SelectComponent>
        )
    }
}
export default MarcaSelect;