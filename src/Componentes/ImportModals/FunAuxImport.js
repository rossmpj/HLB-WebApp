import * as XLSX from 'xlsx';

export default class FunAuxImport {

    static dataFormatEquipos() {
        let titlesnames = ['Asignado', 'Codigo', 'Marca', 'Modelo', 'Numero de Serie',
            'Estado', 'Tipo', 'IP', 'Capacidad Almacenamiento', 'Tipo Almacenamiento', 'Numero de Slots RAM', 'RAM Soportada',
            'Conexiones para Discos', 'Nucleos', 'Frecuencia', 'Componente Principal', 'Descripcion']
        let values = [["0825730575", "HLB_CAS_012", "Asus", "802ew.11ac", "246-FDX", "Operativo", "DISCO DURO", "", "1 TB", "SSD", '', '', '', '', '', "HLB_DSK_003", "etiquetar"],
        ["", "HLB_TMA_011", "Ricoh", "802ew.222ac", "25466-FDX", "Operativo", "TARJETA MADRE", "", "", "", '5', '12 GB', '2', '', '', "HLB_DSK_002", "etiquetar22"]];
        
        // let titlesDesc = ['Descripcion Columnas']
        // let valuesDesc =[['Asignado: Cedula del empleado al cual se asignara el equipo'],['Codigo']];
        return FunAuxImport.generateData(titlesnames, values);
    }


    static generateData(titlesnames, values) {
        let titles = [];
        let valuesArr = [];
        titlesnames.forEach(element => {
            let titulo = {
                title: element, width: { wch: 30 }
            }
            titles.push(titulo);
        });
        values.forEach(vals => {
            let arr = [];
            vals.forEach(val => {
                let value = {
                    value: val
                }
                arr.push(value);
            });
            valuesArr.push(arr);
        })
        let resp = [
            {
                columns: titles,
                data: valuesArr
            }
        ];

        return resp;
    }

    // static ExcelToJson(file) {
    //     let hojas = {}
    //     let reader = new FileReader()
    //     reader.readAsArrayBuffer(file)
    //     reader.onloadend = (e) => {
    //         var data = new Uint8Array(e.target.result);
    //         var workbook = XLSX.read(data, { type: 'array' });
    //         const wsname = workbook.SheetNames[0];
    //         const ws = workbook.Sheets[wsname];
    //         const XL_row_object = XLSX.utils.sheet_to_row_object_array(ws);
    //         hojas = {
    //             data: XL_row_object,
    //             sheetName: wsname
    //         }

    //     }
    //     return hojas;
    // }

    static ExcelToJson = (inputFile, encargado_registro) => {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {

            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("El archivo no puede ser procesado!"));
            };

            temporaryFileReader.onloadend = (e) => {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array', sheetRows: 50 });
                const wsname = workbook.SheetNames[0];
                const ws = workbook.Sheets[wsname];
                let XL_row_object = XLSX.utils.sheet_to_row_object_array(ws, { defval: '' });
                XL_row_object.forEach(elem => {
                    elem['Asignado'] = String(elem['Asignado']).length === 9 ? String('0'+elem['Asignado']) : String(elem['Asignado']);
                    elem['rowNum'] = elem.__rowNum__ + 1;
                })
                let hojas = {
                    data: XL_row_object,
                    sheetName: wsname,
                    fileName: inputFile.name,
                    encargado_registro
                }
                resolve(hojas);
            };
            temporaryFileReader.readAsArrayBuffer(inputFile);
        });
    };
}