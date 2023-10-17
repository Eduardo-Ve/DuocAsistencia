import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilPage } from './perfil.page'; // Importa el componente PerfilPage

const routes: Routes = [
  {
    path: '',
    component: PerfilPage, // Utiliza el componente PerfilPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}