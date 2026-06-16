import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Calendar, 
  FileText, 
  Bell, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Menu, 
  X, 
  Search, 
  Plus, 
  Download, 
  Info, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  EyeOff, 
  Trash2, 
  Lock, 
  MessageSquare,
  Wrench,
  ChevronDown,
  Filter,
  MoreVertical,
  History,
  Scale,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  CreditCard,
  FileSpreadsheet
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [userSettings, setUserSettings] = useState({
    showPhoneToNeighbors: false,
    showEmailToNeighbors: false
  });


  // --- DADOS DO DASHBOARD E FINANCEIRO ---
  const stats = [
    { title: 'Saldo Total', value: 'R$ 45.230,00', icon: <DollarSign className="text-green-600" size={20} />, change: 'Conciliado' },
    { title: 'Inadimplência', value: '12%', icon: <AlertTriangle className="text-red-500" size={20} />, change: '+2% este mês' },
    { title: 'Ocorrências Ativas', value: '08', icon: <MessageSquare className="text-blue-500" size={20} />, change: '4 de barulho' },
    { title: 'Manutenções', value: '03', icon: <Wrench className="text-orange-500" size={20} />, change: 'Elevador Bloco F' },
  ];

  const inadimplentes = [
    { unidade: 'Apto 204', valor: 'R$ 1.200,00', tempo: '2 meses', risco: 'Médio' },
    { unidade: 'Apto 501', valor: 'R$ 4.500,00', tempo: '6 meses', risco: 'Alto' },
    { unidade: 'Bloco B - 12', valor: 'R$ 600,00', tempo: '1 mês', risco: 'Baixo' },
  ];

  const transacoesRecentes = [
    { id: 1, descricao: 'Manutenção Elevador', categoria: 'Manutenção', valor: -1200.00, data: '19/03', status: 'Pago' },
    { id: 2, descricao: 'Cota Condominial (Lote)', categoria: 'Receita', valor: 28450.00, data: '18/03', status: 'Recebido' },
    { id: 3, descricao: 'Energia Áreas Comuns', categoria: 'Utilidades', valor: -3400.50, data: '15/03', status: 'Pago' },
  ];

  const logsPrivacidade = [
    { id: 1, acao: 'Acesso aos dados financeiros', usuario: 'Admin - Administradora X', data: '17/03/2026 14:30' },
    { id: 2, acao: 'Exportação de lista de moradores', usuario: 'Síndico Ricardo', data: '17/03/2026 10:15' },
    { id: 3, acao: 'Alteração de permissão de reserva', usuario: 'Sistema Automático', data: '16/03/2026 22:00' },
  ];

  // --- DADOS DE OCORRÊNCIAS ---
  const [ocorrencias] = useState([
    { 
      id: 1, 
      tipo: 'Barulho', 
      morador: 'Apto 101 (Ana Silva)', 
      status: 'Em Análise', 
      gravidade: 'Média', 
      data: '18/03/2026',
      descricao: 'Som alto após as 22h vindo da unidade superior.',
      historico: ['18/03: Notificação enviada via app']
    },
    { 
      id: 2, 
      tipo: 'Vazamento', 
      morador: 'Apto 402 (Marcos)', 
      status: 'Aguardando Técnico', 
      gravidade: 'Alta', 
      data: '18/03/2026',
      descricao: 'Infiltração no teto da casa de banho principal.',
      historico: ['18/03: Contactada a Elevadores Tech']
    }
  ]);

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

  // --- RENDERIZADORES DE ABAS ---

  const renderDashboard = () => (
    <>
      <Header title="Olá, Síndico Ricardo" subtitle="Seu balancete automático está pronto." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">{stat.icon}</div>
              <span className="text-[10px] font-black px-2 py-1 rounded-full bg-slate-100 text-slate-600 uppercase">
                {stat.change}
              </span>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{stat.title}</p>
            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="text-blue-600" /> Fluxo de Caixa (Mensal)
            </h3>
          </div>
          <div className="h-48 w-full bg-slate-50 rounded-2xl flex items-end justify-around p-4 gap-2">
            {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full max-w-[40px]">
                <div className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600" style={{ height: `${h}%` }}></div>
                <span className="text-[10px] font-bold text-slate-400">0{i+1}/03</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
             <AlertTriangle className="text-red-500" /> Inadimplência Crítica
          </h3>
          <div className="space-y-4">
            {inadimplentes.slice(0, 2).map((inad, i) => (
              <div key={i} className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-black text-slate-800">{inad.unidade}</span>
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Risco {inad.risco}</span>
                </div>
                <p className="text-xl font-black text-red-700">{inad.valor}</p>
                <p className="text-xs text-red-600/70 font-bold">Atraso: {inad.tempo}</p>
              </div>
            ))}
            <button onClick={() => setActiveTab('financeiro')} className="w-full py-3 text-blue-600 font-black text-sm hover:bg-blue-50 rounded-xl transition-all">
              Ver gestão financeira completa
            </button>
          </div>
        </div>

        <button onClick={() => setActiveTab('privacidade')} className="w-full md:w-auto text-blue-700 font-black text-sm bg-white px-6 py-3 rounded-xl shadow-md border border-blue-100 hover:bg-blue-50 transition-all active:scale-95">
          Definições de Privacidade
        </button>
      </div>
    </>
  );

  const renderFinanceiro = () => (
    <div className="space-y-8">
      <Header title="Gestão Financeira" subtitle="Transparência total no fluxo de caixa do condomínio." />

      {/* Resumo de Contas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[32px] text-white shadow-xl shadow-blue-200">
          <p className="text-blue-100 font-bold uppercase tracking-widest text-xs mb-2">Disponível em Caixa</p>
          <h2 className="text-4xl font-black mb-6">R$ 45.230,00</h2>
          <div className="flex gap-4">
            <button className="flex-1 bg-white/20 hover:bg-white/30 p-3 rounded-xl backdrop-blur-sm transition-all flex items-center justify-center gap-2 font-bold text-sm">
              <Plus size={16} /> Receita
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 p-3 rounded-xl backdrop-blur-sm transition-all flex items-center justify-center gap-2 font-bold text-sm">
              <Download size={16} /> Relatório
            </button>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-800 text-lg">Distribuição de Gastos</h3>
            <PieChart className="text-slate-300" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Manutenção', val: '35%', color: 'bg-orange-500' },
              { label: 'Pessoal', val: '45%', color: 'bg-blue-500' },
              { label: 'Reserva', val: '15%', color: 'bg-green-500' },
              { label: 'Outros', val: '5%', color: 'bg-slate-400' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span className="text-xs font-bold text-slate-500">{item.label}</span>
                </div>
                <span className="text-xl font-black text-slate-800">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Histórico de Transações */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-800 text-lg">Extrato Recente</h3>
            <button className="text-blue-600 font-bold text-xs">Ver Tudo</button>
          </div>
          <div className="space-y-4">
            {transacoesRecentes.map(t => (
              <div key={t.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${t.valor > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {t.valor > 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm">{t.descricao}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{t.data} • {t.categoria}</p>
                  </div>
                </div>
                <span className={`font-black ${t.valor > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                  {t.valor > 0 ? '+' : ''}{t.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detalhe de Inadimplência */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-800 text-lg mb-6">Controle de Adimplência</h3>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-50">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Unidade</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Dívida</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Status</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inadimplentes.map((inad, i) => (
                  <tr key={i} className="group">
                    <td className="py-4 font-black text-slate-800 text-sm">{inad.unidade}</td>
                    <td className="py-4 font-bold text-slate-600 text-sm">{inad.valor}</td>
                    <td className="py-4">
                      <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${
                        inad.risco === 'Alto' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {inad.tempo}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <MessageSquare size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOcorrencias = () => (
    <div className="space-y-6">
      <Header title="Ocorrências & Mediação" subtitle="Registro formal protegido por lei e normas internas." />
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Buscar unidade ou tipo..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium shadow-sm" />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          <Plus size={18} /> Registrar Ocorrência
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ocorrencias.map(oc => (
          <div key={oc.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${oc.gravidade === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Caso #{oc.id}</span>
                    <h3 className="text-lg font-black text-slate-900">{oc.tipo} - {oc.morador}</h3>
                  </div>
                </div>
                <span className="text-xs font-black px-4 py-2 rounded-full bg-blue-100 text-blue-700">{oc.status}</span>
              </div>
              <p className="text-slate-600 font-medium mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">{oc.descricao}</p>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-slate-50 gap-4">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={14} /> {oc.data}</span>
                  <span className="flex items-center gap-1"><Scale size={14} /> Ver Base Jurídica</span>
                </div>
                <button className="w-full md:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-slate-800 transition-all">Atualizar Mediação</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacidade = () => (
    <>
      <Header title="Privacidade e Dados" subtitle="Gestão de direitos LGPD" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-lg">
            <Lock size={20} className="text-blue-600" /> Visibilidade
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-black text-slate-800">Mostrar telefone para vizinhos</p>
                <p className="text-xs text-slate-500 font-semibold">Privacidade de contato.</p>
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
                <p className="text-sm font-black text-slate-800">Aparecer na lista de moradores</p>
                <p className="text-xs text-slate-500 font-semibold">Anonimização parcial.</p>
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
            <Download size={20} className="text-blue-600" /> Meus Dados (Art. 18)
          </h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all text-left group">
              <span className="text-sm font-black text-slate-700">Exportar Relatório de Dados</span>
              <Download size={18} className="text-slate-400 group-hover:text-blue-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-red-50 rounded-xl hover:bg-red-50 transition-all group text-left">
              <span className="text-sm font-black text-red-600">Eliminar Conta e Dados</span>
              <Trash2 size={18} className="text-red-300 group-hover:text-red-600" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 text-lg">
            <Clock size={20} className="text-blue-600" /> Auditoria de Acessos
          </h3>
          <div className="space-y-3">
            {logsPrivacidade.map(log => (
              <div key={log.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-slate-50 rounded-xl text-xs gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div>
                  <span className="font-black text-slate-800 text-sm">{log.acao}</span>
                </div>
                <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <p className="text-slate-700 font-black">{log.usuario}</p>
                  <p className="text-slate-500 font-bold">{log.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900 antialiased">
      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-6 md:p-10 shadow-2xl border border-white/20">
            <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-xl shadow-blue-100">
              <ShieldCheck className="text-white" size={40} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 text-center md:text-left tracking-tighter">Privacidade SmartCondo</h2>
            <p className="text-slate-600 mb-8 leading-relaxed font-bold text-center md:text-left">
              Para continuar, aceite o processamento de seus dados pessoais em total conformidade com a LGPD.
            </p>
            <div className="space-y-3 mb-10">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-blue-50 transition-all hover:border-blue-200 group">
                <CheckCircle2 className="text-green-500" size={24} />
                <span className="text-sm font-black text-slate-800 underline decoration-slate-300 group-hover:decoration-blue-400">Termos de Uso</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-blue-50 transition-all hover:border-blue-200 group">
                <CheckCircle2 className="text-green-500" size={24} />
                <span className="text-sm font-black text-slate-800 underline decoration-slate-300 group-hover:decoration-blue-400">Política de Privacidade</span>
              </div>
            </div>
            <button 
              onClick={() => setShowConsentModal(false)}
              className="w-full bg-blue-600 text-white py-5 rounded-[20px] text-lg font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all transform active:scale-95"
            >
              Aceitar e Continuar
            </button>
          </div>
        </div>
      )}

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
          <SidebarItem id="privacidade" icon={<ShieldCheck size={22} />} label="Segurança/LGPD" />
        </nav>

        <div className={`mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100 ${!isSidebarOpen && 'hidden'}`}>
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Suporte Jurídico</p>
          <p className="text-xs font-bold text-slate-600 leading-tight">Canal direto de apoio ao síndico ativo.</p>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'financeiro' && renderFinanceiro()}
          {activeTab === 'conflitos' && renderOcorrencias()}
          {activeTab === 'privacidade' && renderPrivacidade()}
        </div>
      </main>
    </div>
  );
};

export default App;