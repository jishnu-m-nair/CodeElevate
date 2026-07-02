import type { Request, Response, NextFunction } from 'express';
import type { IAdminService } from '../interface/services/adminService.interface.js';
import { sendResponse } from '../utils/httpResponse.js';
import { Messages } from '../enums/messages.js';
import { StatusCode } from '../enums/statusCode.js';

class AdminController {
  constructor(private readonly _adminService: IAdminService) {}

  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this._adminService.listUsers(req.query);
      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.admin.success.userListSuccess,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  blockUser = async (req: Express.TypedRequest, res: Response, next: NextFunction) => {
    try {
      await this._adminService.blockUser(req.params.id);
      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.admin.success.userBlockSuccess,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  unblockUser = async (req: Express.TypedRequest, res: Response, next: NextFunction) => {
    try {
      await this._adminService.unblockUser(req.params.id);
      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.admin.success.userUnblockSuccess,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  async listRecruiters(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this._adminService.listRecruiters(req.query);
      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.admin.success.recruiterListSuccess,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  blockRecruiter = async (req: Express.TypedRequest, res: Response, next: NextFunction) => {
    try {
      await this._adminService.blockRecruiter(req.params.id);
      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.admin.success.recruiterBlockSuccess,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  unblockRecruiter = async (req: Express.TypedRequest, res: Response, next: NextFunction) => {
    try {
      await this._adminService.unblockRecruiter(req.params.id);
      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.admin.success.recruiterUnblockSuccess,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  getPendingRecruiters = async (req: Express.TypedRequest, res: Response, next: NextFunction) => {
    try {
      const recruiters = await this._adminService.getPendingRecruiters(req.query);
      console.log('recruiters', recruiters);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: 'Pending recruiters fetched successfully',
        data: recruiters,
      });
    } catch (error) {
      next(error);
    }
  };

  approveRecruiter = async (req: Express.TypedRequest, res: Response, next: NextFunction) => {
    try {
      await this._adminService.approveRecruiter(req.params.id);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.admin.success.recruiterApproveSuccess,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  rejectRecruiter = async (req: Express.TypedRequest, res: Response, next: NextFunction) => {
    try {
      const { reason } = req.body;

      await this._adminService.rejectRecruiter(req.params.id, reason);

      sendResponse(res, StatusCode.OK, {
        success: true,
        message: Messages.admin.success.recruiterRejectSuccess,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminController;
