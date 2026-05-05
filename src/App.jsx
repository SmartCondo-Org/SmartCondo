import React, { useState } from 'react';
// Certifique-se de que esta linha existe no seu App.jsx local:
// import './index.css'; 

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
  Lock 
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [userSettings, setUserSettings] = useState({
    showPhoneToNeighbors: false,
    showEmailToNeighbors: false
  });

  // --- MOCK DATA ---
  const stats = [
    { title: 'Saldo Total', value: 'R$ 45.230,00', icon: <DollarSign className="text-green-600" size={20} />, change: '+2.5%' },
    { title: 'Inadimplência', value: '8.2%', icon: <AlertTriangle className="text-red-500" size={20} />, change: '-1.0%' },
    { title: 'Reservas Hoje', value: '4', icon: <Calendar className="text-blue-500" size={20} />, change: 'Espaços ocupados' },
    { title: 'Chamados Abertos', value: '12', icon: <FileText className="text-orange-500" size={20} />, change: '5 urgentes' },
  ];

  const moradores = [
    { id: 1, nome: 'Ana Silva', apto: '101', status: 'Adimplente', contato: '(11) 98888-0001' },
    { id: 2, nome: 'João Pereira', apto: '102', status: 'Inadimplente', contato: '(11) 98888-0002' },
    { id: 3, nome: 'Carla Souza', apto: '201', status: 'Adimplente', contato: '(11) 98888-0003' },
  ];

  const reservas = [
    { id: 1, espaco: 'Salão de Festas', data: '15 Out 2023', morador: 'Apto 101', status: 'Confirmado' },
    { id: 2, espaco: 'Churrasqueira A', data: '16 Out 2023', morador: 'Apto 304', status: 'Pendente' },
    { id: 3, espaco: 'Academia', data: '15 Out 2023', morador: 'Apto 215', status: 'Confirmado' },
  ];

  const logsPrivacidade = [
    { id: 1, acao: 'Acesso aos dados financeiros', usuario: 'Admin - Administradora X', data: '17/03/2026 14:30' },
    { id: 2, acao: 'Exportação de lista de moradores', usuario: 'Síndico Ricardo', data: '17/03/2026 10:15' },
    { id: 3, acao: 'Alteração de permissão de reserva', usuario: 'Sistema Automático', data: '16/03/2026 22:00' },
  ];

  // --- COMPONENTS ---
  const SidebarItem = ({ id, icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
        activeTab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      {icon}
      <span className={`font-semibold ${!isSidebarOpen && 'hidden'}`}>{label}</span>
    </button>
  );

  const Header = ({ title, subtitle }) => (
    <div className="mb-8 flex justify-between items-center select-text">
      <div className="block">
        <h1 className="text-3xl font-black text-slate-900 leading-tight block mb-1">
          {title}
        </h1>
        <p className="text-slate-600 font-bold text-lg block">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">
          R
        </div>
      </div>
    </div>
  );

  // --- VIEWS ---
  const renderDashboard = () => (
    <>
      <Header title="Olá, Síndico Ricardo" subtitle="Painel de Gestão e Privacidade Ativa" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{stat.title}</p>
            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 border-2 border-blue-100 rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-md shadow-blue-100">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="font-black text-blue-900 text-lg uppercase tracking-tight">Privacidade Ativa</h4>
            <p className="text-sm text-blue-800 font-semibold italic">Este protótipo está configurado para conformidade total com a LGPD.</p>
          </div>
        </div>
        <button onClick={() => setActiveTab('privacidade')} className="w-full md:w-auto text-blue-700 font-black text-sm bg-white px-6 py-3 rounded-xl shadow-md border border-blue-100 hover:bg-blue-50 transition-all active:scale-95">
          Definições de Privacidade
        </button>
      </div>
    </>
  );

  const renderMoradores = () => (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <Header title="Gestão de Moradores" subtitle="Visualização restrita ao Síndico" />
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead>
            <tr className="text-xs font-black text-slate-400 uppercase tracking-widest border-b-2 border-slate-100">
              <th className="px-4 py-4">Nome</th>
              <th className="px-4 py-4">Apto</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4 text-center">Privacidade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {moradores.map(m => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-5 font-black text-slate-800 text-sm">{m.nome}</td>
                <td className="px-4 py-5 text-sm font-bold text-slate-600">{m.apto}</td>
                <td className="px-4 py-5">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-black ${m.status === 'Adimplente' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-5 text-center"><EyeOff size={16} className="text-slate-400 inline" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReservas = () => (
    <>
      <Header title="Agenda de Espaços" subtitle="Gestão de áreas comuns" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservas.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <span className={`text-[10px] font-black px-3 py-1 rounded-full ${r.status === 'Confirmado' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                {r.status}
              </span>
              <Clock size={16} className="text-slate-400" />
            </div>
            <h3 className="font-black text-slate-900 text-lg mb-1 tracking-tight">{r.espaco}</h3>
            <div className="flex items-center text-xs text-slate-500 space-x-2 mb-4 font-bold">
              <Calendar size={12} /> <span>{r.data}</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-black text-blue-600">U</div>
              <span className="text-sm font-black text-slate-700">{r.morador}</span>
            </div>
          </div>
        ))}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-400 cursor-pointer hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all min-h-[180px] group">
          <Plus size={40} className="group-hover:scale-110 transition-transform" />
          <span className="font-black mt-2 uppercase text-xs tracking-widest">Nova Reserva</span>
        </div>
      </div>
    </>
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

      {/* Sidebar - Mobile Responsive */}
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
          <SidebarItem id="moradores" icon={<Users size={22} />} label="Moradores" />
          <SidebarItem id="reservas" icon={<Calendar size={22} />} label="Reservas" />
          <SidebarItem id="privacidade" icon={<ShieldCheck size={22} />} label="Privacidade" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'moradores' && renderMoradores()}
          {activeTab === 'reservas' && renderReservas()}
          {activeTab === 'privacidade' && renderPrivacidade()}
        </div>
      </main>
    </div>
  );
};

export default App;