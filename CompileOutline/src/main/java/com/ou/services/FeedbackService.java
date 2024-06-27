package com.ou.services;

import com.ou.dto.response.FeedbackDto;
import com.ou.pojo.Feedback;
import com.ou.pojo.User;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

public interface FeedbackService {
    List<FeedbackDto> getFeedbacksBySpecId(int spectId);
    Feedback getFeedbackById(int feedbackId);
    FeedbackDto saveFeedback(User u, int specId, Feedback feedback) throws IOException, InterruptedException;
    void deleteFeedback(int feedbackId);
}
