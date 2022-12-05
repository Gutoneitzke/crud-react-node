import React, { useEffect, useState, useRef } from 'react';
import TipoForm from './TipoForm';
import TipoList from './TipoList';
import TipoSrv from "./services/TipoSrv";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
export default function Tipo() {



    const [tipos, setTipos] = useState([])
    const toastRef = useRef();

    useEffect(() => {
        onClickAtualizar(); // ao inicializar execula método para atualizar
    }, []);

    const onClickAtualizar = () => {
        TipoSrv.listar().then(response => {
            setTipos(response.data);
            toastRef.current.show({ severity: 'success', summary: 'Tipos Atualizadas', life: 2000 });
        }).catch(e => {
            console.log("Erro: " + e.message);
        });
    }
    const novo = { _id: null, descricao: ' ' }
    // const novo = { _id: null, nome: ' ', email: ' ', celular: '(54)' }

    const [tipo, setTipo] = useState(novo)

    const [operacao, setOperacao] = useState('listar')

    const inserir = () => {
        setTipo(novo);
        setOperacao('inserir');
    }
    const editar = (_id) => {
        setTipo(tipos.filter((tipo) => tipo._id === _id)[0]);
        setOperacao('editar');
    }

    const excluir = (_id) => {
        confirmDialog({
            message: 'Confirma a exclusão?',
            header: 'Confirmação',
            icon: 'pi pi-question',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptClassName: 'p-button-danger',
            accept: () => excluirConfirm(_id)
        });
    }
    const excluirConfirm = (_id) => {
        TipoSrv.excluir(_id).then(response => {
            onClickAtualizar();
            toastRef.current.show({
                severity: 'success',
                summary: "Excluído",
                life: 2000
            });
        })
            .catch(e => {
                toastRef.current.show({
                    severity: 'error',
                    summary: e.message,
                    life: 4000
                });
            });
    }

    const salvar = () => {
        console.log('Salvar ...');

        if (operacao === 'inserir') {
            TipoSrv.incluir(tipo).then(response => {
               
                setOperacao('listar');
                toastRef.current.show({ severity: 'success', summary: 'Tipo inserida', life: 2000 });
                onClickAtualizar();
            })
                .catch(e => {
                    toastRef.current.show({ severity: 'error', summary: e.message, life: 5000 });
                });
        } else if (operacao === 'editar') {
            TipoSrv.alterar(tipo).then(response => {
                
                toastRef.current.show({ severity: 'success', summary: 'Tipo inserida', life: 2000 });
                onClickAtualizar();
                setOperacao('listar');

            }).catch(e => {
                toastRef.current.show({ severity: 'error', summary: e.message, life: 5000 });
            });
        }

    }

    const cancelar = () => {
        console.log('Cancelou ...');
        setOperacao('listar');
    }

    if (operacao === 'inserir' || operacao === 'editar') {

        return (
            <div>
               <Toast ref={toastRef} />
               <TipoForm tipo={tipo} setTipo={setTipo} salvar={salvar} cancelar={cancelar} />
            </div>
        )

    } else
        return (
            <div>
                <Toast ref={toastRef} />
                <ConfirmDialog />
                <TipoList tipos={tipos} onClickAtualizar={onClickAtualizar}
                    inserir={inserir} editar={editar} excluir={excluir} />

            </div>
        );
}

