package com.ips.remark.dao.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="user")
public class User {

    @Id
    private UUID Id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private  String password;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Notebook> notebooks;

    public User() {
        this.Id = UUID.randomUUID();
        this.notebooks = new ArrayList<>();
    }

    public User(String login, String password) {
        this();
        this.username = login;
        this.password = password;
    }

    public UUID getId() {
        return Id;
    }

    public void setId(UUID id) {
        Id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String login) {
        this.username = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Notebook> getNotebooks() {
        return notebooks;
    }

    public int getNbOfNotebooks() {
        return this.notebooks.size();
    }
}
