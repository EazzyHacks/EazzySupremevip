let handler = async (m, { conn, text, command }) => {
  let id = text ? text : m.chat  
  let chat = global.db.data.chats[m.chat]
  
  chat.welcome = false

  await conn.reply(id, `🌸 eazzy suspira profundo y se despide con una reverencia…\n「Gracias por permitirme ser parte de su historia.」\n¡Hasta pronto, mis queridos! `) 
  await conn.groupLeave(id)

  try {  
    chat.welcome = true
  } catch (e) {
    await m.reply(`⚠️ eazzy ha tropezado en la niebla... pero se levantará con más elegancia 💫`) 
    return console.log(e)
  }
}

handler.command = ['salir', 'leavegc', 'salirdelgrupo', 'leave']
handler.group = true
handler.rowner = false

export default handler
