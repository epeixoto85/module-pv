import { ModuloPvUtils } from "./ModuloPvUtils.js";

/**
 * @class
 */
export class ModuloPv {
    /**
     * @param {number} largura
     * @param {number} comprimento
     * @param {string} orientacao
     */
    constructor( largura, comprimento, orientacao ) {
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

        this.v = [ x, y, z ];
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
     * @param {number} anguloGraus 
     * @returns 
     */
    rotateX( anguloGraus ){
        //Converte o angulo para radiano.
        const anguloRadianos = ModuloPvUtils.convertDegreeToRadian( anguloGraus );

        const x = this.v[0];
        const y = this.v[1];
        const z = this.v[2];

        const moduloVetor = Math.sqrt( ( Math.pow( x, 2 ) + Math.pow( y, 2 ) + Math.pow( z, 2 ) ) );

        const xLinha = x;
        const yLinha = y * Math.cos( anguloRadianos ) - z * Math.sin( anguloRadianos );
        const zLinha = y * Math.sin( anguloRadianos ) + z * Math.cos( anguloRadianos );

        this.v = [ xLinha, yLinha, zLinha ];

        return this.v;
    }

    /**
     * Rotaciona o módulo fotovoltaico 'anguloGraus' graus em torno do eixo y.
     * @param {number} anguloGraus 
     * @returns 
     */
    rotateY( anguloGraus ){
        //Converte o angulo para radiano.
        const anguloRadianos = ModuloPvUtils.convertDegreeToRadian( anguloGraus );

        const x = this.v[0];
        const y = this.v[1];
        const z = this.v[2];

        const moduloVetor = Math.sqrt( ( Math.pow( x, 2 ) + Math.pow( y, 2 ) + Math.pow( z, 2 ) ) );

        const xLinha = +1 * x * Math.cos( anguloRadianos ) + z * Math.sin( anguloRadianos );
        const yLinha = +1 * y;
        const zLinha = -1 * x * Math.sin( anguloRadianos ) + z * Math.cos( anguloRadianos );

        this.v = [ xLinha, yLinha, zLinha ];

        return this.v;
    }

    /**
     * Rotaciona o módulo fotovoltaico 'anguloGraus' graus em torno do eixo z.
     * @param {number} anguloGraus 
     * @returns 
     */
    rotateZ( anguloGraus ){
        //Converte o angulo para radiano.
        const anguloRadianos = ModuloPvUtils.convertDegreeToRadian( anguloGraus );

        const x = this.v[0];
        const y = this.v[1];
        const z = this.v[2];

        const moduloVetor = Math.sqrt( ( Math.pow( x, 2 ) + Math.pow( y, 2 ) + Math.pow( z, 2 ) ) );

        const xLinha = +1 * x * Math.cos( anguloRadianos ) - y * Math.sin( anguloRadianos );
        const yLinha = +1 * x * Math.sin( anguloRadianos ) + y * Math.cos( anguloRadianos );
        const zLinha = +1 * z;

        this.v = [ xLinha, yLinha, zLinha ];

        return this.v;
    }
}