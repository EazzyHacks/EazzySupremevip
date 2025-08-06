const handler = async (m, { conn, args }) => {
  const autor = m.sender;
  const mencionado = m.mentionedJid?.[0];

  // 📱 Detectar número en args
  let numeroDetectado = null;
  if (!mencionado && args[0]) {
    const numeroLimpio = args[0].replace(/\D/g, ''); // Elimina todo excepto dígitos
    if (numeroLimpio.length >= 8) {
      numeroDetectado = `${numeroLimpio}@s.whatsapp.net`;
    }
  }

  // 🎯 Determinar objetivo
  const objetivo = mencionado || numeroDetectado || autor;
  const nombre = `@${objetivo.split('@')[0]}`;

  // 🎬 Lista de GIFs
  const gifs = [
    'https://qu.ax/LWYRz.mp4',
    'https://qu.ax/CsSGd.mp4',
    'https://qu.ax/TagRD.mp4',
    'https://qu.ax/ykoPB.mp4',
    'https://qu.ax/bTpKK.mp4'
  ];

  // 🗯️ Lista de frases
  const frases = [
    `😈 Le acabo de romper los huevos a ${nombre}`,
    `💀 ${nombre} ya no podrá reproducirse jamás`,
    `🔥 El linaje de ${nombre} ha sido interrumpido`,
    `🥚💥 ${nombre} recibió el golpe ancestral`,
    `🧨 ${nombre} ha sido neutralizado con precisión testicular`,
    `👹 ${nombre} sintió el poder del rompehuevos`,
    `⚔️ ${nombre} fue víctima del ataque más bajo... literalmente`,
    `🎯 ${nombre} recibió un golpe directo a la descendencia`
  ];

  // Selección aleatoria
  const gifUrl = gifs[Math.floor(Math.random() * gifs.length)];
  const frase = frases[Math.floor(Math.random() * frases.length)];

  // Primer mensaje: solo texto
  await conn.sendMessage(m.chat, {
    text: `🥚💥 ${nombre}, esto te dolerá...`,
    mentions: [objetivo]
  });

  // Segundo mensaje: GIF + frase
  await conn.sendMessage(m.chat, {
    video: { url: gifUrl },
    gifPlayback: true,
    caption: frase,
    mentions: [objetivo]
  });
};

handler.command = ['rompehuevos'];
handler.register = true;

export default handler;