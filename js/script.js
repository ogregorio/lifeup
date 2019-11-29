//jogo
function funcaoGame(){
	$('#topo').css('display', 'none');
	var tela = document.getElementById('jogo');
	var row1 = document.getElementById('pontuacao');
	row1.style.display = "grid";
	var content = "";
	for(var i = 0; i < 50; i++){
		content += `	<div class="indice1">

						</div>`;
	}

	row1.innerHTML = content;
	tela.style.display = 'block';


//jogo

	//canvas
	var cnv = document.querySelector('#canvas1');
	//contexto de renderização 2d
	var ctx = cnv.getContext('2d');
	
	//RECURSOS DO JOGO ========================================================>
	//arrays
	var sprites = [];
	var assetsToLoad = [];
	var messages = [];
	//array de misseis
	var misseis = [];
	//aliens
	var aliens = [];
	//variáveis úteis
	var alienFrequency = 100;
	var alienTimer = 0;
	var contadorDeNavesAbatidasValidas = 0;
	var contadorDeAlimentosQueChegaramNaBoca = 0;
	var arrayDeSourceXAlimentos = [234, 284,334,384];
	var win = lose = false;
	var move = 0;
	//sprites
	//cenário
	var background = new Sprite(0, 162,500, 500, 0, 0);
    sprites.push(background);
    //personagem
    var char = new Sprite(0,104,56,58,222,438);
	sprites.push(char);

	//mensagem da tela inicial
	var startMessage = new ObjectMessage(cnv.height/2, "PRESS ENTER", "#00a000");
	messages.push(startMessage);
	//mensagem de pausa
	var pausa = new ObjectMessage(cnv.height/2, "PAUSE","#00a000");
	pausa.visible = false;
	messages.push(pausa);
	//mensagem de game win
	var gameWin = new ObjectMessage(cnv.height/2, "YOU WIN","#00a000");
	gameWin.visible = false;
	messages.push(gameWin);
	//reinicia
	var reinicia = false;
	var reiniciarMessage = new ObjectMessage(cnv.height/2, "PRESS R PARA REINICIAR","#00a000");
	reiniciarMessage.visible = false;
	messages.push(reiniciarMessage);

	var gameLose = new ObjectMessage(cnv.height/2, "YOU LOSE","#ff0000");
	gameLose.visible = false;
	messages.push(gameLose);
	
	//obstaculos
	//var obstaculos = new Sprite(0, 0, 100, 200, 380, 298);
	//sprites.push(obstaculos);
	
	//imagem
	var img = new Image();
	img.addEventListener('load',loadHandler,false);
	img.src = "../img.png";
	assetsToLoad.push(img);
	//contador de recursos
	var loadedAssets = 0;
	
	
	//entradas
	var LEFT = 37, RIGHT = 39, ENTER = 13, SPACE = 32, CIMA = 38, R = 82;
	
	//ações
	var mvLeft = mvRight = jump = shoot = spaceIsDown = jumPress = false;
	
	
	//estados do jogo
	var LOADING = 0, PLAYING = 1, PAUSED = 2, OVER = 3;
	var gameState = LOADING;
	
	//listeners
	window.addEventListener('keydown',function(e){
		var key = e.keyCode;
		
		switch(key){
			case LEFT:
				mvLeft = true;
				break;
			case RIGHT:
				mvRight = true;
				break;
			case SPACE:
				if(!spaceIsDown){
					shoot = true;
					spaceIsDown = true;
				}
				
				break;
		}
	},false);
	
	window.addEventListener('keyup',function(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = false;
				break;
			case RIGHT:
				mvRight = false;
				break;
			case ENTER:
				if(gameState !== PLAYING){
					if(reinicia){
						lose = false;
						win = false;
						reiniciarMessage.visible = true;
						gameLose.visible = false;
						gameWin.visible = false;
						reinicia = false;
					}
					else{
						gameState = PLAYING;
						startMessage.visible = false;
						pausa.visible = false;
						
					}
					
					
				} else {
					pausa.visible = true;
					gameState = PAUSED;
				}
				break;
			case SPACE:
				fireMissile();
				spaceIsDown = true;
				break;
			case R:
				gameState = PLAYING;
				reiniciarMessage.visible = false;
				alienFrequency = 75;
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
				reinicia = true;
				if(win && !lose){
					limparProgresso();
					gameWin.visible = true;
					contadorDeNavesAbatidasValidas = 0;
					contadorDeAlimentosQueChegaramNaBoca = 0;
					console.log('Você venceu');
				}
				if(lose && !win){
					limparProgresso();
					gameLose.visible = true;
					contadorDeAlimentosQueChegaramNaBoca = 0;
					contadorDeNavesAbatidasValidas = 0;
					
					console.log('Você perdeu');
				}
				break;
			case PAUSED:
				progressoAntigo();
				break;
		}
		render();
	}
	
	function update(){

		//move para a esquerda
		if(mvLeft && !mvRight){
			char.vx = -5;
		}
		
		//move para a direita
		if(mvRight && !mvLeft){
			char.vx = 5;
		}

		//para a nave
		if(!mvLeft && !mvRight){
			char.vx = 0;
		}

		//jump do personagem
		if(jump){
			char.y = char.y - 12;
			setTimeout(function(){
				char.y = char.y + 12;
				jump = false;
			}, 400);
		}
		if(shoot && spaceIsDown){
			fireMissile();
			shoot = false;
			spaceIsDown = false;
		}
		
		//se o contador chegar a 25 o lose = true
		if(contadorDeAlimentosQueChegaramNaBoca === 25){
			lose = true;
			win = false;
			gameState = OVER;
		}
		
		
		//atualiza a posição
		move = char.x;
		char.x = Math.max(0,Math.min(cnv.width - char.width, char.x + char.vx));
		//if(collide(char, obstaculos)){
		//	char.x = move;
		//}

		//obstaculos.x = obstaculos.x - 7;

		/*if(obstaculos.x < 0){
			obstaculos.status = "INVISIBLE";
			removeObjects(obstaculos, sprites);
			var syhei = tiposDeObstaculosY[getRandomInt(0, 3)];
			var sxwid = tiposDeObstaculosX[getRandomInt(0, 3)];
			var x1 = coresObstaculosX[getRandomInt(0, 3)];

			obstaculos = new Sprite(x1, 0, sxwid, syhei, obstaculosInit[getRandomInt(0,3)], cnv.height - sywid);
			sprites.push(obstaculos);
		}*/

		//atualiza a posição dos mísseis
		for(var i in misseis){
			var missel = misseis[i];
			missel.y += missel.vy;
			if(missel.y < -missel.height){//missel passar da borda superior do canvas
				removeObjects(missel, misseis);
				removeObjects(missel, sprites);
				i--;
			}
		}
		//encremento do alienTimer
		alienTimer++;
		//criação do alien caso o Timer se iguale a frequencia
		if(alienTimer === alienFrequency){
			makeAlien();
			alienTimer = 0;
			//ajuste da frequencia de aliens
			if(alienFrequency > 2){
				alienFrequency--;
			}
		}
		//atualiza posição dos aliens
		for(var i in aliens){
			var alieni = aliens[i];
			if(alieni.state !== alieni.EXPLODED){
				alieni.y += alieni.vy;
				if(alieni.state === alieni.CRAZY){
					if(alieni.x > cnv.width - alieni.width || alieni.x < 0){//evitar que os objetos inimigos ultrapassem das bordas laterais do canvas
						alieni.vx *= -1;
					}
					alieni.x += alieni.vx;
				}
				if(alieni.y > cnv.height + alieni.height){//quando eu passar da borda inferior do canvas remover item
					contadorDeAlimentosQueChegaramNaBoca++;
					removeObjects(alieni, aliens);
					removeObjects(alieni, sprites);
					i--;
				}
			}

			//Confere se algum alien foi destruído
			for(var j in misseis){
				var missile = misseis[j];
				if(collide(missile, alieni) && alieni.state !== alieni.EXPLODED){
					if(!win  && !lose){
						progressoAtual();
					}
					
					if(contadorDeNavesAbatidasValidas === 50){
						win = true;
						lose = false;
						gameState = OVER;
					}
					else{
						win = false;
					}
					destroyAlien(alieni);
					removeObjects(missile, misseis);
					removeObjects(missile, sprites);
					j--;
					i--;
				}
			}
			
		}//fim do for que faz a varredura no array de aliens
		
	}//fim do update
	//criadora de misseis
	function fireMissile(){
		var missile = new Sprite(172, 104, 60, 53, char.centerX()- 50, char.y - 53);
		missile.vy = -8;
		sprites.push(missile);
		misseis.push(missile);
	}
	//criadora de aliens
	function makeAlien(){
		//cria um valor randômico entre 0 e 8 ==> largura do canvas / a largura do alien
		//divide o canvas em 9 colunar para o posicionamento aleatório do alien
		var alienPosition = (Math.floor(Math.random() * 9)) * 55;
		var alienigina = new Alien(arrayDeSourceXAlimentos[getRandomInt(0,4)], 103, 50, 60,alienPosition, -55);
		alienigina.vy = 1;
		//OTIMIZAÇÃO DO ALIEN
		if(Math.floor(Math.random() * 11) > 7){//30% de chance
			alienigina.state = alienigina.CRAZY;
			alienigina.vx = 2;
		}

		if(Math.floor(Math.random() * 11) > 5){//50% de chance
			alienigina.vy = 2;
		}
		sprites.push(alienigina);
		aliens.push(alienigina);
	}

	//destroi aliens
	function destroyAlien(alien){
		alien.state = alien.EXPLODED;
		alien.explode();
		setTimeout(function(){
			removeObjects(alien, aliens);
			removeObjects(alien, sprites);
		}, 1000);
	}
	//preencher progresso antigo
	function progressoAntigo(){
		var progresso = document.getElementsByClassName('indice1');
		for(var i = 0; i < contadorDeNavesAbatidasValidas; i++){
			progresso[i].classList.add('checkedwin');
		}
	}
	//progresso atual de alimentos válidos
	function progressoAtual(){
		var progresso = document.getElementsByClassName('indice1')[contadorDeNavesAbatidasValidas];
		console.log(contadorDeNavesAbatidasValidas);
		progresso.classList.add('checkedwin');
		contadorDeNavesAbatidasValidas++;
	}
	//função limpar progresso valido
	function limparProgresso(){
		for(var i = 0; i < contadorDeNavesAbatidasValidas; i++){
			var progresso = document.getElementsByClassName('indice1')[i];
			progresso.classList.remove('checkedwin');
		}
	}
	//remove os objetos do jogo 
	function removeObjects(objectOnRemove, array){
		var i = array.indexOf(objectOnRemove);
		if(i !== -1){
			array.splice(i, 1);
		}
	}
	function render(){
		ctx.clearRect(0,0,cnv.width,cnv.height);
		//exibe os sprites
		if(sprites.length !== 0){
			for(var i in sprites){
				var spr = sprites[i];
				if(spr.status === "VISIBLE"){
					ctx.drawImage(img,spr.sourceX,spr.sourceY,spr.width,spr.height,Math.floor(spr.x),Math.floor(spr.y),spr.width,spr.height);
				}
			}
		}
		//exibe os textos
		if(messages.length !== 0){
			for(var i in messages){
				var message = messages[i];
				if(message.visible){
					ctx.font = message.font;
					ctx.fillStyle = message.color;
					ctx.textBaseline = message.baseline;
					message.x = (cnv.width - ctx.measureText(message.text).width)/2;ctx.fillText(message.text, message.x, message.y); 
				}
			}
		}
	}
	loop();
}


