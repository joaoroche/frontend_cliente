import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes'
import { ClientesService } from '../../clientes.service'
import { Router, ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }


  ngOnInit(): void {

    let params = this.activatedRoute.snapshot.params;
    if (params && params.id) {
      this.id = params.id;

      this.service.getClienteById(this.id)
        .subscribe(
          response => this.cliente = response,
          errorResponse => this.cliente = new Cliente()
        )
    }
  }

  voltarParaListagem() {
    this.router.navigate(["/clientes/lista"])
  }



  onSubmit() {
    if (this.id) {
      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null
        }, errorResponse => {
          this.errors = ['Erro ao atualizar cliente.']
        }
        )
    }

    else {
      this.service.
        salvar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
        )
    }
  }
}
