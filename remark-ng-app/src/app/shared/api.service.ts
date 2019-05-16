import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from '../notes/model/notebook';
import { Note } from '../notes/model/note';
import {UserModel} from '../models/user';
import {not} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:8083/api';
  private ALL_NOTEBOOKS_URL = `${this.BASE_URL}\\notebooks\\all`;
  private SAVE_UPDATE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks\\`;
  private ALL_NOTES_URL = `${this.BASE_URL}\\notes\\all`;
  private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}\\notes\\byNotebook\\`;
  private SAVE_UPDATE_NOTE_URL = `${this.BASE_URL}\\notes`;
  private DELETE_NOTE_URL = `${this.BASE_URL}\\notes\\`;
  private NOTE_BY_ID_URL = `${this.BASE_URL}\\byId\\`;
  private CREATE_USER_URL = `${this.BASE_URL}\\user\\create`;
  private USER_BY_USERNAME_URL = `${this.BASE_URL}\\user\\byUsername\\`;
  private NOTEBOOKS_BY_USER_URL = `${this.BASE_URL}\\notebooks\\byUser\\`;
  private NOTES_BY_USER_URL = `${this.BASE_URL}\\notes\\byUser\\`;
  private FAVORITE_NOTES_BY_USER_URL = `${this.BASE_URL}\\notes\\favoriteByUser\\`;
  private USER_IS_EXIST_URL = `${this.BASE_URL}\\user\\isExistUser\\`;
  private SHARED_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks\\share`;
  private GET_HASH_URL = `${this.BASE_URL}\\user\\getHash\\`;

  constructor(private http: HttpClient) {
  }

  getNotebooksByUser(userId: string): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.NOTEBOOKS_BY_USER_URL + userId);
  }

  getHash(password: string, resPassword: string): Observable<boolean> {
    return this.http.get<boolean>(this.GET_HASH_URL + password + `\\` + resPassword);
  }

  getNotesByUser(userId: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.NOTES_BY_USER_URL + userId);
  }

  getFavoriteNotesByUser(userId: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.FAVORITE_NOTES_BY_USER_URL + userId);
  }

  getUserByUsername(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.USER_BY_USERNAME_URL + username);
  }

  getUserIsExist(username: string): Observable<boolean> {
    return this.http.get<boolean>(this.USER_IS_EXIST_URL + username);
  }

  postUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.CREATE_USER_URL, user);
  }

  postShareNotebook(username: string, notebookId: string): Observable<any> {
    return this.http.post<any>(this.SHARED_NOTEBOOK_URL, {'username': username, 'notebookId': notebookId});
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
