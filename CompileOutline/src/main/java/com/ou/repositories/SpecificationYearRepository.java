package com.ou.repositories;

import com.ou.pojo.Specification;
import com.ou.pojo.SpecificationYear;
import com.ou.pojo.Year;

public interface SpecificationYearRepository {
    Year getYearById(int id);
    void addSpecificationYear(SpecificationYear specificationYear);
}
