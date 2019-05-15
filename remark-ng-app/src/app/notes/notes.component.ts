import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { Note } from './model/Note';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from '../authentication/authentication.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook = null;
  searchStr = '';
  state = 'All notes';
  searchUsername: string;

  constructor(private apiService: ApiService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.getAllNotebooksByUser();
    this.getAllNotesByUser();
  }

  public getAllNotebooks() {
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert('Error: getAllNotebooks() function');
      }
    );
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
    this.notes = [];
    this.apiService.getNotesByUser(this.authService.currentUserValue.id).subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert('Error: getAllNotesByUser() function');
      }
    );
  }

  public getAllNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert('Error: getAllNotes() function');
      }
    );
  }

  public getAllFavoriteNotes() {
    this.apiService.getFavoriteNotesByUser(this.authService.currentUserValue.id).subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert('Error: getAllFavoriteNotes() function');
      }
    );
  }

  public getFavoriteNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        if (res.length !== 0) {
          this.notes = res.filter(note => {
            return note.favorite;
          });
        } else {
          this.notes = [];
        }
      },
      err => {
        alert('Error: getAllNotes() function');
      }
    );
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
    // this.getAllNotes();
  }

  selectFavNotesNotebook() {
    this.selectedNotebook = null;
    this.state = 'Favorite notes';
    this.getAllFavoriteNotes();
    // this.getFavoriteNotes();
  }

  sharedWithUser() {
    this.apiService.getUserIsExist(this.searchUsername).subscribe(
      res => {
        if (res === true) {
          this.apiService.postShareNotebook(this.searchUsername, this.selectedNotebook.id).subscribe(
            resp => {
            },
            error => {
              alert('Error: postShareNotebook() function ' + this.searchUsername + ' ' + this.selectedNotebook.id);
            }
          );
        }
      },
      err => {
        alert('Error: sharedWithUser() function');
      }
    );
  }
}
