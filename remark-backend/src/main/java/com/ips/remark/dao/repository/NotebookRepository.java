package com.ips.remark.dao.repository;

import com.ips.remark.dao.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ips.remark.dao.entity.Notebook;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotebookRepository extends JpaRepository<Notebook, UUID> {
    List<Notebook> findAllByUser(User user);
}
