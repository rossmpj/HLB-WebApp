export default class FuncionesAuxiliares {

    static stringSorter = (a, b) => {
        let y = a || '';
        let u = b || '';
        return y.localeCompare(u);
    }




    // FUNCIONES PARA EXPORTACION DE EXCEL

    static transform_estado(estado) {
        if (estado === 'D') return 'Disponible'
        if (estado === 'O') return 'Operativo'
        if (estado === 'ER') return 'En revisión'
        if (estado === 'R') return 'Reparado'
        if (estado === 'B') return 'De baja'
        return '-'
    }

    static UpperCase(str){
        return str === undefined || str === null ? '-':str.replace('_', ' ').toUpperCase() ;
    }

    

    static generateGeneralData(element) {
        return [
            { 'value': element.bspi },
            { 'value': element.departamento },
            { 'value': element.empleado },
            { 'value': element.codigo },
            { 'value': FuncionesAuxiliares.UpperCase(element.tipo_equipo)},
            { 'value': element.marca===null || element.marca===undefined || element.marca===''?'-':element.marca },
            { 'value': element.modelo===null || element.modelo===undefined || element.modelo===''?'-':element.modelo },
            { 'value': element.num_serie===null || element.num_serie===undefined || element.num_serie===''?'-':element.num_serie  },
            { 'value': FuncionesAuxiliares.transform_estado(element.estado) },
            { 'value': element.name_pc },
            { 'value': element.user_pc },
            { 'value': element.so },
            { 'value': element.so_type },
            { 'value': element.servpack },
            { 'value': element.licencia },
            { 'value': element.dirIP },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': element.ram_soportada===null || element.ram_soportada===undefined?'-':element.ram_soportada},
            { 'value': element.slots_ram===null || element.slots_ram===undefined?'-':element.slots_ram},
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': element.fecha_registro },
            { 'value': element.descripcion },

        ]
    }

    static generateDataProcesador(element) {
        return [
            { 'value': '' },
            { 'value': '' },
            { 'value': '' },
            { 'value': element.codigo },
            { 'value': FuncionesAuxiliares.UpperCase(element.tipo_equipo) },
            { 'value': element.marca },
            { 'value': element.modelo },
            { 'value': element.numero_serie },
            { 'value': FuncionesAuxiliares.transform_estado(element.estado_operativo) },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': element.frecuencia +" GHz"},
            { 'value': element.nucleos },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': element.fecha_registro },
            { 'value': element.descripcion },

        ]
    }

    static generateDataRAM_DISK(array) {
        let rows = []
        array.forEach(element => {
            let row = [
                { 'value': '' },
                { 'value': '' },
                { 'value': '' },
                { 'value': element.codigo === undefined || element.codigo === null ? '-' : element.codigo},
                { 'value': FuncionesAuxiliares.UpperCase(element.tipo_equipo)},
                { 'value': element.marca === undefined || element.marca === null ? '-' : element.marca},
                { 'value': element.modelo === undefined || element.modelo === null ? '-' : element.modelo},
                { 'value': element.numero_serie === undefined || element.numero_serie === null ? '-' : element.numero_serie },
                { 'value': FuncionesAuxiliares.transform_estado(element.estado_operativo) },
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
                { 'value': element.capacidad ===undefined || element.capacidad ===null  ? '-' : element.capacidad  },
                { 'value': element.tipo_equipo === 'memoria_ram' ? element.tipo : '-' },
                { 'value': element.tipo_equipo === 'disco_duro' ? element.tipo : '-' },
                { 'value': element.fecha_registro },
                { 'value': element.descripcion },

            ]
            rows.push(row);
        });
        return rows;
    }

    static generateTitlesExcel(){
        let arrayColumnName = [];
        let names = [ "BSPI Punto", "Departamento", "Empleado", "Codigo", 'Equipo', 
            "Marca", "Modelo", "S/N", "Estado", "Nombre PC", "Usuario PC", "Sistema Operativo",
            "Tipo S.O.", "Service Pack 1", "Licencia", 'IP', 'Frecuencia (GHz)', 'Nucleos', 'RAM Soportada',
            'Slots para RAM', 'Conexiones para Discos', 'Capacidad', 'Tipo RAM', 'Tipo Disco', 'Fecha Registro', 'Descripcion'];

        names.forEach(element => {
            let titulo = {
                title: element, width: { wch: 30 },
                style: {
                    font: { sz: "16", bold: true },
                    fill: { patternType: "solid", fgColor: { rgb: "9BBB59" } }
                }
            }
            arrayColumnName.push(titulo);
        });
        return arrayColumnName;
    }

}