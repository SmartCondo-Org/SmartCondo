import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { 
  LayoutDashboard, Building2, DollarSign, AlertTriangle, CheckCircle2, 
  Menu, X, Clock, ShieldCheck, Trash2, Lock, MessageSquare,
  TrendingUp, ArrowUpRight, ArrowDownRight, LogOut, Download, Plus
} from 'lucide-react';

const App = () => {
  // --- ESTADOS GERAIS ---
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('@SmartCondo:token'));
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [userSettings, setUserSettings] = useState({ showPhoneToNeighbors: false, showEmailToNeighbors: false });
  
  // --- ESTADOS DE DADOS REAIS DO BACKEND ---
  const [ocorrencias, setOcorrencias] = useState([]);
  const [transacoes, setTransacoes] = useState([]);

  // --- ESTADOS DOS MODAIS DE CRIAÇÃO ---
  const [isModalTransacaoOpen, setIsModalTransacaoOpen] = useState(false);
  const [novaTransacao, setNovaTransacao] = useState({ tipo: 'Despesa', valor: '', descricao: '', data_vencimento: '' });

  const [isModalOcorrenciaOpen, setIsModalOcorrenciaOpen] = useState(false);
  const [novaOcorrencia, setNovaOcorrencia] = useState({ titulo: '', descricao: '', gravidade: 'Media' });

  // --- CÁLCULOS DINÂMICOS ---
  const saldoTotal = transacoes.reduce((acc, t) => t.tipo === 'Receita' ? acc + Number(t.valor) : acc - Number(t.valor), 0);
  const totalReceitas = transacoes.reduce((acc, t) => t.tipo === 'Receita' ? acc + Number(t.valor) : acc, 0);
  const totalDespesas = transacoes.reduce((acc, t) => t.tipo === 'Despesa' ? acc + Number(t.valor) : acc, 0);
  const ocorrenciasAbertas = ocorrencias.filter(o => o.status !== 'Resolvida').length;

  // --- FUNÇÕES DE API (CARREGAMENTO) ---
  const carregarDados = () => {
    if (isAuthenticated) {
      api.get('/ocorrencias').then(res => setOcorrencias(res.data)).catch(console.error);
      api.get('/financeiro?id_condominio=1').then(res => setTransacoes(res.data)).catch(console.error);
    }
  };

  useEffect(() => { carregarDados(); }, [isAuthenticated, activeTab]);

  // --- FUNÇÕES DE API (AÇÕES) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email: loginEmail, senha: loginSenha });
      localStorage.setItem('@SmartCondo:token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      alert('Erro ao entrar. Verifique as credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('@SmartCondo:token');
    setIsAuthenticated(false);
  };

  const handleCriarTransacao = async (e) => {
    e.preventDefault();
    try {
      await api.post('/financeiro', {
        id_condominio: 1,
        tipo: novaTransacao.tipo,
        valor: Number(novaTransacao.valor),
        descricao: novaTransacao.descricao,
        data_vencimento: new Date(novaTransacao.data_vencimento).toISOString()
      });
      setIsModalTransacaoOpen(false);
      setNovaTransacao({ tipo: 'Despesa', valor: '', descricao: '', data_vencimento: '' });
      carregarDados();
    } catch (error) {
      alert('Erro ao registrar transação.');
    }
  };

  const handleCriarOcorrencia = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ocorrencias', {
        id_apartamento: 13, // O apartamento que mapeamos no banco
        titulo: novaOcorrencia.titulo,
        descricao: novaOcorrencia.descricao,
        gravidade: novaOcorrencia.gravidade
      });
      setIsModalOcorrenciaOpen(false);
      setNovaOcorrencia({ titulo: '', descricao: '', gravidade: 'Media' });
      carregarDados();
    } catch (error) {
      alert('Erro ao registrar ocorrência.');
    }
  };

  // --- COMPONENTES DE UI ---
  const SidebarItem = ({ id, icon, label }) => (
    <button
      onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
      className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
        activeTab === id ? 'bg-blue-700 text-white shadow-lg' : 'text-slate-800 hover:bg-blue-100 font-bold'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const Header = ({ title, subtitle }) => (
    <div className="mb-8 mt-4 md:mt-0">
      <h1 className="text-4xl font-black text-slate-900 leading-tight mb-2">{title}</h1>
      <p className="text-slate-800 font-bold text-lg">{subtitle}</p>
    </div>
  );

  const DashboardCard = ({ title, value, icon, color, bg }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between h-full min-h-[140px] w-full">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-3 rounded-xl ${bg} ${color}`}>{icon}</div>
      </div>
      <div>
        <p className="text-sm text-slate-800 font-black uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 break-words">{value}</h3>
      </div>
    </div>
  );

  // --- RENDERIZADORES DAS TELAS ---
  const renderDashboard = () => (
    <div className="w-full">
      <Header title="Painel Dinâmico" subtitle="Métricas baseadas em dados reais do seu condomínio." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 w-full">
        <DashboardCard title="Saldo Atual" value={`R$ ${saldoTotal.toFixed(2)}`} icon={<DollarSign size={24} />} color="text-green-700" bg="bg-green-100" />
        <DashboardCard title="Receitas" value={`R$ ${totalReceitas.toFixed(2)}`} icon={<TrendingUp size={24} />} color="text-blue-700" bg="bg-blue-100" />
        <DashboardCard title="Despesas" value={`R$ ${totalDespesas.toFixed(2)}`} icon={<ArrowDownRight size={24} />} color="text-red-700" bg="bg-red-100" />
        <DashboardCard title="Em Aberto" value={ocorrenciasAbertas} icon={<AlertTriangle size={24} />} color="text-orange-700" bg="bg-orange-100" />
      </div>
    </div>
  );

  const renderFinanceiro = () => (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Header title="Livro Caixa" subtitle="Gerencie as transações financeiras." />
        <button 
          onClick={() => setIsModalTransacaoOpen(true)}
          className="bg-blue-700 text-white px-6 py-3 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-800 w-full sm:w-auto"
        >
          <Plus size={20} /> Nova Transação
        </button>
      </div>
      
      <div className="bg-white p-6 md:p-8 rounded-[32px] border-2 border-slate-200 shadow-md w-full">
        <h3 className="font-black text-slate-900 text-xl mb-6">Extrato Real</h3>
        <div className="space-y-4">
          {transacoes.length === 0 ? <p className="text-slate-800 font-bold">Nenhuma transação lançada no sistema.</p> : null}
          {transacoes.map(t => (
            <div key={t.id_transacao} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${t.tipo === 'Receita' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {t.tipo === 'Receita' ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base">{t.descricao}</h4>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-tighter">
                    Vencimento: {new Date(t.data_vencimento).toLocaleDateString('pt-BR')} • {t.status_pagamento}
                  </p>
                </div>
              </div>
              <span className={`text-xl font-black ${t.tipo === 'Receita' ? 'text-green-700' : 'text-slate-900'} sm:text-right`}>
                {t.tipo === 'Receita' ? '+' : '-'} R$ {Number(t.valor).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOcorrencias = () => (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Header title="Ocorrências" subtitle="Chamados abertos pela comunidade." />
        <button 
          onClick={() => setIsModalOcorrenciaOpen(true)}
          className="bg-blue-700 text-white px-6 py-3 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-800 w-full sm:w-auto"
        >
          <Plus size={20} /> Registrar Chamado
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full">
        {ocorrencias.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 text-center">
            <CheckCircle2 className="mx-auto text-green-600 mb-4" size={48} />
            <p className="text-slate-900 font-black text-lg">Nenhuma ocorrência registrada.</p>
          </div>
        ) : null}

        {ocorrencias.map(oc => (
          <div key={oc.id_ocorrencia} className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${oc.gravidade === 'Alta' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'}`}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700">Chamado #{oc.id_ocorrencia}</span>
                  <h3 className="text-xl font-black text-slate-900">{oc.titulo}</h3>
                </div>
              </div>
              <span className={`text-sm font-black px-4 py-2 rounded-full ${oc.status === 'Resolvida' ? 'bg-green-200 text-green-900' : 'bg-blue-200 text-blue-900'}`}>
                {oc.status}
              </span>
            </div>
            <p className="text-slate-800 font-bold mb-6 bg-slate-100 p-4 rounded-2xl border border-slate-300 text-base">{oc.descricao}</p>
            <div className="flex text-sm font-black text-slate-700 gap-4">
              <span className="flex items-center gap-1"><Clock size={16} /> Aberto em: {new Date(oc.data_criacao).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- BLOQUEIO DE SEGURANÇA: TELA DE LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-900">
        <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-2xl border border-slate-200 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-700 p-4 rounded-2xl text-white shadow-lg shadow-blue-300">
              <Building2 size={40} />
            </div>
          </div>
          <h2 className="text-4xl font-black text-center mb-2 tracking-tight text-slate-900">SmartCondo</h2>
          <p className="text-slate-800 text-center font-bold mb-8 text-lg">Acesso à Plataforma MVP</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-black text-slate-800 uppercase tracking-widest mb-1 block">E-mail</label>
              <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-4 bg-slate-100 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500 outline-none font-bold text-slate-900"
                placeholder="admin@smartcondo.com" required />
            </div>
            <div>
              <label className="text-sm font-black text-slate-800 uppercase tracking-widest mb-1 block">Palavra-passe</label>
              <input type="password" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)}
                className="w-full px-4 py-4 bg-slate-100 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500 outline-none font-bold text-slate-900"
                placeholder="********" required />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-700 text-white py-5 rounded-xl font-black text-xl shadow-xl shadow-blue-300 hover:bg-blue-800 transition-all mt-6">
              {loading ? 'A carregar...' : 'Entrar no Sistema'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- TELA PRINCIPAL RESPONSIVA ---
  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-900 antialiased overflow-x-hidden w-full relative">
      
      {/* --- MODAIS --- */}
      {isModalTransacaoOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900">Nova Transação</h2>
              <button onClick={() => setIsModalTransacaoOpen(false)} className="text-slate-500 hover:text-red-500"><X size={24} /></button>
            </div>
            <form onSubmit={handleCriarTransacao} className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-800 uppercase mb-1 block">Tipo</label>
                <select value={novaTransacao.tipo} onChange={(e) => setNovaTransacao({...novaTransacao, tipo: e.target.value})} className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500">
                  <option value="Despesa">Despesa</option>
                  <option value="Receita">Receita</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black text-slate-800 uppercase mb-1 block">Descrição</label>
                <input type="text" value={novaTransacao.descricao} onChange={(e) => setNovaTransacao({...novaTransacao, descricao: e.target.value})} className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-slate-800 uppercase mb-1 block">Valor (R$)</label>
                  <input type="number" step="0.01" value={novaTransacao.valor} onChange={(e) => setNovaTransacao({...novaTransacao, valor: e.target.value})} className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-800 uppercase mb-1 block">Data Vencimento</label>
                  <input type="date" value={novaTransacao.data_vencimento} onChange={(e) => setNovaTransacao({...novaTransacao, data_vencimento: e.target.value})} className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-700 text-white py-4 rounded-xl font-black text-lg mt-4 hover:bg-blue-800">Salvar Transação</button>
            </form>
          </div>
        </div>
      )}

      {isModalOcorrenciaOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900">Novo Chamado</h2>
              <button onClick={() => setIsModalOcorrenciaOpen(false)} className="text-slate-500 hover:text-red-500"><X size={24} /></button>
            </div>
            <form onSubmit={handleCriarOcorrencia} className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-800 uppercase mb-1 block">Tópico</label>
                <input type="text" placeholder="Ex: Lâmpada Queimada" value={novaOcorrencia.titulo} onChange={(e) => setNovaOcorrencia({...novaOcorrencia, titulo: e.target.value})} className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500" required />
              </div>
              <div>
                <label className="text-xs font-black text-slate-800 uppercase mb-1 block">Descrição Detalhada</label>
                <textarea rows="3" value={novaOcorrencia.descricao} onChange={(e) => setNovaOcorrencia({...novaOcorrencia, descricao: e.target.value})} className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500" required></textarea>
              </div>
              <div>
                <label className="text-xs font-black text-slate-800 uppercase mb-1 block">Gravidade</label>
                <select value={novaOcorrencia.gravidade} onChange={(e) => setNovaOcorrencia({...novaOcorrencia, gravidade: e.target.value})} className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500">
                  <option value="Baixa">Baixa</option>
                  <option value="Media">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-700 text-white py-4 rounded-xl font-black text-lg mt-4 hover:bg-blue-800">Abrir Chamado</button>
            </form>
          </div>
        </div>
      )}

      {/* Consent Modal LGPD */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-8 shadow-2xl border-4 border-blue-100">
            <div className="bg-blue-700 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <ShieldCheck className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Privacidade SmartCondo</h2>
            <p className="text-slate-800 mb-8 font-bold text-lg">Para continuar, aceite o processamento de seus dados pessoais em total conformidade com a LGPD.</p>
            <button onClick={() => setShowConsentModal(false)} className="w-full bg-blue-700 text-white py-5 rounded-[20px] text-xl font-black shadow-xl hover:bg-blue-800 transition-all">Aceitar e Continuar</button>
          </div>
        </div>
      )}

      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r-2 border-slate-200 p-6 flex flex-col h-full transform transition-transform duration-300 md:relative md:translate-x-0 shadow-2xl md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-700 p-3 rounded-xl text-white shadow-lg"><Building2 size={24} /></div>
            <span className="font-black text-2xl tracking-tighter text-slate-900">SMARTCONDO</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-slate-800 hover:bg-slate-200 rounded-full"><X size={24} /></button>
        </div>

        <nav className="space-y-4 flex-1">
          <SidebarItem id="dashboard" icon={<LayoutDashboard size={24} />} label="Painel Geral" />
          <SidebarItem id="financeiro" icon={<DollarSign size={24} />} label="Financeiro" />
          <SidebarItem id="conflitos" icon={<MessageSquare size={24} />} label="Ocorrências" />
        </nav>

        <div className="mt-4 pt-4 border-t-2 border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 p-4 bg-red-100 text-red-800 hover:bg-red-200 rounded-xl font-black transition-all">
            <LogOut size={20} /> <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <header className="md:hidden bg-white px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between z-20">
          <div className="flex items-center gap-2"><Building2 className="text-blue-700" size={28} /><span className="font-black text-2xl text-slate-900">SMARTCONDO</span></div>
          <button onClick={() => setSidebarOpen(true)} className="p-3 bg-slate-100 text-slate-900 rounded-xl border border-slate-300"><Menu size={24} /></button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-10 w-full">
          <div className="max-w-7xl mx-auto w-full">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'financeiro' && renderFinanceiro()}
            {activeTab === 'conflitos' && renderOcorrencias()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;