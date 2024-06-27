package com.ou.services.impl;

import com.ou.pojo.SpecificationRating;
import com.ou.repositories.SpecificationRatingRepository;
import com.ou.services.SpecificationRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpecificationRatingServiceImpl implements SpecificationRatingService {
    @Autowired
    private SpecificationRatingRepository specificationRatingRepository;
    @Override
    public void addSpecificationRating(SpecificationRating specificationRating) {
        this.specificationRatingRepository.addSpecificationRating(specificationRating);
    }

    @Override
    public void deleteSpecificationRating(int ratingId) {
        this.specificationRatingRepository.deleteSpecificationRating(ratingId);
    }
}
