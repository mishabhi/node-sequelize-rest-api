import { Request, Response } from 'express';
import { Project } from '../domain/project.domain'
import { Post, Req, JsonController, Res, Controller, Param, Get, OnUndefined, Put, Delete } from "routing-controllers";
import { dbConfig } from '../config/database';

@Controller("/api/project")
export class ProjectController {

    @Post("/")
    async createProject(@Req() request: Request, @Res() response: Response) {
        await Project.create({
            "name": request.body.name,
            "description": request.body.description,
            "status": request.body.status
        }).then(project => {
            console.log("Project created successfully with id " + project.id);
            return response.status(201).send(project);
        }).catch(err => {
            console.log("Exception while creating project: " + err);
            return response.status(500).send({ msg: "error", details: err });
        });
    }

    @Get("/:id")
    @OnUndefined(404)
    async getProject(@Param("id") projectId: number, @Res() response: Response) {
        await Project.findByPk(projectId)
            .then(project => {
                console.log("Project retrieved successfully with id " + projectId);
                return response.status(200).send(project);
            }).catch(err => {
                console.log("Exception while retrieving project details for id: " + projectId);
                return response.status(500).send({ msg: "error", details: err });
            });
    }

    @Get("/")
    @OnUndefined(404)
    async getAllProject(@Res() response: Response) {
        await Project.findAll()
            .then(project => {
                console.log("Project List retrieved successfully");
                return response.status(200).send(project);
            }).catch(err => {
                console.log("Exception while retrieving project details list");
                return response.status(500).send({ msg: "error", details: err });
            });
    }

    @Put("/")
    async updateProject(@Req() updateProjectRequest: Request, @Res() response: Response) {
        console.log('Update project request for id: ' + updateProjectRequest.body.id);
        await Project.update(updateProjectRequest.body, { where: { id: updateProjectRequest.body.id } })
            .then(project => {
                console.log("Project updated successfully with id " + updateProjectRequest.body.id);
                //const updatedProject = project.update(updateProjectRequest.body);
                return response.status(200).send(project);
            }).catch(err => {
                console.log("Exception while updating project: " + err);
                return response.status(500).send({ msg: "error", details: err });
            });
    }

    @Delete("/:id")
    @OnUndefined(404)
    async deleteProject(@Param("id") projectId: number, @Res() response: Response) {
        await Project.destroy({ where: { id: projectId } })
            .then(deletedRecords => {
                console.log("Project deleted successfully for id " + projectId);
                return response.sendStatus(200);
            }).catch(err => {
                console.log("Exception while deleting project for id: " + projectId);
                return response.status(500).send({ msg: "error", details: err });
            });
    }
}
