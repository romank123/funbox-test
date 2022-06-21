// Use source styles directly in Pug
//import '../sass/style.sass'

import './test'
import { importAll } from './functions'

// Use source media directly in SASS and in Pug.
// DON'T import all media from public
// importAll(
//   require.context(
//     '../../public',
//     true,
//     /\.(png|svg|jpg|jpe?g|gif|mov|mp4|ico|webmanifest|xml)$/
//   )
// )

console.log('hello from app.js')
