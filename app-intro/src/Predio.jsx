import React, { useEffect, useState, useRef } from 'react';
import PredioForm from './PredioForm';
import PredioList from './PredioList';
import PredioSrv from "./services/PredioSrv";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
export default function Predio() {



    const [predios, setPredios] = useState([])
    const toastRef = useRef();

    useEffect(() => {
        onClickAtualizar(); // ao inicializar execula método para atualizar
    }, []);

    const onClickAtualizar = () => {
        PredioSrv.listar().then(response => {
            setPredios(response.data);
        }).catch(e => {
            console.log("Erro: " + e.response.data);
        });
    }
    const novo = { _id: null, descricao: ' ' }
    // const novo = { _id: null, nome: ' ', email: ' ', celular: '(54)' }

    const [predio, setPredio] = useState(novo)

    const [operacao, setOperacao] = useState('listar')

    const inserir = () => {
        setPredio(novo);
        setOperacao('inserir');
    }
    const editar = (_id) => {
        setPredio(predios.filter((predio) => predio._id === _id)[0]);
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
        PredioSrv.excluir(_id).then(response => {
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
            PredioSrv.incluir(predio).then(response => {
               
                setOperacao('listar');
                toastRef.current.show({ severity: 'success', summary: 'Predio inserido', life: 2000 });
                onClickAtualizar();
            })
                .catch(e => {
                    toastRef.current.show({ severity: 'error', summary: e.response.data, life: 5000 });
                });
        } else if (operacao === 'editar') {
            PredioSrv.alterar(predio).then(response => {
                toastRef.current.show({ severity: 'success', summary: 'Predio alterado', life: 2000 });
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
               <PredioForm predio={predio} setPredio={setPredio} salvar={salvar} cancelar={cancelar} />
            </div>
        )

    } else
        return (
            <div>
                <Toast ref={toastRef} />
                <ConfirmDialog />
                <PredioList predios={predios} onClickAtualizar={onClickAtualizar}
                    inserir={inserir} editar={editar} excluir={excluir} />

            </div>
        );
}

