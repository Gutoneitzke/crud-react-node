import React, { useEffect, useState, useRef } from 'react';
import RuaForm from './RuaForm';
import RuaList from './RuaList';
import RuaSrv from "./services/RuaSrv";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
export default function Rua() {



    const [ruas, setRuas] = useState([])
    const toastRef = useRef();

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
    const novo = { _id: null, descricao: '' }
    // const novo = { _id: null, nome: ' ', email: ' ', celular: '(54)' }

    const [rua, setRua] = useState(novo)

    const [operacao, setOperacao] = useState('listar')

    const inserir = () => {
        setRua(novo);
        setOperacao('inserir');
    }
    const editar = (_id) => {
        setRua(ruas.filter((rua) => rua._id === _id)[0]);
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
        RuaSrv.excluir(_id).then(response => {
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
                    summary: e.response.data,
                    life: 4000
                });
            });
    }

    const salvar = () => {
        console.log('Salvar ...');

        if (operacao === 'inserir') {
            RuaSrv.incluir(rua).then(response => {
                setOperacao('listar');
                toastRef.current.show({ severity: 'success', summary: 'Rua inserida', life: 2000 });
                onClickAtualizar();
            }).catch(e => {
                toastRef.current.show({ severity: 'error', summary: e.response.data, life: 5000 });
            });
        } else if (operacao === 'editar') {
            RuaSrv.alterar(rua).then(response => {
                toastRef.current.show({ severity: 'success', summary: 'Rua alterada', life: 2000 });
                onClickAtualizar();
                setOperacao('listar');
            }).catch(e => {
                toastRef.current.show({ severity: 'error', summary: e.response.data, life: 5000 });
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
               <RuaForm rua={rua} setRua={setRua} salvar={salvar} cancelar={cancelar} />
            </div>
        )

    } else
        return (
            <div>
                <Toast ref={toastRef} />
                <ConfirmDialog />
                <RuaList ruas={ruas} onClickAtualizar={onClickAtualizar}
                    inserir={inserir} editar={editar} excluir={excluir} />

            </div>
        );
}

