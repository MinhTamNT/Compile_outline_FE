package com.ou.services.impl;

import com.ou.dto.response.SpecificationDto;
import com.ou.pojo.Specification;
import com.ou.pojo.Subject;
import com.ou.repositories.SpecificationRepository;
import com.ou.services.SpecificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class SpecificationServiceImpl implements SpecificationService {
    @Autowired
    private SpecificationRepository specificationRepository;

    @Override
    public List<Specification> getAllSpecification() {
        return this.specificationRepository.getAllSpecification();
    }

    @Override
    public List<Subject> getAllSubjectNoAssignment() {
        return this.specificationRepository.getAllSubjectNoAssignment();
    }

    @Override
    public List<Specification> getListSpecificationOfLecturerId(int lecturerId) {
        return this.specificationRepository.getListSpecificationOfLecturerId(lecturerId);
    }

    @Override
    public Specification getSpecificationById(int specificationId) {
        return this.specificationRepository.getSpecificationById(specificationId);
    }

    @Override
    public void createOrUpdateSpecification(Specification specification) {
        this.specificationRepository.createOrUpdateSpecification(specification);
    }

    @Override
    public void submitSpecification(int specificationId) {
        Specification specification = this.specificationRepository.getSpecificationById(specificationId);
        specification.setIsSubmitted(true);
        specification.setCreatedAt(Instant.now());
        this.createOrUpdateSpecification(specification);
    }

    @Override
    public List<Subject> findAllUnassignedSubjectsIncludingCurrent(int currentAssignmentId) {
        return this.specificationRepository.findAllUnassignedSubjectsIncludingCurrent(currentAssignmentId);
    }

    @Override
    public Specification findBySubjectAndYear(Subject subject, int year) {
        List<Specification> specifications = specificationRepository.findBySubjectAndYear(subject, year);
        return specifications.isEmpty() ? null :  specifications.get(0);
    }

    @Override
    public List<Map<String, Object>> getSpecifications(Map<String, String> params, Boolean isAdmin) {
        return this.specificationRepository.getSpecifications(params, isAdmin);
    }

    @Override
    public SpecificationDto getDetailSpecification(int specificationId) {
        Specification spec = this.specificationRepository.getSpecificationById(specificationId);
        SpecificationDto specDto = new SpecificationDto();
        specDto.setId(spec.getId());
        specDto.setCredits(spec.getCredits());
        specDto.setCreatedAt(spec.getCreatedAt());
        specDto.setDescription(spec.getDescription());
        specDto.setFullname(spec.getLecturerUser().getUser().getProfile().getFullname());
        specDto.setEmail(spec.getLecturerUser().getUser().getProfile().getEmail());
        specDto.setSubject(spec.getSubject());
        specDto.setFaculty(spec.getSubject().getFaculty().getFacultyName());
        specDto.setSubjectRequirements(spec.getSubject().getSubjectRequirements());
        specDto.setObjectives(spec.getObjectives());
        specDto.setOutcomes(spec.getOutcomes());
        specDto.setSpecificationRatings(spec.getSpecificationRatings());
        specDto.setYears(spec.getYears());
        return specDto;
    }

    @Override
    public List<Specification> findSpecSubmitted() {
        return this.specificationRepository.findSpecSubmitted();
    }
}
