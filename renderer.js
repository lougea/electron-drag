// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


 const { ipcRenderer } = require('electron')

 
document.getElementById('button-ipc').addEventListener('click', e => {
    ipcRenderer.send('channel1', `Msg from main window, valeur e : ${e}`)
 })

ipcRenderer.on('channel1-response', (e, args) => {
    console.log(args)
})
// const remote = require('electron').remote
// const { app, dialog, BrowserWindow, } = remote
// const button3 = document.getElementById('test-button')
// button3.addEventListener('click', e => {

  // dialog.showMessageBox({ message: 'Dialog invoked from Renderer process' })

//   let secWin = new BrowserWindow({
//     width: 600, height: 450
//   })
//   secWin.loadFile('index.html')

//   console.log( remote.getGlobal('myglob') )
//   let win = remote.getCurrentWindow()
//   win.maximize()

  // app.quit()

//   let win = remote.getCurrentWindow()
//   win.maximize()

// })

// const button2 = document.getElementById('button-quit')

// button2.addEventListener('click', e => {

    // dialog.showMessageBox({ message: 'Dialog invoked from Renderer process' })
  
  //   let secWin = new BrowserWindow({
  //     width: 600, height: 450
  //   })
  //   secWin.loadFile('index.html')
  
    // console.log( remote.getGlobal('myglob') )
  
    // app.quit()
  
  //   
  
//   })

const { dialog } = require('electron').remote
console.log(dialog)
