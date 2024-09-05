// variable: 상대 경로 상수 //
export const ROOT_PATH = '/';

export const AUTH_PATH = '/auth';

export const CS_PATH = '/cs';
export const CS_WRITE_PATH = 'write';
export const CS_DETAIL_PATH = (customNumber: string | number) => `${customNumber}`;
export const CS_UPDATE_PATH = (customNumber: string | number) => `${customNumber}/update`;

export const MM_PATH = '/mm';

export const HR_PATH = '/hr';
export const HR_DETAIL_PATH = (userId: string) => `${userId}`;
export const HR_UPDATE_PATH = (userId: string) => `${userId}/update`;

export const OTHERS_PATH = '*';

// variable: 절대 경로 상수 //
export const ROOT_ABSOLUTE_PATH = ROOT_PATH;

export const AUTH_ABSOLUTE_PATH = AUTH_PATH;

export const CS_ABSOLUTE_PATH = CS_PATH;
export const CS_WRITE_ABSOLUTE_PATH = `${CS_PATH}/${CS_WRITE_PATH}`;
export const CS_DETAIL_ABSOLUTE_PATH = (customNumber: string | number) => `${CS_PATH}/${CS_DETAIL_PATH(customNumber)}`;
export const CS_UPDATE_ABSOLUTE_PATH = (customNumber: string | number) => `${CS_PATH}/${CS_UPDATE_PATH(customNumber)}`;

export const MM_ABSOLUTE_PATH = MM_PATH;

export const HR_ABSOLUTE_PATH = HR_PATH;
export const HR_DETAIL_ABSOLUTE_PATH = (userId: string) => `${HR_PATH}/${HR_DETAIL_PATH(userId)}`;
export const HR_UPDATE_ABSOLUTE_PATH = (userId: string) => `${HR_PATH}/${HR_UPDATE_PATH(userId)}`;

// variable: HTTP BEARER TOKEN COOKIE NAME //
export const ACCESS_TOKEN = 'accessToken';