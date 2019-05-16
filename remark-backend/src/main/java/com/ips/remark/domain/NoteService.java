package com.ips.remark.domain;

import com.ips.remark.Mapper;
import com.ips.remark.controller.viewModel.NoteViewModel;
import com.ips.remark.dao.entity.Note;
import com.ips.remark.dao.entity.Notebook;
import com.ips.remark.dao.entity.User;
import com.ips.remark.dao.repository.NoteRepository;
import com.ips.remark.dao.repository.NotebookRepository;
import com.ips.remark.dao.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class NoteService {
    @Autowired
    NoteRepository noteRepository;

    @Autowired
    NotebookRepository notebookRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    Mapper mapper;

    public List<NoteViewModel> all() {
        List<Note> notes = this.noteRepository.findAll();

        // map from entity to view model
        return notes.stream()
                .map(note -> this.mapper.convertToNoteViewModel(note))
                .collect(Collectors.toList());
    }

    public List<NoteViewModel> allByUser(String userId) {
        User user = this.userRepository.findById(UUID.fromString(userId)).get();

        List <Notebook> notebooks = this.notebookRepository.findAllByUser(user);
        List<Note> notes = new ArrayList<Note>();

        if ( notebooks.isEmpty()) {
            return new ArrayList<NoteViewModel>();
        }

        for (int i = 0; i < notebooks.size(); i++) {
            if (notes.isEmpty()) {
                notes = this.noteRepository.findAllByNotebook(notebooks.get(i));
            } else {
                notes.addAll(this.noteRepository.findAllByNotebook(notebooks.get(i)));
            }
        }

        if (notes.isEmpty()) {
            return new ArrayList<NoteViewModel>();
        }

        return notes.stream()
                .map(note -> this.mapper.convertToNoteViewModel(note))
                .collect(Collectors.toList());
    }

    public List<NoteViewModel> favoriteByUser(String userId) {
        return this.allByUser(userId).stream()
                .filter(note -> note.isFavorite()).collect(Collectors.toList());
    }

    public NoteViewModel byId(String id) {
        Note note = this.noteRepository.findById(UUID.fromString(id)).orElse(null);

        if (note == null) {
            throw new EntityNotFoundException();
        }

        return this.mapper.convertToNoteViewModel(note);
    }

    public List<NoteViewModel> byNotebook(String notebookId) {
        List<Note> notes = new ArrayList<>();

        Optional<Notebook> notebook = this.notebookRepository.findById(UUID.fromString(notebookId));
        if (notebook.isPresent()) {
            notes = this.noteRepository.findAllByNotebook(notebook.get());
        }

        // map to note view model
        return notes.stream()
                .map(note -> this.mapper.convertToNoteViewModel(note))
                .collect(Collectors.toList());
    }

    public Note save(NoteViewModel noteCreateViewModel) {
        Note noteEntity = this.mapper.convertToNoteEntity(noteCreateViewModel);

        // save note instance to db
        this.noteRepository.save(noteEntity);

        return noteEntity;
    }

    public void delete(String id) {
        this.noteRepository.deleteById(UUID.fromString(id));
    }
}
