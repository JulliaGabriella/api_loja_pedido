async function buscarGeral(){
    await fetch("http://localhost:5220/api/Cliente")
    .then(response => response.json())
    .then(cliente => {
        const listaGeral = document.getElementById("cliente-lista")

        cliente.forEach(c => {
            const li  = document.createElement("li")
            li.innerHTML = `Nome: ${c.nome} - Email: ${c.email}
            
            <button onclick="prepararEdicao('${c.idcliente}', '${c.nome}', '${c.email}')">Editar</button>

            <button onclick="deletarUsuario(${c.idcliente})">Excluir</button>`
            listaGeral.appendChild(li)
            
        });
    })
}

buscarGeral()

//Cadastrar 

async function cadastrarCliente() {
    const nomeDigitando = document.getElementById('nome-cliente').value
    const emailDigitando = document.getElementById('email-cliente').value

    await fetch(`http://localhost:5220/api/Cliente`, {
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          nome: nomeDigitando,
          email: emailDigitando
        })
    })
    alert("Cliente cadastrado com sucesso!!")
}

//Atualizar 

let clienteEditando = null

function prepararEdicao(id, nome, email){
    document.getElementById('nome-cliente').value = nome
    document.getElementById('email-cliente').value = email

    clienteEditando = id
}


async function atualizarCliente() {
    if(!clienteEditando){
        alert("Clique em editar primeiro")
        return
    }

    const nome = document.getElementById('nome-cliente').value
    const email = document.getElementById('email-cliente').value

    await fetch(`http://localhost:5220/api/Cliente/${clienteEditando}`, {
        method:'PUT',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            idcliente: parseInt(clienteEditando),
            nome: nome,
            email: email
        })
    })
    alert("Cliente atualizado com sucesso!!")
}


//Deletar

async function deletarUsuario(id){
    const confirmar = confirm("Tem certeza que deseja excluir o cliente?")

    if(!confirmar){
        return
    }

    await fetch(`http://localhost:5220/api/Cliente/${id}`,{
        method: 'DELETE',
    })

    alert("Cliente excluido com sucesso!!")
} 