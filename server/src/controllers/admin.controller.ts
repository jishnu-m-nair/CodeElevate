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
}

export default AdminController;
