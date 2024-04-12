// Função para exibir uma face aleatória no dado do computador
const showRandomFace = (diceElement) => {
    const randomFaceIndex = Math.floor(Math.random() * 6); // Gera um índice aleatório entre 0 e 5
    const faces = ['front', 'back', 'top', 'bottom', 'right', 'left']; // Array com as classes das faces do dado
    const randomFaceClass = faces[randomFaceIndex]; // Seleciona uma classe de face aleatória
    diceElement.classList.add(randomFaceClass); // Adiciona a classe ao dado do computador
}

// Variável para armazenar o último resultado do dado do computador
let lastComputerRoll = null;

// Função para rolar o dado do computador
const rollComputerDice = (diceElement) => {
    // Gerando um número aleatório de 1 a 6
    const random = Math.floor(Math.random() * 6) + 1;
    lastComputerRoll = random; // Armazenando o resultado do dado do computador
    // Chamando a função para rolar o dado com o resultado gerado
    rollDice(diceElement, random);
}

// Função para rolar o dado
const rollDice = (diceElement, result) => {
    // Remover classes de face para garantir consistência ao atualizar
    const faces = ['front', 'back', 'top', 'bottom', 'right', 'left'];
    faces.forEach(face => diceElement.classList.remove(face));

    // Gerar uma face aleatória ao carregar a página ou quando o jogador rolar o dado
    showRandomFace(diceElement);

    // Configurando a animação de rotação do dado
    diceElement.style.animation = 'rolling 4s';

    // Removendo a animação após 4 segundos e rotacionando o dado conforme o número gerado ou resultado passado
    setTimeout(() => {
        diceElement.style.animation = ''; // Removendo a animação
        // Rotacionando o dado de acordo com o número gerado ou resultado passado
        switch (result) {
            case 1: diceElement.style.transform = 'rotateX(0deg) rotateY(0deg)'; break;
            case 2: diceElement.style.transform = 'rotateX(-90deg) rotateY(0deg)'; break;
            case 3: diceElement.style.transform = 'rotateX(90deg) rotateY(0deg)'; break;
            case 4: diceElement.style.transform = 'rotateX(0deg) rotateY(90deg)'; break;
            case 5: diceElement.style.transform = 'rotateX(0deg) rotateY(-90deg)'; break;
            case 6: diceElement.style.transform = 'rotateX(180deg) rotateY(0deg)'; break;
            default: break; // No caso de um número inválido
        }
    }, 3000); // Tempo para aguardar antes de parar a animação
}

// Função para iniciar a animação do dado do computador quando a página é carregada
const animateComputerDice = () => {
    const computerDice = document.getElementById('computer-dice');
    rollComputerDice(computerDice);
    document.getElementById('dice-sound').play()
}

// Adicionando event listener para executar a função de animação do dado do computador quando a página é carregada
window.addEventListener('load', animateComputerDice);

// Obtendo referências aos elementos HTML relevantes
const playerDice = document.getElementById('player-dice'); // Dado do jogador
const playerRollBtn = document.getElementById('player-roll'); // Botão de rolar dados do jogador
const resultMessage = document.getElementById('result-message'); // Mensagem de resultado
const restartBtn = document.getElementById('restart-btn'); // Botão de reiniciar

// Adicionando event listener ao botão de rolar dados do jogador
playerRollBtn.addEventListener('click', () => {
const playerRoll = Math.floor(Math.random() * 6) + 1; // Gerando o resultado do dado do jogador
rollDice(playerDice, playerRoll); // Rolar o dado do jogador com o resultado gerado
document.getElementById('dice-sound').play();


// Remover a mensagem anterior antes de exibir a nova mensagem
resultMessage.innerText = '';

// Esperar 4 segundos (duração da animação) antes de verificar o resultado
setTimeout(() => {
// Verificando se o resultado do jogador é igual ao do computador
if (playerRoll === lastComputerRoll) {
    resultMessage.innerText = 'Parabéns! Você acertou!';
    restartBtn.style.display = 'block'; // Exibindo o botão de reiniciar

    // Reproduzindo o som de vitória
    const victorySound = document.getElementById('triumphant');
    victorySound.play();

} else {
    resultMessage.innerText = 'Que pena! Você errou.';
    restartBtn.style.display = 'block'; // Exibindo o botão de reiniciar
}
}, 4000); // Tempo para aguardar antes de verificar o resultado
});