package com.ou.controllers;

import com.ou.pojo.Faculty;
import com.ou.services.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@ControllerAdvice
@RequestMapping("/faculty")
public class FacultyController {
    @Autowired
    private FacultyService facultyService;

    @ModelAttribute
    public void getFaculty(Model model) {
        model.addAttribute("faculties", this.facultyService.getFaculties());
    }

    @GetMapping("/")
    public String list(Model model) {
        return "faculties";
    }

    @GetMapping("/create")
    public String createView(Model model) {
        model.addAttribute("faculty", new Faculty());
        return "faculty";
    }

    @PostMapping("/create")
    public String createNewFaculty(@ModelAttribute(value = "faculty") @Valid Faculty faculty, BindingResult result) {
        if(!result.hasErrors()){
            try{
                this.facultyService.addOrUpdate(faculty);
                return "redirect:/faculty/";
            }catch (Exception exception){
                System.err.println(exception.getMessage());
            }
        }
        return "faculty";
    }

    @GetMapping("/{facultyID}")
    public String updateFaculty(Model model, @PathVariable("facultyID") int id) {
        model.addAttribute("faculty", this.facultyService.getFacultyById(id));
        return "faculty";
    }
}
