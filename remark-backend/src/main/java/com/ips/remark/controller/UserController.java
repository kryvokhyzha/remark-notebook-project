package com.ips.remark.controller;

import com.ips.remark.controller.viewModel.UserViewModel;
import com.ips.remark.dao.entity.User;
import com.ips.remark.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/byUsername/{username}")
    public @ResponseBody
    User getUserByUsername(@PathVariable("username") String username){
        return userService.getUserByUsername(username);
    }

    @GetMapping("isExistUser/{username}")
    public boolean isExistsUser(@PathVariable("username") String username) {
        return userService.isExistsUser(username);
    }

    @PostMapping( produces =  {MediaType.APPLICATION_JSON_VALUE},value="/create")
    public ResponseEntity<?> answer(@Valid @RequestBody UserViewModel user){
        try {
            userService.User(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
