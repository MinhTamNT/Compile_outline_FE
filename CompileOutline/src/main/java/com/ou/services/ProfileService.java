package com.ou.services;

import com.ou.pojo.Profile;

public interface ProfileService {
    void updateProfile(Profile profile);
    Profile getProfile(int id);
}
