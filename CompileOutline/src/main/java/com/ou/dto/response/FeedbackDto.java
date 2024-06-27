package com.ou.dto.response;

import com.ou.pojo.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * DTO for {@link com.ou.pojo.Feedback}
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FeedbackDto implements Serializable {
    private Integer id;
    private String content;
    private ProfileDto profile;
    private Integer specId;
    private Float starts;
    private String classify;

    @Data
    @AllArgsConstructor
    public class ProfileDto implements Serializable {
        private String username;
        private String fullname;
        private String avatar;

    }
}