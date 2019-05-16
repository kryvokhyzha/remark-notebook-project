package com.ips.remark.domain;

import com.ips.remark.controller.viewModel.UserViewModel;
import com.ips.remark.dao.entity.User;
import com.ips.remark.dao.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.OperationNotSupportedException;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

//    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void User(UserViewModel userViewModel) throws Exception
    {
        boolean isExists = isExistsUser(userViewModel.getUsername());
        if(isExists) throw new OperationNotSupportedException("This username is already used by someone.");

        boolean newUser = createUser(userViewModel);
        if(!newUser) throw new OperationNotSupportedException("Some troubles occurred.");
    }

//    public boolean getHash(String password, String resPassword) {
//        String str = passwordEncoder.encode(password);
//        System.out.println(password);
//        System.out.println(str);
//        System.out.println(resPassword);
//        return passwordEncoder.matches(password, resPassword);
//    }

    private boolean createUser(UserViewModel userViewModel)
    {
        User user = new User();

        user.setUsername(userViewModel.getUsername());
        user.setPassword(userViewModel.getPassword());
        user = userRepository.saveAndFlush(user);

        return (user.getId()!=null);
    }

    public boolean isExistsUser(String username)
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
