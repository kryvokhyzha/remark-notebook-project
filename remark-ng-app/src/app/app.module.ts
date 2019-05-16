import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotesComponent } from './notes/notes.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { Router, RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { FeedbackComponent } from './feedback/feedback.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './security_redirect/loginRedirect';
import { SearchPipe } from './search.pipe';
import { NoteComponent } from './notes/note/note.component';
import { NotebookComponent } from './notes/notebook/notebook.component';
import { IsAuthGuard } from './security_redirect/isLoginRedirect';
import { RegistrationComponent } from './registration/registration.component';
import { HelpComponent } from './help/help.component';

const appRoutes: Routes = [
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: NotesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsAuthGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FeedbackComponent,
    NotesComponent,
    NotFoundComponent,
    FeedbackComponent,
    LoginComponent,
    RegistrationComponent,
    SearchPipe,
    NoteComponent,
    NotebookComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
