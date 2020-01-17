package com.upp.nc.dto;

import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String name;
    private String lastName;
    private String email;

    public UserDto(String id, String name, String lastName, String email) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
    }
}
