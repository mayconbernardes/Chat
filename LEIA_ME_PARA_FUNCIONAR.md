# ⚠️ ATENÇÃO: Para o Chat Real Funcionar

O código está PRONTO e o build foi ATUALIZADO.

Mas para que você veja outros usuários e mensagens reais (não simuladas), você **PRECISA** conectar o app a um banco de dados.

O código não funciona por "mágica" - ele precisa de um lugar para salvar as mensagens.

## 🚀 O que você precisa fazer (5 minutos)

1. **Crie uma conta no Supabase** (é grátis): https://supabase.com
2. **Crie um Projeto** chamado "chatza"
3. **Vá em Settings > API** e copie:
   - Project URL
   - anon public key

4. **Abra o arquivo `supabase.ts`** no seu código e cole:

```typescript
const supabaseUrl = 'https://sua-url.supabase.co';
const supabaseAnonKey = 'sua-chave-anonima';
```

5. **Rode o comando SQL** no Supabase (SQL Editor) para criar as tabelas (veja `SUPABASE_SETUP.md`)

6. **Faça o Build novamente**: `npm run build`

7. **Faça Deploy** da pasta `dist` atualizada.

---

## Sem isso, o que acontece?

O app vai continuar funcionando em **Modo Simulação**:
- Você vê mensagens automáticas
- Você NÃO vê outros usuários reais
- O indicador ficará 🟡 **Simulação**

## Com isso, o que acontece?

O app entra em **Modo Tempo Real**:
- Você vê usuários reais conectados
- Você conversa de verdade
- O indicador ficará 🟢 **Tempo Real**
