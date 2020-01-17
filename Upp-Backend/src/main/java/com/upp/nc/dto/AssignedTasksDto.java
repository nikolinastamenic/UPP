package com.upp.nc.dto;

import lombok.Data;

@Data
public class AssignedTasksDto {

    private String processInstanceId;
    private String taskKey;

    public AssignedTasksDto(String processInstanceId, String taskKey) {
        this.processInstanceId = processInstanceId;
        this.taskKey = taskKey;
    }
}
