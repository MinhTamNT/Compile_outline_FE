package com.ou.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ou.services.EmailService;
import com.ou.services.FirebaseService;
import com.ou.dto.requets.UpdateRequireRequest;
import com.ou.pojo.*;
import com.ou.repositories.*;
import com.ou.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service("userDetailsService")
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private LecturerRepository lecturerRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private FirebaseService firebaseService;
    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Profile getProfileById(int id) {
        return this.profileRepository.getProfileById(id);
    }

    @Override
    public void updateProfile(Profile profile) {
        if (!profile.getFile().isEmpty()) {
            try {
                Map rs = this.cloudinary.uploader().upload(profile.getFile().getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                profile.setAvatar(rs.get("secure_url").toString());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        System.out.println(profile.getAvatar());
        this.profileRepository.updateProfile(profile);
        User u = this.userRepository.getUserById(profile.getId());
        u.setUsername(profile.getUser().getUsername());
        u.setIsActive(profile.getUser().getIsActive());
        this.userRepository.addOrUpdateUser(u);
        if (profile.getUser().getRole().equals("ROLE_LECTURER")) {
            Lecturer l = this.lecturerRepository.getLecturerById(profile.getId());
            l.setFaculty(profile.getUser().getLecturer().getFaculty());
            this.lecturerRepository.updateLecturer(l);
        } else if (profile.getUser().getRole().equals("ROLE_STUDENT")) {
            Student s = this.studentRepository.getStudentById(profile.getId());
            s.setFaculty(profile.getUser().getStudent().getFaculty());
            this.studentRepository.updateStudent(s);
        }
    }

    @Override
    public void addNewStudent(Student student) throws IOException {
        User u = student.getUser();
        String pwd = student.getUser().getPassword();
        u.setPassword(this.passwordEncoder.encode(pwd).toString());
        u.setRole("ROLE_STUDENT");
        u.setIsActive(true);
        this.userRepository.addOrUpdateUser(u);
        User user = this.userRepository.getUserByUsername(u.getUsername());
        student.setId(user.getId());
        student.setUser(user);
        this.studentRepository.addStudent(student);
        Profile p = student.getUser().getProfile();
        p.setId(user.getId());
        p.setUser(user);
        this.profileRepository.addProfile(p);

        //send mail
        emailService.sendAccountCreationEmail(u);

        //register firebase
        Map<String , Object> userMap = new HashMap<>();
        userMap.put("username",user.getUsername());
        userMap.put("email",user.getProfile().getEmail());
        userMap.put("avatar",user.getProfile().getAvatar());
        firebaseService.addUser(userMap);
    }

    @Override
    public void registerAdmin(User u) {
        String pwd = u.getPassword();
        u.setPassword(this.passwordEncoder.encode(pwd).toString());
        u.setRole("ROLE_ADMIN");
        u.setIsActive(true);
        this.userRepository.addOrUpdateUser(u);
        this.adminRepository.addAdmin(u);
    }

    public void registerLecturer(User u) {
        if(!u.getProfile().getFile().isEmpty()){
            try {
                Map rs = this.cloudinary.uploader().upload(u.getProfile().getFile().getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                u.getProfile().setAvatar(rs.get("secure_url").toString());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        String pwd = u.getPassword();
        u.setPassword(this.passwordEncoder.encode(pwd).toString());
        u.setRole("ROLE_LECTURER");
        u.setIsActive(false);
        this.userRepository.addOrUpdateUser(u);
        User user = this.userRepository.getUserByUsername(u.getUsername());
        Lecturer l = u.getLecturer();
        l.setId(user.getId());
        l.setUser(user);
        this.lecturerRepository.addLecturer(l);
        Profile p = u.getProfile();
        p.setId(user.getId());
        p.setUser(user);
        this.profileRepository.addProfile(p);

        Map<String , Object> userMap = new HashMap<>();
        userMap.put("username",user.getUsername());
        userMap.put("email",user.getProfile().getEmail());
        userMap.put("avatar",user.getProfile().getAvatar());
        userMap.put("fullname",user.getProfile().getFullname());
        userMap.put("phone",user.getProfile().getPhone());
        userMap.put("role",user.getRole());

        firebaseService.addUser(userMap);



    }


    @Override
    public User getUserByUsername(String username) {
        return this.userRepository.getUserByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = this.userRepository.getUserByUsername(username);
        if (u == null || !u.getIsActive()) {
            throw new UsernameNotFoundException("Không tồn tại hoặc chưa active !");
        }
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(u.getRole()));
        return new org.springframework.security.core.userdetails.User(
                u.getUsername(), u.getPassword(), authorities);
    }


    @Override
    public boolean authUser(String username, String password) {
        return this.userRepository.authUser(username, password);
    }

    @Override
    public boolean userExistByName(String username) {
        return this.userRepository.userExistByName(username);
    }

    @Override
    public User getCurrentUser() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.getUserByUsername(username);
        return user;
    }


    @Override
    public void updateRequired(UpdateRequireRequest updateRequireRequest) throws Exception {
        User user = this.getCurrentUser();
        String avatarUrl = null;
        if (user == null) {
            throw new Exception("Authorize");
        }

        if (!passwordEncoder.matches(updateRequireRequest.getOlPassword(), user.getPassword())) {
            throw new Exception("old password doesn't match");
        }
        if(updateRequireRequest.getAvatar().isEmpty()){
            throw new Exception("avatar you need update");
        }
        try {
            Map uploadResult =  this.cloudinary.uploader().upload(updateRequireRequest.getAvatar().getBytes(), ObjectUtils.asMap("resource_type", "auto"));
            avatarUrl = (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        user.setPassword(passwordEncoder.encode(updateRequireRequest.getNewPassword()));
        user.getProfile().setAvatar(avatarUrl);
        userRepository.updateRequired(user);
    }

    @Override
    public void updateRequired(User user) throws Exception {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User isCheck = userRepository.getUserByUsername(username);
        if (isCheck != null){
            this.userRepository.updateRequired(user);
        }
    }

    @Override
    public boolean isCheckPhone(String phone) {
        return this.userRepository.isCheckPhone(phone);
    }


}
