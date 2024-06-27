package com.ou.formatters;

import com.ou.pojo.Subject;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

public class SubjectFormatter implements Formatter<Subject> {


    @Override
    public Subject parse(String id, Locale locale) throws ParseException {
        Subject subject = new Subject();
        subject.setId(Integer.parseInt(id));
        return subject;
    }

    @Override
    public String print(Subject subject, Locale locale) {
        return String.valueOf(subject.getId());
    }
}
