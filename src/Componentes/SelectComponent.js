import React from 'react';
import {
    Form,
    Select
} from 'antd';

function SelectComponent(props) {
    let n=null;
    return (
        <Form.Item
            label={props.label}
            className={props.class !== "" ? `${props.class}` : null}
        >
            {props.decorator(`${props.name}`, {
                rules: [{ required: props.required, message: 'Debe completar este campo' }],                
                initialValue: props.initialValue === undefined ? null : `${props.initialValue}`
            })(
                <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                     <Select.Option key="0" value={n}>----</Select.Option>
                    {
                        props.datos.map(dato =>
                            <Select.Option key={dato.id} value={dato.id}>{dato.dato}</Select.Option>
                        )
                    }
                </Select>
            )
            }
        </Form.Item >
    )
}
export default SelectComponent;