export enum UserStatus {
  Available = 'Available',
  Busy = 'Busy',
  Away = 'Away',
}

export interface User {
  id: string;
  username: string;
  country: string;
  language: string;
  interests: string[];
  status: UserStatus;
  avatarColor: string;
  seeking?: string;
  isAgeVerified: boolean;
}

export interface Message {
  id: string;
  userId: string;
  roomId: string;
  text: string;
  timestamp: number;
  reactions?: Record<string, string[]>; // emoji -> userIds
  replyToMessageId?: string;
}

export interface Room {
  id: string;
  name: string;
  type: 'public' | 'private' | 'dm';
  icon: string;
  password?: string;
  ownerId?: string;
  participantIds?: string[];
  ageGate?: boolean;
}

export interface RoomCategory {
  categoryName: string;
  rooms: Room[];
}

export enum ReportReason {
  Spam = 'reportReason_spam',
  Harassment = 'reportReason_harassment',
  HateSpeech = 'reportReason_hateSpeech',
  InappropriateContent = 'reportReason_inappropriateContent',
  Other = 'reportReason_other',
}