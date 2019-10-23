const res = document.getElementsByClassName('resultado')[0];
const formulario = document.getElementsByTagName('form')[0];
const imagem = document.getElementById('img');
const esconder = 'esconder';
const mostrar = 'mostrar';

function funcaoClassificar(){
    var peso = document.getElementById('peso');
    var altura = document.getElementById('altura');
    var pesoDaPessoa = Number(peso.value);
    var alturaDaPessoa = Number(altura.value);
    var shake = "shake";
    var imc = pesoDaPessoa / (alturaDaPessoa * alturaDaPessoa);
    var imcArredondado = parseFloat(imc.toFixed(0))

    if(imc < 0){
        res.innerHTML = "Erro Não existe imc negativo !!! seu imc é de " + imc;
    }
    else{
        if(imc < 17){
			var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite1.png"}"/>`;  //peso extremamente baixo coma mais !!!
        }
        else{
            if(imc <= 18.49){
                var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite2.png"}"/>`; // peso abaixo da media coma um pouco mais !!!
            }
            else{
                if(imc <= 24.99){
                    var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite3.png"}"/>`; // peso normal mantenha !!! a saúde
                }
                else{
                    if(imc <= 29.99){
                        var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite4.png"}"/>`; // peso ligeiramente acima da média!!!
                    }
                    else{
                        if(imc <= 34.99){
                            var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite5.png"}"/>`; //Pessoa com nível de obesidade 1
                        }
                        else{
                            if(imc <= 39.99){
                                var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite6.png"}"/>`; //Pessoa com nível de obesidade 2
                            }
                            else{
                                var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite7.png"}"/>`; //Pessoa com nível de obesidade 3
                            }
                        }
                    }
                }
            }
        }
    }
	document.getElementById('resultado').innerHTML = conteudo;
}
