package com.ibraheemdawod.teamconnnect.backend.controller;

import com.ibraheemdawod.teamconnnect.backend.model.User;
import com.ibraheemdawod.teamconnnect.backend.service.UserAuthService;
import com.ibraheemdawod.teamconnnect.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAuthService userAuthService;

    @GetMapping
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/register")
    public Map<String, String> registerUser(@RequestBody User user) {
        return userAuthService.registerUser(user);
    }

    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody User user) {
        return userAuthService.authenticateUser(user.getEmail(), user.getPassword());
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
