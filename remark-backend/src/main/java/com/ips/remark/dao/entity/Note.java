package com.ips.remark.dao.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "note")
public class Note {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column()
    private String title;

    @Column(length = 4096)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    private Notebook notebook;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedOn;

    @Column()
    private boolean favorite;

    protected Note() {
        this.id = UUID.randomUUID();
        this.lastModifiedOn = new Date();
    }

    public Note(String title, String text, Notebook notebook, boolean favorite) {
        this();
        this.title = title;
        this.text = text;
        this.notebook = notebook;
        this.favorite = favorite;
    }

    public Note(String id, String title, String text, Notebook notebook, boolean Favorite) {
        this(title, text, notebook, Favorite);
        if (id != null) {
            this.id = UUID.fromString(id);
        }
    }


    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public Notebook getNotebook() {
        return notebook;
    }

    public String getNotebookId() {
        return this.notebook.getId().toString();
    }

    public Date getLastModifiedOn() {
        return lastModifiedOn;
    }

    public void setLastModifiedOn(Date lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }
}
