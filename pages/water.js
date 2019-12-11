function funcaoUmidade(){
    var lista = $("#listacdd").val().split(" ");
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4&&xmlhttp.status==200){
            var dado = xmlhttp.responseXML.documentElement.querySelector("umidade").textContent;
            funcaoClassificarUmidade(`${dado}`);
            //$('#res1').append(`A umidade de ${lista[1]} =  ${umidade} </br></br> <img src='../images/aquaboy.gif' width=40%;> </br> </br>`);
        }
    }
    xmlhttp.open("GET", `http://servicos.cptec.inpe.br/XML/estacao/${lista[0]}/condicoesAtuais.xml` ,true); 
    xmlhttp.send();
}

// function funcaoUmidade(){
//     var lista = $("#listacdd").val().split(" ");
//     var xmlhttp=new XMLHttpRequest();
//     xmlhttp.onreadystatechange=function(){
//         if(xmlhttp.readyState==4&&xmlhttp.status==200){
//             var dado = xmlhttp.responseText;
//             dado = dado.split("<umidade>");
//             var cortado = dado[1].split("</umidade>");
//             var umidade = cortado[0];
//             $('#res1').append(`A umidade de ${lista[1]} =  ${umidade} </br></br> <img src='../images/aquaboy.gif' width=40%;> </br> </br>`);
//         }
//     }
//     xmlhttp.open("GET", `http://servicos.cptec.inpe.br/XML/estacao/${lista[0]}/condicoesAtuais.xml` ,true); 
//     xmlhttp.send();
// }
function funcao1()
{
    var r=confirm("Você precisa inserir seu peso na aba IMC primeiro!!! Pressione OK para ser redirecionado : ");
    if (r==true)
        {
            window.location.href = './Imc.html';
        }
    else
        {
            alert('Ops !!! você clicou em cancelar, infelizmente você estará impossibilitado de utilizar esta funcionalidade :(');
        }
}

var db = JSON.parse(localStorage.getItem('db_results_real2'));
function funcaoClassificarUmidade(umidade){
    if(db.results[0].peso == 0){
        funcao1();
    }
    else{
        $('#recipientes').css('display', 'grid');
        $('#listacdds').css('display', 'none');
        var content = "";
        content += `<div>
                        <img id="personagem" src="../images/water/sprites/sprite0.webp">
                    </div>
                    `;
        var quantAgua = db.results[0].peso * 35;
        if(umidade >= 31 && umidade <= 40){//status umidade OBSERVAÇÃO
            quantAgua += 250;
        }
        else{
            if(umidade >= 21 && umidade <= 30){//status umidade ATENÇÃO
                quantAgua += 500;
            }
            else{
                if(umidade >= 12 && umidade <= 20){//status umidade ALERTA
                    quantAgua += 750;
                }
                else{
                    if(umidade < 12){//status EMERGÊNCIA
                        quantAgua += 1000;
                    }
                }
            }
        }
        db.results[0].quantAguaGeral = quantAgua;
        db.results[0].partesIguais = Math.floor(quantAgua / 8);
        content += `<div id="quantAgua">
                        <span><i class="fas fa-tint"></i> ${quantAgua}ml <i class="fas fa-tint"></i> </span>
                    </div>`;

        $('#sprites').html(content);
        localStorage.setItem('db_results_real2', JSON.stringify(db));
    }
}

function funcaoMostrarSprites(imagem){
    var content = "";
        if(db.results[0].quantAguaGeral <= 0){
            content += `<div>
                        <img id="personagem" src="../images/water/sprites/spriteGif.gif">
                    </div>
                    <div id="quantAgua">
                        <span><i class="fas fa-tint"></i> ${0}ml <i class="fas fa-tint"></i> </span>
                    </div>`;
        }
        else{
            content += `<div>
                        <img id="personagem" src="${imagem}">
                    </div>
                    <div id="quantAgua">
                        <span><i class="fas fa-tint"></i> ${db.results[0].quantAguaGeral}ml <i class="fas fa-tint"></i> </span>
                    </div>`;
        }
    $('#sprites').html(content);
}

function funcaoTomarAgua(quantidade){
    var desconto;
    var partesIguais = db.results[0].partesIguais;
    desconto = db.results[0].quantAguaGeral;
    desconto -= quantidade;

    db.results[0].quantAguaGeral = desconto;
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    if(desconto < 0){
        desconto = 0;
        funcaoMostrarSprites('../images/water/sprites/sprite1.webp');
    }
    else{
        if(desconto > (partesIguais * 7) && desconto < (partesIguais * 8) ){
            funcaoMostrarSprites('../images/water/sprites/sprite1.webp');
        }
        else{
            if(desconto > (partesIguais * 6) && desconto < (partesIguais * 7) ){
                funcaoMostrarSprites('../images/water/sprites/sprite2.webp');
            }
            else{
                if(desconto > (partesIguais * 5) && desconto < (partesIguais * 6) ){
                    funcaoMostrarSprites('../images/water/sprites/sprite3.webp');
                }
                else{
                    if(desconto > (partesIguais * 4) && desconto < (partesIguais * 5) ){
                        funcaoMostrarSprites('../images/water/sprites/sprite4.webp');
                    }
                    else{
                        if(desconto > (partesIguais * 3) && desconto < (partesIguais * 4) ){
                            funcaoMostrarSprites('../images/water/sprites/sprite5.webp');
                        }
                        else{
                            if(desconto > (partesIguais * 2) && desconto < (partesIguais * 3) ){
                                funcaoMostrarSprites('../images/water/sprites/sprite6.webp');
                            }
                            else{
                                if(desconto > (partesIguais * 1) && desconto < (partesIguais * 2) ){
                                    funcaoMostrarSprites('../images/water/sprites/sprite7.webp');
                                }
                                else{
                                    if(desconto > (partesIguais * 0) && desconto < (partesIguais * 1) ){
                                        funcaoMostrarSprites('../images/water/sprites/sprite8.webp');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
}

