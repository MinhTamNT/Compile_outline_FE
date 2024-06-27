package com.ou.controllers;


import com.ou.components.JWTService;
import com.ou.dto.requets.UpdateRequireRequest;
import com.ou.pojo.Profile;
import com.ou.pojo.User;
import com.ou.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiUserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/login/")
    @CrossOrigin
    public ResponseEntity<String> login(@RequestBody User user) {
        if (this.userService.authUser(user.getUsername(), user.getPassword())) {
            String token = this.jwtService.generateTokenLogin(user.getUsername());
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>("username or password doesn't correct", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/current-user/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<Object> getCurrentUser(Principal principal) {
        User user = userService.getUserByUsername(principal.getName());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Map<String, Object> userMap = new HashMap<>();
        userMap.put("username", user.getUsername());

        if (user.getProfile() != null) {
            userMap.put("email", user.getProfile().getEmail());
            userMap.put("avatar", user.getProfile().getAvatar());

            if (user.getProfile().getDateJoined() != null) {
                userMap.put("dateJoined", user.getProfile().getDateJoined().toString());
            } else {
                userMap.put("dateJoined", "N/A");
            }
        }

        userMap.put("active", user.getIsActive());

        try {
            return new ResponseEntity<>(userMap, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping(path = "/change-required/", consumes = {
            MediaType.APPLICATION_JSON_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE
    }, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<String> updateUserRequired(
            @RequestParam Map<String, String> params,
            @RequestPart MultipartFile file) {

        UpdateRequireRequest updateRequireRequest = new UpdateRequireRequest();
        updateRequireRequest.setOlPassword(params.get("oldPassword"));
        updateRequireRequest.setNewPassword(params.get("newPassword"));
        updateRequireRequest.setAvatar(file);
        try {
            userService.updateRequired(updateRequireRequest);
            return new ResponseEntity<>("Password and avatar updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/check-phone/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> isCheck(@RequestBody Map<String, String> params) {
        try {
            userService.isCheckPhone(params.get("phone"));
            return new ResponseEntity<>("Found phone user", HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
