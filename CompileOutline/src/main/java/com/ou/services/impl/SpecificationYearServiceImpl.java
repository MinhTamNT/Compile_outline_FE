package com.ou.services.impl;

import com.ou.pojo.Specification;
import com.ou.pojo.SpecificationYear;
import com.ou.pojo.SpecificationYearId;
import com.ou.pojo.Year;
import com.ou.repositories.SpecificationYearRepository;
import com.ou.repositories.YearRepository;
import com.ou.services.SpecificationYearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpecificationYearServiceImpl implements SpecificationYearService {
    @Autowired
    private YearRepository yearRepository;
    @Autowired
    private SpecificationYearRepository specificationYearRepository;
    @Override
    public void addSpecificationYear(Specification spec, Year year) {
        SpecificationYearId id1 = new SpecificationYearId(spec.getId(), year.getId());
        Year y = this.specificationYearRepository.getYearById(year.getId());
        SpecificationYear specYear1 = new SpecificationYear();
        specYear1.setId(id1);
        specYear1.setSpecification(spec);
        specYear1.setYear(y);
        this.specificationYearRepository.addSpecificationYear(specYear1);
        Year y2 = this.yearRepository.getYearByYearmame(y.getYear() + 1);
        if(y2 != null){
            SpecificationYearId id2 = new SpecificationYearId(spec.getId(), y2.getId());
            SpecificationYear specYear2 = new SpecificationYear();
            specYear2.setId(id2);
            specYear2.setSpecification(spec);
            specYear2.setYear(y2);
            this.specificationYearRepository.addSpecificationYear(specYear2);
        }
    }
}
