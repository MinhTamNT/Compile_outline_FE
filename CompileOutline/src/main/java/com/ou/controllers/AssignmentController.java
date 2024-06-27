package com.ou.controllers;

import com.ou.dto.requets.AssignmentDto;
import com.ou.pojo.Specification;
import com.ou.pojo.Year;
import com.ou.services.SpecificationService;
import com.ou.services.SpecificationYearService;
import com.ou.services.SubjectService;
import com.ou.services.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;

@Controller
@ControllerAdvice
@RequestMapping("/assignment")
public class AssignmentController {
    @Autowired
    private SubjectService subjectService;
    @Autowired
    private SpecificationService specificationService;
    @Autowired
    private SpecificationYearService specificationYearService;

    @ModelAttribute
    public void getNecessary(Model model) {
        model.addAttribute("subjects", this.subjectService.getSubjects());
    }

    @GetMapping("/")
    public String assignmentList(Model model) {
        model.addAttribute("assignmentDto", new AssignmentDto());
        model.addAttribute("assignments", this.specificationService.getAllSpecification());
        return "assignmentList";
    }

    @PostMapping("/new")
    public String newAssignment(@ModelAttribute("assignmentDto") @Valid AssignmentDto assignmentDto, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("errorMessgae", "Lỗi thêm !!!Kiểm tra các trường hoặc đề cương đã được áp dụng cho năm học đó đề cương đó");
            return "redirect:/assignment/";
        }
        Specification existingSpec = null;
        Specification spec = assignmentDto.getSpecification();
        Year startYear = assignmentDto.getStartYear();
        System.out.println(startYear.getYear());
        if (startYear.getId() != null) {
            existingSpec = specificationService.findBySubjectAndYear(spec.getSubject(), startYear.getId());
        }
        if (existingSpec != null) {
            return "assignmentList";
        }
        spec.setAssignmentDate(Instant.now());
        specificationService.createOrUpdateSpecification(spec);
        specificationYearService.addSpecificationYear(spec, startYear);

        return "redirect:/assignment/";
    }

    @GetMapping("/{assignmentId}")
    public String editAssignment(@PathVariable("assignmentId") int id, Model model) {
        model.addAttribute("assignment", this.specificationService.getSpecificationById(id));
        model.addAttribute("allSubject", this.specificationService.findAllUnassignedSubjectsIncludingCurrent(id));
        return "assignemted";
    }
}
