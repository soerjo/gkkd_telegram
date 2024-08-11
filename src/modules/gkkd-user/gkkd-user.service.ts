import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class GkkdUserService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.GKKD_USER_SERVICE, // Set your base URL here
    });
  }

  async sendMail(params: Record<string, any>): Promise<any> {
    try {
      const response = await this.axiosInstance.get(
        `/admin/phone/${params?.phone_number}`,
        { params },
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
