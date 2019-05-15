package com.ips.remark.controller;


import com.ips.remark.domain.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.ips.remark.controller.viewModel.NoteViewModel;
import com.ips.remark.dao.entity.Note;

import javax.validation.ValidationException;
import java.util.List;


@RestController
@RequestMapping("/api/notes")
@CrossOrigin
public class NoteController {

    @Autowired
    NoteService noteService;

    @GetMapping("/all")
    public List<NoteViewModel> all() {
        return noteService.all();
    }

    @GetMapping("/byId/{id}")
    public NoteViewModel byId(@PathVariable String id) {
        return noteService.byId(id);
    }

    @GetMapping("/byNotebook/{notebookId}")
    public List<NoteViewModel> byNotebook(@PathVariable String notebookId) {
        return noteService.byNotebook(notebookId);
    }

    @GetMapping("/favoriteByUser/{id}")
    public List<NoteViewModel> favoriteByUser(@PathVariable String id) {
        return noteService.favoriteByUser(id);
    }

    @GetMapping("/byUser/{id}")
    public List<NoteViewModel> allByUser(@PathVariable String id) {
        return noteService.allByUser(id);
    }

    @PostMapping
    public Note save(@RequestBody NoteViewModel noteCreateViewModel, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException();
        }

        return noteService.save(noteCreateViewModel);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        noteService.delete(id);
    }
}