import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { 
  LayoutDashboard, Building2, DollarSign, AlertTriangle, CheckCircle2, 
  Menu, X, Clock, ShieldCheck, Trash2, Lock, MessageSquare,
  TrendingUp, ArrowUpRight, ArrowDownRight, LogOut, Download
} from 'lucide-react';

const App = () => {
  // --- ESTADOS GERAIS ---
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('@SmartCondo:token'));
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Por padrão, fechada em mobile
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [userSettings, setUserSettings] = useState({ showPhoneToNeighbors: false, showEmailToNeighbors: false });
  
  // --- ESTADOS DE DADOS REAIS DO BACKEND ---
  const [ocorrencias, setOcorrencias] = useState([]);
  const [transacoes, setTransacoes] = useState([]);

  // --- CÁLCULOS DINÂMICOS (Fim dos Mocks) ---
  const saldoTotal = transacoes.reduce((acc, t) => t.tipo === 'Receita' ? acc + Number(t.valor) : acc - Number(t.valor), 0);
  const totalReceitas = transacoes.reduce((acc, t) => t.tipo === 'Receita' ? acc + Number(t.valor) : acc, 0);
  const totalDespesas = transacoes.reduce((acc, t) => t.tipo === 'Despesa' ? acc + Number(t.valor) : acc, 0);
  const ocorrenciasAbertas = ocorrencias.filter(o => o.status !== 'Resolvida').length;

  // --- FUNÇÃO DE LOGIN E LOGOUT ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email: loginEmail, senha: loginSenha });
      localStorage.setItem('@SmartCondo:token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      alert('Erro ao entrar. Verifique as credenciais ou se o backend está ligado.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('@SmartCondo:token');
    setIsAuthenticated(false);
  };

  // --- BUSCAR DADOS REAIS DO BACKEND ---
  useEffect(() => {
    if (isAuthenticated) {
      api.get('/ocorrencias')
        .then(response => setOcorrencias(response.data))
        .catch(err => console.error("Erro ocorrências", err));

      api.get('/financeiro?id_condominio=1')
        .then(response => setTransacoes(response.data))
        .catch(err => console.error("Erro financeiro", err));
    }
  }, [isAuthenticated, activeTab]);

  // --- COMPONENTES DE UI ---
  const SidebarItem = ({ id, icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSidebarOpen(false); // Fecha a sidebar no mobile ao clicar
      }}
      className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
        activeTab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      {icon}
      <span className="font-bold">{label}</span>
    </button>
  );

  const Header = ({ title, subtitle }) => (
    <div className="mb-8 mt-4 md:mt-0">
      <h1 className="text-3xl font-black text-slate-900 leading-tight mb-1">{title}</h1>
      <p className="text-slate-600 font-bold text-lg">{subtitle}</p>
    </div>
  );

  const DashboardCard = ({ title, value, icon, color, bg }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${bg} ${color}`}>{icon}</div>
      </div>
      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{title}</p>
      <h3 className="text-2xl font-black text-slate-900">{value}</h3>
    </div>
  );

  // --- RENDERIZADORES DAS TELAS ---
  const renderDashboard = () => (
    <>
      <Header title="Painel Dinâmico" subtitle="Métricas baseadas em dados reais do seu condomínio." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Saldo Atual" value={`R$ ${saldoTotal.toFixed(2)}`} icon={<DollarSign size={24} />} color="text-green-600" bg="bg-green-100" />
        <DashboardCard title="Receitas" value={`R$ ${totalReceitas.toFixed(2)}`} icon={<TrendingUp size={24} />} color="text-blue-600" bg="bg-blue-100" />
        <DashboardCard title="Despesas" value={`R$ ${totalDespesas.toFixed(2)}`} icon={<ArrowDownRight size={24} />} color="text-red-600" bg="bg-red-100" />
        <DashboardCard title="Chamados Abertos" value={ocorrenciasAbertas} icon={<AlertTriangle size={24} />} color="text-orange-600" bg="bg-orange-100" />
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm w-full">
        <h3 className="font-black text-slate-800 text-xl mb-2">Visão Geral do Sistema</h3>
        <p className="text-slate-500 font-medium mb-6">O SmartCondo está operando de forma enxuta. Os dados acima representam o consolidado absoluto das requisições processadas pelo SQL Server.</p>
      </div>
    </>
  );

  const renderFinanceiro = () => (
    <div className="space-y-8">
      <Header title="Livro Caixa" subtitle="Todas as transações registradas no Azure." />
      
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[32px] text-white shadow-xl shadow-blue-200">
        <p className="text-blue-100 font-bold uppercase tracking-widest text-xs mb-2">Disponível em Caixa</p>
        <h2 className="text-4xl font-black">R$ {saldoTotal.toFixed(2)}</h2>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-slate-800 text-lg">Extrato Real</h3>
        </div>
        <div className="space-y-4">
          {transacoes.length === 0 ? <p className="text-slate-400 text-sm">Nenhuma transação lançada no sistema.</p> : null}
          {transacoes.map(t => (
            <div key={t.id_transacao} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-slate-50 gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${t.tipo === 'Receita' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {t.tipo === 'Receita' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-sm">{t.descricao}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Vencimento: {new Date(t.data_vencimento).toLocaleDateString('pt-BR')} • {t.status_pagamento}
                  </p>
                </div>
              </div>
              <span className={`font-black ${t.tipo === 'Receita' ? 'text-green-600' : 'text-slate-900'} sm:text-right`}>
                {t.tipo === 'Receita' ? '+' : '-'} R$ {Number(t.valor).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOcorrencias = () => (
    <div className="space-y-6">
      <Header title="Ocorrências" subtitle="Chamados abertos pela comunidade." />
      <div className="grid grid-cols-1 gap-6">
        {ocorrencias.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center">
            <CheckCircle2 className="mx-auto text-green-500 mb-4" size={40} />
            <p className="text-slate-500 font-bold">Nenhuma ocorrência registrada no condomínio.</p>
          </div>
        ) : null}

        {ocorrencias.map(oc => (
          <div key={oc.id_ocorrencia} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${oc.gravidade === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chamado #{oc.id_ocorrencia}</span>
                  <h3 className="text-lg font-black text-slate-900">{oc.titulo}</h3>
                </div>
              </div>
              <span className={`text-xs font-black px-4 py-2 rounded-full ${oc.status === 'Resolvida' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {oc.status}
              </span>
            </div>
            <p className="text-slate-600 font-medium mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">{oc.descricao}</p>
            <div className="flex text-xs font-bold text-slate-400 gap-4">
              <span className="flex items-center gap-1"><Clock size={14} /> Aberto em: {new Date(oc.data_criacao).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacidade = () => (
    <>
      <Header title="Privacidade e Dados" subtitle="Gestão de LGPD e Configurações" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-lg">
            <Lock size={20} className="text-blue-600" /> Visibilidade no Condomínio
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-black text-slate-800">Mostrar telefone para vizinhos</p>
                <p className="text-xs text-slate-500 font-semibold">Oculto por padrão (LGPD).</p>
              </div>
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${userSettings.showPhoneToNeighbors ? 'bg-blue-600' : 'bg-slate-300'}`}
                onClick={() => setUserSettings({...userSettings, showPhoneToNeighbors: !userSettings.showPhoneToNeighbors})}
              >
                <div className={`bg-white w-4 h-4 rounded-full transition-transform ${userSettings.showPhoneToNeighbors ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-black text-slate-800">Aparecer na lista pública</p>
                <p className="text-xs text-slate-500 font-semibold">Anonimização garantida.</p>
              </div>
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${userSettings.showEmailToNeighbors ? 'bg-blue-600' : 'bg-slate-300'}`}
                onClick={() => setUserSettings({...userSettings, showEmailToNeighbors: !userSettings.showEmailToNeighbors})}
              >
                <div className={`bg-white w-4 h-4 rounded-full transition-transform ${userSettings.showEmailToNeighbors ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-lg">
            <Download size={20} className="text-blue-600" /> Seus Direitos (Art. 18)
          </h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all text-left group">
              <span className="text-sm font-black text-slate-700">Exportar Relatório de Dados</span>
              <Download size={18} className="text-slate-400 group-hover:text-blue-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-red-50 rounded-xl hover:bg-red-50 transition-all group text-left">
              <span className="text-sm font-black text-red-600">Solicitar Eliminação (Direito ao Esquecimento)</span>
              <Trash2 size={18} className="text-red-300 group-hover:text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // --- BLOQUEIO DE SEGURANÇA: TELA DE LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
        <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-slate-100 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-200">
              <Building2 size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-black text-center mb-2 tracking-tight">SmartCondo</h2>
          <p className="text-slate-500 text-center font-bold mb-8">Acesso à Plataforma MVP</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 block">E-mail</label>
              <input 
                type="email" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="admin@smartcondo.com"
                required
              />
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 block">Palavra-passe</label>
              <input 
                type="password" 
                value={loginSenha}
                onChange={(e) => setLoginSenha(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="********"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all mt-4"
            >
              {loading ? 'A carregar...' : 'Entrar no Sistema'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- TELA PRINCIPAL (DASHBOARD RESPONSIVO) ---
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 antialiased overflow-hidden relative">
      
      {/* Consent Modal LGPD */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-6 md:p-10 shadow-2xl border border-white/20">
            <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-xl shadow-blue-100">
              <ShieldCheck className="text-white" size={40} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 text-center md:text-left tracking-tighter">Privacidade SmartCondo</h2>
            <p className="text-slate-600 mb-8 leading-relaxed font-bold text-center md:text-left">
              Para continuar, aceite o processamento de seus dados pessoais em total conformidade com a LGPD.
            </p>
            <button 
              onClick={() => setShowConsentModal(false)}
              className="w-full bg-blue-600 text-white py-5 rounded-[20px] text-lg font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all transform active:scale-95"
            >
              Aceitar e Continuar
            </button>
          </div>
        </div>
      )}

      {/* Overlay escuro para Mobile quando a Sidebar está aberta */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Responsiva (Menu Gaveta no Celular, Fixa no Desktop) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 p-6 flex flex-col h-full transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 shadow-2xl md:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-100">
              <Building2 size={24} />
            </div>
            <span className="font-black text-2xl tracking-tighter text-blue-900">SMARTCONDO</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-3 flex-1 overflow-y-auto">
          <SidebarItem id="dashboard" icon={<LayoutDashboard size={22} />} label="Painel Geral" />
          <SidebarItem id="financeiro" icon={<DollarSign size={22} />} label="Financeiro" />
          <SidebarItem id="conflitos" icon={<MessageSquare size={22} />} label="Ocorrências" />
          <SidebarItem id="privacidade" icon={<ShieldCheck size={22} />} label="Segurança/LGPD" />
        </nav>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold transition-all">
            <LogOut size={18} /> <span>Terminar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        {/* Mobile Navbar */}
        <header className="md:hidden bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-2">
            <Building2 className="text-blue-600" size={24} />
            <span className="font-black text-xl text-slate-900">SMARTCONDO</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-50 text-slate-600 rounded-xl border border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Menu size={20} />
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 w-full pb-20">
          <div className="max-w-6xl mx-auto w-full">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'financeiro' && renderFinanceiro()}
            {activeTab === 'conflitos' && renderOcorrencias()}
            {activeTab === 'privacidade' && renderPrivacidade()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;