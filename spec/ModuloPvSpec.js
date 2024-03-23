import { ModuloPv } from '../src/ModuloPv.js';

describe( 'Rotacoes', function() {
    it( 'Rotacionar corretamente em torno do eixo x', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R' );
        const v = moduloPv.rotateX( 90 );

        expect( v[0] ).toBeCloseTo( 1, 3 );
        expect( v[1] ).toBeCloseTo( 0, 3 );
        expect( v[2] ).toBeCloseTo( 2, 3 );
    });

    it( 'Rotacionar 90° por 4 vezes em torno do eixo x', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R' );
        moduloPv.rotateX( 90 );
        moduloPv.rotateX( 90 );
        moduloPv.rotateX( 90 );
        const v = moduloPv.rotateX( 90 );

        expect( v[0] ).toBeCloseTo( 1, 3 );
        expect( v[1] ).toBeCloseTo( 2, 3 );
        expect( v[2] ).toBeCloseTo( 0, 3 );
    });

    it( 'Rotacionar corretamente em torno do eixo y', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R' );
        const v = moduloPv.rotateY( 90 );
        expect( v[0] ).toBeCloseTo( 0, 3 );
        expect( v[1] ).toBeCloseTo( 2, 3 );
        expect( v[2] ).toBeCloseTo( -1, 3 );
    });

    it( 'Rotacionar corretamente em torno do eixo z', function() {
        const moduloPv = new ModuloPv( 1, 2, 'R' );
        const v = moduloPv.rotateZ( 90 );
        expect( v[0] ).toBeCloseTo( -2, 3 );
        expect( v[1] ).toBeCloseTo( 1, 3 );
        expect( v[2] ).toBeCloseTo( 0, 3 );
    });
});