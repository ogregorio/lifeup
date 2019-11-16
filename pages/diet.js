
const divCategorias = document.getElementsByClassName('categorias-alimentos')[0];
var arranjo_alimentos_selecionados = [];

var db = JSON.parse(localStorage.getItem('db_results_real2'));

function imcGlobal(){
    if(db.results[0].imc == -1){
        var alerta =`  <a href=${"./IMC.fy.html"}><div class=${"alerta"}>
                            <p>Peehhhhhhh tem que calcular seu Imc primeiro para ter acesso à uma dieta!!!</p>
                            <span>Clique nesta box para ir para Calcular seu IMC!!!</span>
                        </div>
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
function funcaoSelecionarAlimento(nome, indice){
    let novoAlimento = nome;
    let bloco = document.getElementsByClassName('bloco-alimento')[indice];
    bloco.style.opacity = 0;
    db.results[1].alimentos.push(novoAlimento);
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
                opcoes += ` <div class= bloco-alimento onclick="funcaoSelecionarAlimento('${dados[i].description}', ${i});">
                                <p>Nome ${dados[i].description}</br>
                                <p>kcal : ${dados[i].attributes.energy.kcal}
                            </div>`;
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
                texto += `  <button onclick=funcaoBuscarAlimentos(${iplus})> botão ${iplus} </button>`;
            }
            console.log(texto);
            $('#res').html(texto);
        }
    });
}





