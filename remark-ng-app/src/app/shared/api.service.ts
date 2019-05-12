import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from '../notes/model/notebook';
import { Note } from '../notes/model/note';
import {UserModel} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:8081/api';
  private ALL_NOTEBOOKS_URL = `${this.BASE_URL}\\notebooks\\all`;
  private SAVE_UPDATE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks\\`;
  private ALL_NOTES_URL = `${this.BASE_URL}\\notes\\all`;
  private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}\\notes\\byNotebook\\`;
  private SAVE_UPDATE_NOTE_URL = `${this.BASE_URL}\\notes`;
  private DELETE_NOTE_URL = `${this.BASE_URL}\\notes\\`;
  private NOTE_BY_ID_URL = `${this.BASE_URL}\\byId\\`;
  private CREATE_USER_URL = `${this.BASE_URL}\\user\\create`;
  private USER_BY_USERNAME = `${this.BASE_URL}\\user\\byUsername\\`;
  private NOTEBOOKS_BY_USER = `${this.BASE_URL}\\notebooks\\byUser\\`;

  constructor(private http: HttpClient) {
  }

  getNotebooksByUser(userId: string): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.NOTEBOOKS_BY_USER + userId);
  }

  getUserByUsername(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.USER_BY_USERNAME + username);
  }

  postUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.CREATE_USER_URL, user);
  }

  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
  }

  postNotebook(notebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK_URL, notebook);
  }

  deleteNotebook(id: string): Observable<any> {
    return this.http.delete(this.DELETE_NOTEBOOK_URL + id);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.ALL_NOTES_URL);
  }

  getNotesByNotebook(notebookId: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL + notebookId);
  }

  saveNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.SAVE_UPDATE_NOTE_URL, note);
  }

  deleteNote(noteId: string): Observable<any> {
    return this.http.delete(this.DELETE_NOTE_URL + noteId);
  }

  getNoteById(noteId: string): Observable<Note> {
    return this.http.get<Note>(this.NOTE_BY_ID_URL + noteId);
  }
}
