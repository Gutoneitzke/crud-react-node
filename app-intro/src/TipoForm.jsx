import React from 'react'

const TipoForm = (props) => {

    const handleInputChange = (event) => {
        const { id, value } = event.target
        props.setTipo({ ...props.tipo, [id]: value })
    }
    return (
        <form>
            <div class="form-group">
                <label>Descricao</label>
                <input class="form-control" type="text" id="descricao" 
                       value={props.tipo.descricao} onChange={handleInputChange} />
            </div>
            {/* <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="text" id="email" 
                       value={props.usuario.email} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Celular</label>
                <input class="form-control" type="text" id="celular" 
                       value={props.usuario.celular} onChange={handleInputChange} />
            </div> */}
            <div class="form-group">
                <button type="button"  onClick={props.salvar}
                        className="btn btn-primary btn-sm">Salvar</button>
                <button type="button"  onClick={props.cancelar}
                         className="btn btn-primary btn-sm">Cancelar</button>
            </div>
        </form>
    )
}
export default TipoForm