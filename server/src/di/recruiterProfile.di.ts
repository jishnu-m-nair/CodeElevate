import RecruiterProfileController from '../controllers/recruiterProfile.controller.js';
import RecruiterRepository from '../repositories/recruiter.repository.js';
import RecruiterProfileService from '../services/recruiterProfile.service.js';

const recruiterRepo = new RecruiterRepository();
const recruiterProfileService = new RecruiterProfileService(recruiterRepo);

export const recruiterProfileController = new RecruiterProfileController(recruiterProfileService);
