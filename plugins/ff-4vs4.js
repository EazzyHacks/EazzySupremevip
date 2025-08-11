import pkg from '@whiskeysockets/baileys';
const { proto } = pkg;

let listasGrupos = new Map();
let mensajesGrupos = new Map();

const getListasGrupo = (groupId) => {
  if (!listasGrupos.has(groupId)) {
    listasGrupos.set(groupId, {
      squad1: ['➤', '➤', '➤', '➤'],
      suplente: ['➤', '➤', '➤', '➤']
    });
  }
  return listasGrupos.get(groupId);
};

const reiniciarListas = (groupId) => {
  listasGrupos.set(groupId, {
    squad1: ['➤', '➤', '➤', '➤'],
    suplente: ['➤', '➤', '➤', '➤']
  });
};

let processedMessages = new Set();

const handler = async (m, { conn }) => {
  const groupId = m.chat;

  if (m.message?.buttonsResponseMessage) {
    // Procesar respuesta a botón
    if (processedMessages.has(m.key.id)) return; // evitar duplicados
    processedMessages.add(m.key.id);

    const id = m.message.buttonsResponseMessage.selectedButtonId;
    let listas = getListasGrupo(groupId);
    const numero = m.sender.split('@')[0];
    const nombreUsuario = m.pushName || numero;
    const tag = m.sender;

    // Limpiar participaciones anteriores
    ['squad1', 'suplente'].forEach(key => {
      const index = listas[key].findIndex(p => p.includes(`@${nombreUsuario}`));
      if (index !== -1) listas[key][index] = '➤';
    });

    const squadType = id === 'asistir' ? 'squad1' : 'suplente';
    const libre = listas[squadType].findIndex(p => p === '➤');

    if (libre !== -1) {
      listas[squadType][libre] = `@${nombreUsuario}`;
      await conn.sendMessage(groupId, {
        text: `✅ @${nombreUsuario} agregado a ${id === 'asistir' ? 'Asistencia' : 'Suplente'}`,
        mentions: [tag]
      });
    } else {
      await conn.sendMessage(groupId, {
        text: `⚠️ ${id === 'asistir' ? 'Asistencia' : 'Suplente'} está llena`,
        mentions: [tag]
      });
    }

    const mensajeGuardado = mensajesGrupos.get(groupId) || '';
    await mostrarLista(conn, groupId, listas, [tag], mensajeGuardado);
    return;
  }

  // Procesar comando .4vs4
  if (!m.text?.toLowerCase().startsWith('.4vs4')) return;

  const mensaje = m.text.substring(6).trim();
  if (!mensaje) {
    await conn.sendMessage(groupId, {
      text: `🕓 𝗜𝗡𝗚𝗥𝗘𝗦𝗔 𝗨𝗡 𝗛𝗢𝗥𝗔𝗥𝗜𝗢.\nEjemplo:\n.4vs4 4pm🇪🇨/3pm🇲🇽`
    });
    return;
  }

  reiniciarListas(groupId);
  let listas = getListasGrupo(groupId);
  mensajesGrupos.set(groupId, mensaje);
  await mostrarLista(conn, groupId, listas, [], mensaje);
};

async function mostrarLista(conn, chat, listas, mentions = [], mensajeUsuario = '') {
  const texto = `🕓 𝗛𝗢𝗥𝗔: ${mensajeUsuario ? mensajeUsuario + '\n' : ''}
📑 𝗥𝗘𝗚𝗟𝗔𝗦: 𝗖𝗟𝗜𝗖𝗞

╭──────⚔──────╮
4 𝗩𝗘𝗥𝗦𝗨𝗦 4
╰──────⚔──────╯
╭─────────────╮
│ 𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔
│👑 ${listas.squad1[0]}
│🥷🏻 ${listas.squad1[1]}
│🥷🏻 ${listas.squad1[2]}
│🥷🏻 ${listas.squad1[3]}
╰─────────────╯
╭─────────────╮
│ 𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦
│🥷🏻 ${listas.suplente[0]}
│🥷🏻 ${listas.suplente[1]}
│🥷🏻 ${listas.suplente[2]}
│🥷🏻 ${listas.suplente[3]}
╰─────────────╯
©EliteBotGlobal 2023`;

  const buttons = [
    { buttonId: 'asistir', buttonText: { displayText: 'Asistir' }, type: 1 },
    { buttonId: 'suplente', buttonText: { displayText: 'Suplente' }, type: 1 },
  ];

  const buttonMessage = {
    text: texto,
    footer: 'Selecciona una opción:',
    buttons: buttons,
    headerType: 1
  };

  await conn.sendMessage(chat, buttonMessage, { mentions });
}

handler.command = /^4vs4$/i;
handler.group = true;

export default handler;
