import { Router } from 'express';
import IssueController from '../../controllers/back-post/IssueController';

const IssueRouter = Router();

IssueRouter.get('/', IssueController.getAllIssues);
IssueRouter.get('/:id', IssueController.getIssueById);
IssueRouter.post('/create', IssueController.createIssue);
IssueRouter.put('/edit-full', IssueController.editIssue);
IssueRouter.patch('/:id/status', IssueController.updateStatus);
IssueRouter.put('/:id/status', IssueController.updateStatus);
IssueRouter.delete('/:id', IssueController.deleteIssue);

export default IssueRouter;
