import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { categoria } from '../Categoria';

@Component({
  selector: 'app-cadastrar-cursos',
  templateUrl: './cadastrar-cursos.component.html',
  styleUrls: ['./cadastrar-cursos.component.css']
})
export class CadastrarCursosComponent implements OnInit {

  mensagem: string = '';

  formCadastro!: FormGroup;

  categorias!: categoria[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
   
    this.formCadastro = new FormGroup({

      descricao: new FormControl('', [Validators.required]),
      qtdAluno: new FormControl('', [Validators.required]),
      dataAbertura: new FormControl('', [Validators.required]),
      dataFechamento: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
    });

    this.listarCategorias();
  }
  

  listarCategorias() {
    this.categorias = [
      {id: '1', nome: 'Multiplataforma'},
      {id: '2', nome: 'Banco de dados'},
      {id: '3', nome: 'Metodologia'},
      {id: '4', nome: 'Comportamento'},
      {id: '5', nome: 'Comunicação'}
    ];
  }

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void {
    let idCategoria = this.formCadastro.get('categoria')?.value;
    this.formCadastro.get('categoria')?.setValue({id: idCategoria});
    this.httpClient.post(environment.apiUrl + '/cursos/', this.formCadastro.value,
    {responseType: 'text'})
    .subscribe(
      e => {
        this.mensagem = e;
      },
      e => {
        alert(e.error)
        this.mensagem = "Ocorreu um erro, não foi realizado";
        console.log(e);
      }
    )
  }
}
