package com.ips.remark.dao.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.UUID;

@Entity
@Table(name="USER")
public class User {

    @Id
    private UUID Id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private  String password;

    public User() {
        this.Id = UUID.randomUUID();
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
}
