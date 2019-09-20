const { app, BrowserWindow, dialog , globalShortcut, Menu, ipcMain } = require('electron')

global['myglob'] = 'Variable déclarée in main.js'
/// Tray
// function createTray() {
//   tray = new tray('trayTemplate@2x.jpg')
// }

ipcMain.on('channel1',(e,args) => {
  console.log(args)
  e.sender.send('channel1-response', 'Message Received on "Channel1' )
})

/// Créer le Menu du navigateur
let mainMenu = Menu.buildFromTemplate(require('./mainMenu'))

// Créer menu click/droit:
let contextMenu = Menu.buildFromTemplate([  
  {label:'DevTools', role :'toggleDevTools' },
,]) 


/// Créer la/les fenetre du navigateur ///
function createWindow () {
  // createTray()
  let win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
    Menu.setApplicationMenu(mainMenu)
    win.webContents.on('context-menu', e => {
      contextMenu.popup()
    })

  // let wintwo = new BrowserWindow({
  //   width: 400,
  //   height: 200,
  //   parent: win,
  //   modal: true,
  //   frame: false, 
  //   titleBarStyle: 'hidden',
  //   hasShadow : true,
  //   defaultFontFamily: 'cursive',
  //   webPreferences: {
  //       nodeIntegration: true 
  //     },
  // })


/// Exemple & manipulation  ///

    // setTimeout( () => {
    //      wintwo.show()
    //      setTimeout(() => {
    //       wintwo.close() 
    //       wintwo = null
    //         },1000) 
    // },1000)

/// Load the index.html of the app : ///

    win.loadFile('index.html')

    // wintwo.loadFile('indextwo.html')

    // win.loadURL('https://google.com')

    // console.log(win.isVisible())
    
    // console.log(win.isKiosk())

    // console.log(BrowserWindow.getAllWindows())

    /* wintwo.on('browser-window-blur', e => {
         console.log("Pas de focus sur la deuxième principale")
     }) */

    /* wintwo.on('closed', () => {
        win.maximize()
        }) */

    /* win.on('move', () => {
     let myNotification = new Notification('Tappable', {
     body: 'Tu viens de bouger la fenêtre :o'
    }) */

    /* myNotification.onclick = () => {
      console.log('Notification clicked')
     } 
    }), */
    

/// Web content ///
    
    let wc = win.webContents
    console.log(wc)
    wc.on('did-finish-load', ()=> {
    console.log('content fully loaded')
    })

    /* wc.on('before-input-event',(e,input) => {
        console.log(e)
        console.log(`${input.key} : ${input.type}`)
    }) */

    //   win.webContents.openDevTools();

    wc.on('media-started-playing',() => {
    console.log('video Started')
    })

    wc.on('media-paused',() => {
    console.log('video en pause')
    })

    wc.on('context-menu',(e, params) => { 
    console.log(`${params.mediaType} at x:${params.x} adn y:${params.y}`)
    })  // right click

    // wc.on('context-menu', (e, params) => {
    // let selectedText = params.selectionText
    // wc.executeJavaScript(`alert("${selectedText}")`)
    // })

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

const options = {
    type: 'question',
    buttons: ['?', 'Oui', 'No'],
    defaultId: 2,
    title: 'Petite question',
    message: 'As tu aimé la blanquette ?',
    detail: 'Petite aide : OSS 117',
    checkboxLabel: 'Remember my answer',
    checkboxChecked: true,
  };
  
app.on('ready', () => {
      ////// Register a 'CommandOrControl+X' shortcut listener.
    const ret = globalShortcut.register('CommandOrControl+A', () => {
        // boite de dialogue
        dialog.showMessageBox(null, options, (response, checkboxChecked) => {
          console.log(response);
          console.log(checkboxChecked);
        });
    
      })
      if (!ret) {
        console.log('registration failed')
      }

    createWindow()
})

/////// globalShortcut
