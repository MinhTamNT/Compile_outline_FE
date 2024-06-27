package com.ou.services.impl;

import com.ou.pojo.Rating;
import com.ou.repositories.RatingRepository;
import com.ou.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {
    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> getRatings() {
        return this.ratingRepository.getRatings();
    }
}
