import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { categoria } from '../Categoria';

@Component({
  selector: 'app-editar-cursos',
  templateUrl: './editar-cursos.component.html',
  styleUrls: ['./editar-cursos.component.css']
})
export class EditarCursosComponent implements OnInit {

  mensagem: string = '';

  formEdicao!: FormGroup;

  categorias!: categoria [];

  constructor(private httpClient: HttpClient, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    const idCurso = this.activateRoute.snapshot.paramMap.get('id') as string;

    this.formEdicao = new FormGroup({

      idCurso: new FormControl(''),
      descricao: new FormControl('', [Validators.required]),
      qtdAluno: new FormControl('', [Validators.required]),
      dataAbertura: new FormControl('', [Validators.required]),
      dataFechamento: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
    });

    this.httpClient.get(environment.apiUrl + "/cursos/" + idCurso)
    .subscribe(
      (data: any) => {
        this.formEdicao.patchValue({idCurso: data.idCurso});
        this.formEdicao.patchValue({descricao: data.descricao});
        this.formEdicao.patchValue({qtdAluno: data.qtdAluno});
        this.formEdicao.patchValue({dataAbertura: data.dataAbertura});
        this.formEdicao.patchValue({dataFechamento: data.dataFechamento});
        this.formEdicao.patchValue({categoria: data.categoria.id});
      },
      (e) => {
        console.log(e);
      }
    )
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
    return this.formEdicao.controls;
  }

  onSubmit(): void {
    let idCategoria = this.formEdicao.get('categoria')?.value;
    this.formEdicao.get('categoria')?.setValue({id: idCategoria});
    this.httpClient.put(environment.apiUrl + '/cursos/', this.formEdicao.value,
    {responseType: 'text'})
    .subscribe(
      e => {
        this.mensagem = e;
      },
      e => {
        alert(e.error)
        this.mensagem = "Ocorreu um erro, a edição não foi realizada.";
        console.log(e);
      }
    )
  }

}
