package com.ou.controllers;

import com.ou.pojo.Admin;
import com.ou.pojo.Profile;
import com.ou.pojo.Student;
import com.ou.pojo.User;
import com.ou.services.AdminService;
import com.ou.services.LecturerService;
import com.ou.services.StudentService;
import com.ou.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private LecturerService lecturerService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private AdminService adminService;


    @GetMapping("/admin")
    public String admin(Model model) {
        model.addAttribute("admins", this.adminService.getAllAdmins());
        model.addAttribute("user", new User());
        return "admin_account";
    }

    @PostMapping("/admin")
    public String newAdmin(@ModelAttribute("user") User u) {
        this.userService.registerAdmin(u);
        return "redirect:/users/admin";
    }


    @GetMapping("/lecturer")
    public String lecturer(Model model) {
        model.addAttribute("lecturers", this.lecturerService.getAllLecturer());
        return "lecturer_account";
    }

    @GetMapping("/{userID}")
    public String updateProfile(Model model, @PathVariable("userID") int id){
        model.addAttribute("profile", this.userService.getProfileById(id));
        return "user_profile";
    }

    @PostMapping("/")
    public String updateProfile(@ModelAttribute("profile") @Valid Profile profile, BindingResult rs) {
        if(!rs.hasErrors()) {
            try {
                this.userService.updateProfile(profile);
                if (profile.getUser().getRole().equals("ROLE_LECTURER")){
                    return "redirect:/users/lecturer";
                }
                else{
                    return "redirect:/users/student";
                }
            }
            catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
        return String.format("redirect:/users/%d", profile.getId());
    }

    @GetMapping("/student")
    public String student(Model model) {
        model.addAttribute("students", this.studentService.getAllStudent());
        model.addAttribute("student", new Student());
        return "student_account";
    }

    @PostMapping("/student")
    public String newStudent(@ModelAttribute(value = "student") @Valid Student student , BindingResult result,Model model) {
        if (result.hasErrors()) {
            model.addAttribute("errorMessage", "Vui Lòng điền đầy đủ trường để thêm học sinh");
            return "redirect:/users/student";
        }
        try {
            this.userService.addNewStudent(student);
            return "redirect:/users/student";
        } catch (Exception exception) {
            System.err.println(exception.getMessage());
            model.addAttribute("errorMessage", "Đã xảy ra lỗi trong khi thêm học sinh. Vui lòng thử lại.");
            return "student_account";
        }

    }
}
