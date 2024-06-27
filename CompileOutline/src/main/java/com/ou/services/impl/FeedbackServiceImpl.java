package com.ou.services.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ou.apiclient.ApiClient;
import com.ou.dto.response.ApiSentiment;
import com.ou.dto.response.FeedbackDto;
import com.ou.pojo.Feedback;
import com.ou.pojo.Specification;
import com.ou.pojo.User;
import com.ou.repositories.FeedbackRepository;
import com.ou.repositories.SpecificationRepository;
import com.ou.repositories.StudentRepository;
import com.ou.services.FeedbackService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    private static final Logger log = LoggerFactory.getLogger(FeedbackServiceImpl.class);
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private SpecificationRepository specificationRepository;


    public static FeedbackDto convertToFeedbackDto(Feedback feedback) {
        FeedbackDto f = new FeedbackDto();
        f.setId(feedback.getId());
        f.setContent(feedback.getContent());
        f.setClassify(feedback.getClassify());
        f.setSpecId(feedback.getSpecification().getId());
        f.setStarts(feedback.getStarts());
        FeedbackDto.ProfileDto p = f.new ProfileDto(
                feedback.getStudentUser().getUser().getUsername(),
                feedback.getStudentUser().getUser().getProfile().getFullname(),
                feedback.getStudentUser().getUser().getProfile().getAvatar()

        );
        f.setProfile(p);
        return f;
    }

    @Override
    public List<FeedbackDto> getFeedbacksBySpecId(int spectId) {
        List<Feedback> feedbackList = this.feedbackRepository.getFeedbacksBySpecId(spectId);
        return feedbackList.stream().map(FeedbackServiceImpl::convertToFeedbackDto).collect(Collectors.toList());
    }

    @Override
    public Feedback getFeedbackById(int feedbackId) {
        return this.feedbackRepository.getFeedbackById(feedbackId);
    }

    @Override
    @Async
    public FeedbackDto saveFeedback(User u, int specId, Feedback feedback) throws IOException, InterruptedException {
        try {
            ApiSentiment text = ApiClient.sendPostRequest("http://127.0.0.1:5000/api/classification_text", String.format("{\"text\":\"%s\"}", feedback.getContent()));
            feedback.setClassify(text.getResult());
        }
        catch(Exception e) {
            e.printStackTrace();
            feedback.setClassify("unknow");
        }
        feedback.setStudentUser(this.studentRepository.getStudentById(u.getId()));
        feedback.setSpecification(this.specificationRepository.getSpecificationById(specId));
        feedback.setCreateAt(Instant.now());
        this.feedbackRepository.saveFeedback(feedback);
        FeedbackDto dto = convertToFeedbackDto(feedback);
        return dto;
    }

    @Override
    public void deleteFeedback(int feedbackId) {
        this.feedbackRepository.deleteFeedback(feedbackId);
    }
}
