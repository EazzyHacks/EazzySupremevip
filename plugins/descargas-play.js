import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
  const text = args.join(" ").trim();
  if (!text) {
    return conn.reply(
      m.chat,
      `🔍 *¿Qué deseas escuchar en YouTube?*\n\n📌 Uso: *${usedPrefix + command} nombre de canción/artista*`,
      m
    );
  }

  // Mensaje de búsqueda (opcional: puedes quitar esto si aún te da problemas de preview)
  await conn.sendMessage(m.chat, {
    text: `🔎 *Buscando en YouTube...*\n🎬 Espera mientras encuentro la canción *${text}*`
  }, { quoted: m });

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.result?.downloadUrl) {
      return conn.reply(m.chat, `❌ *No encontré resultados en YouTube para:* "${text}"`, m);
    }

    const { title, artist, duration, cover } = json.result.metadata;
    const audio = json.result.downloadUrl;

    const caption = `
🎶 *${title}*
📺 *Canal:* ${artist}
⏱️ *Duración:* ${duration}
🔗 *YouTube:* https://youtube.com

✅ Audio listo. ¡Disfrútalo! 🔊
`.trim();

    // ✅ Enviar portada con detalles, sin externalAdReply
    await conn.sendMessage(m.chat, {
      image: { url: cover },
      caption: caption
    }, { quoted: m });

    // 🎧 Enviar el audio MP3
    await conn.sendMessage(m.chat, {
      audio: { url: audio },
      fileName: `${title}.mp3`,
      mimetype: "audio/mp4",
      ptt: false
    }, { quoted: m });

  } catch (e) {
    console.error("⚠️ Error al procesar YouTube:", e);
    return conn.reply(m.chat, `❌ *Error al obtener el audio desde YouTube.*\n\n🛠️ ${e.message}`, m);
  }
};

handler.command = /^play$/i;
handler.tags = ['descargas'];
handler.help = ['play <nombre de canción/artista>'];
export default handler;