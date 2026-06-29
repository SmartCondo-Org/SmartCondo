import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { 
  LayoutDashboard, Building2, Users, Calendar, FileText, Bell, DollarSign, 
  AlertTriangle, CheckCircle2, Menu, X, Search, Plus, Download, Info, 
  Clock, ChevronRight, ShieldCheck, EyeOff, Trash2, Lock, MessageSquare,
  Wrench, ChevronDown, Filter, MoreVertical, History, Scale, TrendingUp,
  ArrowUpRight, ArrowDownRight, PieChart, CreditCard, FileSpreadsheet, LogOut
} from 'lucide-react';

const App = () => {
  // --- ESTADOS GERAIS ---
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('@SmartCondo:token'));
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [userSettings, setUserSettings] = useState({ showPhoneToNeighbors: false, showEmailToNeighbors: false });
  
  // --- ESTADOS DE DADOS REAIS DO BACKEND ---
  const [ocorrencias, setOcorrencias] = useState([]);
  const [transacoes, setTransacoes] = useState([]);

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

  // --- DADOS FALSOS APENAS PARA PREENCHER O RESTO DO DASHBOARD (MVP) ---
  const stats = [
    { title: 'Saldo Total', value: 'R$ 45.230,00', icon: <DollarSign className="text-green-600" size={20} />, change: 'Conciliado' },
    { title: 'Inadimplência', value: '12%', icon: <AlertTriangle className="text-red-500" size={20} />, change: '+2% este mês' },
    { title: 'Ocorrências Ativas', value: ocorrencias.length.toString().padStart(2, '0'), icon: <MessageSquare className="text-blue-500" size={20} />, change: 'Atualizado' },
    { title: 'Manutenções', value: '03', icon: <Wrench className="text-orange-500" size={20} />, change: 'Elevador Bloco F' },
  ];

  const inadimplentes = [
    { unidade: 'Apto 204', valor: 'R$ 1.200,00', tempo: '2 meses', risco: 'Médio' },
    { unidade: 'Apto 501', valor: 'R$ 4.500,00', tempo: '6 meses', risco: 'Alto' },
  ];

  const logsPrivacidade = [
    { id: 1, acao: 'Acesso aos dados financeiros', usuario: 'Admin - Administradora', data: 'Hoje 14:30' },
  ];

  // --- COMPONENTES DE UI ---
  const SidebarItem = ({ id, icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
        activeTab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      {icon}
      <span className={`font-bold ${!isSidebarOpen && 'hidden'}`}>{label}</span>
    </button>
  );

  const Header = ({ title, subtitle }) => (
    <div className="mb-8">
      <h1 className="text-3xl font-black text-slate-900 leading-tight mb-1">{title}</h1>
      <p className="text-slate-600 font-bold text-lg">{subtitle}</p>
    </div>
  );

  // --- RENDERIZADORES DAS TELAS ---

  const renderDashboard = () => (
    <>
      <Header title="Olá, Gestor" subtitle="Seu balancete automático está pronto." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">{stat.icon}</div>
              <span className="text-[10px] font-black px-2 py-1 rounded-full bg-slate-100 text-slate-600 uppercase">{stat.change}</span>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{stat.title}</p>
            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>
    </>
  );

  const renderFinanceiro = () => (
    <div className="space-y-8">
      <Header title="Gestão Financeira" subtitle="Dados em tempo real do banco de dados (Azure)." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-800 text-lg">Extrato Real</h3>
            <button className="text-blue-600 font-bold text-xs">Ver Tudo</button>
          </div>
          <div className="space-y-4">
            {/* LÊ DIRETAMENTE DO BACKEND */}
            {transacoes.length === 0 ? <p className="text-slate-400 text-sm">Nenhuma transação lançada.</p> : null}
            {transacoes.map(t => (
              <div key={t.id_transacao} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-slate-50">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${t.tipo === 'Receita' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {t.tipo === 'Receita' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm">{t.descricao}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {new Date(t.data_vencimento).toLocaleDateString('pt-BR')} • {t.status_pagamento}
                    </p>
                  </div>
                </div>
                <span className={`font-black ${t.tipo === 'Receita' ? 'text-green-600' : 'text-slate-900'}`}>
                  {t.tipo === 'Receita' ? '+' : '-'} R$ {Number(t.valor).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOcorrencias = () => (
    <div className="space-y-6">
      <Header title="Ocorrências" subtitle="Lendo diretamente do banco de dados real." />
      <div className="grid grid-cols-1 gap-6">
        {/* LÊ DIRETAMENTE DO BACKEND */}
        {ocorrencias.length === 0 ? <p className="text-slate-400">Nenhuma ocorrência registrada.</p> : null}
        {ocorrencias.map(oc => (
          <div key={oc.id_ocorrencia} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${oc.gravidade === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ID #{oc.id_ocorrencia}</span>
                  <h3 className="text-lg font-black text-slate-900">{oc.titulo}</h3>
                </div>
              </div>
              <span className="text-xs font-black px-4 py-2 rounded-full bg-blue-100 text-blue-700">{oc.status}</span>
            </div>
            <p className="text-slate-600 font-medium mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">{oc.descricao}</p>
            <div className="flex text-xs font-bold text-slate-400 gap-4">
              <span className="flex items-center gap-1"><Clock size={14} /> {new Date(oc.data_criacao).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
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

  // --- TELA PRINCIPAL (DASHBOARD) ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900 antialiased">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-full md:w-72' : 'w-full md:w-24'} bg-white border-b md:border-r border-slate-200 p-6 transition-all duration-300 flex flex-col sticky top-0 md:h-screen z-40 shadow-sm`}>
        <div className="flex items-center justify-between md:justify-start md:space-x-4 mb-10 px-2">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-100">
              <Building2 size={24} />
            </div>
            <span className={`font-black text-2xl tracking-tighter text-blue-900 ${!isSidebarOpen && 'md:hidden'}`}>SMARTCONDO</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className={`space-y-3 ${!isSidebarOpen && 'hidden md:block'}`}>
          <SidebarItem id="dashboard" icon={<LayoutDashboard size={22} />} label="Dashboard" />
          <SidebarItem id="financeiro" icon={<DollarSign size={22} />} label="Financeiro" />
          <SidebarItem id="conflitos" icon={<MessageSquare size={22} />} label="Ocorrências" />
        </nav>

        <div className={`mt-auto pt-4 ${!isSidebarOpen && 'hidden'}`}>
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold transition-all">
            <LogOut size={18} /> <span>Terminar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'financeiro' && renderFinanceiro()}
          {activeTab === 'conflitos' && renderOcorrencias()}
        </div>
      </main>
    </div>
  );
};

export default App;