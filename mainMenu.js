module.exports = [    
    
    {   label:'Tappable-Electron',
        submenu: [
         { label: 'Item 1' },
         { label: 'Item 2' ,submenu: [ {label: "subItem 3"}] },
         { label: 'Item 3' },
         { label: 'Item 4' },
        ]  
    },
    {
        label: 'Actions',
        submenu:  [
         { label: 'Action 1' },
         {label:'DevTools', role :'toggleDevTools' },
         { label: 'Action 2', click: () => {console.log('action from Main Menu')}, 
           accelerator : 'Alt+G'
        },

        ]
    }
]

  
  
  /* let mainMenu = new Menu()
     let menuItem1 = new MenuItem({
       label:'Tappable-Electron',       submenu: [
       { label: 'Item 1' },
        { label: 'Item 2' ,submenu: [ {label: "subItem 3"}] },
        { label: 'Item 3' },
       { label: 'Item 4' },
  ]}) */
  //   mainMenu.append(menuItem1)