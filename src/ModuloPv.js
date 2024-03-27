import { ModuloPvUtils } from "./ModuloPvUtils.js";

/**
 * @class
 */
export class ModuloPv {
    /**
     * @param {number} largura
     * @param {number} comprimento
     * @param {string} orientacao
     * @param {number} inclinacaoGraus: ângulo de inclinação do módulo fotovoltaico, em graus. Se estiver apontando para o norte, informar valor negativo. 
     * @param {number} azimuteGraus: ângulo azimutal do módulo fotovoltaico em relação ao norte, em graus. Se estiver apontando para o leste, informar valor positivo.
     * @param {number} latitudeGraus: latitude do local, em graus. Sendo que valores negativos representam o hemisferio Sul.
     */
    constructor( largura, comprimento, orientacao, inclinacaoGraus, azimuteGraus, latitudeGraus ) {
        let x;
        let y;
        let z;

        if( orientacao == 'P' ){
            x = comprimento;
            y = largura;
        }
        else{
            x = largura;
            y = comprimento;
        }

        z = 0;

        //Guarda a largura, comprimento, orientacao e latitude.
        this.largura       = largura;
        this.comprimento   = comprimento;
        this.orientacao    = orientacao;
        this.latitudeGraus = latitudeGraus;

        //Inicializa o modulo fotovoltaico considerando que ele esteja disposto na horizontal.
        this.v = [ x, y, z ];

        //Rotaciona o modulo fotovoltaico para representar a latitude do local.
        //Inverte o sinal do ângulo da latitude, pois o Sul é representado por ângulos positivos.
        this.rotateX( latitudeGraus * (-1) );

        //Inclina o modulo fotovoltaico.
        this.rotateX( inclinacaoGraus );

        //Ajusta o azimute do modulo fotovoltaico.
        this.rotateZ( azimuteGraus * (-1) );
    }

    /**
     * 
     * @returns 
     */
    getVector(){
        return this.v;
    }

    /**
     * Rotaciona o módulo fotovoltaico 'anguloGraus' graus em torno do eixo x.
     * @param {number} anguloGraus Ângulo, em ggraus. Valores negativos equivalem ao norte.
     * @returns 
     */
    rotateX( anguloGraus ){
        // @ts-ignore
        this.v = ModuloPvUtils.rotateVectorAxisX( this.v, anguloGraus );

        return this.v;
    }

    /**
     * Rotaciona o módulo fotovoltaico 'anguloGraus' graus em torno do eixo y.
     * @param {number} anguloGraus 
     * @returns 
     */
    rotateY( anguloGraus ){
        // @ts-ignore
        this.v = ModuloPvUtils.rotateVectorAxisY( this.v, anguloGraus );

        return this.v;
    }

    /**
     * Rotaciona o módulo fotovoltaico 'anguloGraus' graus em torno do eixo z.
     * @param {number} anguloGraus 
     * @returns 
     */
    rotateZ( anguloGraus ){
        // @ts-ignore
        this.v = ModuloPvUtils.rotateVectorAxisZ( this.v, anguloGraus );

        return this.v;
    }

    /**
     * Retorna o valor do HSP para o mês informado, considerando a posicao do modulo fotovoltaico.
     * @param {number} month Mes para o qual o HSP sera calculado.
     * @param {number} hspHorizontal Valor do HSP para o caso em que o modulo fotovoltaico esteja na horizontal.
     * @returns 
     */
    simulateHsp( month, hspHorizontal ){
        //Calcula o angulo do Sol em relacao à Terra, no mes informado.
        const anguloSolGraus = ModuloPvUtils.calculaAnguloSolGraus( month );

        //Cria um vetor que representara o Sol, inicializado como se esse estivesse no zenite.
        let vSol = [0, 0, 1];

        //Rotaciona o vetor, para apontar para o Sol.
        vSol = ModuloPvUtils.rotateVectorAxisX( vSol, anguloSolGraus );

        //Primeiro, ira calcular como se o modulo estivesse na horizontal, sem nenhuma inclinacao.
        const moduloPvHorizontal = new ModuloPv( this.largura, this.comprimento, this.orientacao, 0, 0, this.latitudeGraus );
        const hspTotalHorizontal = ModuloPvUtils.calculateAreaHspModuloFvSol( moduloPvHorizontal.getVector(), vSol, hspHorizontal );

        //Agora ira calcular considerando a posicao real do modulo.
        vSol = [0, 0, 1];
        vSol = ModuloPvUtils.rotateVectorAxisX( vSol, anguloSolGraus );
        const hspTotalCorreto = ModuloPvUtils.calculateAreaHspModuloFvSol( this.getVector(), vSol, hspHorizontal );

        const hsp = hspTotalCorreto / hspTotalHorizontal * hspHorizontal;

        return hsp;
    }
}