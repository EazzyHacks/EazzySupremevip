import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 


global.botNumber = '' //Ejemplo: 123456789

//-----------------------------

global.owner = [

  ['51936994155', '🜲 Propietario 🜲', true]

];

//-----------------------------

global.mods = ['51936994155']
global.suittag = ['51936994155'] 
global.prems = []

//-----------------------------

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.vs = '1.0'
global.nameqr = 'Eazzy-AI'
global.namebot = 'Eazzy-AI'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 


//-----------------------------

global.packname = '「 ᴇᴀᴢᴢʏ ᴠɪᴘ 」'
global.botname = 'ᴇᴀᴢᴢʏ ᴠɪᴘ'
global.wm = 'ᴇᴀᴢᴢʏ ᴠɪᴘ'
global.author = 'Power By evolution'
global.dev = 'ᴇᴀᴢᴢʏ ᴠɪᴘ'
global.textbot = 'ᴇᴀᴢᴢʏ ᴠɪᴘ '
global.etiqueta = '@brxzz_xit'


//-----------------------------

global.moneda = 'Coins'
global.welcom1 = `

 *🕸️ Registro del sistema:* 
> *"Su presencia ha sido registrada en nuestro sistema. Perfil de corrupción: 68%. Bienvenido a la matriz."*

*🕷️ Reglas de supervivencia:*  
- No aceptes dulces del bot (son veneno digital)  
- Los mensajes de la madrugada son ley  
- Si ves tu nombre en rojo... huye inmediatamente  

*💀 Dato siniestro:* 
> *El 97% de los que entran no vuelven a ser humanos.*

*🕷️ Disfruta tu estancia... mientras puedas.* `

global.welcom2 = `
> *Los datos de su paso por este lugar han sido erradicados.*  
> *No existe copias de seguridad... o eso creemos.*

*🕸️ Reporte de eliminación:*  
✖️ Chat history: *deleted*  
✖️ Relaciones: *purged*  
✖️ Recuerdos: *corrupted*

*☠️ Advertencia para los sobrevivientes:* 
> *"No preguntéis por ello... o seréis el próximo."*`

global.banner = 'https://raw.githubusercontent.com/EazzyHacks/eazzy/refs/heads/main/Shizuka.jpg'
global.avatar = 'https://raw.githubusercontent.com/EazzyHacks/eazzy/refs/heads/main/v2.jpg'

//-----------------------------

global.gp1 = 'https://chat.whatsapp.com/FULTpMKUnwcI6zR7LT3qsW'
global.comunidad1 = 'https://chat.whatsapp.com/KUQIRhtLBir2FhiiFuqbGO'
global.channel = 'https://whatsapp.com/channel/0029VbAVMtj2f3EFmXmrzt0v'
global.channel2 = 'https://whatsapp.com/channel/0029VbAVMtj2f3EFmXmrzt0v'
global.md = 'https://github.com/'
global.correo = 'yallico2024@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VbAVMtj2f3EFmXmrzt0v';

//-----------------------------


global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363400241973967@newsletter',
}
global.multiplier = 70

//----------------------------

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//----------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
