import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
 

export default function RuaList(props) {
   
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
            <h4>Listagem de Ruas </h4>

            <DataTable value={props.ruas} responsiveLayout="scroll"
               size="small" showGridlines stripedRows 
               paginator paginatorPosition='top' paginatorRight={inserirTemplate}
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
               currentPageReportTemplate="Listando de {first} até {last} de {totalRecords} registros." 
               rows={5} rowsPerPageOptions={[5,10,20,50]}>
                <Column field="_id" header="Código" sortable
                        filter filterField='_id' 
                ></Column>
                <Column field="descricao" header="Descrição" sortable
                        filter filterField='descricao'
                ></Column>
                <Column body={operacoesTemplate}></Column>
            </DataTable>

        </div>
    );
}