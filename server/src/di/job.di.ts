import JobController from '../controllers/job.controller.js';
import JobRepository from '../repositories/job.repository.js';
import JobService from '../services/job.service.js';

const jobRepo = new JobRepository();
const jobService = new JobService(jobRepo);

export const jobController = new JobController(jobService);
