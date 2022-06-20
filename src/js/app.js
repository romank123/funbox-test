import '../sass/style.sass'
import './test'
import { importAll } from './functions'

// import all media from public
importAll(
  require.context(
    '../../public',
    true,
    /\.(png|svg|jpg|jpe?g|gif|mov|mp4|ico|webmanifest|xml)$/
  )
)

console.log('hello from app.js')
