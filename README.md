# CAETANO Carnes & Rotisseria — SaaS PRO

Sistema client-side para casa de carnes/rotisseria: PDV, estoque por lote/validade, NF-e XML, fornecedores, clientes, encomendas, rotisseria, financeiro, etiquetas e auditoria.

## Firebase
1. Crie projeto Firebase.
2. Ative Authentication > Email/Senha.
3. Crie usuários: superadmin, admin, pdv, cozinha, estoque, cliente.
4. Crie documentos em `usuarios/{UID}` com `role`, `tenantId: caetano`, `ativo: true`.
5. Cole `firebase/firestore.rules` e `firebase/storage.rules`.
6. Copie sua config para `app/js/firebase-config.js`.

## Superadmin secreto
Na tela inicial, clique 5x em `Powered by thIAguinho Soluções` e digite `*177`.

## Segurança
O cliente só acessa compras/encomendas próprias. Não há dashboard interno para cliente.

## Valores
Não há preços fictícios. Cadastre custos e preços reais da operação.
