Parte 1: Subindo o Servidor (Backend) --> https://github.com/SmartCondo-Org/SmartCondo-Back
O Backend é o "motor" da aplicação. Ele precisa estar ligado para que a interface consiga ler e gravar dados.

Parte 2: Subindo a Interface (Frontend)
O Frontend é a tela com a qual os usuários e gestores vão interagir.

Abra uma nova aba/janela do terminal (deixando o terminal do backend aberto e rodando) e navegue até a pasta do frontend (smartcondo).

Instale as dependências do frontend:

Bash
npm install
Inicie a aplicação no navegador:

Bash
npm run dev
O que deve aparecer no terminal: O endereço local (por exemplo, http://localhost:5173). Basta segurar a tecla Ctrl e clicar no link para a aplicação abrir no navegador.

Parte 3: Roteiro de Testes e Demonstração
Ao abrir a página no navegador (http://localhost:5173), o sistema apresentará a tela de login para validação da LGPD e autenticação.

1. Acesso Inicial
Utilize o e-mail e a senha do Administrador (definidos previamente na configuração do banco de dados) para entrar no sistema.

2. Validando o Módulo Financeiro
Navegue até a aba Financeiro no menu lateral.

Clique no botão "Nova Transação", preencha o formulário com uma Receita ou Despesa e salve.

O extrato financeiro será atualizado imediatamente, recalculando o saldo total em tempo real através da integração com o banco de dados.

3. Validando o Módulo de Ocorrências
Navegue até a aba Ocorrências no menu lateral.

Visualize os chamados já abertos ou clique em "Registrar Chamado" para abrir uma nova ocorrência, definindo título, descrição e gravidade.

A listagem será atualizada na hora, demonstrando a persistência dos dados.

4. Demonstrando a Responsividade
Reduza a largura da janela do navegador (ou utilize a ferramenta de inspecionar elemento simulando um dispositivo móvel).

O menu lateral recolherá perfeitamente para o padrão de menu gaveta, provando que a interface se adapta a diferentes tamanhos de tela.
