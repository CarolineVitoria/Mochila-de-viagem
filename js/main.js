function escopo(){
    const form = document.querySelector('form');
    const lista = document.querySelector('.lista');
    const arrayObjetos = JSON.parse(localStorage.getItem('itens')) || [];
    //É necessário o uso do parse, pois senão eu estaria atribuindo um valor do tipo string para minha array.
    arrayObjetos.forEach(elemento=>{
        criarElementos(elemento.nome, elemento.quantidade, elemento.id);
    })

    form.addEventListener('submit', e=>{
        e.preventDefault();

        const nome =e.explicitOriginalTarget.elements.nome;
        const quantidade =  e.explicitOriginalTarget.elements.quantidade;
        let quantidadeLi = document.querySelectorAll('.item');
        quantidadeLi = quantidadeLi.length;
        const existe = arrayObjetos.find(elemento=>elemento.nome === nome.value);

        if(existe){
           return atualizarElemento(existe, quantidade.value);
        }
        
        criarElementos(nome.value, quantidade.value, quantidadeLi);
        armazenarItem(nome.value, quantidade.value, quantidadeLi);

        nome.value = '';
        quantidade.value = '';
  
    })

    function criarElementos(nome, quantidade, quantidadeLi){
        const novoItem = document.createElement('li');
        const numero = document.createElement('strong');
        
        numero.dataset.id = quantidadeLi;
        numero.textContent= quantidade;
        novoItem.classList.add('item');
        novoItem.appendChild(numero);
        
        novoItem.innerHTML += nome;
        novoItem.appendChild(botaoDeleta(novoItem));
        lista.appendChild(novoItem);
        
    }

    function armazenarItem(nome, quantidade, id){
        const itemAtual = {
            nome: nome,
            quantidade: quantidade, 
            id: id
        };
        arrayObjetos.push(itemAtual);
        localStorage.setItem('itens', JSON.stringify(arrayObjetos));

    }
    function atualizarElemento(elemento, quantidade){
        const strong = document.querySelector("[data-id='"+elemento.id+"']");
        strong.textContent = quantidade;
        elemento.quantidade=quantidade;
        localStorage.setItem('itens', JSON.stringify(arrayObjetos));
    }
    function botaoDeleta(){
        const botao = document.createElement('i');
        botao.classList.add('fa-regular', 'fa-circle-xmark');
        botao.addEventListener('click', (e)=>{
            deletaElemento(e.target); //this tbm funcionaria, mas não com arrow function
        })
        return botao
    }
    function deletaElemento(e){
        let idDeletar = e.parentNode.firstChild.getAttribute('data-id'); //id strong
        let contador;
        const atualizaIds = ()=>{
            for(contador; contador<arrayObjetos.length;contador++){
                arrayObjetos[contador].id-=1;
                let valorAttAtualStrong = lista.children[contador].firstChild.getAttribute('data-id');
                lista.children[contador].firstChild.setAttribute('data-id', valorAttAtualStrong-1);
            }
        }
        if(idDeletar==0){ // caso o primero item que vá a ser excluído
            contador = 0;
            atualizaIds();
        }else if((Number(idDeletar)+1)!==lista.children.length){// se o elemento a ser deletado não for o último
            contador = idDeletar; 
            atualizaIds();
        }    
    arrayObjetos.splice([idDeletar], 1);
    e.parentNode.remove();
    localStorage.setItem('itens', JSON.stringify(arrayObjetos));
    }

}
escopo();