import { ModuloPv } from '../src/ModuloPv.js';

describe( 'Rotacoes', function() {
    it( 'Rotacionar corretamente em torno do eixo x', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', 0, 0, 0 );
        const v = moduloPv.rotateX( 90 );

        expect( v[0] ).toBeCloseTo( 1, 3 );
        expect( v[1] ).toBeCloseTo( 0, 3 );
        expect( v[2] ).toBeCloseTo( 2, 3 );
    });

    it( 'Rotacionar 90° por 4 vezes em torno do eixo x', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', 0, 0, 0 );
        moduloPv.rotateX( 90 );
        moduloPv.rotateX( 90 );
        moduloPv.rotateX( 90 );
        const v = moduloPv.rotateX( 90 );

        expect( v[0] ).toBeCloseTo( 1, 3 );
        expect( v[1] ).toBeCloseTo( 2, 3 );
        expect( v[2] ).toBeCloseTo( 0, 3 );
    });

    it( 'Modulo localizado em latitude de 18º Sul, rotacionado em 18º par o Norte.', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', 0, 0, -18 );
        const v = moduloPv.rotateX( -18 );

        expect( v[0] ).toBeCloseTo( 1.0, 1 );
        expect( v[1] ).toBeCloseTo( 2.0, 1 );
        expect( v[2] ).toBeCloseTo( 0.0, 1 );
    });

    it( 'Rotacionar corretamente em torno do eixo y', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', 0, 0, 0 );
        const v = moduloPv.rotateY( 90 );
        expect( v[0] ).toBeCloseTo( 0, 3 );
        expect( v[1] ).toBeCloseTo( 2, 3 );
        expect( v[2] ).toBeCloseTo( -1, 3 );
    });

    it( 'Rotacionar corretamente em torno do eixo z', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', 0, 0, 0 );
        const v = moduloPv.rotateZ( 90 );
        expect( v[0] ).toBeCloseTo( -2, 3 );
        expect( v[1] ).toBeCloseTo( 1, 3 );
        expect( v[2] ).toBeCloseTo( 0, 3 );
    });
});

describe( 'HSP', function() {
    it( 'Simula HSP de março para modulo localizado na latitude 0 graus', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', 0, 0, 0 );
        const hsp = moduloPv.simulateHsp( 3, 5 );

        expect( hsp ).toBeCloseTo( 5.00, 2 );
    });

    it( 'Simula HSP de março para modulo localizado na latitude 18 graus', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', -18, 0, -18 );
        const hsp = moduloPv.simulateHsp( 3, 5 );

        expect( hsp ).toBeGreaterThan( 5.00 );
    });

    it( 'Simula HSP de março para modulo localizado na latitude 30 graus', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', -18, 0, -30 );
        const hsp = moduloPv.simulateHsp( 3, 5 );

        expect( hsp ).toBeGreaterThan( 5.00 );
    });

    it( 'Simula HSP de junho para modulo na horizontal localizado na latitude 18 graus', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', 0, 0, -18 );
        const hsp = moduloPv.simulateHsp( 6, 5 );

        expect( hsp ).toBeCloseTo( 5.00 );
    });

    it( 'Simula HSP de junho para modulo inclinado localizado na latitude 18 graus', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', -18, 0, -18 );
        const hsp = moduloPv.simulateHsp( 6, 5 );

        expect( hsp ).toBeGreaterThan( 5.00 );
    });

    it( 'Simula HSP de setembro para modulo localizado na latitude 0 grau', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', 0, 0, 0 );
        const hsp = moduloPv.simulateHsp( 9, 5 );

        expect( hsp ).toBeCloseTo( 5.00, 2 );
    });

    it( 'Simula HSP de setembro para modulo inclinado ao Sul localizado na latitude 17 graus Sul', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', +10, 0, -17 );
        const hsp = moduloPv.simulateHsp( 9, 5 );

        expect( hsp ).toBeLessThan( 5.00 );
    });

    it( 'Simula HSP de setembro para modulo inclinado ao Norte localizado na latitude 17 graus Sul', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R', -10, 0, -17 );
        const hsp = moduloPv.simulateHsp( 9, 5 );

        expect( hsp ).toBeGreaterThan( 5.00 );
    });
});
