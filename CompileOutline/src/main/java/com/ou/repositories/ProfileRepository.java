package com.ou.repositories;

import com.ou.pojo.Profile;

public interface ProfileRepository {
    void updateProfile(Profile profile);
    void addProfile(Profile profile);
    Profile getProfileById(int id);
}
