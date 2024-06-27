package com.ou.formatters;

import com.ou.pojo.Rating;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

public class RatingFormatter implements Formatter<Rating> {
    @Override
    public Rating parse(String id, Locale locale) throws ParseException {
        Rating rating = new Rating();
        rating.setId(Integer.parseInt(id));
        return rating;
    }

    @Override
    public String print(Rating rating, Locale locale) {
        return String.valueOf(rating.getId());
    }
}
