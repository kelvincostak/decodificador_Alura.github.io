document.addEventListener('DOMContentLoaded', function() {
    let cripto = document.querySelector(".aviso__button__cripto");
    let decripto = document.querySelector(".aviso__button__descripto");
    let textInput = document.querySelector('.text__input__text');
    let output = document.querySelector('.output__text__text');
    let copyButton = document.querySelector('.aviso__button__copy');
    let botaoClicado = false;

    cripto.addEventListener('click', function(event) {
        event.preventDefault();
        criptografarTexto();
        mostrarFeedbackVisual();
        botaoClicado = true;
    });

    decripto.addEventListener('click', function(event) {
        event.preventDefault();
        let text = textInput.value.toLowerCase();
        decriptografarTexto(text);
        mostrarFeedbackVisual();
        botaoClicado = true;
    });

    copyButton.addEventListener('click', function() {
        output.select();
        navigator.clipboard.writeText(output.value).then(() => {
            mostrarFeedbackVisual('Texto copiado com sucesso!');
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
    });

    textInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            criptografarTexto();
            mostrarFeedbackVisual();
            botaoClicado = true;
        }
    });

    output.addEventListener('input', function() {
        if (botaoClicado && output.value.trim() !== '') {
            copyButton.style.display = 'block';
        } else {
            copyButton.style.display = 'none';
        }
    });

    function validarTexto(text) {
        return /^[a-z0-9 ]+$/.test(text);
    }

    function criptografar(text) {
        return text.replace(/[aeiou]/g, function(match) {
            switch (match) {
                case 'a':
                    return 'ai';
                case 'e':
                    return 'enter';
                case 'i':
                    return 'imes';
                case 'o':
                    return 'ober';
                case 'u':
                default:
                    return match;
            }
        });
    }

    function decriptografar(text) {
        return text.replace(/(ai|enter|imes|ober|ufat)/g, function(match) {
            switch (match) {
                case 'ai':
                    return 'a';
                case 'enter':
                    return 'e';
                case 'imes':
                    return 'i';
                case 'ober':
                    return 'o';
                case 'ufat':
                    return 'u';
                default:
                    return match;
            }
        });
    }

    function criptografarTexto() {
        let text = textInput.value.toLowerCase();
        if (!validarTexto(text)) {
            alert("O texto contém caracteres especiais ou acentos. Por favor, insira apenas letras e números sem acento.");
            return;
        }
        let resultCripto = criptografar(text);
        output.value = resultCripto;
        botaoClicado = false;
    }

    function decriptografarTexto(text) {
        if (!validarTexto(text)) {
            alert("O texto contém caracteres especiais ou acentos. Por favor, insira apenas letras e números sem acento.");
            return;
        }
        let resultCripto = decriptografar(text);
        output.value = resultCripto;
        botaoClicado = false;
    }

    function mostrarFeedbackVisual(message) {
        const mensagemSucesso = document.createElement('p');
        mensagemSucesso.textContent = message || 'Texto modificado com Sucesso!';
        mensagemSucesso.classList.add('mensagem-sucesso');
        document.body.appendChild(mensagemSucesso);

        setTimeout(function() {
            mensagemSucesso.remove();
        }, 3000);
    }
});
