(function(){
function productSearch(q){q=String(q||'').toLowerCase();return Caetano.col('products').all().filter(p=>[p.id,p.codigoComercial,p.codigoFornecedor,p.ean,p.nome,p.marca].join(' ').toLowerCase().includes(q))}
function saleCreate(cart,customer,payment){const total=cart.reduce((s,i)=>s+Caetano.num(i.total),0); const sale=Caetano.col('sales').add({tenantId:Caetano.currentTenant(),items:cart,customer:customer||{},payment:payment||{},total,status:'finalizada',createdAt:Caetano.now(),user:Caetano.currentUser()?.email}); Caetano.col('finance').add({tenantId:Caetano.currentTenant(),tipo:'receber',origem:'pdv',vendaId:sale.id,cliente:customer?.nome||'Balcão',valor:total,vencimento:Caetano.today(),status:'pago',forma:payment?.forma||'dinheiro',createdAt:Caetano.now()}); return sale}
window.CaetanoPDV={productSearch,saleCreate};
})();
