/*exibir frutas*/
function funcaoExibirAlimentosFrut(){
    var blocos = "";
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    
    if(db.results[0].blocosArrayFrut.length == 0){
        if(db.results[0].lastLoginDia > dia && db.results[0].lastLoginMes == mes){
            var colocarEventoDeCriarDieta = `<img onclick="funcaoMostrarAlimentosDetalhadamente(1)" src="../images/Diet/segundo-andar1-piramide.png" alt="a">`;
            $('#segundo-1').html(colocarEventoDeCriarDieta);
            $('#segundo-1').css('opacity', '1');
            db.results[0].estadoCalorico = 0;
            localStorage.setItem('db_results_real2', JSON.stringify(db));
        }
        else{
            var retirarEventoDeCriarDieta = `<img src="../images/Diet/segundo-andar1-piramide.png" alt="a">`;
            $('#segundo-1').html(retirarEventoDeCriarDieta);
            $('#segundo-1').css('opacity', '0.5');
        }
    }
    else{
        for(var i = 0; i < db.results[0].blocosArrayFrut.length; i++){
            var blocoEspecifico = db.results[0].blocosArrayFrut[i];
            var arrayDeBlocos = blocoEspecifico.split("&");
            var nome = arrayDeBlocos[0];
            var kcal = arrayDeBlocos[1];
            var gramagem = arrayDeBlocos[2];
            var simbolo = arrayDeBlocos[3];
            var cor = arrayDeBlocos[4];
            blocos += ` <div   style="background-color: ${cor};">
                        <div class='circle'>
                            <i class='${simbolo}'></i>
                        </div>
                        <div class='circle-text'>
                            <span>${nome}</span>
                            <br>
                            <span style="font-size: 1em;">${gramagem}g</span>
                            <br>
                            <span style="font-size: 1em;">${kcal} kcal</span>
                                
                        </div>
                        <div class='circle' onclick="funcaoEatAlimentoFrut('${kcal}','${i}');">
                            <i class="fas fa-utensils"></i>
                        </div>
                        </div>`;
        }
        $('#pre-selecionados').css('display', 'block');
        $('#pre-selecionados').html(blocos);
    }
    
}
//função para atualizar o contador de kcal
function funcaoEatAlimentoFrut(kcal, indice){
    db.results[0].calorias -= kcal;
    db.results[0].blocosArrayFrut.splice(indice, 1);
    dietaBalanceada.criarBlocoKcal(db.results[0].calorias);
    if(db.results[0].blocosArrayFrut.length == 0){
        $('#pre-selecionados').html("");
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    funcaoExibirAlimentosFrut();
}


/*exibir Hortalicas*/
function funcaoExibirAlimentosHort(){
    var blocos = "";
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    
    if(db.results[0].blocosArrayHort.length == 0){
        if(db.results[0].lastLoginDia > dia && db.results[0].lastLoginMes == mes){
            var colocarEventoDeCriarDieta = `<img onclick="funcaoMostrarAlimentosDetalhadamente(2)" src="../images/Diet/segundo-andar-piramide.png" alt="a">`;
            $('#segundo-0').html(colocarEventoDeCriarDieta);
            $('#segundo-0').css('opacity', '1');
            db.results[0].estadoCalorico = 0;
            localStorage.setItem('db_results_real2', JSON.stringify(db));
        }
        else{
            var retirarEventoDeCriarDieta = `<img src="../images/Diet/segundo-andar-piramide.png" alt="a">`;
            $('#segundo-0').html(retirarEventoDeCriarDieta);
            $('#segundo-0').css('opacity', '0.5');
        }
    }
    else{
        for(var i = 0; i < db.results[0].blocosArrayHort.length; i++){
            var blocoEspecifico = db.results[0].blocosArrayHort[i];
            var arrayDeBlocos = blocoEspecifico.split("&");
            var nome = arrayDeBlocos[0];
            var kcal = arrayDeBlocos[1];
            var gramagem = arrayDeBlocos[2];
            var simbolo = arrayDeBlocos[3];
            var cor = arrayDeBlocos[4];
            blocos += ` <div   style="background-color: ${cor};">
                        <div class='circle'>
                            <i class='${simbolo}'></i>
                        </div>
                        <div class='circle-text'>
                            <span>${nome}</span>
                            <br>
                            <span style="font-size: 1em;">${gramagem}g</span>
                            <br>
                            <span style="font-size: 1em;">${kcal} kcal</span>
                                
                        </div>
                        <div class='circle' onclick="funcaoEatAlimentoHort('${kcal}','${i}');">
                            <i class="fas fa-utensils"></i>
                        </div>
                        </div>`;
        }
        $('#pre-selecionados').css('display', 'block');
        $('#pre-selecionados').html(blocos);
    }
    
}
//função para atualizar o contador de kcal
function funcaoEatAlimentoHort(kcal, indice){
    db.results[0].calorias -= kcal;
    db.results[0].blocosArrayHort.splice(indice, 1);
    dietaBalanceada.criarBlocoKcal(db.results[0].calorias);
    if(db.results[0].blocosArrayHort.length == 0){
        $('#pre-selecionados').html("");
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    funcaoExibirAlimentosHort();
}


/*exibir Laticinios*/
function funcaoExibirAlimentosLat(){
    var blocos = "";
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    
    if(db.results[0].blocosArrayLat.length == 0){
        if(db.results[0].lastLoginDia > dia && db.results[0].lastLoginMes == mes){
            var colocarEventoDeCriarDieta = `<img onclick="funcaoMostrarAlimentosDetalhadamente(3)" src="../images/Diet/terceiro-andar2-piramide.png" alt="a">`;
            $('#terceiro-0').html(colocarEventoDeCriarDieta);
            $('#terceiro-0').css('opacity', '1');
            db.results[0].estadoCalorico = 0;
            localStorage.setItem('db_results_real2', JSON.stringify(db));
        }
        else{
            var retirarEventoDeCriarDieta = `<img src="../images/Diet/terceiro-andar2-piramide.png" alt="a">`;
            $('#terceiro-0').html(retirarEventoDeCriarDieta);
            $('#terceiro-0').css('opacity', '0.5');
        }
    }
    else{
        for(var i = 0; i < db.results[0].blocosArrayLat.length; i++){
            var blocoEspecifico = db.results[0].blocosArrayLat[i];
            var arrayDeBlocos = blocoEspecifico.split("&");
            var nome = arrayDeBlocos[0];
            var kcal = arrayDeBlocos[1];
            var gramagem = arrayDeBlocos[2];
            var simbolo = arrayDeBlocos[3];
            var cor = arrayDeBlocos[4];
            blocos += ` <div   style="background-color: ${cor};">
                        <div class='circle'>
                            <i class='${simbolo}'></i>
                        </div>
                        <div class='circle-text'>
                            <span>${nome}</span>
                            <br>
                            <span style="font-size: 1em;">${gramagem}g</span>
                            <br>
                            <span style="font-size: 1em;">${kcal} kcal</span>
                                
                        </div>
                        <div class='circle' onclick="funcaoEatAlimentoLat('${kcal}','${i}');">
                            <i class="fas fa-utensils"></i>
                        </div>
                        </div>`;
        }
        $('#pre-selecionados').css('display', 'block');
        $('#pre-selecionados').html(blocos);
    }
    
}
//função para atualizar o contador de kcal
function funcaoEatAlimentoLat(kcal, indice){
    db.results[0].calorias -= kcal;
    db.results[0].blocosArrayLat.splice(indice, 1);
    dietaBalanceada.criarBlocoKcal(db.results[0].calorias);
    if(db.results[0].blocosArrayLat.length == 0){
        $('#pre-selecionados').html("");
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    funcaoExibirAlimentosLat();
}



/*exibir Laticinios*/
function funcaoExibirAlimentosCarnes(){
    var blocos = "";
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    
    if(db.results[0].blocosArrayCarnes.length == 0){
        if(db.results[0].lastLoginDia > dia && db.results[0].lastLoginMes == mes){
            var colocarEventoDeCriarDieta = `<img onclick="funcaoMostrarAlimentosDetalhadamente(4)" src="../images/Diet/terceiro-andar1-piramide.png" alt="a">`;
            $('#terceiro-1').html(colocarEventoDeCriarDieta);
            $('#terceiro-1').css('opacity', '1');
            db.results[0].estadoCalorico = 0;
            localStorage.setItem('db_results_real2', JSON.stringify(db));
        }
        else{
            var retirarEventoDeCriarDieta = `<img src="../images/Diet/terceiro-andar1-piramide.png" alt="a">`;
            $('#terceiro-1').html(retirarEventoDeCriarDieta);
            $('#terceiro-1').css('opacity', '0.5');
        }
    }
    else{
        for(var i = 0; i < db.results[0].blocosArrayCarnes.length; i++){
            var blocoEspecifico = db.results[0].blocosArrayCarnes[i];
            var arrayDeBlocos = blocoEspecifico.split("&");
            var nome = arrayDeBlocos[0];
            var kcal = arrayDeBlocos[1];
            var gramagem = arrayDeBlocos[2];
            var simbolo = arrayDeBlocos[3];
            var cor = arrayDeBlocos[4];
            blocos += ` <div   style="background-color: ${cor};">
                        <div class='circle'>
                            <i class='${simbolo}'></i>
                        </div>
                        <div class='circle-text'>
                            <span>${nome}</span>
                            <br>
                            <span style="font-size: 1em;">${gramagem}g</span>
                            <br>
                            <span style="font-size: 1em;">${kcal} kcal</span>
                                
                        </div>
                        <div class='circle' onclick="funcaoEatAlimentoCarnes('${kcal}','${i}');">
                            <i class="fas fa-utensils"></i>
                        </div>
                        </div>`;
        }
        $('#pre-selecionados').css('display', 'block');
        $('#pre-selecionados').html(blocos);
    }
    
}
//função para atualizar o contador de kcal
function funcaoEatAlimentoCarnes(kcal, indice){
    db.results[0].calorias -= kcal;
    db.results[0].blocosArrayCarnes.splice(indice, 1);
    dietaBalanceada.criarBlocoKcal(db.results[0].calorias);
    if(db.results[0].blocosArrayCarnes.length == 0){
        $('#pre-selecionados').html("");
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    funcaoExibirAlimentosCarnes();
}


/*exibir Leguminosas*/
function funcaoExibirAlimentosLeg(){
    var blocos = "";
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    
    if(db.results[0].blocosArrayLeg.length == 0){
        if(db.results[0].lastLoginDia > dia && db.results[0].lastLoginMes == mes){
            var colocarEventoDeCriarDieta = `<img onclick="funcaoMostrarAlimentosDetalhadamente(5)" src="../images/Diet/terceiro-andar-piramide.png" alt="a">`;
            $('#terceiro-2').html(colocarEventoDeCriarDieta);
            $('#terceiro-2').css('opacity', '1');
            db.results[0].estadoCalorico = 0;
            localStorage.setItem('db_results_real2', JSON.stringify(db));
        }
        else{
            var retirarEventoDeCriarDieta = `<img src="../images/Diet/terceiro-andar-piramide.png" alt="a">`;
            $('#terceiro-2').html(retirarEventoDeCriarDieta);
            $('#terceiro-2').css('opacity', '0.5');
        }
    }
    else{
        for(var i = 0; i < db.results[0].blocosArrayLeg.length; i++){
            var blocoEspecifico = db.results[0].blocosArrayLeg[i];
            var arrayDeBlocos = blocoEspecifico.split("&");
            var nome = arrayDeBlocos[0];
            var kcal = arrayDeBlocos[1];
            var gramagem = arrayDeBlocos[2];
            var simbolo = arrayDeBlocos[3];
            var cor = arrayDeBlocos[4];
            blocos += ` <div   style="background-color: ${cor};">
                        <div class='circle'>
                            <i class='${simbolo}'></i>
                        </div>
                        <div class='circle-text'>
                            <span>${nome}</span>
                            <br>
                            <span style="font-size: 1em;">${gramagem}g</span>
                            <br>
                            <span style="font-size: 1em;">${kcal} kcal</span>
                                
                        </div>
                        <div class='circle' onclick="funcaoEatAlimentoLeg('${kcal}','${i}');">
                            <i class="fas fa-utensils"></i>
                        </div>
                        </div>`;
        }
        $('#pre-selecionados').css('display', 'block');
        $('#pre-selecionados').html(blocos);
    }
    
}
//função para atualizar o contador de kcal
function funcaoEatAlimentoLeg(kcal, indice){
    db.results[0].calorias -= kcal;
    db.results[0].blocosArrayLeg.splice(indice, 1);
    dietaBalanceada.criarBlocoKcal(db.results[0].calorias);
    if(db.results[0].blocosArrayLeg.length == 0){
        $('#pre-selecionados').html("");
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    funcaoExibirAlimentosLeg();
}


/*exibir Leguminosas*/
function funcaoExibirAlimentosLeg(){
    var blocos = "";
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    
    if(db.results[0].blocosArrayAcucar.length == 0){
        if(db.results[0].lastLoginDia > dia && db.results[0].lastLoginMes == mes){
            var colocarEventoDeCriarDieta = `<img onclick="funcaoMostrarAlimentosDetalhadamente(6)" src="../images/Diet/quarto-andar1-piramide.png" alt="a">`;
            $('#quarto-0').html(colocarEventoDeCriarDieta);
            $('#quarto-0').css('opacity', '1');
            db.results[0].estadoCalorico = 0;
            localStorage.setItem('db_results_real2', JSON.stringify(db));
        }
        else{
            var retirarEventoDeCriarDieta = `<img src="../images/Diet/quarto-andar1-piramide.png" alt="a">`;
            $('#quarto-0').html(retirarEventoDeCriarDieta);
            $('#quarto-0').css('opacity', '0.5');
        }
    }
    else{
        for(var i = 0; i < db.results[0].blocosArrayAcucar.length; i++){
            var blocoEspecifico = db.results[0].blocosArrayAcucar[i];
            var arrayDeBlocos = blocoEspecifico.split("&");
            var nome = arrayDeBlocos[0];
            var kcal = arrayDeBlocos[1];
            var gramagem = arrayDeBlocos[2];
            var simbolo = arrayDeBlocos[3];
            var cor = arrayDeBlocos[4];
            blocos += ` <div   style="background-color: ${cor};">
                        <div class='circle'>
                            <i class='${simbolo}'></i>
                        </div>
                        <div class='circle-text'>
                            <span>${nome}</span>
                            <br>
                            <span style="font-size: 1em;">${gramagem}g</span>
                            <br>
                            <span style="font-size: 1em;">${kcal} kcal</span>
                                
                        </div>
                        <div class='circle' onclick="funcaoEatAlimentoAcucar('${kcal}','${i}');">
                            <i class="fas fa-utensils"></i>
                        </div>
                        </div>`;
        }
        $('#pre-selecionados').css('display', 'block');
        $('#pre-selecionados').html(blocos);
    }
    
}
//função para atualizar o contador de kcal
function funcaoEatAlimentoAcucar(kcal, indice){
    db.results[0].calorias -= kcal;
    db.results[0].blocosArrayAcucar.splice(indice, 1);
    dietaBalanceada.criarBlocoKcal(db.results[0].calorias);
    if(db.results[0].blocosArrayAcucar.length == 0){
        $('#pre-selecionados').html("");
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    funcaoExibirAlimentosAcucar();
}



/*exibir Gorduras*/
function funcaoExibirAlimentosGordu(){
    var blocos = "";
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    
    if(db.results[0].blocosArrayGordu.length == 0){
        if(db.results[0].lastLoginDia > dia && db.results[0].lastLoginMes == mes){
            var colocarEventoDeCriarDieta = `<img onclick="funcaoMostrarAlimentosDetalhadamente(7)" src="../images/Diet/quarto-andar-piramide.png" alt="a">`;
            $('#quarto-1').html(colocarEventoDeCriarDieta);
            $('#quarto-1').css('opacity', '1');
            db.results[0].estadoCalorico = 0;
            localStorage.setItem('db_results_real2', JSON.stringify(db));
        }
        else{
            var retirarEventoDeCriarDieta = `<img src="../images/Diet/quarto-andar-piramide.png" alt="a">`;
            $('#quarto-1').html(retirarEventoDeCriarDieta);
            $('#quarto-1').css('opacity', '0.5');
        }
    }
    else{
        for(var i = 0; i < db.results[0].blocosArrayGordu.length; i++){
            var blocoEspecifico = db.results[0].blocosArrayGordu[i];
            var arrayDeBlocos = blocoEspecifico.split("&");
            var nome = arrayDeBlocos[0];
            var kcal = arrayDeBlocos[1];
            var gramagem = arrayDeBlocos[2];
            var simbolo = arrayDeBlocos[3];
            var cor = arrayDeBlocos[4];
            blocos += ` <div   style="background-color: ${cor};">
                        <div class='circle'>
                            <i class='${simbolo}'></i>
                        </div>
                        <div class='circle-text'>
                            <span>${nome}</span>
                            <br>
                            <span style="font-size: 1em;">${gramagem}g</span>
                            <br>
                            <span style="font-size: 1em;">${kcal} kcal</span>
                                
                        </div>
                        <div class='circle' onclick="funcaoEatAlimentoGordu('${kcal}','${i}');">
                            <i class="fas fa-utensils"></i>
                        </div>
                        </div>`;
        }
        $('#pre-selecionados').css('display', 'block');
        $('#pre-selecionados').html(blocos);
    }
    
}
//função para atualizar o contador de kcal
function funcaoEatAlimentoGordu(kcal, indice){
    db.results[0].calorias -= kcal;
    db.results[0].blocosArrayGordu.splice(indice, 1);
    dietaBalanceada.criarBlocoKcal(db.results[0].calorias);
    if(db.results[0].blocosArrayGordu.length == 0){
        $('#pre-selecionados').html("");
    }
    localStorage.setItem('db_results_real2', JSON.stringify(db));
    funcaoExibirAlimentosGordu();
}
