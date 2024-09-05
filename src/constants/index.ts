// variable: 상대 경로 상수 //
export const ROOT_PATH = '/';
export const AUTH_PATH = '/auth';
export const CS_PATH = '/cs';
export const CS_WRITE_PATH = 'write';
export const CS_DETAIL_PATH = (customNumber: string | number) => customNumber;
export const CS_UPDATE_PATH = (customNumber: string | number) => `${customNumber}/update`;
export const MM_PATH = '/mm';
export const HR_PATH = '/hr';
export const HR_DETAIL_PATH = (userId: string) => userId;
export const HR_UPDATE_PATH = (userId: string) => `${userId}/update`;
export const OTHERS_PATH = '*';

// variable: 절대 경로 상수 //