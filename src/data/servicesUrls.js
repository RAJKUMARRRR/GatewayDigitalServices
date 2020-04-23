export const BASE_URL = "http://192.168.1.2:8080";
//export const BASE_URL = 'https://gds-chat-server.herokuapp.com';
export const CONVERSATIONS_URL = BASE_URL + '/users/conversations';
export const MESSAGES_URL = BASE_URL + '/conversations/messages';
export const SEND_MESSAGE_URL = BASE_URL + '/messages';
export const SEND_MEDIA_URL = BASE_URL + '/media/upload';
export const SEND_OTP_URL = BASE_URL + '/auth/sendOTP';
export const VERIFY_OTP_URL = BASE_URL + '/auth/validateOTP';
export const PROFILE_URL = BASE_URL + '/users/profile';
export const UPDATE_PROFILE_URL = BASE_URL + '/users';
export const MARK_CONVERSATION_URL = BASE_URL + '/conversations/mark_read';