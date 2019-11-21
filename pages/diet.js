
const divCategorias = document.getElementsByClassName('categorias-alimentos')[0];
var arranjo_alimentos_selecionados = [];


var db = JSON.parse(localStorage.getItem('db_results_real2'));
const dietaBalanceada = {
    "gerarKcal": function(){
        if(db.results[0].imc === -1){
            imcGlobal();
            $('#contador-calorias').css("display", "none");
            $('#barra-gasto-calorico').css("display", "none");
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
                        <section id="barra-gasto-calorico" style="display: grid; border: 2px solid black;">
                        </section>
                        <div style="height: ${kcal/10}; width: 15%; position: relative; margin-left: 50%;
                        margin-top: -200px;
                        margin-bottom: 20%;">
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
        var alerta =`<a href="./Imc.html">                  <div class=$                        {"alerta"}>
                            <p>Peehhhhhhh tem que calcular seu Imc primeiro para ter acesso à uma dieta!!!</p>
                            <span>Clique nesta box para ir para Calcular seu IMC!!!</span>
                        </div></a>
                    `;
        $('#res').html(alerta);
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

//mostrar array de alimentos selecionados
function mostrarArranjo(){
    let conteudo = " </br> <img src='../images/comedor.gif' width=40%;> </br> </br> </br> --------Alimentos Selecionados---------</br> ";
    for(var i = 0; i < db.results[1].alimentos.length; i++){
        var item = db.results[1].alimentos[i];
        conteudo += `</br> ${item} </br>`;
        $('#resposta').html(conteudo);
    }
}

//Colocar alimento separado por arranjos
function funcaoSelecionarAlimento(nome, indice, index, kcal){
    let novoAlimento = nome;
    let bloco = document.getElementsByClassName('bloco-alimento')[indice];
    bloco.style.opacity = 0;
    db.results[0].calorias -= kcal;
    db.results[1].alimentos[index-1].index.push(novoAlimento);
    localStorage.setItem('db_results_real2', JSON.stringify(db));
}

let iplus;
//Colocar opções de alimentos pertencentes as categorias pelos indices
function funcaoBuscarAlimentos(indice){
    $.ajax({
        url: `https://taco-food-api.herokuapp.com/api/v1/category/${indice}/food`,
        success: function(dados){
            let opcoes = "";
            for(var i = 0; i < dados.length; i++){
                kcal = dados[i].attributes.energy.kcal;
                kcalArredondado = parseFloat(kcal.toFixed(2));
 opcoes += ` <div class="bloco-alimento"><div onclick="funcaoSelecionarAlimento('${dados[i].description}', ${i});">
                                <p>${dados[i].description}</br>
                                <p>${dados[i].base_qty} (${dados[i].base_unit})</p>
                                <p>${kcalArredondado} Kcal</p>
                            </div></div>`;
            }
            $('#res').html(opcoes);
        }
    });
}

//Criar botões categorizados 
function criarBotoes(){
    $.ajax({
    
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





