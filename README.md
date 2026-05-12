# CAETANO Carnes e Rotisseria — SaaS PRO

Sistema multi-açougue: Superadmin thIAguinho cadastra açougues, cada açougue possui Admin, PDV, Cozinha/Rotisseria, Estoque/Compras e Cliente.

## Perfis demo local
- superadmin@thiaguinho.com.br / Caetano@177
- admin@caetano.com.br / Caetano@123
- pdv@caetano.com.br / Caixa@123
- cozinha@caetano.com.br / Cozinha@123
- estoque@caetano.com.br / Estoque@123
- cliente@exemplo.com / Cliente@123

## Firebase
Cole sua configuração em `app/js/firebase-config.js`. Para produção, crie usuários no Firebase Auth e documentos em `usuarios/{uid}` com role e tenantId.

## Superadmin oculto
Na tela inicial, clique 5 vezes em "Powered by thIAguinho Soluções" e digite `*177`.

## Escopo
PDV, estoque por lote/validade, importação NF-e XML, duplicatas, fornecedores, clientes, rotisseria, encomendas, financeiro, auditoria e etiquetas.
