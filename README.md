# university_of_programming_hero

### SDLC->Software development lifeCycle

- 1 .Planning
- 2. Analyze
- 3. Design
- 4. Implementation
- 5. Testing & Integration
- 6. Maintenance

### Analyze -> Product Owner, Project Manager, Business Analyst

- PRD -> Product Requirements Document
- BRD -> Business Requirements Document
- SRS -> Software Requirements Specification
- FRD -> Functional Requirements Document

### Design -> System Architect , UI/UX Designer

- System Design of Software
- High Level Design Document
- Low Level Design Document
- Database Schema

### Development -> Fr, BD, FD

- Backend Development
- frontend development
- Api Integration
- Database Schema

### Testing -> Solution Architect, QA Engineer, Tester

- Test Plan
- Test case
- Test Scripts
- Defects Report

### Maintenance -> Support Managers, Testers, Developers

- Change Request
- Bug Reports
- Patch Release

### How We Will Start

- Requirements Analysis
- ER Diagram
- API Endpoint
- WireFrame

### Golbal Errorhandler

`ts

`

````ts

                        /* eslint-disable no-undef */

/_ eslint-disable @typescript-eslint/no-unused-vars _/
/_ eslint-disable no-unused-vars _/
/_ eslint-disable @typescript-eslint/no-explicit-any _/
next(err)---->
app.use(globalErrorHandler);
app.use((err, req:Request, res:Response, next:NextFunction)=>{
res.status(500).json({
success:false,
message:err.message || 'something went wrong',
error:err,
})
})


import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
err: any,
req: Request,
res: Response,
next: NextFunction,
) => {
const statusCode = 500;
const message = err.message || 'something went wrong!';
return res.status(statusCode).json({
success: false,
message,
error: err,
});
};

export default globalErrorHandler;

                ```
````
