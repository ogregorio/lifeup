//jogo1
function funcaoGame1(){
	var tela = document.getElementById('jogo1');
	tela.style.display = 'block';


//jogo1


	//canvas
	var cnv = document.querySelector('#canvas2');
	//contexto de renderização 2d
	var ctx = cnv.getContext('2d');
	
	//RECURSOS DO JOGO ========================================================>
	//arrays
	var sprites = [];
	var assetsToLoad = [];
	var tiposDeObstaculosX = [100, 60, 80];
	var tiposDeObstaculosY = [100, 70, 60];
	var coresObstaculosX = [0, 200, 400];
	var obstaculosInit = [450, 420, 400];
	//variáveis úteis
	var win = lose = false;
	//sprites
	//cenário
	var background = new Sprite(0, 162,500, 500, 0, 0);
    sprites.push(background);
    //personagem
    var char = new Sprite(0,104,56,58,222,438);
	sprites.push(char);
	
	//obstaculos
	var obstaculos = new Sprite(0, 100, 100, 100, 380, 398);
	sprites.push(obstaculos);
	
	//imagem
	var img = new Image();
	img.addEventListener('load',loadHandler,false);
	img.src = "img/img.png";
	assetsToLoad.push(img);
	//contador de recursos
	var loadedAssets = 0;
	
	
	//entradas
	var LEFT = 37, RIGHT = 39, ENTER = 13, SPACE = 32, CIMA = 38;
	
	//ações
	var mvLeft = mvRight = jump = shoot = spaceIsDown = jumPress = false;
	
	
	//estados do jogo
	var LOADING = 0, PLAYING = 1, PAUSED = 2, OVER = 3;
	var gameState = LOADING;
	
	//listeners
	window.addEventListener('keydown',function(e){
		var key = e.keyCode;
		
		switch(key){
			case SPACE:
				if(!jumPress){
					jump = true;
					jumPress = true;
				}
				
				break;
		}
	},false);
	
	window.addEventListener('keyup',function(e){
		var key = e.keyCode;
		switch(key){
			
			case ENTER:
				if(gameState !== PLAYING){
					gameState = PLAYING;
				} else {
					gameState = PAUSED;
				}
				break;
			case SPACE:
				jumPress = false;
				break;
		}
	},false);
	
	
	
	//FUNÇÕES =================================================================>
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function loadHandler(){
		loadedAssets++;
		if(loadedAssets === assetsToLoad.length){
			img.removeEventListener('load',loadHandler,false);
			//inicia o jogo
			gameState = PAUSED;
		}
	}
	
	function loop(){
		requestAnimationFrame(loop, cnv);
		//define as ações com base no estado do jogo
		switch(gameState){
			case LOADING:
				console.log('LOADING...');
				break;
			case PLAYING:
				update();
				break;
			case OVER:
				if(win && !lose){
					win = false;
					console.log('Você venceu');
				}
				if(lose && !win){
                    console.log('Você perdeu');
				}
				break;
			case PAUSED:
				break;
		}
		render();
	}
	
	function update(){

		//move para a esquerda
		

		//jump do personagem
		if(jump){
			char.y = char.y - 12;
			setTimeout(function(){
				char.y = char.y + 12;
				jump = false;
			}, 400);
		}
		
		//atualiza a posição
		move = char.x;
		char.x = Math.max(0,Math.min(cnv.width - char.width, char.x + char.vx));
		if(collide(char, obstaculos)){
            char.x = move;
            lose = true;
            gameState = OVER;
		}

		obstaculos.x = obstaculos.x - 7;

		if(obstaculos.x < 0){
			obstaculos.status = "INVISIBLE";
			removeObjects(obstaculos, sprites);
            var syhei = tiposDeObstaculosY[getRandomInt(0, 3)];
            
			var sxwid = tiposDeObstaculosX[getRandomInt(0, 3)];
			var x1 = coresObstaculosX[getRandomInt(0, 3)];

			obstaculos = new Sprite(x1, 0, sxwid, syhei, obstaculosInit[getRandomInt(0,3)], cnv.height - syhei);
			sprites.push(obstaculos);
		}

		
		
			
		
		
	}//fim do update
	//criadora de misseis
	

	
	//remove os objetos do jogo 
	function removeObjects(objectOnRemove, array){
		var i = array.indexOf(objectOnRemove);
		if(i !== -1){
			array.splice(i, 1);
		}
	}
	function render(){
		ctx.clearRect(0,0,cnv.width,cnv.height);
		if(sprites.length !== 0){
			for(var i in sprites){
				var spr = sprites[i];
				if(spr.status === "VISIBLE"){
					ctx.drawImage(img,spr.sourceX,spr.sourceY,spr.width,spr.height,Math.floor(spr.x),Math.floor(spr.y),spr.width,spr.height);
				}
			}
		}
	}
    loop();
}
