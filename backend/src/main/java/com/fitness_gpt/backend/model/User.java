package com.fitness_gpt.backend.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    @Getter
    private String id;

    @Setter
    @Getter
    @NotBlank(message = "Username cannot be blank")
    private String username;

    @Setter
    @Getter
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters.")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).{8,20}$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    private String password;

    @Setter
    @Getter
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @Setter
    @Getter
    @NotBlank(message = "Phone cannot be blank")
    private String phone;

    @Setter
    @Getter
    private String gender;

    @Setter
    @Getter
    private String height;

    @Setter
    @Getter
    private String weight;

    @Setter
    @Getter
    private String Age;

    @Setter
    @Getter
    private String imageId;
}