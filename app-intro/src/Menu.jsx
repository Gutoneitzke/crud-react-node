import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
 
export default function Menu(props) {

    let navigate = useNavigate();

    const items = [
        {
           label:'Programas',
           icon:'pi pi-fw pi-file',
           items:[
              {
                 label:'Cadastros',
                 icon:'pi pi-fw pi-plus',
                 items:[
                    {
                       label:'Ruas',
                       icon:'pi pi-fw pi-bookmark',
                       command: () => { navigate('/rua') }
                    },
                    {
                       label:'Tipos de Sala',
                       icon:'pi pi-fw pi-video',
                       command: () => { navigate('/tipo') }
                    },
                    {
                        label:'Prédios',
                        icon:'pi pi-fw pi-video',
                        command: () => { navigate('/predio') }
                    },
                    {
                        label:'Salas',
                        icon:'pi pi-fw pi-video',
                        command: () => { navigate('/sala') }
                    },
                 ]
              },
              {
                 label:'Exemplo',
                 icon:'pi pi-fw pi-trash'
              },
              {
                 separator:true
              },
              {
                 label:'Exemplo',
                 icon:'pi pi-fw pi-external-link'
              }
           ]
        },
        {
           label:'Exemplo',
           icon:'pi pi-fw pi-pencil',
           items:[
              {
                 label:'Left',
                 icon:'pi pi-fw pi-align-left'
              },
              {
                 label:'Right',
                 icon:'pi pi-fw pi-align-right'
              },
              {
                 label:'Center',
                 icon:'pi pi-fw pi-align-center'
              },
              {
                 label:'Justify',
                 icon:'pi pi-fw pi-align-justify'
              },
    
           ]
        },
        {
           label:'Usuários',
           icon:'pi pi-fw pi-user',
           items:[
              {
                 label:'Cadastro',
                 icon:'pi pi-fw pi-user-plus',
                 command: () => {  }
              },
              
           ]
        },
        {
           label:'Sair',
           icon:'pi pi-fw pi-power-off'
        }
     ];
     

    return (
       <Menubar model={items}/>
    );
}