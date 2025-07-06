import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔎 *Ingresa el nombre de la canción o artista que deseas buscar.*`, m)
  }

  try {
    const search = await yts(text)
    const video = search?.videos?.[0]
    if (!video) {
      return conn.reply(m.chat, `❌ *No se encontraron resultados para:* "${text}"`, m)
    }

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const canal = author?.name || "Desconocido"
    const info = `
🎶 *${title}*
👤 *Canal:* ${canal}
👁️ *Vistas:* ${formatViews(views)}
⏱️ *Duración:* ${timestamp}
📅 *Publicado:* ${ago}
🔗 *Link:* ${url}
    `.trim()

    const thumb = (await conn.getFile(thumbnail))?.data

    await conn.sendMessage(m.chat, { text: info, contextInfo: {
      externalAdReply: {
        title: "🎧 Shizuka Music",
        body: "Tu descarga está en camino",
        mediaType: 1,
        previewType: 0,
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumb,
        renderLargerThumbnail: true,
      }
    }}, { quoted: m })

    // Intenta descargar desde múltiples APIs
    const audio = await intentarDescargaDesdeApis(url)
    if (!audio) throw new Error("Ninguna API pudo proporcionar el audio.")

    await conn.sendMessage(m.chat, {
      audio: { url: audio.url },
      fileName: `${title}.mp3`,
      mimetype: "audio/mpeg"
    }, { quoted: m })

  } catch (err) {
    console.error("💥 Error en play:", err)
    return conn.reply(m.chat, `⚠️ *No se pudo obtener el audio.*\n${err}`, m)
  }
}

handler.command = /^play$/i
handler.tags = ["descargas"]
handler.help = ["play <nombre o link de video>"]
export default handler

// 💾 Función para probar múltiples APIs en cascada
async function intentarDescargaDesdeApis(videoUrl) {
  const apis = [
    (url) => `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(url)}`,
    (url) => `https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`,
    (url) => `https://api.starlights.uk/api/downloader/youtube?url=${encodeURIComponent(url)}`,
    (url) => `https://apis-starlights-team.koyeb.app/starlight/youtube-mp3?url=${encodeURIComponent(url)}`,
    (url) => `https://api.lolhuman.xyz/api/ytaudio?apikey=b8d3bec7f13fa5231ba88431&url=${encodeURIComponent(url)}`,
    (url) => `https://api.ryzumi.vip/api/downloader/ytmp3?url=${encodeURIComponent(url)}`,
  ]

  for (const generarURL of apis) {
    try {
      const res = await fetch(generarURL(videoUrl))
      const json = await res.json()

      // Detectar estructura posible
      const link =
        json?.result?.download?.url ||  // Vreden
        json?.result?.link ||
        json?.result?.url ||
        json?.url ||
        json?.data?.url

      if (link && link.includes('http')) {
        return { url: link }
      }
    } catch (e) {
      console.warn(`🔁 API fallida, probando siguiente...`)
    }
  }

  return null
}

// 🔢 Formato de vistas
function formatViews(views) {
  if (!views) return "0"
  if (views >= 1e9) return (views / 1e9).toFixed(1) + "B"
  if (views >= 1e6) return (views / 1e6).toFixed(1) + "M"
  if (views >= 1e3) return (views / 1e3).toFixed(1) + "k"
  return views.toString()
}