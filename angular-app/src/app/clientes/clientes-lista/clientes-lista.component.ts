import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string

  constructor(
    private service: ClientesService, 
    private router: Router) { }

  ngOnInit(): void {
    this.service.getClientes()
    .subscribe(resposta => this.clientes = resposta) ;
  }

  novoCadastro(){
    this.router.navigate(['/clientes/form'])
  }

  preparaDelete(cliente : Cliente){
    this.clienteSelecionado = cliente;
  }

  deleteCliente(){
    this.service
    .deletar(this.clienteSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = "Cliente excluído com sucesso!"
        this.ngOnInit();
      },
      error => this.mensagemErro = "Erro ao excluir cliente"
      )
  }
}
