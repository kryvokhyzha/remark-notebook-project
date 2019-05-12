package com.ips.remark;

import com.ips.remark.controller.viewModel.UserViewModel;
import com.ips.remark.dao.entity.User;
import com.ips.remark.dao.repository.UserRepository;
import org.springframework.stereotype.Component;
import com.ips.remark.controller.viewModel.NoteViewModel;
import com.ips.remark.controller.viewModel.NotebookViewModel;
import com.ips.remark.dao.repository.NotebookRepository;
import com.ips.remark.dao.entity.Note;
import com.ips.remark.dao.entity.Notebook;

import java.util.UUID;

/**
 * Component that handles all mappings in this project
 * - entity to view model
 * - view model to entity
 * <p>
 * All mappings are handled here, but in production code this is not the
 * best approach. You can take a look at ModelMapper project or at least split mapping classes
 * across many files.
 */

@Component
public class Mapper {
    private NotebookRepository notebookRepository;
    private UserRepository userRepository;

    public Mapper(NotebookRepository notebookRepository, UserRepository userRepository) {
        this.notebookRepository = notebookRepository;
        this.userRepository = userRepository;
    }

    public NoteViewModel convertToNoteViewModel(Note entity) {
        NoteViewModel viewModel = new NoteViewModel();
        viewModel.setTitle(entity.getTitle());
        viewModel.setId(entity.getId().toString());
        viewModel.setLastModifiedOn(entity.getLastModifiedOn());
        viewModel.setText(entity.getText());
        viewModel.setNotebookId(entity.getNotebook().getId().toString());
        viewModel.setFavorite(entity.isFavorite());

        return viewModel;
    }

    public Note convertToNoteEntity(NoteViewModel viewModel) {
        Notebook notebook = this.notebookRepository.findById(UUID.fromString(viewModel.getNotebookId())).get();
        return new Note(viewModel.getId(), viewModel.getTitle(), viewModel.getText(), notebook, viewModel.isFavorite());
    }

    public NotebookViewModel convertToNotebookViewModel(Notebook entity) {
        NotebookViewModel viewModel = new NotebookViewModel();
        viewModel.setId(entity.getId().toString());
        viewModel.setName(entity.getName());
        viewModel.setNbNotes(entity.getNotes().size());
        viewModel.setUserId(entity.getUserId());

        return viewModel;
    }

    public Notebook convertToNotebookEntity(NotebookViewModel viewModel) {
        System.out.println(viewModel.getUserId());
        System.out.println(viewModel.getName());
        System.out.println(viewModel.getId());
        User user = this.userRepository.findById(UUID.fromString(viewModel.getUserId())).get();
        return new Notebook(viewModel.getId(), viewModel.getName(), user);
    }

    public UserViewModel convertToUserViewModel(User entity) {
        UserViewModel viewModel = new UserViewModel();
        viewModel.setUsername(entity.getUsername());
        viewModel.setPassword(entity.getPassword());
        viewModel.setId(entity.getId().toString());

        return viewModel;
    }

    public User convertToUserEntity(UserViewModel viewModel) {
        return new User(viewModel.getUsername(), viewModel.getPassword());
    }
}
