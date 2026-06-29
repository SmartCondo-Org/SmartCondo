import axios from 'axios';

// Cria a instância apontando para o motor que acabamos de construir
export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// "Radar" do Frontend: Antes de qualquer requisição sair, ele anexa o Token se o usuário estiver logado
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@SmartCondo:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});