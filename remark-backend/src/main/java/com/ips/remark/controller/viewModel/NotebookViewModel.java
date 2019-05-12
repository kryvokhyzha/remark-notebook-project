package com.ips.remark.controller.viewModel;

import javax.validation.constraints.NotNull;

public class NotebookViewModel {
    private String id;

    @NotNull
    private String name;

    @NotNull
    private String userId;

    private int nbNotes;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNbNotes() {
        return nbNotes;
    }

    public void setNbNotes(int nbNotes) {
        this.nbNotes = nbNotes;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
