import 'pixi.js';
import TheBall from './ball';

var WebFont = require('webfontloader');

WebFont.load({
  google: {
    families: ['Francois One']
  },
  active: function() {
   	init();
  }
});



let app = new PIXI.Application({transparent: true,width: window.innerWidth,height:window.innerWidth});
document.body.appendChild(app.view);


let container = new PIXI.Container();
app.stage.addChild(container);




function init() {
  let count = 0;



  let els = document.querySelectorAll('.letter');
  let elsArray = Array.from(els);
  console.log(els,elsArray);


  let balls = [];
  let letters = [];

  let layers = new﻿ Array(4).fill().map(x => new PIXI.Container());
  layers[3].blendMode = 2;
  layers.forEach(l => {
  	container.addChild(l);
  });
  
  function drawLetter(text,coords,color,balls,containers, power, layerStackNumber,fontsize,rotation) {
  	let temp = new PIXI.Container();
  	let letter = new PIXI.Text(text,{fontFamily : 'Francois One', fontSize: fontsize, fill : color, align : 'center'});
  	letter.position.x = coords.x;
  	letter.position.y = coords.y;
  	if(rotation) letter.rotation = rotation;
  	if(layerStackNumber===3) letter.blendMode = 2;
  	temp.addChild(letter);
  	layers[layerStackNumber].addChild(temp);

  	balls.push(
  		new TheBall(coords.x + coords.width/2,coords.y + coords.height/2, power)
  	);
  	containers.push(temp);
  }
  

  elsArray.forEach(l => {
  	let coords = l.getBoundingClientRect();

  	drawLetter(l.innerText,coords,0x03aaea,balls,letters,3,0,104);
  	drawLetter(l.innerText,coords,0xf9ed00,balls,letters,5,1,104);
  	drawLetter(l.innerText,coords,0xe80289,balls,letters,4,2,104);
  	drawLetter(l.innerText,coords,0x03aaea,balls,letters,3,3,104);


  	
  });


  // random smileys
  for (var i = 100; i>0; i--) {
  	let coords = {
  		x: Math.random()*window.innerWidth,
  		y: Math.random()*window.innerHeight,
  		width: Math.random()*40 + 10,
  		height: Math.random()*40 + 10,
  	};
  	let randomRotation = 3*Math.random();
  	drawLetter(';-)',coords,0x03aaea,balls,letters,3,0,coords.width,randomRotation);
  	drawLetter(';-)',coords,0xf9ed00,balls,letters,5,0,coords.width,randomRotation);
  	drawLetter(';-)',coords,0xe80289,balls,letters,4,0,coords.width,randomRotation);
  	drawLetter(';-)',coords,0x03aaea,balls,letters,3,0,coords.width,randomRotation);
  }

  app.ticker.add(function() {
    count++;
    let mouseposition = app.renderer.plugins.interaction.mouse.global;
    // console.log(mouseposition);

    balls.forEach((ball,j) => {
	    ball.think(mouseposition);

	    letters[j].position.x = ball.diffX;
	    letters[j].position.y = ball.diffY;
	  });

  });
}






