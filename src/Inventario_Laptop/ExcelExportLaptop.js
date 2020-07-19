import React, { Component } from 'react';
import ReactExport from 'react-data-export';
import '../App.css';
import { Button } from 'antd';
import FuncionesAuxiliares from '../FuncionesAuxiliares'


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class ExcelExportLaptop extends Component {



    static generateData(data) {
        let ArrayData = []
        data.forEach(element => {
            let rowGeneral = FuncionesAuxiliares.generateGeneralData(element);
            let rowsRAM = FuncionesAuxiliares.generateDataRAM_DISK(element.rams);
            let rowsDISK = FuncionesAuxiliares.generateDataRAM_DISK(element.discos);
            let rowProcesador = FuncionesAuxiliares.generateDataProcesador(element.id_procesador)
            ArrayData.push(rowGeneral);
            ArrayData.push(rowProcesador);
            rowsRAM.forEach(ram => {
                ArrayData.push(ram)
            });
            rowsDISK.forEach(disk => {
                ArrayData.push(disk)
            });
        });

        

        return [{
            columns: FuncionesAuxiliares.generateTitlesDL(),
            data: ArrayData
        }];

    }

    render() {
        return (
            <div>
                <ExcelFile filename={'Inventario Laptops'} element={<Button disabled={this.props.dis} type="primary" icon="cloud-download">Exportar</Button>}>
                    <ExcelSheet dataSet={ExcelExportLaptop.generateData(this.props.data)} name="Inventario Laptops" />
                </ExcelFile>
            </div>
        );
    }


}