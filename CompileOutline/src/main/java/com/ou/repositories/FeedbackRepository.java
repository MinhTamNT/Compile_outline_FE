package com.ou.repositories;

import com.ou.pojo.Feedback;

import java.util.List;

public interface FeedbackRepository {
    List<Feedback> getFeedbacksBySpecId(int spectId);
    Feedback getFeedbackById(int feedbackId);
    void saveFeedback(Feedback feedback);
    void deleteFeedback(int feedbackId);
}
