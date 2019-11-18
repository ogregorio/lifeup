function funcaoUmidade(){
    var lista = $("#listacdd").val().split(" ");
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4&&xmlhttp.status==200){
            var dado = xmlhttp.responseXML.documentElement.querySelector("umidade").textContent;
            alert ("Valor: " + dado)
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

