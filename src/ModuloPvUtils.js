/**
 * @class
 */
export class ModuloPvUtils {
    /**
     * Retorna o angulo, em radianos, da inclinacao relativa da Terra em relacao ao Sol.
     * @param {number} mes: Informe 0 para setembro, 1 para outubro, ...
     * @returns 
     */
    static getAnguloInclinacaoTerraSol( mes ){
        const anguloInclinaoEcliptica = 0.4101524;  //Equivale a 23.5 graus

        //Para fins de simplificacao, cada mes foi considerado como equivalendo a um deslocamento de 30 graus.
        //Dessa forma, em 12 meses, teremos um deslocamento de 360 graus, ou 2PI radianos.
        const anguloMes = ModuloPvUtils.convertDegreeToRadian( 30 * mes );

        const anguloInclinacaoTerraSol = anguloInclinaoEcliptica * Math.sin( anguloMes );

        return anguloInclinacaoTerraSol;
    }

    /**
     * 
     * @param {number} degree 
     * @returns 
     */
    static convertDegreeToRadian( degree ){
        return degree * Math.PI / 180;
    }
}