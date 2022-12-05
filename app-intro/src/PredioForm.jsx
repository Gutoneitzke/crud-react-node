import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { AutoComplete } from 'primereact/autocomplete';
import RuaSrv from './services/RuaSrv';
 

const PredioForm = (props) => {

    const handleInputChange = (event) => {
        const { id, value } = event.target
        props.setPredio({ ...props.predio, [id]: value })
    }

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});    

    const defaultValues = {
        nome: props.predio.nome,
        sigla: props.predio.sigla,
        andares: props.predio.andares,
        rua: props.predio.rua
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        props.predio.nome = data.nome;
        props.predio.sigla = data.sigla;
        props.predio.andares = data.andares;
        props.predio.rua = data.rua;
        props.salvar();
        setShowMessage(true);
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };    


    // ------------------------------------------------------------------
    const [filteredRuas, setFilteredRuas] = useState(null);
    const [ruas, setRuas] = useState([]);

    useEffect(() => {
        onClickAtualizar(); // ao inicializar execula método para atualizar
    }, []);

    const onClickAtualizar = () => {
        RuaSrv.listar().then(response => {
            setRuas(response.data);
        }).catch(e => {
            console.log("Erro: " + e.response.data);
        });
    }

    const searchRuas = (event) => {
        setTimeout(() => {
            let _filteredRuas;
            if (!event.query.trim().length) {
                _filteredRuas = [...ruas];
            }
            else {
                _filteredRuas = ruas.filter((rua) => {
                    return rua.descricao.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredRuas(_filteredRuas);
        }, 250);
    }






    return (
        <div>
            <h5 className="text-center">Edição de Prédio</h5>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="p-fluid" style={{padding:'1em'}}>
                    <span className="p-float-label">
                        <Controller name="nome" control={control}
                            rules={{ required: 'O nome é obrigatório.' }} render={({ field, fieldState }) => (
                                <InputText id={field.nome} {...field} autoFocus
                                    className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        <label htmlFor="nome"
                            className={classNames({ 'p-error': errors.nome })}>Nome*</label>
                    </span>
                    {getFormErrorMessage('nome')}
                </div>

                <div className="p-fluid" style={{padding:'1em'}}>
                    <span className="p-float-label">
                        <Controller name="sigla" control={control}
                            rules={{ required: 'A sigla é obrigatória.' }} render={({ field, fieldState }) => (
                                <InputText id={field.sigla} {...field} autoFocus
                                    className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        <label htmlFor="sigla"
                            className={classNames({ 'p-error': errors.sigla })}>Sigla*</label>
                    </span>
                    {getFormErrorMessage('sigla')}
                </div>

                <div className="p-fluid" style={{padding:'1em'}}>
                    <span className="p-float-label">
                        <Controller name="andares" control={control}
                            rules={{ required: 'Andares é obrigatório.' }} render={({ field, fieldState }) => (
                                <InputText id={field.andares} {...field} autoFocus
                                    className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        <label htmlFor="andares"
                            className={classNames({ 'p-error': errors.andares })}>Andares*</label>
                    </span>
                    {getFormErrorMessage('andares')}
                </div>                

                <div className="p-fluid" style={{padding:'1em'}}>
                    <span className="p-float-label">
                        <Controller name="rua" control={control}
                            rules={{ required: 'Rua é obrigatória.' }} render={({ field, fieldState }) => (
                               
                                <AutoComplete id={field.rua} {...field} autoFocus
                                    className={classNames({ 'p-invalid': fieldState.invalid })} 

                                    suggestions={filteredRuas} 
                                    completeMethod={searchRuas} 
                                    field="descricao" 
                                    dropdown forceSelection 
                                    aria-label="Ruas" 
                                    dropdownAriaLabel="Selecione uma rua" 
                                />
  
                            )} />
                        <label htmlFor="rua"
                            className={classNames({ 'p-error': errors.rua })}>Rua*</label>
                    </span>
                    {getFormErrorMessage('rua')}
                </div>                







                

                <div style={{padding:'1em'}}>
                    <Button type="submit" label="Salvar" className="p-button-success" icon="pi pi-save" />
                    <Button type="button" label="Cancelar" onClick={props.cancelar} className="p-button-danger" icon="pi pi-undo" />
                </div>
            </form>
        </div>
    )
}
export default PredioForm