import React, { Component } from 'react';
import ReactExport from 'react-data-export';
import '../App.css';
import { Button } from 'antd';
import FuncionesAuxiliares from '../FuncionesAuxiliares'


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class ExcelExportDesktop extends Component {

    generateDataMainBoard(element){
        return [
            { 'value': '' },
            { 'value': '' },
            { 'value': '' },
            { 'value': element.codigo },
            { 'value': FuncionesAuxiliares.UpperCase(element.tipo_equipo)},
            
            { 'value': element.marca===null || element.marca===undefined || element.marca==='' ?'-':element.marca },
            { 'value': element.modelo===null || element.modelo===undefined || element.modelo===''?'-':element.modelo },
            { 'value': element.numero_serie===null || element.numero_serie===undefined || element.numero_serie===''?'-':element.numero_serie  },
            { 'value': FuncionesAuxiliares.transform_estado(element.estado_operativo) },
            { 'value': '-'},
            { 'value': '-'},
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-'},
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': element.ram_soportada===null || element.ram_soportada===undefined || element.ram_soportada===''?'-':element.ram_soportada},
            { 'value': element.numero_slots===null || element.numero_slots===undefined?'-':element.numero_slots},
            { 'value': element.conexiones_dd===null || element.conexiones_dd===undefined?'-':element.conexiones_dd},
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': element.fecha_registro },
            { 'value': element.descripcion },
        ]
    }

    generateDataComponents(data){
        let letArrayData = [];
        let arrayCommponets = ['monitor','case','f_alim','f_poder','teclado', 'mouse', 'parlantes','tarj_red']
        arrayCommponets.forEach(element => {

            if(data[element] === undefined || data[element] === null|| data[element].length === 0){
              //  console.log('entro')
                return;
            }

            let row =  [
                { 'value': '' },
                { 'value': '' },
                { 'value': '' },
                { 'value': data[element].codigo },
                { 'value': FuncionesAuxiliares.UpperCase(data[element].tipo_equipo) },
                
                { 'value': data[element].marca },
                { 'value': data[element].modelo },
                { 'value': data[element].numero_serie },
                { 'value': FuncionesAuxiliares.transform_estado(data[element].estado_operativo) },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': data[element].fecha_registro },
                { 'value': data[element].descripcion },

            ] 
            letArrayData.push(row);
        });

        return letArrayData;
    }



    generateData() {
       
        let ArrayData = []
        this.props.data.forEach(element => {
            let rowGeneral = FuncionesAuxiliares.generateGeneralData(element);
            let rowsRAM = FuncionesAuxiliares.generateDataRAM_DISK(element.rams);
            let rowsDISK = FuncionesAuxiliares.generateDataRAM_DISK(element.discos);
            let rowProcesador = FuncionesAuxiliares.generateDataProcesador(element.procesador)
            let rowsComponents = this.generateDataComponents(element);
            let rowsMainBoard = this.generateDataMainBoard(element.mainboard)
            ArrayData.push(rowGeneral);
            ArrayData.push(rowProcesador);
            ArrayData.push(rowsMainBoard);
            rowsComponents.forEach(comp =>{
                ArrayData.push(comp)
            });
            rowsRAM.forEach(ram => {
                ArrayData.push(ram)
            });
            rowsDISK.forEach(disk => {
                ArrayData.push(disk)
            });
        });

        //console.log(ArrayData, 'arrays data')

        return [{
            columns: FuncionesAuxiliares.generateTitlesExcel(),
            data: ArrayData
        }];

    }

    render() {
        return (
            <div>
                <ExcelFile name='Inventario Computadores Escritorio' element={<Button disabled={this.props.dis} type="primary" icon="cloud-download">Exportar</Button>}>
                    <ExcelSheet dataSet={this.generateData()} name='Inventario Computadores Escritorio' />
                </ExcelFile>
            </div>
        );
    }


}