import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function limpar() {
    try {
        console.log("Iniciando a purga em cascata...");
        
        // 1. Apaga tudo que depende de Apartamento
        await prisma.ocorrencia.deleteMany();
        console.log("Ocorrências limpas.");

        await prisma.transacao.deleteMany();
        console.log("Transações limpas.");

        // 2. Apaga os Apartamentos (libertando os Usuários)
        await prisma.apartamento.deleteMany();
        console.log("Apartamentos limpos.");

        // 3. Finalmente, apaga os Usuários
        await prisma.usuario.deleteMany();
        console.log("Usuários manuais pulverizados com sucesso.");

        // 4. A prova real
        const count = await prisma.usuario.count();
        console.log(`================================`);
        console.log(`VITÓRIA! Total de usuários no banco: ${count}`);
        console.log(`================================`);
        
    } catch (error) {
        console.error("Erro ao limpar:", error);
    } finally {
        await prisma.$disconnect();
    }
}

limpar();