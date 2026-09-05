export interface AppSetting {
  id: string;
  key: string;
  value: string;
  type: "BOOLEAN" | "STRING" | "NUMBER";
  createdAt: string;
  updatedAt: string;
}

export interface AppSettingsResponse {
  success: boolean;
  message: string;
  data: AppSetting[];
}

export interface UpdateAppSettingResponse {
  success: boolean;
  message: string;
  data: AppSetting;
}