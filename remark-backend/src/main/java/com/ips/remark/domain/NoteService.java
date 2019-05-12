package com.ips.remark.domain;

import com.ips.remark.Mapper;
import com.ips.remark.controller.viewModel.NoteViewModel;
import com.ips.remark.dao.entity.Note;
import com.ips.remark.dao.entity.Notebook;
import com.ips.remark.dao.repository.NoteRepository;
import com.ips.remark.dao.repository.NotebookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class NoteService {
    @Autowired
    NoteRepository noteRepository;

    @Autowired
    NotebookRepository notebookRepository;

    @Autowired
    Mapper mapper;

    public List<NoteViewModel> all() {
        List<Note> notes = this.noteRepository.findAll();

        // map from entity to view model
        return notes.stream()
                .map(note -> this.mapper.convertToNoteViewModel(note))
                .collect(Collectors.toList());
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
