import React from 'react';
import {
    Form,
    Select
} from 'antd';

function SelectComponent(props) {
    return (
        <Form.Item
            label="Dirección IP">
            {props.decorator('ip')(
                <Select>
                    {
                        props.datos.map(dato =>
                            <Select.Option key={dato} value={dato}>{dato}</Select.Option>
                        )
                    }
                </Select>
            )}
        </Form.Item>
    )
}
export default SelectComponent;