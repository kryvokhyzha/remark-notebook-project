package com.ips.remark.controller;

import com.ips.remark.domain.NotebookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.ips.remark.controller.viewModel.NotebookViewModel;
import com.ips.remark.dao.entity.Notebook;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/notebooks")
@CrossOrigin
public class NotebookController {
    @Autowired
    NotebookService notebookService;

    @GetMapping("/all")
    public List<Notebook> all() {
        return notebookService.all();
    }

    @GetMapping("/byUser/{userId}")
    public List<NotebookViewModel> byUser(@PathVariable String userId) {
        return notebookService.byUser(userId);
    }

    @PostMapping
    public Notebook save(@RequestBody NotebookViewModel notebookViewModel,
                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException();
        }

        return notebookService.save(notebookViewModel);
    }

    @PostMapping("/share")
    public void share(@RequestBody Map body) {
        System.out.println("\n" + body.get("username"));
        System.out.println("\n" + body.get("notebookId"));
        notebookService.share(body.get("username").toString(), body.get("notebookId").toString());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        notebookService.delete(id);
    }



}
