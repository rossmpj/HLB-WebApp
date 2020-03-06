import React from 'react';
import {
    Form,
    Select
} from 'antd';

function SelectComponent(props) {
    return (
        <Form.Item
            label={props.label}
            className={props.class !== "" ? `${props.class}` : null}
        >
            {props.decorator(`${props.name}`, {
                rules: [{ required: props.required, message: 'Debe completar este campo' }]
            })(
                <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        props.datos.map(dato =>
                            <Select.Option key={dato} value={dato}>{dato}</Select.Option>
                        )
                    }
                </Select>
            )
            }
        </Form.Item >
    )
}
export default SelectComponent;