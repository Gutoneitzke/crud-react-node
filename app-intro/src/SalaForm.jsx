import React from 'react'

const SalaForm = (props) => {
    // ---
    // const [value, setValue] = useState(props.value)
    // const onChange = (e) => {
    //   setValue(e.target.value)
    //   props.onChange(e.target.value)
    // }
    // useEffect(() => {
    //   setValue(props.value)
    // }, [props.value])

    // <select value={value} onChange={onChange} />
    // ----

    const handleInputChange = (event) => {
        const { id, value } = event.target
        props.setSala({ ...props.sala, [id]: value })

    }
    return (
        <form>
            <div class="form-group">
                <label>Descricao</label>
                <input class="form-control" type="text" id="descricao"
                    value={props.sala.descricao} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Capacidade</label>
                <input class="form-control" type="text" id="capacidade"
                    value={props.sala.capacidade} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Andares</label>
                <input class="form-control" type="text" id="andar"
                    value={props.sala.andar} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Localização</label>
                <input class="form-control" type="text" id="localizacao"
                    value={props.sala.localizacao} onChange={handleInputChange} />
            </div>

            <div class="form-group">
                <button type="button" onClick={props.salvar}
                    className="btn btn-primary btn-sm">Salvar</button>
                <button type="button" onClick={props.cancelar}
                    className="btn btn-primary btn-sm">Cancelar</button>
            </div>
        </form>
    )
}
export default SalaForm