// TESTE DE CONEXÃO SUPABASE
// Execute este código no console do navegador (F12) para testar

// 1. Teste de conexão básica
console.log('🔍 Testando conexão com Supabase...');

// Simular o que o código faz
const supabaseUrl = 'https://pnyovkzjmrggwtemxhep.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBueW92a3pqbXJnZ3d0ZW14aGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzM1NDYsImV4cCI6MjA3OTYwOTU0Nn0.9i9fdQoM-wjPioeDjetV-of_y3SsnNbeoeOZ2ZkChH8';

// Verificar se as credenciais estão corretas
if (supabaseUrl === 'https://seu-projeto.supabase.co') {
    console.error('❌ ERRO: Credenciais não configuradas!');
} else {
    console.log('✅ Credenciais configuradas');
}

// 2. Teste de fetch para verificar se o Supabase está acessível
fetch(`${supabaseUrl}/rest/v1/`, {
    headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
    }
})
    .then(response => {
        if (response.ok) {
            console.log('✅ Supabase está acessível!');
            return response.text();
        } else {
            console.error('❌ Erro ao acessar Supabase:', response.status, response.statusText);
        }
    })
    .then(data => {
        console.log('Resposta do Supabase:', data);
    })
    .catch(error => {
        console.error('❌ Erro de conexão:', error);
    });

// 3. Teste de leitura da tabela messages
fetch(`${supabaseUrl}/rest/v1/messages?select=*&limit=1`, {
    headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
    }
})
    .then(response => {
        if (response.ok) {
            console.log('✅ Tabela "messages" existe e é acessível!');
            return response.json();
        } else if (response.status === 404) {
            console.error('❌ ERRO: Tabela "messages" NÃO EXISTE!');
            console.error('👉 Você precisa executar o SQL no Supabase!');
            console.error('👉 Veja o arquivo supabase_setup.sql');
        } else {
            console.error('❌ Erro ao acessar tabela messages:', response.status, response.statusText);
        }
    })
    .catch(error => {
        console.error('❌ Erro:', error);
    });

console.log('📋 Aguarde os resultados acima...');
