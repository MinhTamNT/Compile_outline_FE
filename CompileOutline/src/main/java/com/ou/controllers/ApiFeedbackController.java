package com.ou.controllers;

import com.ou.dto.response.FeedbackDto;
import com.ou.pojo.Feedback;
import com.ou.pojo.Specification;
import com.ou.pojo.User;
import com.ou.services.FeedbackService;
import com.ou.services.SpecificationService;
import com.ou.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/feedback")
public class ApiFeedbackController {
    @Autowired
    private UserService userService;
    @Autowired
    private FeedbackService feedbackService;
    @Autowired
    private SpecificationService specificationService;

    @GetMapping("/{specId}")
    public ResponseEntity<List<FeedbackDto>> getFeedback(@PathVariable("specId") Integer specId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser != null) {
            return new ResponseEntity<>(this.feedbackService.getFeedbacksBySpecId(specId), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(path = "/{spectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> addFeedback(@PathVariable("spectId") Integer specId, @RequestBody Feedback feedback) throws IOException, InterruptedException {
        User currentUser = userService.getCurrentUser();
        if (currentUser != null) {
            if (this.specificationService.getSpecificationById(specId) != null) {
                return new ResponseEntity<>(this.feedbackService.saveFeedback(currentUser, specId, feedback), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping(path = "/{feedbackId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteFeedback(@PathVariable("feedbackId") Integer feedbackId) {
        User currentUser = userService.getCurrentUser();
        System.out.println(currentUser);
        if (currentUser != null) {
            this.feedbackService.deleteFeedback(feedbackId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
