import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarCursosComponent } from './cadastrar-cursos/cadastrar-cursos.component';
import { ConsultarCursosComponent } from './consultar-cursos/consultar-cursos.component';
import { EditarCursosComponent } from './editar-cursos/editar-cursos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
  { path: 'cadastrar-cursos', component: CadastrarCursosComponent },
  { path: 'consultar-cursos', component: ConsultarCursosComponent},
  { path: 'editar-cursos/:id', component: EditarCursosComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    CadastrarCursosComponent,
    ConsultarCursosComponent,
    EditarCursosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
