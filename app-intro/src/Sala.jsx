import React, { useEffect, useState, useRef } from 'react';
import SalaForm from './SalaForm';
import SalaList from './SalaList';
import SalaSrv from "./services/SalaSrv";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
export default function Sala() {



    const [salas, setSalas] = useState([])
    const toastRef = useRef();

    useEffect(() => {
        onClickAtualizar(); // ao inicializar execula método para atualizar
    }, []);

    const onClickAtualizar = () => {
        SalaSrv.listar().then(response => {
            setSalas(response.data);
            toastRef.current.show({ severity: 'success', summary: 'Salas Atualizadas', life: 2000 });
        }).catch(e => {
            console.log("Erro: " + e.message);
        });
    }
    const novo = { _id: null, descricao: ' ' }
    // const novo = { _id: null, nome: ' ', email: ' ', celular: '(54)' }

    const [sala, setSala] = useState(novo)

    const [operacao, setOperacao] = useState('listar')

    const inserir = () => {
        setSala(novo);
        setOperacao('inserir');
    }
    const editar = (_id) => {
        setSala(salas.filter((sala) => sala._id === _id)[0]);
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
        SalaSrv.excluir(_id).then(response => {
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
            SalaSrv.incluir(sala).then(response => {
               
                setOperacao('listar');
                toastRef.current.show({ severity: 'success', summary: 'Sala inserida', life: 2000 });
                onClickAtualizar();
            })
                .catch(e => {
                    toastRef.current.show({ severity: 'error', summary: e.message, life: 5000 });
                });
        } else if (operacao === 'editar') {
            SalaSrv.alterar(sala).then(response => {
                
                toastRef.current.show({ severity: 'success', summary: 'Sala inserida', life: 2000 });
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
               <SalaForm sala={sala} setSala={setSala} salvar={salvar} cancelar={cancelar} />
            </div>
        )

    } else
        return (
            <div>
                <Toast ref={toastRef} />
                <ConfirmDialog />
                <SalaList salas={salas} onClickAtualizar={onClickAtualizar}
                    inserir={inserir} editar={editar} excluir={excluir} />

            </div>
        );
}

