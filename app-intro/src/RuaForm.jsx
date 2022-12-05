import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const RuaForm = (props) => {
    
    const handleInputChange = (event) => {
        const { id, value } = event.target
        props.setRua({ ...props.rua, [id]: value })
    }
    
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const defaultValues = {
        descricao: props.rua.descricao
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        props.rua.descricao = data.descricao;
        props.salvar();
        setShowMessage(true);
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div>
            <h5 className="text-center">Edição de Rua</h5>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="p-fluid">
                    <span className="p-float-label">
                        <Controller name="descricao" control={control}
                            rules={{ required: 'A descrição é obrigatória.' }} render={({ field, fieldState }) => (
                                <InputText id={field.descricao} {...field} autoFocus
                                    className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        <label htmlFor="descricao"
                            className={classNames({ 'p-error': errors.descricao })}>Descrição*</label>
                    </span>
                    {getFormErrorMessage('descricao')}
                </div>


                <div>
                    <Button type="submit" label="Salvar" className="p-button-success" icon="pi pi-save" />
                    <Button type="button" label="Cancelar" onClick={props.cancelar} className="p-button-danger" icon="pi pi-undo" />
                </div>
            </form>
        </div>
        
    )
}
export default RuaForm