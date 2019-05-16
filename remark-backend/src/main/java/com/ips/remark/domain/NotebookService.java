package com.ips.remark.domain;

import com.ips.remark.Mapper;
import com.ips.remark.controller.viewModel.NoteViewModel;
import com.ips.remark.controller.viewModel.NotebookViewModel;
import com.ips.remark.controller.viewModel.UserViewModel;
import com.ips.remark.dao.entity.Note;
import com.ips.remark.dao.entity.Notebook;
import com.ips.remark.dao.entity.User;
import com.ips.remark.dao.repository.NoteRepository;
import com.ips.remark.dao.repository.NotebookRepository;
import com.ips.remark.dao.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class NotebookService {
    @Autowired
    NotebookRepository notebookRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    Mapper mapper;

    public List<Notebook> all() {
        return this.notebookRepository.findAll();
    }

    public Notebook save(NotebookViewModel notebookViewModel) {
        Notebook notebookEntity = this.mapper.convertToNotebookEntity(notebookViewModel);

        // save notebookEntity instance to db
        this.notebookRepository.save(notebookEntity);

        return notebookEntity;
    }

    public void delete(String id) {
        this.notebookRepository.deleteById(UUID.fromString(id));
    }

    public void share(String username, String notebookId) {
        User user = userRepository.findByUsername(username).get();

        Notebook notebook = notebookRepository.findById(UUID.fromString(notebookId)).get();
        List<Note> notes = noteRepository.findAllByNotebook(notebook);

        NotebookViewModel viewModel = this.mapper.convertToNotebookViewModel(notebook);

        String id = UUID.randomUUID().toString();
        viewModel.setId(id);
        viewModel.setUserId(user.getId().toString());

        this.notebookRepository.save(this.mapper.convertToNotebookEntity(viewModel));

        for (int i = 0; i < notes.size(); i++) {
            NoteViewModel noteViewModel = this.mapper.convertToNoteViewModel(notes.get(i));
            noteViewModel.setId(null);
            noteViewModel.setNotebookId(id);
            this.noteRepository.save(this.mapper.convertToNoteEntity(noteViewModel));
        }
    }

    public List<NotebookViewModel> byUser(String userId) {
        List<Notebook> notebooks = new ArrayList<>();

        Optional<User> user = this.userRepository.findById(UUID.fromString(userId));
        if (user.isPresent()) {
            notebooks = this.notebookRepository.findAllByUser(user.get());
        }

        // map to note view model
        return notebooks.stream()
                .map(notebook -> this.mapper.convertToNotebookViewModel(notebook))
                .collect(Collectors.toList());
    }

}
