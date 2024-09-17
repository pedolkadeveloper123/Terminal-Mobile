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
        printToOutput('Login bem-sucedido.\nBem-vindo ao terminal, Sr Pedro H Developer.\n', 'success');
    } else {
        loginErrorElement.textContent = 'Usuário ou senha inválidos. Mais uma tentativa.';
    }
}

function handleCommand(command) {
    const [cmd, ...args] = command.split(' ');
    let response = '';

    switch (cmd.toLowerCase()) {
        case 'hack':
            simulateTyping('Iniciando o hackeamento...\nVerificando sistemas...\nExplorando vulnerabilidades...\nPorta aberta n 04.\n', 100);
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
        case 'alerta':
            simulateTyping('ALERTA: Atividade suspeita detectada. Verifique as conexões de rede.\n', 'error');
            break;
        case 'logs':
            simulateTyping('Logs recentes:\n\n[2024-09-16 12:34:56] Sistema iniciado.\n[2024-09-16 12:35:12] Varredura de segurança completa.\n[2024-09-16 12:36:45] Conexão externa detectada.\n', 50);
            break;
        case 'backup':
            simulateTyping('Criando backup...\nBackup concluído com sucesso. Arquivo: backup_2024-09-16.zip\n', 50);
            break;
        case 'network':
            simulateTyping('Dispositivos conectados:\n\n1. 192.168.1.5 - Laptop\n2. 192.168.1.6 - Impressora\n3. 192.168.1.7 - Smartphone\n', 50);
            break;
        case 'update':
            simulateTyping('Verificando atualizações...\nAtualizações encontradas.\nAplicando atualizações...\nAtualizações aplicadas com sucesso.\n', 50);
            break;
        case 'challenge':
            simulateTyping('Desafio de segurança: Resolva a equação para continuar.\n5 + 3 = ?\n', 50);
            break;
        case 'stats':
            simulateTyping('Estatísticas do Sistema:\n\nUso de CPU: 30%\nUso de Memória: 60%\nEspaço em Disco: 50GB livre de 200GB\n', 50);
            break;
        case 'ls':
            simulateTyping('Documentos\nImagens\nVídeos\nDownloads\n', 50);
            break;
        case 'troubleshoot':
            simulateTyping('Resolução de problemas em andamento...\nVerificando conexão...\nConexão restabelecida com sucesso.\n', 50);
            break;
        case 'color':
            if (args[0] === 'blue') {
                document.body.style.color = 'blue';
                printToOutput('Cor do texto alterada para azul.\n', 'success');
            } else if (args[0] === 'red') {
                document.body.style.color = 'red';
                printToOutput('Cor do texto alterada para vermelho.\n', 'success');
            } else {
                printToOutput('Cor não reconhecida. Use "color blue" ou "color red".\n', 'error');
            }
            break;
        case 'help':
            simulateTyping('Comandos disponíveis:\n- hack\n- status\n- scan\n- exploit\n- ipconfig\n- fix [problema]\n- alerta\n- logs\n- backup\n- network\n- update\n- challenge\n- stats\n- ls\n- troubleshoot\n- color [cor]\n- help\n', 50);
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
