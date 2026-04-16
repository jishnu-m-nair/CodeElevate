import UserProfileController from '../controllers/userProfile.controller.js';
import UserRepository from '../repositories/user.repository.js';
import UserProfileService from '../services/userProfile.service.js';

const userRepo = new UserRepository();
const userProfileService = new UserProfileService(userRepo);

export const userProfileController = new UserProfileController(userProfileService);
