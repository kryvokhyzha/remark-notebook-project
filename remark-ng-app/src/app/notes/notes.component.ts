import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { Note } from './model/Note';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from '../authentication/authentication.component';
import {catchError, first, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {UserModel} from '../models/user';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook;
  searchStr = '';
  state = 'All notes';
  searchUsername: string;
  private shareUserSubject: BehaviorSubject<UserModel>;
  public shareUser: Observable<UserModel>;

  constructor(private apiService: ApiService,
              private authService: AuthenticationService) {
    this.shareUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('user')));
    this.shareUser = this.shareUserSubject.asObservable();
  }
  public get shareUserValue(): UserModel {
    return this.shareUserSubject.value;
  }

  ngOnInit() {
    this.getAllNotebooksByUser();
    this.getAllNotesByUser();
  }
  public getAllNotebooksByUser() {
    this.apiService.getNotebooksByUser(this.authService.currentUserValue.id).subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert('Error: getAllNotebooksByUser() function');
      }
    );
  }
  public getAllNotesByUser() {
    this.getAllNotebooksByUser();
    this.notes = [];
    for (const notebook of this.notebooks) {
      this.apiService.getNotesByNotebook(notebook.id).subscribe(
        res => {
          res.forEach(nt => {
            this.notes.push(nt);
          });
        },
        err => {
          alert('Error: getAllNotesByUser() function');
        }
      );
    }
  }
  public getAllFavoriteNotes() {
    this.getAllNotebooksByUser();
    this.notes = [];
    for (const notebook of this.notebooks) {
      this.apiService.getNotesByNotebook(notebook.id).subscribe(
        res => {
          res.forEach(nt => {
            this.notes.push(nt);
          });
          if (res.length !== 0) {
            this.notes = res.filter(note => {
              return note.favorite;
            });
          } else {
            this.notes = [];
          }
        },
        err => {
          alert('Error: getAllNotesByUser() function');
        }
      );
    }
  }
  createNotebook() {
    const newNotebook: Notebook = {
      name: 'New notebook',
      id: null,
      userId: this.authService.currentUserValue.id,
      nbOfNotes: 0
    };

    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        alert('Error: createNotebook() function');
      }
    );
  }

  updateNotebook(updatedNotebook: Notebook) {
    this.apiService.postNotebook(updatedNotebook).subscribe(
      res => {
      },
      err => {
        alert('Error: updateNotebook(updatedNotebook: Notebook) function');
      }
    );
  }

  deleteNotebook(deletedNotebook: Notebook) {
    if (confirm('Are you sure want to delete notebook?')) {
      this.apiService.deleteNotebook(deletedNotebook.id).subscribe(
        res => {
          const indexOfNotebook = this.notebooks.indexOf(deletedNotebook);
          this.notebooks.splice(indexOfNotebook, 1);
          if (this.notebooks.length > indexOfNotebook && this.notebooks.length >= 0) {
            this.selectNotebook(this.notebooks[indexOfNotebook]);
          } else if (this.notebooks.length === indexOfNotebook && (indexOfNotebook - 1) >= 0 && this.notebooks.length >= 0) {
            this.selectNotebook(this.notebooks[indexOfNotebook - 1]);
          } else {
            this.selectNotebook(null);
          }
        },
        err => {
          alert('Error: deleteNotebook(deletedNotebook: Notebook) function');
        }
      );
      this.selectedNotebook = null;
    }
  }

  deleteNote(note: Note) {
    if (confirm('Are you sure want to delete this note?')) {
      this.apiService.deleteNote(note.id).subscribe(
        res => {
          const indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => {
          alert('Error: deleteNote(note: Note) function');
        }
      );
    }
  }

  createNote(nbId: string) {
    const newNote: Note = {
      id: null,
      title: 'New Note',
      text: 'Write some text in here',
      lastModifiedOn: null,
      notebookId: nbId,
      favorite: false
    };

    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        newNote.lastModifiedOn = res.lastModifiedOn;
        this.notes.push(newNote);
      },
      err => {
        alert('Error: createNote(nbId: string) function');
      }
    );
  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;

    if (notebook == null) {
      this.selectAllNotebook();
    } else {
      this.state = notebook.name;
      this.apiService.getNotesByNotebook(notebook.id).subscribe(
        res => {
          this.notes = res;
        },
        err => {
          alert('Error: selectNotebook(notebook: Notebook) function');
        });
    }
  }

  updateNote(updatedNote: Note) {
    this.apiService.saveNote(updatedNote).subscribe(
      res => {
        const idx = this.notes.indexOf(updatedNote);
        this.notes[idx].lastModifiedOn = res.lastModifiedOn;
      },
      err => {
        alert('Error: updateNote(updatedNote: Note) function');
      }
    );
  }

  setFavorite(note: Note) {
    note.favorite = !note.favorite;
    this.updateNote(note);
  }

  selectAllNotebook() {
    this.selectedNotebook = null;
    this.state = 'All notes';
    this.getAllNotesByUser();
  }

  selectFavNotesNotebook() {
    this.selectedNotebook = null;
    this.state = 'Favorite notes';
    this.getAllFavoriteNotes();
  }
  public addNotesToUser() {
    this.apiService.getNotesByNotebook(this.selectedNotebook.id).subscribe(
      res => {
        res.forEach(nt => {
          this.notes.push(nt);
        });
      },
      err => {
        alert('Error: getAllNotesByUser() function');
      }
    );
  }
   public addNotebookToUser() {
   const newNotebook: Notebook = {
      name: this.selectedNotebook.name,
      id: null,
      userId: this.shareUserValue.id,
      nbOfNotes: this.selectedNotebook.nbOfNotes
    };

   this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.getAllNotebooksByUser();
        this.copyAllNotesByNoteBook(this.selectedNotebook.id, newNotebook.id);
        this.getNotes();
      },
      err => {
        alert('Error: addNotebookToUser() function');
      }
    );
  }
 public copyNote(nbId: string, titleVar: string, textVar: string, favoriteVar: boolean) {
    const newNote: Note = {
      id: null,
      title: titleVar,
      text: textVar,
      lastModifiedOn: null,
      notebookId: nbId,
      favorite: favoriteVar
    };
    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        newNote.lastModifiedOn = res.lastModifiedOn;
      },
      err => {
        alert('Error: createNote(nbId: string) function');
      }
    );
  }
  public getNotes() {
    this.apiService.getNotesByNotebook(this.selectedNotebook.id).subscribe(
      res => {
        res.forEach(nt => {
        });
      },
      err => {
        alert('Error: getAllNotesByUser() function');
      }
    );
  }
  public copyAllNotesByNoteBook(nbId: string, nbIdNew: string) {
    this.apiService.getNotesByNotebook(nbId).subscribe(
      res => {
        res.forEach(nt => {
          this.copyNote(nbIdNew, nt.title, nt.text, nt.favorite);
        });
      },
      err => {
        alert('Error: getAllNotesByUser() function');
      }
    );
  }
  sharedWithUser() {
     this.apiService.getUserByUsername(this.searchUsername)
      .pipe(first())
      .pipe(catchError(this.handleError))
      .pipe(map(res => {
        if (!res) {
          alert('There is no user with such username.');
        } else {
          if (this.authService.currentUserValue.username !== this.searchUsername) {
          this.shareUserSubject.next(res);
          if (this.shareUserValue) {
            alert('There is a user with such username.');
            this.addNotebookToUser();
          }
          }
        }
      }
      )).subscribe(res => {
     });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
