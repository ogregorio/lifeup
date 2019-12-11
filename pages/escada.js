var db = JSON.parse(localStorage.getItem('db_results_real2'));
/*variáveis importantes de controle*/
let arranjo_de_ilhas = [4, 5, 10, 19];
let tempo = 300;
let status = 0;
let indice = 0;
let aux1 = tempo;
let index_global = 0;
let verifica = 0;


function funcaoSumirMapa(){
    $("#mapa-do-tesouro").css("display", "none");
}
function funcaoMostrarMapa(){
    $('#topo').css('display', 'block');
    $("#mapa-do-tesouro").css("display", "grid");
}
function funcaoReiderizarNovoFrame(){
    var content;
    for(let i = 0; i < db.results[3].fases.length - 1; i++){
        let valor = db.results[3].fases[i].value;
        
        let objeto = document.getElementsByClassName('indice')[i];
        
        switch(valor){
            case 0:
                content = `<i style="opacity: .5;" class="fas fa-check-circle"></i>`;
                objeto.innerHTML = content;console.log(objeto);
                break;
            case 1://cor verde
                content = `<i class="fas fa-check-circle"></i>`;
                objeto.style.color = "green";
                console.log(objeto);
                objeto.innerHTML = content;
                break;
            case 2:
                content = `<img src="../images/Escada/arvore.png">`;
                objeto.innerHTML = content;console.log(objeto);
                break;
            case 3://personagem
                content = `<img class="personagem" src="../images/Escada/Sprite0.png">`;
                objeto.innerHTML = content;
                break;
            case 4:
                content = `<img style="max-width:90px" src="../images/Escada/Sprite0.png" width="100%;">`;
                objeto.innerHTML = content;
                console.log(objeto);
                break;
            case 5:
                
                break;
            case 6:
                content = `<img style="opacity: 1; width: 100%;" src="../images/Escada/checkpoint.png">`;
                objeto.innerHTML = content;
                break;
        }
    }
}
function funcaoBaixo(){
    db.results[3].fases[Number(index_global)+5].value = 3;
}
function funcaoVerde(){
    db.results[3].fases[index_global].value = 1;
}   
/*funções de movimentação do personagem*/
function funcaoMoveDecrescente(inicio){
    let modo = 0;
    for(var i = 0; i < arranjo_de_ilhas.length; i++){
        if(arranjo_de_ilhas[i] == index_global){
            modo = 1;
        }
    }
    if(modo == 0 && Number(index_global)-1 >= inicio){
        funcaoVerde();
        db.results[3].fases[Number(index_global) - 1].value = 3;
    }
    else{
        funcaoVerde();
        funcaoBaixo();
    }
    if(index_global == 9 || index_global == 15){
        verifica = 1;
        if(index_global == 9){
            funcaoGame();
        }
        else{
            funcaoGame1();
        }
        
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
}
function funcaoMoveCrescente(fim){
    let modo = 0;
    for(var i = 0; i < arranjo_de_ilhas.length; i++){
        if(arranjo_de_ilhas[i] == index_global){
            modo = 1;
        }
    }
    if(modo == 0 && Number(index_global)+1 <= fim){
        funcaoVerde();
        db.results[3].fases[Number(index_global) + 1].value = 3;
    }
    else{
        funcaoVerde();
        funcaoBaixo();
    }
    if(index_global == 9 || index_global == 15){
        verifica = 1;
        if(index_global == 9){
            funcaoGame();
        }
        else{
            funcaoGame1();
        }
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
}

/*sair desta fase*/
function funcaoSairDessaFase(){
    $('#crono1').css("display", "none");
    $('#crono').css("display", "none");
    var comemoracao = ` </br><img id="comemora" src=../images/Escada/comemoracao.gif></br>`;
    $('#res').css("display", "block");
    $('#res').html(comemoracao);
    if( index_global >= 0 && index_global <= 4){
        funcaoMoveCrescente(4);
    }
    else{
        if( index_global >= 15 && index_global <= 19){
            funcaoMoveCrescente(19);
        }
        else{
            if( index_global >= 5 && index_global <= 9){
                funcaoMoveDecrescente(5);
            }
            else{
                if(index_global >= 10 && index_global <= 14){
                    funcaoMoveDecrescente(10);
                }
            }
        }
    }
        setTimeout(function(){
            $('#finalizar').css("display", "none");
            $('#comemora').css("display", "none");
            
            funcaoMostrarMapa();
            funcaoReiderizarNovoFrame();
            $('#mapa-do-tesouro').css("display", "none");
            funcaoMostrarMapa();
            if(verifica){
                $('#mapa-do-tesouro').css("display", "none");
            }
        }, 3000);
    

}

function funcaoContagem(){
    
    let aux;
    let min = tempo / 60;
    min = Math.trunc(min);
    aux = tempo % 60;
    let seg = Math.trunc(aux);
    if((tempo) >= 0 && status == 1){
        let cronometro = `  <div class="crono-text">
                            <p>${parseInt(min)} : ${parseInt(seg)} / 5 : 0</p>
                            </div>
                            `;
        $('#crono1').html(cronometro);
        if(aux1 == indice){

        }
        else{
            let ob = document.getElementsByClassName('fracao')[indice];
            ob.classList.add('complete');
        }
        console.log(indice);
        tempo = tempo - 1;
        setTimeout('funcaoContagem()', 1000);
        indice++;
        if(tempo == 0){
            $('#finalizar').css("display", "block");
            $('#finalizar').on('click', funcaoSairDessaFase);
        }
    }
}
function funcaoStart(){
    status = 1;
    $('#crono1').css("display", "block");
    $('#crono').css("display", "grid");
    
    
    $('#play').css("transition-duration", ".4s");
    $('#play').css("color", "#51cf66");
    setTimeout(function(){
        $('#play').css("color", "black");
        $('#play').css("display", "none");
        $('#pausa').css("display", "inline-block");
        $('#retorna').css("");
    }, 500);
    
    $('#retorna').css("color", "black");
    funcaoContagem();
}

function funcaoReiniciar(tempo_exe){
    indice = 0;
    $('#retorna').css("transition-duration", ".4s");
    $('#retorna').css("color", "orange");
    setTimeout(function(){
        $('#retorna').css("color", "black");
        $('#play').css("color", "black");
        $('#pausa').css("display", "none");
        $('#play').css("display", "inline-block");
    }, 500);
    for(var i = 0; i < tempo_exe; i++){
        document.getElementsByClassName('fracao')[i].classList.remove('complete');
    }
    tempo = tempo_exe;
    status = 0;
}

function funcaoPausar(){
    status = 0;
    $('#pausa').css("transition-duration", ".4s");
    $('#play').css("color", "black");
    $('#retorna').css("color", "black");
    $('#pausa').css("color", "red");
    setTimeout(function(){
        $('#pausa').css("color", "black");
        $('#pausa').css("display", "none");
        $('#play').css("display", "inline-block");
    }, 500);
    
}

function funcaoAtividade1(index, tempo_exe){
    aux1 = tempo_exe;
    index_global = index;
    if(db.results[3].fases[`${index}`].value == 1 || db.results[3].fases[`${index}`].value == 3){
        funcaoSumirMapa();
        $('#bot').css("display", "none");
        tempo = tempo_exe;
        indice = 0;
        let conteudo = "";
        for(var i = 0; i <= tempo_exe; i++){
            conteudo += `<div class="fracao"></div>`;
        }
        $('#crono').html(conteudo);
        
        for(var i = 0; i < tempo_exe; i++){
            document.getElementsByClassName('fracao')[i].classList.remove('complete');
        }
        var itens = `
        <div class="corpo-atividade">
        <h1 class="titulo-atividade">Atividade 1 : Corrida de 5 minutos</h1>
                    <img class="imagem-atividade" src=../images/Escada/corrida.gif>
                    </br>
                    
                    <div id="botoes-atividade">
                        <i id="retorna" class="fas fa-undo-alt" onclick=${"funcaoReiniciar("+`${tempo_exe}`+");"}></i>
                        <i class="fas fa-play-circle" id="play" onclick=${"funcaoStart();"}></i>
                        <i id="pausa" class="fas fa-pause-circle" onclick=${"funcaoPausar();"}></i>
                    </div>
        </div>
                    `
        $("#res").html(itens);
    }
    else{
        window.alert("fase bloqueada!!!");
    }
}
