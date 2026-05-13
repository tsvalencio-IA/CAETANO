// Módulo complementar NF-e. A lógica principal está em core.js para manter compatibilidade PWA/APK/EXE.
window.CaetanoNFe = {
  parse: (xmlText) => window.Caetano.parseNFe(xmlText),
  salvar: (tenantId, nfe) => window.Caetano.criarNFeCompleta(tenantId, nfe)
};
