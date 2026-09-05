import { AppSettingsResponse, UpdateAppSettingResponse } from "@/types/app-settings";
import axiosInstance from "../axios";


export const getAppSettings = async (): Promise<AppSettingsResponse> => {
  const { data } = await axiosInstance.get<AppSettingsResponse>("/app-settings");

  return data;
};

export const updateAppSetting = async ({
  id,
  value,
}: {
  id: string;
  value: string;
}): Promise<UpdateAppSettingResponse> => {
  const { data } = await axiosInstance.put<UpdateAppSettingResponse>(`/app-settings/${id}`, { value });

  return data;
};