package com.ou.dto.requets;

import com.ou.pojo.Specification;
import com.ou.services.SpecificationService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class YearNotOverlappingValidator implements ConstraintValidator<YearNotOverlapping, AssignmentDto> {

    @Autowired
    private SpecificationService specificationService;

    @Override
    public boolean isValid(AssignmentDto dto, ConstraintValidatorContext context) {
        if (dto.getSpecification() == null || dto.getStartYear() == null) {
            return false;
        }

        Specification existingSpec = specificationService.findBySubjectAndYear(dto.getSpecification().getSubject(), dto.getStartYear().getId());

        return existingSpec == null;
    }
}
