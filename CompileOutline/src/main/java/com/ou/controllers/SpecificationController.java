package com.ou.controllers;


import com.ou.pojo.*;
import com.ou.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.util.Map;

@Controller
@RequestMapping("/specification")
public class SpecificationController {
    @Autowired
    private SpecificationService specificationService;
    @Autowired
    private RequirementService requirementService;
    @Autowired
    private SubjectService subjectService;
    @Autowired
    private SubjectRequirementService subjectRequirementService;
    @Autowired
    private ObjectiveService objectiveService;
    @Autowired
    private OutcomeService outcomeService;
    @Autowired
    private HomeController homeController;
    @Autowired
    private RatingService ratingService;
    @Autowired
    private SpecificationRatingService specificationRatingService;

    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("requirements", this.requirementService.getAllRequirements());
    }

    @GetMapping("/")
    public String specificationList(Model model) {
        User u = this.homeController.getCurrentUser();
        model.addAttribute("specification", this.specificationService.getListSpecificationOfLecturerId(u.getId()));
        return "lecturerHome";
    }

    @GetMapping("/{specificationId}/edit")
    public String editSpecification(@PathVariable("specificationId") int specificationId, Model model) {
        model.addAttribute("specification", this.specificationService.getSpecificationById(specificationId));
        model.addAttribute("ratingMethods", this.ratingService.getRatings());
        model.addAttribute("specificationRating", new SpecificationRating());
        return "specification";
    }

    @PostMapping("/update")
    public String updateSpecification(@ModelAttribute("specification") @Valid Specification specification, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("errorMessgae", "Vui lòng nhập đủ tín chỉ và mô tả đề cương");
            return String.format("redirect:/specification/%d/edit", specification.getId());
        }
        try {
            this.specificationService.createOrUpdateSpecification(specification);
            return String.format("redirect:/specification/%d/edit", specification.getId());
        } catch (Exception exception) {
            System.err.println(exception.getMessage());
        }
        return "specification";
    }

    //requirement
    @GetMapping("/{specificationId}/requirement")
    public String requirement(@PathVariable("specificationId") int specificationId, Model model) {
        Specification spec = this.specificationService.getSpecificationById(specificationId);
        SubjectRequirement subjectRequirement = new SubjectRequirement();
        subjectRequirement.setSubject(spec.getSubject());
        model.addAttribute("subjectRequirement", subjectRequirement);
        model.addAttribute("specId", specificationId);
        return "requirement";
    }

    @PostMapping("/requirement/save")
    public String saveRequirement(@ModelAttribute("subjectRequirement") SubjectRequirement subjectRequirement,
                                  @RequestParam("specId") int specId) {
        SubjectRequirementId subjectRequirementId = new SubjectRequirementId(subjectRequirement.getSubject().getId(), subjectRequirement.getSubjectRequirements().getId());
        subjectRequirement.setId(subjectRequirementId);
        this.subjectRequirementService.addOrUpdateSubjectRequirement(subjectRequirement);
        return String.format("redirect:/specification/%d/edit", specId);
    }


    @GetMapping("/{specificationId}/edit/objectives")
    public String editObjectives(@PathVariable("specificationId") int specificationId, Model model) {
        Specification specification = this.specificationService.getSpecificationById(specificationId);
        Objective objective = new Objective();
        objective.setSpecification(specification);
        model.addAttribute("objectives", objective);
        return "objectives";
    }

    @PostMapping("/objectives")
    public String editObjectives(@ModelAttribute("objectives") @Valid Objective objective, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("errorMessageObject", "Thêm thất bại");
            return String.format("redirect:/specification/%d/edit", objective.getSpecification().getId());
        }
        try {
            this.objectiveService.addOrUpdateObjective(objective);
            return String.format("redirect:/specification/%d/edit", objective.getSpecification().getId());
        } catch (Exception exception) {
            System.err.println(exception.getMessage());

        }
        return "objectives";

    }

    @GetMapping("/objectives/{objectiveId}")
    public String editObjective(@PathVariable("objectiveId") int objectiveId, Model model) {
        model.addAttribute("objectives", this.objectiveService.getObjectiveById(objectiveId));
        return "objectives";
    }

    //outcomes
    @GetMapping("/{specificationId}/edit/outcomes")
    public String editOutcomes(@PathVariable("specificationId") int specificationId, Model model) {
        Specification specification = this.specificationService.getSpecificationById(specificationId);
        Outcome outcome = new Outcome();
        outcome.setSpecification(specification);
        model.addAttribute("outcome", outcome);
        return "outcomes";
    }

    @PostMapping("/outcomes")
    public String editOutcomes(@ModelAttribute("outcomes") @Valid Outcome outcome, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("errorMessgaeOutCome", "Thêm thất bại đẩu ra thất bại Thử lại");
            return String.format("redirect:/specification/%d/edit", outcome.getSpecification().getId());
        }
        try {
            this.outcomeService.addOrUpdateOutcome(outcome);
            return String.format("redirect:/specification/%d/edit", outcome.getSpecification().getId());
        } catch (Exception exception) {
            System.err.println(exception.getMessage());
        }
        return "outcomes";
    }

    @GetMapping("/outcomes/{outcomeId}")
    public String editOutcome(@PathVariable("outcomeId") int outcomeId, Model model) {
        model.addAttribute("outcome", this.outcomeService.getOutcomeById(outcomeId));
        return "outcomes";
    }

    //
    @PostMapping("/rating/save")
    public String saveRating(@ModelAttribute("specificationRating") @Valid SpecificationRating specificationRating, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("errorRatting", "Thêm thất bại vui lòng kiểm tra");
            return String.format("redirect:/specification/%d/edit", specificationRating.getSpecification().getId());
        }
        try {
            this.specificationRatingService.addSpecificationRating(specificationRating);
            return String.format("redirect:/specification/%d/edit", specificationRating.getSpecification().getId());
        } catch (Exception e) {
            System.out.printf(e.getMessage());
        }
        return "specification";

    }
}
