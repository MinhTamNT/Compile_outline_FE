package com.ou.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ApiSentiment {
    private String result;

    public ApiSentiment(@JsonProperty("result") String result) {
        this.result = result;
    }
}