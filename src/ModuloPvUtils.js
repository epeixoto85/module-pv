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

        //Para fins de simplificacao, cada mes foi considerado como equivalendo a um deslocamento de 
        //30 graus. Dessa forma, em 12 meses, teremos um deslocamento de 360 graus, ou 2*PI radianos.
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

    /**
     * Retorna um novo vetor, rotacionando em torno do eixo x.
     * @param {number[]} v Vetor a ser rotacionado.
     * @param {number} anguloGraus Angulo de rotacao. 
     * @returns 
     */
    static rotateVectorAxisX( v, anguloGraus ){
        //Converte o angulo para radiano.
        const anguloRadianos = ModuloPvUtils.convertDegreeToRadian( anguloGraus );

        const x = v[0];
        const y = v[1];
        const z = v[2];

        const moduloVetor = ModuloPvUtils.moduleVector( v );

        const xLinha = x;
        const yLinha = y * Math.cos( anguloRadianos ) - z * Math.sin( anguloRadianos );
        const zLinha = y * Math.sin( anguloRadianos ) + z * Math.cos( anguloRadianos );

        const vRotate = [ xLinha, yLinha, zLinha ];

        return vRotate;
    }

    /**
     * Retorna um novo vetor, rotacionando em torno do eixo y.
     * @param {number[]} v Vetor a ser rotacionado.
     * @param {number} anguloGraus Angulo de rotacao. 
     * @returns 
     */
    static rotateVectorAxisY( v, anguloGraus ){
        //Converte o angulo para radiano.
        const anguloRadianos = ModuloPvUtils.convertDegreeToRadian( anguloGraus );

        const x = v[0];
        const y = v[1];
        const z = v[2];

        const moduloVetor = ModuloPvUtils.moduleVector( v );

        const xLinha = +1 * x * Math.cos( anguloRadianos ) + z * Math.sin( anguloRadianos );
        const yLinha = +1 * y;
        const zLinha = -1 * x * Math.sin( anguloRadianos ) + z * Math.cos( anguloRadianos );

        const vRotate = [ xLinha, yLinha, zLinha ];

        return vRotate;
    }

    /**
     * Retorna um novo vetor, rotacionando em torno do eixo z.
     * @param {number[]} v Vetor a ser rotacionado.
     * @param {number} anguloGraus Angulo de rotacao. 
     * @returns 
     */
    static rotateVectorAxisZ( v, anguloGraus ){
        //Converte o angulo para radiano.
        const anguloRadianos = ModuloPvUtils.convertDegreeToRadian( anguloGraus );

        const x = v[0];
        const y = v[1];
        const z = v[2];

        const moduloVetor = ModuloPvUtils.moduleVector( v );

        const xLinha = +1 * x * Math.cos( anguloRadianos ) - y * Math.sin( anguloRadianos );
        const yLinha = +1 * x * Math.sin( anguloRadianos ) + y * Math.cos( anguloRadianos );
        const zLinha = +1 * z;

        const vRotate = [ xLinha, yLinha, zLinha ];

        return vRotate;
    }

    /**
     * Retorna o módulo do vetor de três dimensões.
     * @param {number[]} v
     */
    static moduleVector( v ){
        const x = v[0];
        const y = v[1];
        const z = v[2];

        return Math.sqrt( ( Math.pow( x, 2 ) + Math.pow( y, 2 ) + Math.pow( z, 2 ) ) );
    }

    /**
     * Calcula o ângulo, em graus, aparente do Sol em relação à Terra.
     * @param {number} mes Numero do mes, sendo 1 para janeiro.
     */
    static calculaAnguloSolGraus( mes ){
        //Ajusta o mes, para que setembro vire o mes 0, outubro vire 1, ..., agosto 11.
        const mesAjustado = (mes + 3) % 12;

        //Angulo da posicao do Sol na ecliptica, considerando que a cada mês, percorre-se 30 graus.
        const anguloEcliptica = mesAjustado * ( Math.PI / 6 );

        let anguloSol = 23.5 * Math.sin( anguloEcliptica );

        return anguloSol;
    }

    /**
     * Calcula o ângulo, em radiano, entre dois vetores.
     * @param {number[]} v1 Vetor 1
     * @param {number[]} v2 Vetor 2
     */
    static calculaAnguloRadianoEntreDoisVetores( v1, v2 ){
        const size = v1.length;

        //Calcula o produto escalar entre os vetores.
        let produtoEscalar = 0;

        for( let i = 0; i < size; i++ ){
            produtoEscalar += v1[i] * v2[i];
        }

        //Calcula os modulos dos vetores.
        const modV1 = ModuloPvUtils.moduleVector( v1 );
        const modV2 = ModuloPvUtils.moduleVector( v2 );

        //Calculo o produto dos modulos dos vetores.
        const produtoModulos = modV1 * modV2;

        const angulo = Math.acos( produtoEscalar / produtoModulos ) ;

        return angulo;
    }

    /**
     * Calcula o ângulo, em graus, do Sol a depender do horário do dia, no eixo Leste-Oeste.
     * @param {number} hr Horario do dia.
     */
    static calculaAnguloGrausSolLesteOesteHora( hr ){
        const deltaAngGrausHora = 360 / 24;

        const angLesteOeste = deltaAngGrausHora * hr - 180;

        return angLesteOeste;
    }

    /**
     * 
     * @param {number[]} vModuloFv
     * @param {number[]} vSol
     * @param {number} hspPadrao
     * @returns 
     */
    static calculateAreaHspModuloFvSol( vModuloFv, vSol, hspPadrao ){
        //Itera de hora em hora, alterando a posicao do Sol no eixo x, Leste-Oeste,
        //sendo que às 6 horas da manhã, equivale a um ângulo de -90°, 12h equivale a 0°, 18 horas da tarde a +90°
        const hrInicial = 7;
        const hrFinal   = 17;
        const qtHoras = hrFinal - hrInicial + 1;
        const deltaAngGrausHora = 360 / 24;
        let hr = hrInicial;
        let areaTotalModuloFvSol = 0;

        //Calcula qual deve ser o ângulo inicial do Sol.
        const angInicialLesteOesteGraus = ModuloPvUtils.calculaAnguloGrausSolLesteOesteHora( hr );

        //Rotaciona o Sol em torno do eixo y, para posicioná-lo no ângulo correto.
        vSol = ModuloPvUtils.rotateVectorAxisY( vSol, angInicialLesteOesteGraus );

        do{
            //Calcula o angulo entre o vetor do modulo e do Sol.
            const angRadVetoresModuloFvSol = ModuloPvUtils.calculaAnguloRadianoEntreDoisVetores( vModuloFv, vSol );

            //Calcula o seno do angulo entre os vetores.
            const hspHorario = Math.sin( angRadVetoresModuloFvSol ) * hspPadrao;

            //Incrementa o hsp total.
            areaTotalModuloFvSol += hspHorario;

            //Rotaciona o Sol em torno do eixo y, para avançá-lo 1 hora.
            vSol = ModuloPvUtils.rotateVectorAxisY( vSol, deltaAngGrausHora );

            //Incrementa a hora.
            hr++;
        }
        while( hr <= hrFinal );

        return areaTotalModuloFvSol;
    }
}