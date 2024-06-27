package com.ou.components;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;

@Component
public class JWTService {

    private static final String SECRET_KEY = "6f5ad992-0277-4471-8793-8eb2689ea767";
    private static final byte[] SHARED_SECRET_KEY = SECRET_KEY.getBytes();
    private static final int EXPIRE_TIME = 86400000;

    public String generateTokenLogin(String username) {
        try {
            JWSSigner signer = new MACSigner(SHARED_SECRET_KEY);
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .claim("username", username)
                    .expirationTime(new Date(System.currentTimeMillis() + EXPIRE_TIME))
                    .build();

            SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (JOSEException e) {
            System.err.println("Error generating token: " + e.getMessage());
            return null;
        }
    }

    private JWTClaimsSet getClaimsFromToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            System.out.println(signedJWT);
            JWSVerifier verifier = new MACVerifier(SHARED_SECRET_KEY);

            if (signedJWT.verify(verifier)) {
                return signedJWT.getJWTClaimsSet();
            }
        } catch (JOSEException | ParseException e) {
            System.err.println("Error parsing or verifying token: " + e.getMessage());
        }
        return null;
    }

    public String getUsernameFromToken(String token) {
        JWTClaimsSet claims = getClaimsFromToken(token);
        try {
            if (claims != null) {
                return claims.getStringClaim("username");
            }
        } catch (ParseException e) {
            System.err.println("Error getting username from token: " + e.getMessage());
        }
        return null;
    }

    private Date getExpirationDateFromToken(String token) {
        JWTClaimsSet claims = getClaimsFromToken(token);
        if (claims != null) {
            return claims.getExpirationTime();
        }
        return null;
    }

    private Boolean isTokenExpired(String token) {
        Date expiration = getExpirationDateFromToken(token);
        return expiration != null && expiration.before(new Date());
    }

    public Boolean validateTokenLogin(String token) {
        if (token == null || token.trim().isEmpty()) {
            return false;
        }
        String username = getUsernameFromToken(token);
        return username != null && !username.isEmpty() && !isTokenExpired(token);
    }
}
