async function buscarCliente(){
    await fetch("http://localhost:5220/api/Cliente")
    .then(response => response.json())
    .then(cliente => {
        const selecao = document.getElementById("select")
        selecao.innerHTML = `<option value="">Selecione um Cliente</option>`
        cliente.forEach(x => {
            const option = document.createElement('option')
            option.value = x.idcliente
            option.textContent = x.nome
            selecao.appendChild(option)
        })
    }
)}

buscarCliente()

async function buscarGeral(){
    await fetch("http://localhost:5220/api/Pedido/listarPedidos")
    .then(response => response.json())
    .then(pedido => {
        const listaGeral = document.getElementById("pedido-lista")

        pedido.forEach(p => {
            const li  = document.createElement("li")
            li.innerHTML = `Descrição: ${p.descricao} - Valor: ${p.valor} - Cliente: ${p.nomeCliente}
            
            <button onclick="prepararEdicao('${p.idpedido}', '${p.descricao}', '${p.valor}' '${p.idcliente}')">Editar</button>

            <button onclick="deletarPedido(${p.idpedido})">Excluir</button>`
            listaGeral.appendChild(li)
            
        });
    })
}

buscarGeral()

//Cadastrar 

async function cadastrarPedido() {
    const descricaoDigitando = document.getElementById('descricao-pedido').value
    const valorDigitando = document.getElementById('valor-pedido').value
    const select = document.getElementById('select').value

    await fetch(`http://localhost:5220/api/Pedido`, {
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          descricao: descricaoDigitando,
          valor: valorDigitando,
          idcliente: select
        })
    })
    alert("Pedido cadastrado com sucesso!!")
}

//Atualizar 

let pedidoEditando = null

function prepararEdicao(id, descricao, valor){
    document.getElementById('descricao-pedido').value = descricao
    document.getElementById('valor-pedido').value = valor

    pedidoEditando = id
}


async function atualizarpedido() {
    if(!pedidoEditando){
        alert("Clique em editar primeiro")
        return
    }

    const descricao = document.getElementById('descricao-pedido').value
    const valor = document.getElementById('valor-pedido').value

    await fetch(`http://localhost:5220/api/Pedido/${pedidoEditando}`, {
        method:'PUT',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            idpedido: parseInt(pedidoEditando),
            descricao: descricao,
            valor: valor
        })
    })
    alert("pedido atualizado com sucesso!!")
}


//Deletar

async function deletarPedido(id){
    const confirmar = confirm("Tem certeza que deseja excluir o pedido?")

    if(!confirmar){
        return
    }

    await fetch(`http://localhost:5220/api/Pedido/${id}`,{
        method: 'DELETE',
    })

    alert("pedido excluido com sucesso!!")
} 