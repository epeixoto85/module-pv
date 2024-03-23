// index.js
import { ModuloPv } from './src/ModuloPv.js';

const moduloPv = new ModuloPv( 2, 1, 'R' );

console.log( moduloPv.rotateX( 90 ) );
console.log( moduloPv.saudacao('Usuário') );
console.log( moduloPv.soma(5, 3) );