package com.ips.remark.dao.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "notebook")
public class Notebook {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column()
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "notebook", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Note> notes;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    protected Notebook() {
        this.id = UUID.randomUUID();
        this.notes = new ArrayList<>();
    }

    public Notebook(String name) {
        this();
        this.name = name;
    }

    public Notebook(String id, String name, User user) {
        this();
        if (id != null) {
            this.id = UUID.fromString(id);
        }
        this.name = name;
        this.user = user;
    }


    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public int getNbOfNotes() {
        return this.notes.size();
    }

    public User getUser() {
        return user;
    }

    public String getUserId() {
        return this.user.getId().toString();
    }

}
