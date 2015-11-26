"use strict";

var pressedKeys={};

var stage;
var renderer;
var width=800;
var height=500;
var resources;
var bola={};

function mainLoop(t)
{     
    //Inicializar el timer para que haga el siguiente llamado al
    //main loop en el momento correcto
    requestAnimationFrame(mainLoop);
    

    //Dibujar en el renderer el estado actual de stage
    renderer.render(stage);
}


function initGame()
{            
    //Creamos la bola
    bola.spr=new PIXI.Sprite(resources.bola.texture);
    stage.addChild(bola.spr);    
    
    
    //Bindeamos los eventos del teclado para mantener
    //un objeto con el estado de las teclas
    //http://keycode.info/
    document.onkeydown=function(e) {pressedKeys[e.keyCode] = true;};
    document.onkeyup=function(e) {delete pressedKeys[e.keyCode];};
}

//For local testing, enable x-requests
//In Chrome: --disable-web-security
function initLoader()
{
    PIXI.loader.add('bola', 'img/bola.png');
    PIXI.loader.add('paleta', 'img/paleta.png');
    
    PIXI.loader.load(function (loader, res)
    {
        resources=res;
        
        initGame();
        mainLoop();
    });
   
}


function initLagashPong()
{
    //Inicializar el renderer (Webgl si es posible, sino fallback a canvas)    
	renderer = new PIXI.autoDetectRenderer(width, height);
    renderer.backgroundColor=0;
    
    //Crear un nuevo "stage" (Nodo root para el arbol de dibujado)
 	stage = new PIXI.Container();
    
    //Agregar el renderer al DOM del document.
	document.body.appendChild(renderer.view);
    
    initLoader();
}
    
