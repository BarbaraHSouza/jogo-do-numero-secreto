//let titulo = document.querySelector('h1') //necessario ter isso para se ligar ao HTML que foi indexado.
//titulo.innerHTML =  ('Número secreto') //innerHTML indica que e dentro do HTML
//let paragrafo = document.querySelector('p')
//paragrafo.innerHTML = ('Digite um número de 1 a 10:')

//A FORMA ACIMA E UM JEITO DE FAZER TAMBEM, SO MENOS FACIL.
let listaNumeroSorteado = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


//O QUE FAZ O TEXTO SER EXIBIDO NA TELA
function exibirTextoNaTela(tag, text){ //necessario ter isso para se ligar ao HTML que foi indexado.
    let campo = document.querySelector(tag); //innerHTML indica que e dentro do HTML
    campo.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2})
}
//A FUNCAO QUE FALA QUAL TEXTO SERA EXIBIDO
function mensagemInicial(){
    exibirTextoNaTela('h1', 'Número secreto');// ASSIM PODE FAZER A FUNCAO SEMPRE EM UMA UNICA LINHA E NAO 3, O QUE FACILITA
    exibirTextoNaTela('p',`Digite um número de 1 a ${numeroLimite}:`);
}

mensagemInicial();


//O QUE OCORRE QUANDO CLICA NO BOTAO CHUTE.
function verificarChute () {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!!')
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns!! Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');//o document esta diferente no pos (get...) porque e um elemento.
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('p', 'POXA! O número secreto é maior.')
        } else {
            exibirTextoNaTela('p', 'OH NÃO! O número secreto é menor.')
        }
        tentativas++;
        limparCampo();
    }
}

//A FUNCAO PARA CRIAR UM CHUTE ALEATORIO
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumeroSorteado.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaNumeroSorteado = [];
    }

    if(listaNumeroSorteado.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio()
    } else {
        listaNumeroSorteado.push(numeroEscolhido); //aqui voce vai incluir os numeros na lista ou ela vai ficar sempre vazia.
        console.log(listaNumeroSorteado);
        return numeroEscolhido;
        }
}

function limparCampo() {
    chute = document.querySelector('input');//nao precisa puxar o value porque ja fez la em cima.
    chute.value = ''; // aqui puxou porque esta dizendo o que esta sendo alterado.
}

//O QUE OCORRE QUANDO CLICA NO BOTAO REINICIAR XD
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo()
    tentativas = 1
    mensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true); //e true porque o disabled esta sim habilitado.
}
