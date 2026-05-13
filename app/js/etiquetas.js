window.CaetanoEtiquetas = {
  gerarHTML: (produto) => window.Caetano.gerarEtiqueta(produto),
  imprimir: (produto) => {
    const html = window.Caetano.gerarEtiqueta(produto);
    const w = window.open('', '_blank');
    w.document.write('<html><head><title>Etiqueta</title><style>body{font-family:Arial;padding:20px}.label-preview{border:1px dashed #333;border-radius:10px;padding:12px;width:320px}.barcode{font-family:monospace;letter-spacing:2px}</style></head><body>'+html+'<script>print()<\/script></body></html>');
    w.document.close();
  }
};
