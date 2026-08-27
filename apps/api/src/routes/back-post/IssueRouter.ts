import { Router } from 'express';

import IssueController from '../../controllers/back-post/IssueController';

const IssueRouter = Router();
IssueRouter.get('/', IssueController.getAllIssues);

export default IssueRouter;
