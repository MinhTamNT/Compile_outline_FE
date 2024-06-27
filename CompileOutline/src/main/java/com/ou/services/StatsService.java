package com.ou.services;

import java.util.List;

public interface StatsService {
    Long countStudent();
    Long countSubject();
    Long countSubmitSpecification();
    List<Object[]> statsSpecSubmit(int year, String period);
    List<Object[]> statsFeedback(int specId);
}
