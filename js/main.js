//calcula tamanho da frase
var frase = $(".frase").text()
var numPalavras = frase.split(" ").length

var tempo = $("#tempo")
var tempoInicial = tempo.text()

//pega o tamanho da frase e bota na tela
var tamanhoFrase = $("#tamanho-frase")
tamanhoFrase.text(numPalavras)

var campo = $("#campo-digitacao")
campo.on("input", function(){
    var frase = campo.val()
    var numeroCaracteres = frase.trim().replace(/\s+/g,'').replace( /\W\s/g , '').length

    $("#caracteres-digitados").text(numeroCaracteres)

    var nPalavras = frase.trim().match(/(\w|\s)*\w(?=")|[\w\u00C0-\u00FF]+/ig).length
    console.log(nPalavras)
    $("#palavras-digitadas").text(nPalavras)
})

campo.on("focus", function(){
    var cronometro = setInterval(function(){
        var tempoRestante = tempo.text()
        if(tempoRestante <= 0){
            campo.attr("disabled", true)
            clearInterval(cronometro)
            nome = $("#player").val()
            palavrasDigitadas = $("#palavras-digitadas").text()
            pontuacao = palavrasDigitadas/tempoInicial*60
            if(nome.trim().length == 0){
                $('#tabela-resultado').append('<tr><td><i>Guest</i></td><td>'+pontuacao+' <span>ppm</span></td></tr>')
            }else{
                $('#tabela-resultado').append('<tr><td>'+nome+'</td><td>'+pontuacao+' <span>ppm</span></td></tr>')
            }
            $(".progress .progress-bar").css("width","100%")
        }else{
            porcentagem = (tempoRestante/tempoInicial * 100) + "%"
            console.log(porcentagem)
            $(".progress .progress-bar").css("width", porcentagem)
            tempoRestante--
            tempo.text(tempoRestante)
        }
        console.log(tempoRestante)
    }, 1000)
})

$("#reset").on("click", function(){
    campo.attr("disabled", false)
    campo.val("")
    $("#player").val("")
    $("#caracteres-digitados").text("0")
    $("#palavras-digitadas").text("0")
    $("#tempo").text(tempoInicial)
})
