export default class FuncionesAuxiliares {

    static stringSorter = (a, b) => {
        let y = a || '';
        let u = b || '';
        return y.localeCompare(u);
    }

}