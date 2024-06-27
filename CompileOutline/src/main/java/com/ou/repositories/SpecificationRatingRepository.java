package com.ou.repositories;

import com.ou.pojo.SpecificationRating;
import com.ou.pojo.Subject;

import java.util.List;

public interface SpecificationRatingRepository {
    void addSpecificationRating(SpecificationRating specificationRating);
    void deleteSpecificationRating(int ratingId);
}
