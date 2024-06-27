package com.ou.controllers;

import com.ou.pojo.Lecturer;
import com.ou.services.LecturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignment")
public class ApiAssignmentController {
    @Autowired
    private LecturerService lecturerService;

    @GetMapping(value = "/getLecturersByFaculty", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<List<Lecturer>> getLecturersByFaculty(@RequestParam("facultyId") int facultyId) {
        List<Lecturer> lecturers = this.lecturerService.getLecturerByFacultyId(facultyId);
        return new ResponseEntity<>(lecturers, HttpStatus.OK);
    }
}
