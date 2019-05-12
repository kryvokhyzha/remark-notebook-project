package com.ips.remark.domain;

import com.ips.remark.controller.viewModel.UserViewModel;
import com.ips.remark.dao.entity.User;
import com.ips.remark.dao.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.OperationNotSupportedException;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public void User(UserViewModel userViewModel) throws Exception
    {
        boolean isExists = isExistsUser(userViewModel.getUsername());
        if(isExists) throw new OperationNotSupportedException("This username is already used by someone.");

        boolean newUser = createUser(userViewModel);
        if(!newUser) throw new OperationNotSupportedException("Some troubles occurred.");
    }

    private boolean createUser(UserViewModel userViewModel)
    {
        User user = new User();

        user.setUsername(userViewModel.getUsername());
        user.setPassword(userViewModel.getPassword());
        user = userRepository.saveAndFlush(user);

        return (user.getId()!=null);
    }

    private boolean isExistsUser(String username)
    {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent();
    }

    public User getUserByUsername(String username)
    {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElse(null);
    }

}
