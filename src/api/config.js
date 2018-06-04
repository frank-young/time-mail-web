let serverPath = ''

if (process.env.NODE_ENV === 'production') {
  serverPath = 'https://time-mail.nanafly.com/api/'
} else {
  // serverPath = 'https://time-mail.nanafly.com/api/'
  serverPath = 'http://127.0.0.1:9999/api/'
}

export default serverPath
