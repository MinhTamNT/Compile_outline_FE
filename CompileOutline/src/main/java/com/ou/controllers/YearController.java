package com.ou.controllers;

import com.ou.pojo.Year;
import com.ou.services.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@ControllerAdvice
@RequestMapping("/year")
public class YearController {
    @Autowired
    private YearService yearService;

    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("years", this.yearService.getYears());
    }

    @GetMapping("/")
    public String listYear(Model model) {
        model.addAttribute("year", new Year());
        return "year";
    }

    @PostMapping("/")
    public String addYear(@ModelAttribute("year") @Valid Year year, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("errorMessage", "Không thể xoá vì đã áp dụng khoá đó cho đề cương");
            return "year";
        }
        try {
            this.yearService.addOrUpdateYear(year);
            return "redirect:/year/";
        } catch (Exception exception) {
            System.err.println(exception.getMessage());
        }
        return "year";
    }

    @GetMapping("/{yearId}")
    public String editYear(@PathVariable("yearId") int yearId, Model model) {
        model.addAttribute("year", this.yearService.getYearById(yearId));
        return "editYear";
    }

    @GetMapping("/deleted/{yearId}")
    public String delete(@PathVariable int yearId,Model model) {
        try {
            this.yearService.deleteYear(yearId);
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Không thể xoá vì đã áp dụng khoá đó cho đề cương");
            return "redirect:/year/";
        }
        return "redirect:/year/";
    }

}
