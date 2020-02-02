import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [ { path : 'test/:slug' , component : TestComponent,canActivate : [AuthGuard], data: { 
  expectedRole: 'admin'
}  } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
