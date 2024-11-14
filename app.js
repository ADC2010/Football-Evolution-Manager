const leagues = {
    "Brasil": [],
    "Espanha": []
};

let currentTeam = null;
let players = []; // Array para armazenar os jogadores
let matchHistory = []; // Histórico de jogos

const playerNames = ['Lucas', 'Boliche', 'Djalma', 'Hernandez', 'Carlos', 'Ramon', 'Eduardo', 'Marcos', 'Felipe', 'Gabriel'];

// Função para criar time
document.getElementById('register-team').addEventListener('click', () => {
    const teamName = document.getElementById('team-name').value;
    const country = document.getElementById('team-country').value;
    const teamColor = document.getElementById('team-color').value;
    const stadiumName = document.getElementById('stadium-name').value;

    if (teamName.trim() === "" || stadiumName.trim() === "") {
        alert("Por favor, insira um nome para o time e para o estádio.");
        return;
    }

    currentTeam = {
        name: teamName,
        country: country,
        color: teamColor,
        estadio: {
            nome: stadiumName,
            capacidade: 10000  // Capacidade do estádio
        },
        caixa: 10000000,  // 10 milhões
        jogos: 0,
        vitorias: 0,
        derrotas: 0,
        pontos: 0,
        torcedores: 100, // Todo time começa com 100 torcedores
    };

    // Gerar jogadores aleatórios
    generatePlayers(11); // Gerar 11 jogadores para o time

    // Adiciona o time à liga correspondente
    leagues[country].push(currentTeam);

    // Atualiza a interface
    document.getElementById('team-creation').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    renderHome();
    updateTable();
});

function generatePlayers(num) {
    const positions = ['Goleiro', 'Zagueiro', 'Lateral', 'Meio-Campo', 'Volante', 'Atacante'];
    for (let i = 0; i < num; i++) {
        const playerName = playerNames[i % playerNames.length];
        const position = positions[Math.floor(Math.random() * positions.length)];
        const ger = Math.floor(Math.random() * 56) + 45; // GER aleatório entre 45 e 100
        const injured = Math.random() < 0.2; // 20% de chance do jogador estar lesionado
        players.push({ nome: playerName, posicao: position, GER: ger, lesionado: injured });
    }
}

function renderHome() {
    document.getElementById('club-name').innerText = `Nome do Clube: ${currentTeam.name}`;
    document.getElementById('stadium-info').innerText = `Estádio: ${currentTeam.estadio.nome} (Capacidade: ${currentTeam.estadio.capacidade})`;

    // Formatar a exibição do saldo financeiro
    document.getElementById('team-cash').innerText = `Caixa do time: R$ ${currentTeam.caixa.toLocaleString()}`;
}

function updateTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Limpa a tabela antes de atualizar

    leagues["Brasil"].forEach((team) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${team.jogos}</td>
            <td>${team.vitorias}</td>
            <td>${team.derrotas}</td>
            <td>${team.pontos}</td>
        `;
        tableBody.appendChild(row);
