package com.ou.controllers;

import com.ou.services.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/year")
public class ApiYearController {
    @Autowired
    private YearService yearService;

    @DeleteMapping("/{yearId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int yearId) {
        try{
            this.yearService.deleteYear(yearId);
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
