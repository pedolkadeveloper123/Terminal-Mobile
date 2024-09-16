const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');
const loginDiv = document.getElementById('login');
const terminalDiv = document.getElementById('terminal');
const loginErrorElement = document.getElementById('login-error');

const validUsername = 'pedro';
const validPassword = '2803';

const commandHistory = [];
let historyIndex = -1;

function printToOutput(text, type = 'default') {
    const span = document.createElement('span');
    span.textContent = text + '\n';
    span.className = type;
    outputElement.appendChild(span);
    outputElement.scrollTop = outputElement.scrollHeight;
}

function simulateTyping(text, delay, callback) {
    let index = 0;
    const interval = setInterval(() => {
        outputElement.lastChild.textContent = text.slice(0, index + 1);
        index++;
        if (index >= text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, delay);
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        loginDiv.style.display = 'none';
        terminalDiv.style.display = 'block';
        printToOutput('Login bem-sucedido.\nBem-vindo de volta Sr Pedro Developer.\n', 'success');
    } else {
        loginErrorElement.textContent = 'Usuário ou senha inválidos. Tente novamente.';
    }
}

function handleCommand(command) {
    const [cmd, ...args] = command.split(' ');
    let response = '';

    switch (cmd.toLowerCase()) {
        case 'hack':
            simulateTyping('Iniciando o hackeamento...\nVerificando sistemas...\nExplorando vulnerabilidades...\nAcesso concedido.\n', 100);
            break;
        case 'status':
            simulateTyping('Status: Sistema seguro.\nNenhuma ameaça detectada.\n', 50);
            break;
        case 'scan':
            simulateTyping('Iniciando varredura...\nAmeaças encontradas: 0\n', 50);
            break;
        case 'exploit':
            simulateTyping('Explorando vulnerabilidades...\nVulnerabilidade encontrada: 1\nTentando exploração...\nExploração bem-sucedida.\n', 100);
            break;
        case 'ipconfig':
            simulateTyping('Configuração de IP:\n\nAdaptador Ethernet:\n  Endereço IP: 192.168.1.10\n  Máscara de Sub-rede: 255.255.255.0\n  Gateway Padrão: 192.168.1.1\n\nAdaptador Wi-Fi:\n  Endereço IP: 192.168.0.10\n  Máscara de Sub-rede: 255.255.255.0\n  Gateway Padrão: 192.168.0.1\n', 50);
            break;
        case 'fix':
            if (args.length === 0) {
                simulateTyping('Erro: Nenhum problema especificado. Use "fix [problema]" para especificar um problema a ser corrigido.\n', 'error');
            } else {
                const issue = args.join(' ');
                simulateTyping(`Corrigindo problema: "${issue}"...\nDetectando falhas...\nAplicando correções...\nProblema "${issue}" corrigido com sucesso.\n`, 100);
            }
            break;
        case 'help':
            simulateTyping('Comandos disponíveis:\n- hack\n- status\n- scan\n- exploit\n- ipconfig\n- fix [problema]\n- help\n', 50);
            break;
        default:
            simulateTyping('Comando não reconhecido.\nDigite "help" para ver a lista de comandos.\n', 'error', () => {
                printToOutput('Digite um comando para continuar:');
            });
            break;
    }
}

inputElement.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = inputElement.value.trim();
        inputElement.value = '';

        printToOutput('> ' + command);
        handleCommand(command);

        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }
    }
});

inputElement.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            inputElement.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputElement.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            inputElement.value = '';
        }
    }
});
