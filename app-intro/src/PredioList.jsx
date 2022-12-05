import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function PredioList(props) {

    const operacoesTemplate = (rowData) => {
        return (
           <div>
                <Button icon="pi pi-pencil" className="p-button-sm p-button-rounded p-button-warning" 
                        aria-label="Notification" 
                        onClick={() => props.editar(rowData._id)}/>
                <Button icon="pi pi-trash" className="p-button-sm p-button-rounded p-button-danger" 
                        aria-label="Cancel" 
                        onClick={() => props.excluir(rowData._id)}/>
           </div>
        );
    }

    const inserirTemplate = () => {
        return (
            <Button icon="pi pi-plus" className="p-button-rounded p-button-warning" 
            aria-label="Notification" 
            onClick={() => props.inserir()}/>            
        )
    }

    return (
        <div>

            <DataTable value={props.predios} responsiveLayout="scroll"
               size="small" showGridlines stripedRows 
               paginator paginatorPosition='top' paginatorRight={inserirTemplate}
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
               currentPageReportTemplate="Listando de {first} até {last} de {totalRecords} registros." 
               rows={5} rowsPerPageOptions={[5,10,20,50]}>
                <Column field="_id" header="Código" sortable
                        filter filterField='_id' 
                ></Column>
                <Column field="nome" header="Nome" sortable
                        filter filterField='nome'
                ></Column>
                <Column field="sigla" header="Sigla" sortable
                        filter filterField='sigla'
                ></Column>
                <Column field="andares" header="Andares" sortable
                        filter filterField='andares'
                ></Column>
                <Column field="rua.descricao" header="Rua" sortable
                        filter filterField='rua.descricao'
                ></Column>

                <Column body={operacoesTemplate}></Column>
            </DataTable>

        </div>
    );
}