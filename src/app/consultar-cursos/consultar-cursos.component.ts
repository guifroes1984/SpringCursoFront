import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consultar-cursos',
  templateUrl: './consultar-cursos.component.html',
  styleUrls: ['./consultar-cursos.component.css']
})
export class ConsultarCursosComponent implements OnInit {

  
  constructor(private httpClient: HttpClient) { }
 
  curso: any[]=[];
  
  ngOnInit(): void {
    this.httpClient.get(environment.apiUrl + '/cursos?descricao=' + this.formPeriodo.value.descricao
    + "&dataAbertura=" + this.formPeriodo.value.dataAbertura + "&dataFechamento=" +
    this.formPeriodo.value.dataFechamento).subscribe
    ((data)=>{
      this.curso= data as any[];

    },
    (e)=> {
      console.log(e);
    }
    )
  }
  excluir(idCurso:number):void{
    if(window.confirm('Deseja realmente excluir o curso selecionado?')){
      this.httpClient.delete(environment.apiUrl+"/cursos/"+idCurso,
     { responseType : 'text'})
     .subscribe(
        (data)=>{
          alert(data);
          this.ngOnInit();
        },
        (e)=>{
          alert(e.error)
          console.log(e);
        }
     )
    }
  }

  formPeriodo = new FormGroup({
    //campos do formulário de consulta
    descricao: new FormControl(''),
    dataAbertura: new FormControl(''),
    dataFechamento: new FormControl('')

  });

  get form(): any {
    return this.formPeriodo.controls;

  }
  onSubmit(): void {

    this.httpClient.get(environment.apiUrl + '/cursos?descricao=' + this.formPeriodo.value.descricao
      + "&dataAbertura=" + this.formPeriodo.value.dataAbertura + "&dataFechamento=" +
      this.formPeriodo.value.dataFechamento).subscribe(

        (data) => { this.curso = data as any[]; },


        (error) => {
          console.log(error.error);
          console.log(this.curso);
        },

      )
  }
}