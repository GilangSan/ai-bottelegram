const telegramBot = require('node-telegram-bot-api')
const token = process.env.TOKEN || '6540760864:AAGaSYsP5U903vlqKfXyPmhNXMwocT5Nlrk'
const options = {
  polling: true
}

const conn = new telegramBot(token, options)
console.log('Bot Online')

conn.onText(/\/start/, (m) => {
  let from = m.from.id
  conn.sendMessage(from, 'Halo! Aku adalah ai Telegram bot yang diprogram oleh Lang, silahkan katakan apapun, aku akan membalasnya.')
});

conn.on("message", async(m) => {
  console.log(`\nReceive Message:\nFrom: ${m.from.username}\nText: ${m.text}`)
  let from = m.from.id 
  let api = await fetch(`https://aemt.me/gpt4?text=${m.text}`)
  let { status, result } = await api.json()
  if(!status) return conn.sendMessage(from, 'Maaf terjadi error di sisi server.')
  conn.sendMessage(from, result)
})