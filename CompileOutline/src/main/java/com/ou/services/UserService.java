package com.ou.services;

import com.ou.dto.requets.UpdateRequireRequest;
import com.ou.pojo.Profile;
import com.ou.pojo.Student;
import com.ou.pojo.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.io.IOException;


public interface UserService extends UserDetailsService {
    Profile getProfileById(int id);
    User getUserByUsername(String username);
    void updateProfile(Profile profile);
    void addNewStudent(Student student) throws IOException;
    void registerAdmin(User u);
    void registerLecturer(User u);

    boolean authUser(String username,String password);

    boolean userExistByName(String username);
    User getCurrentUser();
    void updateRequired(UpdateRequireRequest updateRequireRequest) throws Exception;

    void updateRequired(User user) throws Exception;

    boolean isCheckPhone (String phone);


}
