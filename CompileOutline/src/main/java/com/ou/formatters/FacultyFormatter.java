package com.ou.formatters;

import com.ou.pojo.Faculty;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

public class FacultyFormatter implements Formatter<Faculty> {
    @Override
    public Faculty parse(String id, Locale locale) throws ParseException {
        Faculty faculty = new Faculty();
        faculty.setId(Integer.parseInt(id));
        return faculty;
    }

    @Override
    public String print(Faculty faculty, Locale locale) {
        return String.valueOf(faculty.getId());
    }
}
