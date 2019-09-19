const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cree la/les fenetre du navigateur.
  let win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  let wintwo = new BrowserWindow({
    width: 400,
    height: 200,
    parent: win,
    modal: true,
    frame: false, 
    titleBarStyle: 'hidden',
    hasShadow : true,
    defaultFontFamily: 'cursive',
    webPreferences: {
        nodeIntegration: true 
      },
  })


/// Exemple & manipulation

setTimeout( () => {
      wintwo.show()
      setTimeout(() => {
          wintwo.close() 
          wintwo = null
      },2000) 
  },1000)
  // and load the index.html of the app.
win.loadFile('index.html')

// win.loadURL('https://google.com')
wintwo.loadFile('indextwo.html')
// wintwo.on('browser-window-blur', e => {
//     console.log("Pas de focus sur la deuxième principale")
// })
// wintwo.on('closed', () => {
//     win.maximize()
// })
// console.log(win.isVisible())
// console.log(win.isKiosk())
// console.log(BrowserWindow.getAllWindows())
// win.on('move', () => {
// let myNotification = new Notification('Tappable', {
//   body: 'Tu viens de bouger la fenêtre :o'
// })

// myNotification.onclick = () => {
//   console.log('Notification clicked')
// }

// }),
//   win.webContents.openDevTools();
///////////// Web content
let wc = win.webContents
console.log(wc)
wc.on('did-finish-load', ()=> {
    console.log('content fully loaded')
})

// wc.on('before-input-event',(e,input) => {
//     // console.log(e)
//     console.log(`${input.key} : ${input.type}`)
// })

wc.on('media-started-playing',() => {
    console.log('video Started')
})

wc.on('media-paused',() => {
    console.log('video en pause')
})

wc.on('context-menu',(e, params) => { 
    console.log(`${params.mediaType} at x:${params.x} adn y:${params.y}`)
})  // right click

wc.on('context-menu', (e, params) => {
    let selectedText = params.selectionText
    wc.executeJavaScript(`alert("${selectedText}")`)
})

let ses = wc.session
console.log(ses)

ses.on('will-download', (e,downloadItem, webContents) => {
    let fileName = downloadItem.getFilename()
    let fileSize = downloadItem.getTotalBytes()

    downloadItem.setSavePath(app.getPath("desktop") + `/${fileName}`)

    downloadItem.on('updated',(e,state) => {
        let received = downloadItem.getReceivedBytes()
        if (state === 'progressing' && received) {
            let progress = Math.round((received/fileSize)*100)
            console.log(progress)
            webContents.executeJavaScript(`window.progress.value = ${progress}`)
        }
    })

    downloadItem.on('done', () => {
        wc.executeJavaScript(`alert("${fileName} was download" )`)
    })
})

}

/////////////////////// app .on
// app.on('browser-window-focus', e => {
//     console.log("focus")
// })

app.on('ready', () => {
    createWindow()
})

