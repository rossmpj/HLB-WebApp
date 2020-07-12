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

    static UpperCase(str) {
        return FuncionesAuxiliares.validarCampo(str, '-').replace('_', ' ').toUpperCase();
    }

    static validarCampo(campo, replace) {
        return campo === undefined || campo === '' || campo === null ? replace : campo;
    }



    static generateGeneralData(element) {
        return [
            { 'value': FuncionesAuxiliares.validarCampo(element.bspi, 'No Asignado') },
            { 'value': FuncionesAuxiliares.validarCampo(element.departamento, 'No Asignado') },
            { 'value': FuncionesAuxiliares.validarCampo(element.empleado, 'No Asignado') },
            { 'value': FuncionesAuxiliares.validarCampo(element.codigo, '-') },
            { 'value': FuncionesAuxiliares.UpperCase(element.tipo_equipo) },
            { 'value': FuncionesAuxiliares.validarCampo(element.marca, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.modelo, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.num_serie, '-') },
            { 'value': FuncionesAuxiliares.transform_estado(element.estado) },
            { 'value': FuncionesAuxiliares.validarCampo(element.name_pc, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.user_pc, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.so, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.so_type, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.servpack, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.licencia, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.dirIP, '-') },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': FuncionesAuxiliares.validarCampo(element.ram_soportada, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.slots_ram, '-') },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': FuncionesAuxiliares.validarCampo(element.fecha_registro, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.descripcion, '-') },

        ]
    }

    static generateDataProcesador(element) {
        return [
            { 'value': '' },
            { 'value': '' },
            { 'value': '' },
            { 'value': FuncionesAuxiliares.validarCampo(element.codigo, '-') },
            { 'value': FuncionesAuxiliares.UpperCase(element.tipo_equipo) },
            { 'value': FuncionesAuxiliares.validarCampo(element.marca, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.modelo, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.numero_serie, '-') },
            { 'value': FuncionesAuxiliares.transform_estado(element.estado_operativo) },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': FuncionesAuxiliares.validarCampo(element.frecuencia, '-') + " GHz" },
            { 'value': FuncionesAuxiliares.validarCampo(element.nucleos, '-') },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': FuncionesAuxiliares.validarCampo(element.fecha_registro, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.descripcion, '-') },

        ]
    }

    static generateDataRAM_DISK(array) {
        let rows = []
        array.forEach(element => {
            let row = [
                { 'value': '' },
                { 'value': '' },
                { 'value': '' },
                { 'value': FuncionesAuxiliares.validarCampo(element.codigo, '-') },
                { 'value': FuncionesAuxiliares.UpperCase(element.tipo_equipo) },
                { 'value': FuncionesAuxiliares.validarCampo(element.marca, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.modelo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.numero_serie, '-') },
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
                { 'value': FuncionesAuxiliares.validarCampo(element.capacidad, '-') },
                { 'value': element.tipo_equipo === 'memoria_ram' ? FuncionesAuxiliares.validarCampo(element.tipo, '-') : '-' },
                { 'value': element.tipo_equipo === 'disco_duro' ? FuncionesAuxiliares.validarCampo(element.tipo, '-') : '-' },
                { 'value': FuncionesAuxiliares.validarCampo(element.fecha_registro, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.descripcion, '-') },

            ]
            rows.push(row);
        });
        return rows;
    }

    static generateTitlesDL() {
        let names = ["BSPI Punto", "Departamento", "Empleado", "Codigo", 'Equipo',
            "Marca", "Modelo", "S/N", "Estado", "Nombre PC", "Usuario PC", "Sistema Operativo",
            "Tipo S.O.", "Service Pack 1", "Licencia", 'IP', 'Frecuencia (GHz)', 'Nucleos', 'RAM Soportada',
            'Slots para RAM', 'Conexiones para Discos', 'Capacidad', 'Tipo RAM', 'Tipo Disco', 'Fecha Registro', 'Descripcion'];
        return FuncionesAuxiliares.generateTitlesExcel(names, "9BBB59");
    }

    static generateTitlesExcel(names, color) {
        let arrayColumnName = [];
        names.forEach(element => {
            let titulo = {
                title: element, width: { wch: 30 },
                style: {
                    font: { sz: "16", bold: true },
                    fill: { patternType: "solid", fgColor: { rgb: color } }
                }
            }
            arrayColumnName.push(titulo);
        });
        return arrayColumnName;
    }

}