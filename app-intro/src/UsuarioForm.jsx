import React from 'react'

const UsuarioForm = (props) => {

    const handleInputChange = (event) => {
        const { id, value } = event.target
        props.setUsuario({ ...props.usuario, [id]: value })
    }

    return (
        <form>
            <div class="form-group">
                <label>Nome</label>
                <input class="form-control" type="text" id="nome" 
                       value={props.usuario.nome} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="text" id="email" 
                       value={props.usuario.email} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Celular</label>
                <input class="form-control" type="text" id="celular" 
                       value={props.usuario.celular} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <button type="button"  onClick={props.salvar}
                        className="btn btn-primary btn-sm">Salvar</button>
                <button type="button"  onClick={props.cancelar}
                         className="btn btn-primary btn-sm">Cancelar</button>
            </div>
        </form>
    )
}
export default UsuarioForm