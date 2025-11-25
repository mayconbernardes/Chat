# 🚀 Configuração Supabase - Chat em Tempo Real

## Por que Supabase?

✅ **100% GRATUITO** (até 500MB de dados)  
✅ **Tempo Real** nativo com WebSockets  
✅ **Configuração em 10 minutos**  
✅ **Sem servidor próprio necessário**  
✅ **Hospedado e gerenciado**  

---

## Passo 1: Criar Conta no Supabase

1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Faça login com GitHub (recomendado) ou email
4. É GRATUITO! Não precisa cartão de crédito

---

## Passo 2: Criar Projeto

1. Clique em "New Project"
2. **Nome**: `chatza` (ou o que preferir)
3. **Database Password**: Crie uma senha forte (anote!)
4. **Region**: Escolha a mais próxima (ex: South America)
5. **Pricing Plan**: Free (já selecionado)
6. Clique em "Create new project"
7. Aguarde 2-3 minutos (criando banco de dados)

---

## Passo 3: Criar Tabelas

### 3.1 Tabela de Mensagens

1. No menu lateral, clique em "SQL Editor"
2. Clique em "New query"
3. Cole este SQL:

```sql
-- Tabela de mensagens
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  text TEXT NOT NULL,
  avatar_color TEXT NOT NULL,
  reply_to_message_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para buscar mensagens por sala
CREATE INDEX messages_room_id_idx ON messages(room_id);
CREATE INDEX messages_created_at_idx ON messages(created_at DESC);

-- Habilitar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

4. Clique em "Run" (▶️)
5. Deve aparecer "Success"

### 3.2 Tabela de Salas

1. Clique em "New query" novamente
2. Cole este SQL:

```sql
-- Tabela de salas
CREATE TABLE rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  type TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice
CREATE INDEX rooms_created_at_idx ON rooms(created_at DESC);

-- Habilitar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
```

3. Clique em "Run" (▶️)

### 3.3 Tabela de Presença

1. Clique em "New query" novamente
2. Cole este SQL:

```sql
-- Tabela de presença de usuários
CREATE TABLE user_presence (
  user_id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  room_id TEXT NOT NULL,
  avatar_color TEXT NOT NULL,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice
CREATE INDEX user_presence_last_seen_idx ON user_presence(last_seen DESC);
CREATE INDEX user_presence_room_id_idx ON user_presence(room_id);

-- Habilitar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE user_presence;
```

3. Clique em "Run" (▶️)

---

## Passo 4: Configurar Políticas de Segurança (RLS)

### 4.1 Desabilitar RLS para Teste (TEMPORÁRIO)

1. Vá em "Authentication" > "Policies"
2. Para cada tabela (`messages`, `rooms`, `user_presence`):
   - Clique na tabela
   - Clique em "Disable RLS" (para teste)

⚠️ **IMPORTANTE**: Em produção, você deve habilitar RLS e criar políticas adequadas!

### 4.2 OU Criar Políticas Públicas (Alternativa)

Se preferir manter RLS ativo, execute este SQL:

```sql
-- Políticas para messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode ler mensagens"
  ON messages FOR SELECT
  USING (true);

CREATE POLICY "Qualquer um pode inserir mensagens"
  ON messages FOR INSERT
  WITH CHECK (true);

-- Políticas para rooms
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode ler salas"
  ON rooms FOR SELECT
  USING (true);

CREATE POLICY "Qualquer um pode criar salas"
  ON rooms FOR INSERT
  WITH CHECK (true);

-- Políticas para user_presence
ALTER TABLE user_presence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode ler presença"
  ON user_presence FOR SELECT
  USING (true);

CREATE POLICY "Qualquer um pode atualizar presença"
  ON user_presence FOR ALL
  USING (true)
  WITH CHECK (true);
```

---

## Passo 5: Obter Credenciais

1. No menu lateral, clique em ⚙️ "Settings"
2. Clique em "API"
3. Você verá:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Copie ambos!**

---

## Passo 6: Atualizar supabase.ts

1. Abra `supabase.ts`
2. Substitua:

```typescript
const supabaseUrl = 'https://seu-projeto.supabase.co';  // ← Cole seu Project URL
const supabaseAnonKey = 'sua-chave-anonima-aqui';       // ← Cole sua anon public key
```

Por exemplo:
```typescript
const supabaseUrl = 'https://abcdefghijk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk...';
```

---

## Passo 7: Testar

1. Salve `supabase.ts`
2. Execute: `npm run build`
3. Faça deploy no Netlify
4. Abra em 2 dispositivos
5. **Envie uma mensagem - ela deve aparecer instantaneamente no outro!** 🎉

---

## 🔍 Verificar se Está Funcionando

### No Supabase Dashboard:

1. Vá em "Table Editor"
2. Selecione "messages"
3. Envie uma mensagem no app
4. **Atualize a tabela** - a mensagem deve aparecer!

### No Console do Navegador:

1. Abra F12
2. Vá em "Console"
3. Procure por mensagens de conexão
4. Não deve ter erros

---

## 🐛 Troubleshooting

### Erro "Invalid API key"
- ✅ Verifique se copiou a chave correta (anon public)
- ✅ Não use a `service_role` key (é secreta!)

### Mensagens não aparecem em tempo real
- ✅ Verifique se executou `ALTER PUBLICATION supabase_realtime ADD TABLE messages`
- ✅ Confirme que RLS está desabilitado OU políticas estão corretas
- ✅ Teste no Table Editor se as mensagens estão sendo salvas

### Erro "relation does not exist"
- ✅ Verifique se criou todas as 3 tabelas
- ✅ Execute os SQLs novamente

### Erro de CORS
- ✅ Adicione seu domínio Netlify em Settings > API > CORS

---

## 📊 Limites do Plano Gratuito

- ✅ **500 MB** de dados
- ✅ **2 GB** de transferência/mês
- ✅ **50.000** requisições/mês
- ✅ **Realtime** ilimitado!

**É mais que suficiente para testes e uso pessoal!**

---

## 🎯 Próximos Passos

Depois de configurar:
1. ✅ Rebuild: `npm run build`
2. ✅ Deploy no Netlify
3. ✅ Teste em múltiplos dispositivos
4. ✅ **Converse em tempo real!** 🚀

---

**Tempo estimado**: 10-15 minutos  
**Dificuldade**: Fácil  
**Custo**: GRATUITO! 💰
