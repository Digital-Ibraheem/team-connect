package com.ibraheemdawod.teamconnnect.backend.service;

import com.ibraheemdawod.teamconnnect.backend.model.User;
import com.ibraheemdawod.teamconnnect.backend.repository.UserRepository;
import com.ibraheemdawod.teamconnnect.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserAuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil; // Inject JwtUtil to generate tokens

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), Collections.emptyList()
        );
    }

    public Map<String, String> authenticateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            // Generate JWT Token
            String token = jwtUtil.generateToken(user.get());

            // Return token along with user info
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", user.get().getId().toString());
            response.put("email", user.get().getEmail());

            return response;
        }

        return null; // Authentication failed
    }

    public Map<String, String> registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        // Generate JWT Token
        String token = jwtUtil.generateToken(savedUser);

        // Return token along with user info
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", savedUser.getId().toString());
        response.put("email", savedUser.getEmail());

        return response;
    }
}
