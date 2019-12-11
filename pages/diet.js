
const divCategorias = document.getElementsByClassName('categorias-alimentos')[0];
var arranjo_alimentos_selecionados = [];

//arranjo de dieta 
var dietaArray = [];

var db = JSON.parse(localStorage.getItem('db_results_real2'));
const dietaBalanceada = {
    "gerarKcal": function(){
        if(db.results[0].imc === -1){
            imcGlobal();
            $('#contador-calorias').css("display", "none");
        }
        else{
                switch(db.results[0].state){
                    case SUPERMAGRO:
                        db.results[0].calorias = db.results[0].peso * 35;
                        return db.results[0].peso * 35;
                        break;
                    case MAGRO:
                        db.results[0].calorias = db.results[0].peso * 32;
                        return db.results[0].peso * 32;
                        break;
                    case PESOIDEAL:
                        db.results[0].calorias = db.results[0].peso * 30;
                        return db.results[0].peso * 30;
                        break;
                    case UMPOUCOACIMA:
                        db.results[0].calorias = db.results[0].peso * 25;
                        return db.results[0].peso * 25;
                        break;
                    case MUITOACIMA:
                        db.results[0].calorias = db.results[0].peso * 20;
                        return db.results[0].peso * 20;
                        break;
                }
            
            
        }
        
    },
    "criarBlocoKcal": function(kcal){
        var content = ` 
                        <div id="mostra-kcal" >
                            <span class="kcal-marcador">
                                ${kcal} kcal  
                            </span></br>
                        </div>`;
        var divsDoLayoutGrid = "";
        for(var i = 0; i <= kcal; i++){
            divsDoLayoutGrid += `<div class="index" style="background-color: red;"></div>`;
        }
        $('#contador-calorias').html(content);
        $('#barra-gasto-calorico').html(divsDoLayoutGrid);
        $('#barra-gasto-calorico').css("grid-template-rows", `repeat(${kcal/10}, 1fr)`);
        $('#barra-gasto-calorico').css("grid-template-columns", `1fr`);
        $('#barra-gasto-calorico').css("width", "15%");
        $('#barra-gasto-calorico').css("height", `${kcal/10}px`);
        $('#barra-gasto-calorico').css("margin-left", "20%");
        $('#barra-gasto-calorico').css("margin-top", "5%");
        
    },
    "descontarKcalAlimentoIngerido": function(kcal){
        console.log(kcal);
    }
}

function imcGlobal(){
    if(db.results[0].imc == -1){
       alert("VOCÊ DEVE CALCULAR SEU IMC PRIMEIRO!");
       window.location.href = "/pages/Imc.html"
    }
    else{
        $('#res').html("");
        console.log(db.results[0].imc);
    }
}
//limpar array de alimentos

function funcaoLimparArranjo(){
    let arranjo = db.results[1].alimentos;
    
        arranjo.splice(0, db.results[1].alimentos.length);
    
    localStorage.setItem('db_results_real2', JSON.stringify(db));
}
//variável de controle que verifica se os arrays estão vazios
var verificador = 0;
//variável para pegar o primeiro alimento para utilizar como base para comparar com os outros
var verificador1 = 0;
//variável que verifica se o tamanho do array de dieta se manteve ou não
var stateDoTam = 0;
//variáveis melhores posicionadas por cada categoria
var melhorNome = melhorGramagem = melhorKcal = melhorFibras = melhorProteinas = melhorLipideos = melhorCarboidratos = posicaoJDoMelhor = " ";
//variável para dividir as gramas para cada categoria seguindo a pirâmide alimentar
var divisaoGramas = 0;
//variável para verificar se há alimentos repetidos;
var achei = false;

//variável contra repetições
var contraRepeticoes = 0;




//funcao para colocar em um arranjo específico segundo a piramide alimentar para exibí-los facilmente
function funcaoSepararDietaSegundoPiramide(simbolo, cor,nome,kcal, status){
    db.results[0].dieta[0].alimentosDieta.push((nome + "&" +  kcal + "&" + 100 + "&" + simbolo + "&" + cor + "&" + status));
    localStorage.setItem('db_results_real2', JSON.stringify(db));    
}

//classifica o alimento segundo a pirâmide alimentar
function classificacaoDeGruposDeAlimentos(indice,kcal, proteina, lipideos, carboidrato,fibras,nome, j_melhor){
    if(melhorCarboidratos == "NA" ){
        melhorCarboidratos = 0;
    }
    if(melhorFibras == "NA"){
        melhorFibras = 0;
    }
    if(melhorLipideos == "NA"){
        melhorLipideos = 0;
    }
    if(melhorProteinas == "NA"){
        melhorProteinas = 0;
    }
    if(db.results[0].calorias < Number(db.results[0].caloriaGeral)){

    }
    else{
        switch(indice){
            case 0:
                if(fibras > melhorFibras){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 1:
                if(fibras > melhorFibras){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 2:
                if(fibras > melhorFibras){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 3:
                if(lipideos > melhorLipideos){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 4:
                if(proteina > melhorProteinas){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 5:
                if(kcal > melhorKcal && lipideos < melhorLipideos){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 6:
                if(proteina > melhorProteinas){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 7:
                if(kcal < kcal){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 8:
                if(proteina > melhorProteinas){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 9:
                if(kcal < melhorKcal){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 10:
                if(kcal < melhorKcal){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 11:
                if(kcal < melhorKcal){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 12:
                if(kcal < melhorKcal){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 13:
                if(fibras > melhorFibras){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
            case 14:
                if(fibras > melhorFibras){
                    melhorFibras = fibras;
                    melhorProteinas = proteina;
                    melhorCarboidratos = carboidrato;
                    melhorLipideos = lipideos;
                    melhorNome = nome;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = j_melhor;
                    divisaoGramas = 1;
                }
                break;
        }
    }
}
//variável para localizar o primeiro alimento da nova requisição
var novoValidador = 0;
//funcao nova requisição com o objetivo de pegar o melhor alimento desta categoria já que o usuário não selecionou nenhum alimento
function funcaoNovaRequisicaoParaGerarMelhorAlimento(indice){
    $.ajax({
        crossOrigin: true,
        url: `https://taco-food-api.herokuapp.com/api/v1/category/${indice}/food`,
        success: function(dados){
            for(var i = 0; i < dados.length; i++){
                var nome = dados[i].description;
                var kcal = dados[i].attributes.energy.kcal;
                var proteinas = parseFloat(dados[i].attributes.protein.qty);
                var lipideos = parseFloat(dados[i].attributes.lipid.qty);
                var carboidratos = parseFloat(dados[i].attributes.carbohydrate.qty);
                var fibras = parseFloat(dados[i].attributes.fiber.qty);
                var gramagem = 100;
                novoValidador++;
                if(novoValidador == 1){
                    melhorNome = nome;
                    melhorFibras = fibras;
                    melhorCarboidratos = carboidratos;
                    melhorLipideos = lipideos;
                    melhorProteinas = proteinas;
                    melhorKcal = kcal;
                    posicaoJDoMelhor = 0;
                }
                else{
                    classificacaoDeGruposDeAlimentos(indice-1,kcal,proteinas,lipideos,carboidratos,fibras,nome, posicaoJDoMelhor);
                }
            }
            funcaoSepararDietaSegundoPiramide('fas fa-question', '#585858',melhorNome, melhorKcal, 1);
        }
    });
}

//gerar dieta flexivel
function gerarDieta(i){
    contraRepeticoes++;
    achei = false;
    
            verificador1 = 0;
            var array_teste = db.results[1].alimentos[i];
            if(array_teste.length == 0){
                funcaoNovaRequisicaoParaGerarMelhorAlimento(i+1);
            }
            else{
                for(var j = 0; j < db.results[1].alimentos[i].length; j++){
                    var alimentoEspecifico = db.results[1].alimentos[i][j];
                    var atributosEspecifico = db.results[2].atributos[i][j];
                    var arrayDeAtributos = atributosEspecifico.split("*");
                    var kcal = arrayDeAtributos[0];
                    var proteinas = arrayDeAtributos[1];
                    var lipideos = arrayDeAtributos[2];
                    var carboidratos = arrayDeAtributos[3];
                    var fibras = arrayDeAtributos[4];
                    var simboloDaCategoria = arrayDeAtributos[5];
                    var corDaCategoria = arrayDeAtributos[6];
                    var gramagem = 100;
                    verificador1++;
            //lendo o primeiro e atribuindo tudo a ele
                    if(verificador1 == 1){
                        melhorNome = alimentoEspecifico;
                        melhorFibras = fibras;
                        melhorCarboidratos = carboidratos;
                        melhorLipideos = lipideos;
                        melhorProteinas = proteinas;
                        melhorKcal = kcal;
                        posicaoJDoMelhor = j;
                    }
                    else{
                        classificacaoDeGruposDeAlimentos(i,kcal,proteinas,lipideos,carboidratos,fibras,alimentoEspecifico, j);
                    }
                }//final do for do j
            
                if(contraRepeticoes > 1){
                    for(var h = 0; h < dietaArray.length; h++){
                        var alimentoEspec = dietaArray[h];
                        if(alimentoEspec == (melhorNome + "&" + melhorKcal + "&" + gramagem + "&" + divisaoGramas)){
                            achei = true;
                        }
                    }
                }
                if(!achei){
                    funcaoSepararDietaSegundoPiramide( simboloDaCategoria, corDaCategoria,melhorNome,melhorKcal, 0);
                    dietaArray.push((melhorNome + "&" + melhorKcal + "&" + gramagem + "&" + divisaoGramas));
                    //atualizando calorias dos alimentos gerados no db
                    db.results[0].caloriaGeral += Number(melhorKcal);
                    
                    db.results[1].alimentos[i].splice(posicaoJDoMelhor, 1);
                    db.results[2].atributos[i].splice(posicaoJDoMelhor, 1);
                    localStorage.setItem('db_results_real2', JSON.stringify(db));
                }
            }
}
//função que classifica a categoria
function funcaoClassificaCategoria(k){
    switch(k){
        case 0:
            gerarDieta(k);
            dietaArray.push("*");
            break;
        case 1:
            for(var o = 0; o < 3; o++){
                gerarDieta(k);
            }
            dietaArray.push("*");
            break;
        case 2:
            if(Math.floor(Math.random() * 11) > 5){
                for(var o = 0; o < 3; o++){
                    gerarDieta(k);
                }
            }
            else{
                for(var o = 0; o < 2; o++){
                    gerarDieta(k);
                }
            }
            dietaArray.push("*");
            break;
        case 3:
            gerarDieta(k);
            dietaArray.push("*");    
            break;
        case 4:
            if(Math.floor(Math.random() * 11) > 5){
                for(var a = 0; a < 3; a++){
                    gerarDieta(k);
                }
            }
            else{
                for(var a = 0; a < 2; a++){
                    gerarDieta(k);
                }
            }
            dietaArray.push("*");
            break;
        case 5:
            gerarDieta(k);
            dietaArray.push("*");
            break;
        case 6:
            if(Math.floor(Math.random() * 11) > 5){
                for(var b = 0; b < 2; b++){
                    gerarDieta(k);
                }
            }
            else{
                for(var b = 0; b < 1; b++){
                    gerarDieta(k);
                }
            }
            dietaArray.push("*");
            break;
        case 7:
            gerarDieta(k);
            dietaArray.push("*");
            break;
        case 8:
            if(Math.floor(Math.random() * 11) > 5){
                for(var c = 0; c < 1; c++){
                    gerarDieta(k);
                }
            }
            else{
                for(var c = 0; c < 2; c++){
                    gerarDieta(k);
                }
            }
            dietaArray.push("*");
            break;
        case 9:
            gerarDieta(k);
            dietaArray.push("*");
            break;
        case 10:
            gerarDieta(k);
            dietaArray.push("*");
            break;
        case 11:
            gerarDieta(k);
            dietaArray.push("*");
            break;
        case 12:
            gerarDieta(k);
            dietaArray.push("*");
            break;
        case 13:
            if(Math.floor(Math.random() * 11) > 5){
                for(var d = 0; d < 10; d++){
                    gerarDieta(k);
                }
            }
            else{
                for(var d = 0; d < 10; d++){
                    gerarDieta(k);
                }
            }
            dietaArray.push("*");
            break;
        case 14:
            if(Math.floor(Math.random() * 11) > 5){
                for(var e = 0; e < 10; e++){
                    gerarDieta(k);
                }
            }
            else{
                for(var e = 0; e < 10; e++){
                    gerarDieta(k);
                }
            }
            dietaArray.push("*");
            break;
    
    }
}

/*função requisição loja de alimentos 
*/
function funcaoRequisicaoAlimento(nome){
    window.location.href = `https://www.carrefour.com.br/busca/?termo=${nome}&foodzipzone=na`;
}
/*função para dividir a kcal e as gramas pela quantidade de refeições*/
function funcaoDividirPelaQuantidadeDeRefeicoes(){
    if(db.results[0].dieta[0].alimentosDieta.length == 0 || db.results[0].quantRefeicoes == 0){
        //nenhum alimento selecionado
    }
    else{
        for(var i = 0; i < db.results[0].dieta[0].alimentosDieta.length; i++){
            var blocoEspecifico = db.results[0].dieta[0].alimentosDieta[i];
            var arrayDeBlocos = blocoEspecifico.split("&");
            for(var j = 0; j < db.results[0].quantRefeicoes; j++){
                var nome = arrayDeBlocos[0];
                var kcal = Math.trunc(arrayDeBlocos[1] / db.results[0].quantRefeicoes);
                var gramagem = Math.trunc(arrayDeBlocos[2] / db.results[0].quantRefeicoes);
                var simbolo = arrayDeBlocos[3];
                var cor = arrayDeBlocos[4];
                var status = arrayDeBlocos[5];
                var img = simbolo.replace(" ","%20");

                db.results[0].dieta[1].arrayAlimentosAuxiliar.push(nome + "&" + kcal + "&" + gramagem + "&" + simbolo + "&" + cor + "&" + status);
            }//for do j
        }//for do i
        localStorage.setItem('db_results_real2', JSON.stringify(db));
    }//else
}//fim função

/*função para exibir os alimentos*/
function funcaoExibirAlimentos(){
    var blocos = "";
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    
    if(db.results[0].dieta[0].alimentosDieta.length == 0){
    //nenhum alimento selecionado
    }
    else{
        for(var i = 0; i < db.results[0].dieta[1].arrayAlimentosAuxiliar.length; i++){
            var blocoEspecifico = db.results[0].dieta[1].arrayAlimentosAuxiliar[i];
            var arrayDeBlocos = blocoEspecifico.split("&");
            var nome = arrayDeBlocos[0];
            var kcal = arrayDeBlocos[1];
            var gramagem = arrayDeBlocos[2];
            var simbolo = arrayDeBlocos[3];
            var cor = arrayDeBlocos[4];
            var status = arrayDeBlocos[5];
            var img = simbolo.replace(" ","%20");
            if(status == 0){
                blocos += ` 
            <div class="corpo-pre-alimento-selecionado">
                <div style="height: 200px;" class="info-alimento">
                  <div class="corpo-alimento">
                    <div class="img-categoria" style="background:url(../images/Diet/alimentos/${img}.webp);background-position: center;">
                      <div class="tag-alimento"><span class="indicador"><i style="color:${cor}" class='${simbolo}'></i></span>
                      </div>
                    </div>
                    <div class='circle-text'>
                      <span>${nome}</span>
                    </div>
                  </div>
                </div>
                <div class="funcao-alimento">
                  <div class='circle' onclick="funcaoEatAlimento('${kcal}','${i}');">
                    <i class="fas fa-utensils"></i>
                  </div>
                </div>
            </div>`;
            }
            else{
                blocos += `  <div class="corpo-pre-alimento-selecionado">
                <div style="height: 200px;" class="info-alimento">
                  <div class="corpo-alimento">
                    <div class="img-categoria" style="background:url(../images/Diet/alimentos/${img}.webp);background-position: center;">
                      <div class="tag-alimento"><span class="indicador"><i style="color:${cor}" class='${simbolo}'></i></span>
                      </div>
                    </div>
                    <div class='circle-text'>
                      <span>${nome}</span>
                    </div>
                  </div>
                </div>
                        <div class='circle' onclick="funcaoRequisicaoAlimento('${nome}')">
                            <i class="fas fa-utensils"></i>
                        </div>
                        </div>`;
            }
            
        }//final do for

        $('#pre-selecionados').css('display', 'block');
        $('#pre-selecionados').html(blocos);
    }
    
}
//função para atualizar o contador de kcal
function funcaoEatAlimento(kcal, indice){
    db.results[0].calorias -= kcal;
    db.results[0].dieta[1].arrayAlimentosAuxiliar.splice(indice, 1);
    dietaBalanceada.criarBlocoKcal(db.results[0].calorias);
    if(db.results[0].dieta[1].arrayAlimentosAuxiliar.length == 0){
        $('#pre-selecionados').html("");
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    funcaoExibirAlimentos();
    
}



//Colocar alimento separado por arranjos
function funcaoSelecionarAlimento(nome, indice, index, kcal, proteina, lipideo, carboidrato, fibras,symbol, cor){
    let novoAlimento = nome;
    let atributosDesteAlimento = kcal + "*" + proteina + "*" + lipideo + "*" + carboidrato + "*" + fibras + "*" + symbol + "*" + cor;
    let bloco = document.getElementsByClassName('bloco-alimento')[indice];
    bloco.style.opacity = 0;
    bloco.style.display = 'none';
    db.results[1].alimentos[index-1].push(novoAlimento);
    db.results[2].atributos[index-1].push(atributosDesteAlimento);

    localStorage.setItem('db_results_real2', JSON.stringify(db));
}

let iplus;
let statusAnimacao = 0;

//função para deletar alimento específico após o clique
function funcaoDeletarAlimento(indiceDoArranjo, posicaoEspecifica){
    db.results[1].alimentos[indiceDoArranjo].splice(posicaoEspecifica, 1);
    db.results[2].atributos[indiceDoArranjo].splice(posicaoEspecifica, 1);
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    funcaoMostrarAlimentosPreSelecionados();
}

//função para esconder alimentos pré selecionados
function funcaoEsconderAlimentosPreSelecionados(){
    $('#pre-selecionados').html(" ");
    var botaoCarrinho = document.getElementsByClassName('carrinho-de-alimentos')[0];
    botaoCarrinho.removeEventListener('click',  funcaoEsconderAlimentosPreSelecionados, false);
    botaoCarrinho.addEventListener('click', funcaoMostrarAlimentosPreSelecionados, false);
}

//funcao que mostra os alimentos pré selecionados 

function funcaoMostrarAlimentosPreSelecionados(){
    var conteudo = " ";
    //variável para verificar se existe algum item já selecionado
    var quantItensPreSelecionados = 0;
    for(var i =  0; i < db.results[1].alimentos.length; i++){
        for(var j = 0; j < db.results[1].alimentos[i].length; j++){
            quantItensPreSelecionados++;
            var nomesEspecificos = db.results[1].alimentos[i][j];
            var caracteristicasEspecificas = db.results[2].atributos[i][j];
            var arrayDeCaracteristicas = caracteristicasEspecificas.split("*");
            var simboloCategoria = arrayDeCaracteristicas[5];
            var corCategoria = arrayDeCaracteristicas[6];
            var img = simboloCategoria.replace(" ","%20");
            conteudo += `  <div class="corpo-pre-alimento-selecionado">
            <div style="height: 200px;" class="info-alimento">
              <div class="corpo-alimento">
                <div class="img-categoria" style="background:url(../images/Diet/alimentos/${img}.webp);background-position: center;">
                  <div class="tag-alimento"><span class="indicador"><i style="color:${corCategoria}" class='${simboloCategoria}'></i></span>
                  </div>
                </div>
                <div class='circle-text'>
                  <span>${nomesEspecificos}</span>
                </div>
              </div>
            </div>
                <div class='circle' onclick="funcaoDeletarAlimento('${i}', '${j}');">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>` ;
        }
    }
    if(quantItensPreSelecionados == 0){
        conteudo = ` <div id="alert-carrinho-vazio" class="alert alert-danger" role="alert">
        Ops Carrinho vazio!!!
                    </div>`;
    }
    $('#pre-selecionados').html(conteudo);
    var botaoCarrinho = document.getElementsByClassName('carrinho-de-alimentos')[0];
    botaoCarrinho.removeEventListener('click', funcaoMostrarAlimentosPreSelecionados, false);
    botaoCarrinho.addEventListener('click', funcaoEsconderAlimentosPreSelecionados, false);
    
}
//funções de animação do carrinho
function resetStatus(){
    statusAnimacao = 0;
    $('#cart').css('opacity', '0.6');
}
function funcaoPequenaAnimacao(){
    console.log('chamou');
    if(statusAnimacao == 0){
        $('#cart').css('opacity', '1');
        $('#cart').css('transform', 'rotate3d(0, 0, 0.5, -20deg)');
        setTimeout(function(){
            $('#cart').css('transform', 'rotate3d(0, 0, 0.5, 20deg)');
        }, 500);
        setTimeout(function(){
            $('#cart').css('transform', 'rotate3d(0, 0, 0, -20deg)');
        }, 1000)
        
        statusAnimacao++;
    }
    
}

//funcao guardar quantidade de refeicoes no LocalStorage
function funcaoGuardarQuant(){
    var valorDoSelect = parseInt($('#quantidade-refeicoes').val());
    
    if(valorDoSelect == 0){
        console.log(valorDoSelect);
        var alertaCampoNPreenchido =` <div id="alert-campo-n-preencido" class="alert alert-danger" role="alert">
            Ops você não preencheu nenhum campo!!!
        </div> `;
        var alert = document.getElementById('alertas');
        alert.innerHTML += alertaCampoNPreenchido;
        setTimeout(function(){
            $('#alert-campo-n-preencido').css('display', 'none');
        }, 3000);
    }
    else{
        var alertaCampoPreenchido =` <div id="alert-success" class="alert alert-success" role="alert">
            Quantidade de refeições armazenadas com sucesso!
        </div>`;
        var alert = document.getElementById('alertas');
        alert.innerHTML += alertaCampoPreenchido;
        setTimeout(function(){
            $('#alert-success').css('display', 'none');
                window.location.href = "./Diet.html";
        }, 3000);
        db.results[0].quantRefeicoes = valorDoSelect;
        $('#form-quant-refeicoes').html(" ");
        $('#formulario-quantidade-refs').css('display', 'none');
        localStorage.setItem('db_results_real2', JSON.stringify(db));
    }
    
}
//variável para verificar a criação do input de quantidade de refeições;
var statusQuantRefeicoesDiarias = 0;

//funcao para criar form de quantidade de refeições
function criarFormQuantRef(){
    statusQuantRefeicoesDiarias++;
    if(statusQuantRefeicoesDiarias == 1 && !db.results[0].quantRefeicoes){
        var conteudoDoForm = `  <div id="form-quant-refeicoes">
                                    <span>Qual a quantidade de refeições que você faz?</span>
                                    <select class="custom-select" id="quantidade-refeicoes">
                                        <option value="0"  selected>Escolha...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    <button type="button"  onclick='funcaoGuardarQuant();' class="btn btn-success">Enviar</button>        
                                    </div>`;
        $('#formulario-quantidade-refs').html(conteudoDoForm);
    }
    else{
        $('#contador-calorias').css('display', 'block');
    }
}
//função para buscar alimentos
function funcaoBuscarAlimentos(indice, symbol, cor){
    $.ajax({
        crossOrigin: true,
        url: `https://taco-food-api.herokuapp.com/api/v1/category/${indice}/food`,
        success: function(dados){
            //criando botão do carrinho para verificar itens selecionados e ter a opção de deletá-los colocar aqui quando estiver dando certo a requisição com o nome do alimento passado como parâmetro para a função mostrar alimentos pré-selecionados;
            
            let opcoes = "";
            for(var i = 0; i < dados.length; i++){
                var kcal = dados[i].attributes.energy.kcal;
                var kcalArredondado = parseFloat(kcal.toFixed(2));
                var proteinas = parseFloat(dados[i].attributes.protein.qty);
                var lipideos = parseFloat(dados[i].attributes.lipid.qty);
                var carboidratos = parseFloat(dados[i].attributes.carbohydrate.qty);
                var fibras = parseFloat(dados[i].attributes.fiber.qty);
                
                opcoes += ` <div class= bloco-alimento onclick="funcaoSelecionarAlimento('${dados[i].description}', ${i}, '${indice}', '${kcalArredondado}', '${proteinas}', '${lipideos}', '${carboidratos}', '${fibras}', '${symbol}', '${cor}');">
                                <p>Nome ${dados[i].description}</br>
                                <p>${kcalArredondado} Kcal</p>
                            </div>`;
            }
            $('#res').html(opcoes);
        }
    });
}

//Criar botões categorizados 
function criarBotoes(){
    $.ajax({
        crossOrigin: true,
        url: `https://taco-food-api.herokuapp.com/api/v1/category`,
        success: function (dados, status, req) {
            let texto = "";
            for(let i = 0; i < dados.length; i++){
                iplus = i + 1;
                texto += `  <button class="btn-categoria" onclick=funcaoBuscarAlimentos(${iplus})> Categoria ${iplus} </button>`;
            }
            console.log(texto);
            $('#res').html(texto);
        }
    });
}

function atualizaCarrinho(){
    var atualiza = `<a class="atualiza-carrinho" onclick="funcaoMostrarAlimentosPreSelecionados();">Atualizar o carrinho de acordo com uma dieta adequada!</a>`;
    $('#atualiza-carrinho').html(atualiza);
}

function gerarDietaIncompleta(){
    atualizaCarrinho();
    funcaoDietaCategoriaEspecifica(0);
    funcaoDietaCategoriaEspecifica(1);
    funcaoDietaCategoriaEspecifica(2);
    funcaoDietaCategoriaEspecifica(3);
    funcaoDietaCategoriaEspecifica(4);
    funcaoDietaCategoriaEspecifica(5);
    funcaoDietaCategoriaEspecifica(6);
    funcaoDietaCategoriaEspecifica(7);
}



