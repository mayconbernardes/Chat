import React, { useState, useCallback, useEffect, useRef, useContext, useMemo } from 'react';
import { User, Room, Message, UserStatus, RoomCategory, ReportReason } from '../../types';
import { ROOM_STRUCTURE, MOCK_MESSAGES, REACTION_EMOJIS, EMOJI_CATEGORIES, CHAT_BACKGROUNDS, MOCK_ADS } from '../../constants';
import SendIcon from '../icons/SendIcon';
import PlusIcon from '../icons/PlusIcon';
import LockIcon from '../icons/LockIcon';
import EmojiIcon from '../icons/EmojiIcon';
import UsersIcon from '../icons/UsersIcon';
import ChatBubbleIcon from '../icons/ChatBubbleIcon';
import TrashIcon from '../icons/TrashIcon';
import LogoutIcon from '../icons/LogoutIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import SearchIcon from '../icons/SearchIcon';
import SettingsIcon from '../icons/SettingsIcon';
import ReplyIcon from '../icons/ReplyIcon';
import PanelLeftIcon from '../icons/PanelLeftIcon';
import PanelRightIcon from '../icons/PanelRightIcon';
import CloseIcon from '../icons/CloseIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import CreateRoomModal from '../modals/CreateRoomModal';
import UserProfileModal from '../modals/UserProfileModal';
import LogoutConfirmationModal from '../modals/LogoutConfirmationModal';
import PasswordPromptModal from '../modals/PasswordPromptModal';
import AgeVerificationModal from '../modals/AgeVerificationModal';
import BlockUserModal from '../modals/BlockUserModal';
import ReportUserModal from '../modals/ReportUserModal';
import UserProfileTooltip from '../tooltips/UserProfileTooltip';
import { LanguageContext } from '../../App';
import { useTheme } from '../../contexts/ThemeContext';
import ShieldOffIcon from '../icons/ShieldOffIcon';
import { usePersonalization } from '../../contexts/PersonalizationContext';
import StoreIcon from '../icons/StoreIcon';

// Integrations (Supabase & Firebase)
let useRealtimeChat: any = null;
try {
  // Tenta Supabase primeiro (mais fácil/gratuito)
  const supabaseModule = require('../../useSupabaseChat');
  useRealtimeChat = supabaseModule.useSupabaseChat;
} catch (e) {
  try {
    // Fallback para Firebase
    const firebaseModule = require('../../useFirebaseChat');
    useRealtimeChat = firebaseModule.useFirebaseChat;
  } catch (e2) {
    console.log('Nenhum backend configurado - usando modo simulação');
  }
}

// Helper component for User Avatar
export const UserAvatar: React.FC<{ user: User | undefined, size?: string }> = ({ user, size = 'h-10 w-10' }) => {
  if (!user) return null;
  const initial = user.username.charAt(0).toUpperCase();
  return (
    <div className={`flex-shrink-0 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-bold ${size} text-xl`}>
      {initial}
    </div>
  );
};

// Marketplace Component
const Marketplace: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex(prevIndex => (prevIndex + 1) % MOCK_ADS.length);
    }, 7000); // Change ad every 7 seconds

    return () => clearInterval(interval);
  }, []);

  const currentAd = MOCK_ADS[currentAdIndex];

  return (
    <div className="mt-auto pt-2 px-1">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={!isCollapsed}
        className="w-full flex items-center justify-between text-sm font-semibold uppercase text-green-600 dark:text-green-400 bg-slate-100/70 dark:bg-slate-900/70 px-3 py-1.5 rounded-md my-1 shadow hover:bg-slate-200/70 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <div className="flex items-center gap-2">
          <StoreIcon className="h-4 w-4" />
          <span className="truncate">{t('marketplace')}</span>
        </div>
        <ChevronDownIcon className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${!isCollapsed ? 'rotate-0' : '-rotate-90'}`} />
      </button>
      {!isCollapsed && (
        <div className="bg-white dark:bg-slate-700/50 rounded-lg p-3 mt-1 shadow-md animate-fade-in-fast">
          <img src={currentAd.image} alt={t(currentAd.titleKey)} className="w-full h-24 object-cover rounded-md mb-2" />
          <h4 className="font-bold text-slate-800 dark:text-white text-sm">{t(currentAd.titleKey)}</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">{t(currentAd.descriptionKey)}</p>
          <a
            href={currentAd.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center bg-sky-500 text-white text-xs font-bold py-1.5 px-2 rounded-md transition-colors hover:bg-sky-600"
          >
            {t('learnMore')}
          </a>
        </div>
      )}
    </div>
  );
};

// RoomList Component
const RoomList: React.FC<{ roomCategories: RoomCategory[]; activeRoom: Room; onSelectRoom: (room: Room) => void; onOpenCreateRoom: () => void; onDeleteRoom: (roomId: string) => void; currentUser: User; roomUserCounts: Record<string, number>; openCategories: string[]; onToggleCategory: (categoryName: string) => void; onCloseDm: (roomId: string) => void; onInitiateLogout: () => void; }> = ({ roomCategories, activeRoom, onSelectRoom, onOpenCreateRoom, onDeleteRoom, currentUser, roomUserCounts, openCategories, onToggleCategory, onCloseDm, onInitiateLogout }) => {
  const { t } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return roomCategories;
    }

    const lowercasedFilter = searchTerm.toLowerCase();

    return roomCategories
      .map(category => ({
        ...category,
        rooms: category.rooms.filter(room =>
          room.name.toLowerCase().includes(lowercasedFilter)
        ),
      }))
      .filter(category => category.rooms.length > 0);
  }, [roomCategories, searchTerm]);

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 flex flex-col h-full">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white px-2 mb-2">{t('roomsLabel')}</h2>
      <div className="relative mb-2 px-1">
        <input
          type="text"
          placeholder={t('searchRoomsPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg pl-9 pr-3 py-1.5 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition text-sm"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {filteredCategories.map(category => {
          const isExpanded = openCategories.includes(category.categoryName);
          if (category.rooms.length === 0) return null;

          const categoryUserCount = category.rooms.reduce((sum, room) => sum + (roomUserCounts[room.id] || 0), 0);

          return (
            <div key={category.categoryName}>
              <button
                onClick={() => onToggleCategory(category.categoryName)}
                aria-expanded={isExpanded}
                className="w-full flex items-center justify-between text-sm font-semibold uppercase text-sky-600 dark:text-sky-300 bg-slate-100/70 dark:bg-slate-900/70 px-3 py-1.5 rounded-md my-1 shadow hover:bg-slate-200/70 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <span className="truncate">{category.categoryName} ({categoryUserCount})</span>
                <ChevronDownIcon className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
              </button>
              {isExpanded && (
                <div className="pl-2 pt-1 space-y-1 animate-fade-in-fast">
                  {category.rooms.map(room => {
                    const userCount = roomUserCounts[room.id] || 0;
                    return (
                      <div
                        key={room.id}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${activeRoom.id === room.id ? 'bg-sky-100 text-sky-800 dark:bg-sky-600 dark:text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                        <button onClick={() => onSelectRoom(room)} className="flex items-center text-left text-base font-medium flex-1 truncate mr-2">
                          <span className="mr-3 text-xl">{room.icon}</span>
                          <div className="flex-1 flex justify-between items-center">
                            <span className={`truncate ${activeRoom.id === room.id ? 'font-semibold' : 'text-slate-800 dark:text-slate-300'}`}>{room.name}</span>
                            {userCount > 0 && (
                              <span className={`text-xs font-medium rounded-full px-2 py-0.5 ml-2 ${activeRoom.id === room.id ? 'bg-sky-200 text-sky-800 dark:bg-sky-400/50 dark:text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'}`}>
                                {userCount}
                              </span>
                            )}
                          </div>
                          {(room.type === 'private' || room.type === 'dm' || room.ageGate) && <LockIcon className="h-4 w-4 text-slate-400 ml-2 shrink-0" />}
                        </button>
                        {room.ownerId === currentUser.id && room.type !== 'dm' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteRoom(room.id);
                            }}
                            className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-colors shrink-0"
                            aria-label={`Delete room ${room.name}`}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        )}
                        {room.type === 'dm' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); onCloseDm(room.id); }}
                            className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                            aria-label={t('closeConversation')}
                          >
                            <CloseIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
        <button onClick={onOpenCreateRoom} className="w-full flex items-center justify-center px-3 py-2 text-base font-medium rounded-lg transition-colors text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
          <PlusIcon className="h-5 w-5 mr-2" />
          {t('createRoom')}
        </button>
      </div>

      {/* User Profile & Logout Section */}
      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between px-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <UserAvatar user={currentUser} size="h-8 w-8" />
          <div className="truncate">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{currentUser.username}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{t(currentUser.country)}</p>
          </div>
        </div>
        <button
          onClick={onInitiateLogout}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title={t('logOut')}
        >
          <LogoutIcon className="h-5 w-5" />
        </button>
      </div>

      <Marketplace />
    </div>
  );
}

// UserList Component
const UserList: React.FC<{ users: User[], currentUser: User, onUserSelect: (user: User) => void, onInitiateLogout: () => void, blockedUserIds: string[] }> = ({ users, currentUser, onUserSelect, onInitiateLogout, blockedUserIds }) => {
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);
  const { t } = useContext(LanguageContext);

  const getStatusInfo = (status: UserStatus) => {
    switch (status) {
      case UserStatus.Available:
        return { className: 'text-green-600 dark:text-green-400', textKey: 'status_available' };
      case UserStatus.Busy:
        return { className: 'text-red-600 dark:text-red-400', textKey: 'status_busy' };
      case UserStatus.Away:
        return { className: 'text-yellow-600 dark:text-yellow-400', textKey: 'status_away' };
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 flex flex-col h-full overflow-y-auto">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white px-2 mb-2">{t('onlineUsers')} ({users.length})</h2>
      <div className="flex-1 space-y-2">
        {users.map(user => {
          const statusInfo = getStatusInfo(user.status);
          const isBlocked = blockedUserIds.includes(user.id);
          return (
            <div
              key={user.id}
              className="relative flex items-center p-2 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
              onMouseEnter={() => setHoveredUserId(user.id)}
              onMouseLeave={() => setHoveredUserId(null)}
            >
              <div
                className="flex items-center flex-1 cursor-pointer"
                onClick={() => onUserSelect(user)}
              >
                <div className="relative mr-3">
                  <UserAvatar user={user} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white truncate flex items-center">{user.username} {user.id === currentUser.id && <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">({t('youLabel')})</span>}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t(user.country)}</p>
                  <div className="flex items-center gap-2">
                    {statusInfo && (
                      <p className={`text-xs font-medium ${statusInfo.className}`}>{t(statusInfo.textKey) || user.status}</p>
                    )}
                    {isBlocked && (
                      <div className="flex items-center gap-1 text-xs font-medium text-red-500 dark:text-red-400" title={t('blockedUserIndicator')}>
                        <ShieldOffIcon className="h-3 w-3" />
                        <span>{t('blockedUserIndicator')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {user.id === currentUser.id && (
                <div className="flex items-center">
                  <button
                    onClick={onInitiateLogout}
                    className="ml-2 p-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-600 rounded-full"
                    aria-label={t('logOut')}
                    title={t('logOut')}
                  >
                    <LogoutIcon className="h-5 w-5" />
                  </button>
                </div>
              )}

              {hoveredUserId === user.id && user.id !== currentUser.id && (
                <div className="hidden md:block">
                  <UserProfileTooltip user={user} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={pickerRef} className="absolute bottom-full mb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 shadow-lg w-80 h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto pr-1">
        {EMOJI_CATEGORIES.map(category => (
          <div key={category.name}>
            <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 pt-2 pb-1 sticky top-0 bg-white dark:bg-slate-800">{t(category.name)}</h5>
            <div className="grid grid-cols-8 gap-1">
              {category.emojis.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => onSelect(emoji)}
                  className="text-2xl p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// Prop interface for ChatWindow for better type-safety and readability
interface ChatWindowProps {
  room: Room;
  messages: Message[];
  currentUser: User;
  users: User[];
  onSendMessage: (text: string, replyToId?: string) => void;
  onCurrentUserTyping: () => void;
  typingUsers: Record<string, true>;
  onToggleReaction: (messageId: string, emoji: string) => void;
  replyingTo: Message | null;
  onSetReplyingTo: (message: Message | null) => void;
  onOpenSettings: () => void;
  onToggleRooms: () => void;
  onToggleUsers: () => void;
  isRoomsVisible: boolean;
  isUsersVisible: boolean;
  onViewProfile: (user: User) => void;
  onScrollToMessage: (messageId: string) => void;
  blockedUserIds: string[];
  onUnblockUser: (user: User) => void;
  onBack: () => void;
  useFirebase?: boolean;
}

interface ReactionPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
  isCurrentUser: boolean;
}

const ReactionPicker: React.FC<ReactionPickerProps> = ({ onSelect, onClose, isCurrentUser }) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={pickerRef}
      className={`absolute top-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 shadow-lg w-72 z-10 animate-fade-in-fast ${isCurrentUser ? 'right-0' : 'left-0'}`}
    >
      <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
        {REACTION_EMOJIS.map(emoji => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="text-2xl p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={`React with ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};


const ChatWindow: React.FC<ChatWindowProps> = ({ room, messages, currentUser, users, onSendMessage, onCurrentUserTyping, typingUsers, onToggleReaction, replyingTo, onSetReplyingTo, onOpenSettings, onToggleRooms, onToggleUsers, isRoomsVisible, isUsersVisible, onViewProfile, onScrollToMessage, blockedUserIds, onUnblockUser, onBack, useFirebase }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [reactionPickerMessageId, setReactionPickerMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { t } = useContext(LanguageContext);
  const { resolvedTheme } = useTheme();
  const { chatBackground } = usePersonalization();

  const selectedBg = useMemo(() => CHAT_BACKGROUNDS.find(bg => bg.id === chatBackground), [chatBackground]);
  const bgUrl = useMemo(() => {
    if (!selectedBg || selectedBg.id === 'default') return 'none';
    return resolvedTheme === 'dark' ? `url("${selectedBg.dark}")` : `url("${selectedBg.light}")`;
  }, [selectedBg, resolvedTheme]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(newMessage, replyingTo?.id);
    setNewMessage('');
    setEmojiPickerOpen(false);
    onSetReplyingTo(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleSelectEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    textareaRef.current?.focus();
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    onCurrentUserTyping();
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`; // Max height of 128px (8rem)
  };

  const findUser = useCallback((userId: string) => users.find(u => u.id === userId), [users]);

  const typers = Object.keys(typingUsers)
    .filter(userId => userId !== currentUser.id && !blockedUserIds.includes(userId))
    .map(userId => findUser(userId)?.username)
    .filter((name): name is string => !!name);

  let typingIndicatorText: string | null = null;
  if (typers.length === 1) {
    typingIndicatorText = t('userIsTyping').replace('{user}', typers[0]);
  } else if (typers.length === 2) {
    typingIndicatorText = t('usersAreTyping').replace('{user1}', typers[0]).replace('{user2}', typers[1]);
  } else if (typers.length > 2) {
    typingIndicatorText = t('severalUsersAreTyping');
  }


  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      {/* Header Fixo */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center truncate gap-3">
          <button onClick={onBack} className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center truncate">
            <span className="text-2xl mr-3">{room.icon}</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">{room.name}</h2>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={onOpenSettings} className="p-2 rounded-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-700" title={t('settings')}>
            <SettingsIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button onClick={onToggleRooms} className={`p-2 rounded-lg transition-colors ${isRoomsVisible ? 'bg-slate-200 dark:bg-slate-700' : ''} hover:bg-slate-200 dark:hover:bg-slate-700`} title={isRoomsVisible ? t('hideRooms') : t('showRooms')}>
            <PanelLeftIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button onClick={onToggleUsers} className={`p-2 rounded-lg transition-colors ${isUsersVisible ? 'bg-slate-200 dark:bg-slate-700' : ''} hover:bg-slate-200 dark:hover:bg-slate-700 lg:hidden`} title={isUsersVisible ? t('hideUsers') : t('showUsers')}>
            <UsersIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button onClick={onToggleUsers} className={`p-2 rounded-lg transition-colors ${isUsersVisible ? 'bg-slate-200 dark:bg-slate-700' : ''} hover:bg-slate-200 dark:hover:bg-slate-700 hidden lg:block`} title={isUsersVisible ? t('hideUsers') : t('showUsers')}>
            <PanelRightIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </header>

      {/* Botões Mobile - Configurações e Usuários */}
      <div className="md:hidden flex items-center justify-between gap-2 px-4 py-2 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          {/* Indicador de conexão Firebase */}
          {useFirebase ? (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Tempo Real</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">Simulação</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onOpenSettings} className="p-2 rounded-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-700" title={t('settings')}>
            <SettingsIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button onClick={onToggleUsers} className="p-2 rounded-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-700" title={t('showUsers')}>
            <UsersIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>

      {/* Área de Mensagens com Scroll Independente */}
      <div
        className="flex-1 overflow-y-auto p-4 bg-slate-100 dark:bg-slate-800"
        style={{ backgroundImage: bgUrl }}
      >
        <div className="space-y-4">
          {messages.map(msg => {
            const sender = findUser(msg.userId);
            if (!sender) return null;

            if (blockedUserIds.includes(msg.userId)) {
              return (
                <div key={msg.id} className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 my-2">
                  <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                  <p>{t('blockedMessagePlaceholder')}</p>
                  <button onClick={() => onUnblockUser(sender)} className="font-semibold text-sky-600 dark:text-sky-400 hover:underline">{t('unblockButton')}</button>
                  <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                </div>
              );
            }

            const isCurrentUser = msg.userId === currentUser.id;
            const originalMessage = msg.replyToMessageId ? messages.find(m => m.id === msg.replyToMessageId) : null;
            const originalSender = originalMessage ? findUser(originalMessage.userId) : null;

            return (
              <div key={msg.id} id={`message-${msg.id}`}>
                <div className={`flex items-end gap-3 group ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                  {!isCurrentUser && sender && <div className="cursor-pointer" onClick={() => onViewProfile(sender)}><UserAvatar user={sender} /></div>}
                  <div
                    className="relative max-w-xl md:max-w-2xl"
                    onMouseEnter={() => setHoveredMessageId(msg.id)}
                    onMouseLeave={() => setHoveredMessageId(null)}
                  >
                    <div className={`p-3 rounded-xl shadow-md ${isCurrentUser ? 'bg-sky-600 text-white rounded-br-none' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                      {!isCurrentUser && sender && <p className="font-bold text-sky-500 dark:text-sky-400 text-sm mb-1 cursor-pointer" onClick={() => onViewProfile(sender)}>{sender.username}</p>}

                      {originalMessage && originalSender && (
                        <div
                          onClick={() => onScrollToMessage(originalMessage.id)}
                          className="mb-2 p-2 border-l-4 border-sky-400 dark:border-sky-300 bg-sky-500/20 dark:bg-white/10 rounded cursor-pointer"
                        >
                          <p className={`font-bold text-sm ${isCurrentUser ? 'text-sky-100' : 'text-sky-600 dark:text-sky-300'}`}>{originalSender.username}</p>
                          <p className={`text-sm truncate ${isCurrentUser ? 'text-sky-200' : 'text-slate-600 dark:text-slate-300'}`}>{originalMessage.text}</p>
                        </div>
                      )}

                      <p className="text-base break-words whitespace-pre-wrap">{msg.text}</p>
                      <p className={`text-xs mt-1 text-right ${isCurrentUser ? 'text-sky-200' : 'text-slate-400 dark:text-slate-400'}`}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>

                    <div className={`absolute top-1/2 -translate-y-1/2 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isCurrentUser ? 'left-0 -translate-x-full pr-2' : 'right-0 translate-x-full pl-2'}`}>
                      {reactionPickerMessageId === msg.id && (
                        <ReactionPicker
                          onSelect={(emoji) => {
                            onToggleReaction(msg.id, emoji);
                            setReactionPickerMessageId(null);
                          }}
                          onClose={() => setReactionPickerMessageId(null)}
                          isCurrentUser={isCurrentUser}
                        />
                      )}
                      <button
                        onClick={() => onSetReplyingTo(msg)}
                        className="p-1.5 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-full shadow-md hover:text-slate-800 dark:hover:text-white"
                        aria-label="Reply to message"
                      >
                        <ReplyIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setReactionPickerMessageId(prevId => prevId === msg.id ? null : msg.id)}
                        className="p-1.5 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-full shadow-md hover:text-slate-800 dark:hover:text-white"
                        aria-label="Add reaction"
                      >
                        <EmojiIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                      <div className={`flex flex-wrap gap-1.5 mt-1.5 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        {Object.entries(msg.reactions).map(([emoji, userIds]) => {
                          if (!Array.isArray(userIds)) return null;
                          const hasReacted = userIds.includes(currentUser.id);
                          return (
                            <button
                              key={emoji}
                              onClick={() => onToggleReaction(msg.id, emoji)}
                              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs transition-colors ${hasReacted
                                ? 'bg-sky-100 dark:bg-sky-500/30 border border-sky-500 dark:border-sky-400'
                                : 'bg-slate-200 dark:bg-slate-600/70 border border-transparent hover:bg-slate-300 dark:hover:bg-slate-600'
                                }`}
                              aria-label={`${userIds.length} users reacted with ${emoji}. ${hasReacted ? 'Click to remove your reaction.' : 'Click to add your reaction.'}`}
                            >
                              <span>{emoji}</span>
                              <span className={`font-semibold ${hasReacted ? 'text-sky-600 dark:text-sky-300' : 'text-slate-600 dark:text-slate-300'}`}>{userIds.length}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Indicador de digitação dentro da área de scroll mas fixo no final */}
        {typingIndicatorText && (
          <div className="flex items-center gap-2 px-1 py-2 text-sm text-slate-500 dark:text-slate-400 animate-fade-in-fast">
            <div className="flex gap-1 items-center h-5">
              <span className="h-1.5 w-1.5 bg-sky-500 dark:bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-1.5 w-1.5 bg-sky-500 dark:bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-1.5 w-1.5 bg-sky-500 dark:bg-sky-400 rounded-full animate-bounce"></span>
            </div>
            <span>{typingIndicatorText}</span>
          </div>
        )}
      </div>

      {/* Footer Fixo com Input */}
      <div className="flex-shrink-0 p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        {replyingTo && (
          <div className="flex items-center justify-between p-2 mb-2 bg-slate-50 dark:bg-slate-700 rounded-lg animate-fade-in-fast">
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-sky-600 dark:text-sky-400">{t('replyingTo')} {findUser(replyingTo.userId)?.username}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 truncate">{replyingTo.text}</p>
            </div>
            <button onClick={() => onSetReplyingTo(null)} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600">
              <CloseIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </button>
          </div>
        )}
        <div className="relative">
          {isEmojiPickerOpen && <EmojiPicker onSelect={handleSelectEmoji} onClose={() => setEmojiPickerOpen(false)} />}
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <button type="button" onClick={() => setEmojiPickerOpen(!isEmojiPickerOpen)} className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
              <EmojiIcon className="h-6 w-6" />
            </button>
            <textarea
              ref={textareaRef}
              rows={1}
              value={newMessage}
              onInput={handleTextareaInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder={`${t('messagePlaceholder')} #${room.name}...`}
              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition resize-none leading-tight"
              style={{ maxHeight: '8rem', overflowY: 'auto' }}
            />
            <button type="submit" className="p-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shrink-0 disabled:bg-slate-400 dark:disabled:bg-slate-600 self-end" disabled={!newMessage.trim()}>
              <SendIcon className="h-6 w-6 text-white" />
            </button>
          </form>
        </div>
      </div>
    </div >
  );
};

// Main Screen Component
interface ChatScreenProps {
  currentUser: User;
  allUsers: User[];
  onLogout: () => void;
  onOpenSettings: () => void;
  onAgeVerified: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ currentUser, allUsers, onLogout, onOpenSettings, onAgeVerified }) => {
  const { t } = useContext(LanguageContext);

  const getTranslatedDefaultRooms = useCallback((): RoomCategory[] => {
    return ROOM_STRUCTURE.map(category => ({
      categoryName: t(category.categoryKey),
      rooms: category.rooms.map(room => ({
        ...room,
        name: t(room.nameKey),
      }))
    }));
  }, [t]);

  const [allRooms, setAllRooms] = useState<RoomCategory[]>(getTranslatedDefaultRooms());
  const [activeRoom, setActiveRoom] = useState<Room>(allRooms[0].rooms[0]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'rooms' | 'chat' | 'users'>('chat');
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [promptingForPasswordForRoom, setPromptingForPasswordForRoom] = useState<Room | null>(null);
  const [roomToVerify, setRoomToVerify] = useState<Room | null>(null);
  const [userLocations, setUserLocations] = useState<Record<string, string>>({});
  const [typingUsers, setTypingUsers] = useState<Record<string, Record<string, true>>>({});
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [isRoomsVisible, setRoomsVisible] = useState(true);
  const [isUsersVisible, setUsersVisible] = useState(true);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);
  const [userToBlock, setUserToBlock] = useState<User | null>(null);
  const [userToReport, setUserToReport] = useState<User | null>(null);

  // Integração com Firebase (se configurado)
  // Integração Realtime (Supabase ou Firebase)
  const realtimeData = useRealtimeChat ? useRealtimeChat(currentUser, activeRoom.id) : null;
  const [useRealtime, setUseRealtime] = useState(false);

  // Prevenir scroll do body apenas na tela de chat (mobile)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      document.body.classList.add('chat-active');
    }

    return () => {
      document.body.classList.remove('chat-active');
    };
  }, []);

  // Detectar se Backend está conectado
  useEffect(() => {
    if (realtimeData?.isConnected) {
      setUseRealtime(true);
      console.log('✅ Backend conectado - Modo tempo real ativado!');
    } else if (realtimeData && realtimeData.isConfigured === false) {
      console.warn('⚠️ SUPABASE NÃO CONFIGURADO: O chat está em modo simulação.');
      console.warn('⚠️ Para ativar tempo real, configure as credenciais em supabase.ts');
    }
  }, [realtimeData?.isConnected, realtimeData?.isConfigured]);

  // Sincronizar mensagens
  useEffect(() => {
    if (useRealtime && realtimeData?.messages) {
      setMessages(realtimeData.messages);
    }
  }, [useRealtime, realtimeData?.messages]);

  // Sincronizar localizações
  useEffect(() => {
    if (useRealtime && realtimeData?.userLocations) {
      setUserLocations(realtimeData.userLocations);
    }
  }, [useRealtime, realtimeData?.userLocations]);

  useEffect(() => {
    // This effect ensures the active room's category is always open.
    const activeCategory = allRooms.find(c => c.rooms.some(r => r.id === activeRoom.id));
    if (activeCategory && !openCategories.includes(activeCategory.categoryName)) {
      setOpenCategories(prev => [...new Set([...prev, activeCategory.categoryName])]);
    }
  }, [activeRoom.id, allRooms, openCategories]);

  const handleToggleCategory = (categoryName: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Re-translate default rooms when language changes, preserving custom rooms
  useEffect(() => {
    const defaultRoomIds = new Set(ROOM_STRUCTURE.flatMap(c => c.rooms.map(r => r.id)));

    setAllRooms(currentRooms => {
      const customCategories = currentRooms
        .map(category => ({
          ...category,
          rooms: category.rooms.filter(room => !defaultRoomIds.has(room.id)),
        }))
        .filter(category => category.rooms.length > 0 || category.categoryName === t('directMessagesCategory'));

      const translatedDefaults = getTranslatedDefaultRooms();

      const merged = [...translatedDefaults];
      customCategories.forEach(customCat => {
        const existingCat = merged.find(c => c.categoryName === customCat.categoryName);
        if (existingCat) {
          existingCat.rooms.push(...customCat.rooms);
        } else {
          merged.push(customCat);
        }
      });

      return merged;
    });

    setActiveRoom(currentActiveRoom => {
      type RoomFromStructure = typeof ROOM_STRUCTURE[number]['rooms'][number];
      const allDefaultRooms = ROOM_STRUCTURE.reduce((acc, c) => acc.concat(c.rooms), [] as RoomFromStructure[]);
      const defaultRoomStructure = allDefaultRooms.find(r => r.id === currentActiveRoom.id);
      if (defaultRoomStructure) {
        return { ...currentActiveRoom, name: t(defaultRoomStructure.nameKey) };
      }
      return currentActiveRoom;
    });
  }, [t, getTranslatedDefaultRooms]);

  // Carregar salas customizadas salvas (simula salas criadas por outros usuários)
  useEffect(() => {
    const savedRooms = JSON.parse(localStorage.getItem('chatza-custom-rooms') || '[]');
    if (savedRooms.length > 0) {
      const customCategoryName = t('customRoomsCategory');
      setAllRooms(prev => {
        const newState = [...prev];
        let customCategory = newState.find(c => c.categoryName === customCategoryName);

        // Filtrar salas que já existem para evitar duplicatas
        const existingRoomIds = new Set(newState.flatMap(c => c.rooms.map(r => r.id)));
        const newRooms = savedRooms.filter((room: Room) => !existingRoomIds.has(room.id));

        if (newRooms.length > 0) {
          if (customCategory) {
            customCategory.rooms.push(...newRooms);
          } else {
            newState.push({ categoryName: customCategoryName, rooms: newRooms });
          }
        }

        return newState;
      });
    }
  }, [t]);

  const handleCurrentUserTyping = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setTypingUsers(prev => ({ ...prev, [activeRoom.id]: { ...(prev[activeRoom.id] || {}), [currentUser.id]: true } }));
    typingTimeoutRef.current = setTimeout(() => {
      setTypingUsers(prev => {
        const newRoomTypers = { ...(prev[activeRoom.id] || {}) };
        delete newRoomTypers[currentUser.id];
        if (Object.keys(newRoomTypers).length === 0) {
          const newTypingUsers = { ...prev };
          delete newTypingUsers[activeRoom.id];
          return newTypingUsers;
        }
        return { ...prev, [activeRoom.id]: newRoomTypers };
      });
    }, 3000);
  }, [activeRoom.id, currentUser.id]);

  useEffect(() => {
    const publicRooms = allRooms.flatMap(c => c.rooms).filter(r => r.type === 'public');
    if (publicRooms.length === 0) return;

    const locations: Record<string, string> = {};
    allUsers.forEach(user => {
      if (user.id !== currentUser.id) {
        locations[user.id] = publicRooms[Math.floor(Math.random() * publicRooms.length)].id;
      }
    });
    locations[currentUser.id] = activeRoom.id;
    setUserLocations(locations);
  }, [allUsers, currentUser.id]); // Removed allRooms dependency to prevent re-shuffling on language change

  useEffect(() => {
    setUserLocations(prev => ({ ...prev, [currentUser.id]: activeRoom.id }));
  }, [activeRoom, currentUser.id]);

  const roomUserCounts = Object.values(userLocations).reduce((acc: Record<string, number>, roomId: string) => {
    acc[roomId] = (acc[roomId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Simular atividade espontânea nas salas (mensagens automáticas)
  useEffect(() => {
    const interval = setInterval(() => {
      // Escolher uma sala aleatória que tenha usuários
      const roomsWithUsers = Object.entries(roomUserCounts).filter(([_, count]) => count > 1);
      if (roomsWithUsers.length === 0) return;

      const [randomRoomId, _] = roomsWithUsers[Math.floor(Math.random() * roomsWithUsers.length)];
      const usersInRoom = allUsers.filter(u => userLocations[u.id] === randomRoomId && u.id !== currentUser.id);

      if (usersInRoom.length > 0) {
        const randomUser = usersInRoom[Math.floor(Math.random() * usersInRoom.length)];
        const spontaneousMessages = [
          "Anyone here?", "What's up everyone?", "Hey guys!", "Good morning!",
          "How's everyone doing?", "Anyone want to chat?", "Hi there!",
          "What are you all up to?", "Nice to see people here", "Hello everyone!",
          "Great to be here", "Anyone online?", "Hey!", "What's new?",
          "How are things?", "Good to see you all", "Greetings!", "Yo!",
          "What's going on?", "Anyone active?", "Hi all!", "Hey everyone!"
        ];

        const randomMessage = spontaneousMessages[Math.floor(Math.random() * spontaneousMessages.length)];
        const autoMessage: Message = {
          id: `m_auto_${Date.now()}`,
          roomId: randomRoomId,
          userId: randomUser.id,
          text: randomMessage,
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, autoMessage]);
      }
    }, 10000 + Math.random() * 20000); // A cada 10-30 segundos

    return () => clearInterval(interval);
  }, [allUsers, userLocations, roomUserCounts, currentUser.id]);

  const handleSendMessage = (text: string, replyToMessageId?: string) => {
    if (!text.trim()) return;

    // Se Backend está conectado, usar Realtime
    if (useRealtime && realtimeData?.sendMessage) {
      realtimeData.sendMessage(text, replyToMessageId);
      return;
    }

    // Modo simulação (sem Firebase)
    const newMessage: Message = { id: `m_${Date.now()}`, roomId: activeRoom.id, userId: currentUser.id, text: text, timestamp: Date.now(), replyToMessageId };
    setMessages(prev => [...prev, newMessage]);

    // Simular respostas de outros usuários na sala
    const usersInCurrentRoom = allUsers.filter(u =>
      u.id !== currentUser.id &&
      userLocations[u.id] === activeRoom.id
    );

    if (usersInCurrentRoom.length > 0) {
      // 60% de chance de alguém responder
      if (Math.random() > 0.4) {
        setTimeout(() => {
          const randomUser = usersInCurrentRoom[Math.floor(Math.random() * usersInCurrentRoom.length)];
          const replies = [
            "Hello!", "How are you?", "Nice to meet you!", "Cool!", "I agree.",
            "What do you think?", "Haha", "Interesting...", "Tell me more!",
            "Really?", "That's awesome!", "I'm listening.", "Great point!",
            "I see what you mean", "Totally!", "😊", "👍", "Nice!",
            "Thanks for sharing", "Good idea", "Let's discuss this more"
          ];
          const randomReply = replies[Math.floor(Math.random() * replies.length)];
          const replyMsg: Message = {
            id: `m_${Date.now()}_r`,
            roomId: activeRoom.id,
            userId: randomUser.id,
            text: randomReply,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, replyMsg]);
        }, 1500 + Math.random() * 2000);
      }
    }
  };

  const handleToggleReaction = (messageId: string, emoji: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          const newReactions = { ...(msg.reactions || {}) };
          const userList = newReactions[emoji] || [];
          if (userList.includes(currentUser.id)) {
            newReactions[emoji] = userList.filter(id => id !== currentUser.id);
            if (newReactions[emoji].length === 0) delete newReactions[emoji];
          } else {
            newReactions[emoji] = [...userList, currentUser.id];
          }
          return { ...msg, reactions: newReactions };
        }
        return msg;
      })
    );
  };

  const handleCreateRoom = (roomDetails: Omit<Room, 'id' | 'ownerId' | 'participantIds'>) => {
    const newRoom: Room = { ...roomDetails, id: `r_${Date.now()}`, ownerId: currentUser.id, participantIds: [currentUser.id] };
    const customCategoryName = t('customRoomsCategory');
    setOpenCategories(prev => [...new Set([...prev, customCategoryName])]);

    // Salvar sala criada no localStorage para simular persistência global
    const savedRooms = JSON.parse(localStorage.getItem('chatza-custom-rooms') || '[]');
    savedRooms.push(newRoom);
    localStorage.setItem('chatza-custom-rooms', JSON.stringify(savedRooms));

    setAllRooms(prev => {
      const newState = [...prev];
      let customCategory = newState.find(c => c.categoryName === customCategoryName);
      if (customCategory) {
        customCategory.rooms.push(newRoom);
      } else {
        newState.push({ categoryName: customCategoryName, rooms: [newRoom] });
      }

      // Redistribuir alguns usuários para a nova sala (se for pública)
      if (newRoom.type === 'public') {
        const usersToMove = Math.floor(Math.random() * 5) + 2; // 2-6 usuários
        const otherUsers = allUsers.filter(u => u.id !== currentUser.id);
        const selectedUsers = otherUsers.slice(0, usersToMove);

        setUserLocations(prev => {
          const updated = { ...prev };
          selectedUsers.forEach(user => {
            updated[user.id] = newRoom.id;
          });
          return updated;
        });
      }

      return newState;
    });
    setActiveRoom(newRoom);
    setMobileView('chat');
    setCreateRoomModalOpen(false);
  };

  const handleDeleteRoom = (roomId: string) => {
    setAllRooms(prev => prev.map(c => ({ ...c, rooms: c.rooms.filter(r => r.id !== roomId) })).filter(c => c.rooms.length > 0));
    if (activeRoom.id === roomId) {
      setActiveRoom(allRooms[0].rooms[0]);
    }
  };

  const handleCloseDm = (roomId: string) => {
    setAllRooms(prev => prev.map(c => ({ ...c, rooms: c.rooms.filter(r => r.id !== roomId) })));
    if (activeRoom.id === roomId) {
      const nextRoom = allRooms.flatMap(c => c.rooms).find(r => r.id !== roomId) || allRooms[0].rooms[0];
      setActiveRoom(nextRoom);
    }
  }

  const handleSelectRoom = (room: Room) => {
    if (room.ageGate && !currentUser.isAgeVerified) {
      setRoomToVerify(room);
    } else if (room.password) {
      setPromptingForPasswordForRoom(room);
    } else {
      setActiveRoom(room);
      setMobileView('chat');
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (promptingForPasswordForRoom && promptingForPasswordForRoom.password === password) {
      setActiveRoom(promptingForPasswordForRoom);
      setMobileView('chat');
      setPromptingForPasswordForRoom(null);
    } else {
      alert(t('incorrectPassword'));
    }
  };

  const handleVerificationSuccess = () => {
    if (roomToVerify) {
      onAgeVerified();
      setActiveRoom(roomToVerify);
      setMobileView('chat');
      setRoomToVerify(null);
    }
  };

  const handleStartPrivateChat = (user: User) => {
    const dmRoomId = [currentUser.id, user.id].sort().join('_');
    const existingDm = allRooms.flatMap(c => c.rooms).find(r => r.id === dmRoomId);

    if (existingDm) {
      setActiveRoom(existingDm);
    } else {
      const newDmRoom: Room = {
        id: dmRoomId,
        name: user.username,
        type: 'dm',
        icon: '💬',
        ownerId: currentUser.id,
        participantIds: [currentUser.id, user.id]
      };
      const dmCategoryName = t('directMessagesCategory');
      setAllRooms(prev => {
        const newState = [...prev];
        let dmCategory = newState.find(c => c.categoryName === dmCategoryName);
        if (dmCategory) {
          if (!dmCategory.rooms.some(r => r.id === newDmRoom.id)) {
            dmCategory.rooms.push(newDmRoom);
          }
        } else {
          newState.push({ categoryName: dmCategoryName, rooms: [newDmRoom] });
        }
        return newState;
      });
      setActiveRoom(newDmRoom);
    }
    setViewingUser(null);
    setMobileView('chat');
  };

  const handleBlockUser = () => {
    if (!userToBlock) return;
    setBlockedUserIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userToBlock.id)) {
        newSet.delete(userToBlock.id);
      } else {
        newSet.add(userToBlock.id);
      }
      return Array.from(newSet);
    });
    setUserToBlock(null);
    setViewingUser(null);
  };

  const handleSubmitReport = (reason: ReportReason, details: string) => {
    if (!userToReport) return;
    console.log(`Reporting user: ${userToReport.username} (${userToReport.id})`);
    console.log(`Reason: ${reason}`);
    console.log(`Details: ${details}`);
    setUserToReport(null);
    setViewingUser(null);
    alert(t('reportSubmitted'));
  };

  const handleScrollToMessage = (messageId: string) => {
    const messageEl = document.getElementById(`message-${messageId}`);
    if (messageEl) {
      messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      messageEl.classList.add('message-highlight');
      setTimeout(() => {
        messageEl.classList.remove('message-highlight');
      }, 1500);
    }
  };

  const usersInRoom = allUsers.filter(u => userLocations[u.id] === activeRoom.id);
  const visibleMessages = messages.filter(msg => msg.roomId === activeRoom.id);

  return (
    <div className="h-full w-full flex bg-white dark:bg-slate-900">
      {/* Modals */}
      {isCreateRoomModalOpen && <CreateRoomModal onClose={() => setCreateRoomModalOpen(false)} onCreateRoom={handleCreateRoom} />}
      {isLogoutModalOpen && <LogoutConfirmationModal onClose={() => setLogoutModalOpen(false)} onConfirm={onLogout} />}
      {viewingUser && <UserProfileModal user={viewingUser} onClose={() => setViewingUser(null)} currentUserId={currentUser.id} onStartPrivateChat={handleStartPrivateChat} onBlock={setUserToBlock} onReport={setUserToReport} isBlocked={blockedUserIds.includes(viewingUser.id)} />}
      {promptingForPasswordForRoom && <PasswordPromptModal room={promptingForPasswordForRoom} onClose={() => setPromptingForPasswordForRoom(null)} onSubmit={handlePasswordSubmit} />}
      {roomToVerify && <AgeVerificationModal room={roomToVerify} onClose={() => setRoomToVerify(null)} onSuccess={handleVerificationSuccess} />}
      {userToBlock && <BlockUserModal user={userToBlock} onClose={() => setUserToBlock(null)} onConfirm={handleBlockUser} isBlocked={blockedUserIds.includes(userToBlock.id)} />}
      {userToReport && <ReportUserModal user={userToReport} onClose={() => setUserToReport(null)} onSubmit={handleSubmitReport} />}

      {/* Main Layout */}
      {/* Mobile Layout */}
      <div className="md:hidden h-full w-full flex flex-col">
        {mobileView === 'rooms' && (
          <RoomList roomCategories={allRooms} activeRoom={activeRoom} onSelectRoom={handleSelectRoom} onOpenCreateRoom={() => setCreateRoomModalOpen(true)} onDeleteRoom={handleDeleteRoom} currentUser={currentUser} roomUserCounts={roomUserCounts} openCategories={openCategories} onToggleCategory={handleToggleCategory} onCloseDm={handleCloseDm} onInitiateLogout={() => setLogoutModalOpen(true)} />
        )}
        {mobileView === 'chat' && (
          <ChatWindow
            room={activeRoom}
            messages={visibleMessages}
            currentUser={currentUser}
            users={allUsers}
            onSendMessage={handleSendMessage}
            onCurrentUserTyping={handleCurrentUserTyping}
            typingUsers={typingUsers[activeRoom.id] || {}}
            onToggleReaction={handleToggleReaction}
            replyingTo={replyingTo}
            onSetReplyingTo={setReplyingTo}
            onOpenSettings={onOpenSettings}
            onToggleRooms={() => setMobileView('rooms')}
            onToggleUsers={() => setMobileView('users')}
            isRoomsVisible={true}
            isUsersVisible={false}
            onViewProfile={setViewingUser}
            onScrollToMessage={handleScrollToMessage}
            blockedUserIds={blockedUserIds}
            onUnblockUser={setUserToBlock}
            onBack={() => setMobileView('rooms')}
            useFirebase={useRealtime}
          />
        )}
        {mobileView === 'users' && (
          <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center p-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
              <button onClick={() => setMobileView('chat')} className="p-2 mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t('usersLabel')}</h3>
            </div>
            <UserList users={usersInRoom.filter(u => u.id === currentUser.id || !blockedUserIds.includes(u.id))} currentUser={currentUser} onUserSelect={setViewingUser} onInitiateLogout={() => setLogoutModalOpen(true)} blockedUserIds={blockedUserIds} />
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-full w-full">
        <aside className={`h-full transition-all duration-300 ${isRoomsVisible ? 'w-80' : 'w-0'} overflow-hidden border-r border-slate-200 dark:border-slate-700`}>
          <RoomList roomCategories={allRooms} activeRoom={activeRoom} onSelectRoom={handleSelectRoom} onOpenCreateRoom={() => setCreateRoomModalOpen(true)} onDeleteRoom={handleDeleteRoom} currentUser={currentUser} roomUserCounts={roomUserCounts} openCategories={openCategories} onToggleCategory={handleToggleCategory} onCloseDm={handleCloseDm} onInitiateLogout={() => setLogoutModalOpen(true)} />
        </aside>

        <main className="flex-1 h-full min-w-0">
          <ChatWindow
            room={activeRoom}
            messages={visibleMessages}
            currentUser={currentUser}
            users={allUsers}
            onSendMessage={handleSendMessage}
            onCurrentUserTyping={handleCurrentUserTyping}
            typingUsers={typingUsers[activeRoom.id] || {}}
            onToggleReaction={handleToggleReaction}
            replyingTo={replyingTo}
            onSetReplyingTo={setReplyingTo}
            onOpenSettings={onOpenSettings}
            onToggleRooms={() => setRoomsVisible(!isRoomsVisible)}
            onToggleUsers={() => setUsersVisible(!isUsersVisible)}
            isRoomsVisible={isRoomsVisible}
            isUsersVisible={isUsersVisible}
            onViewProfile={setViewingUser}
            onScrollToMessage={handleScrollToMessage}
            blockedUserIds={blockedUserIds}
            onUnblockUser={setUserToBlock}
            onBack={() => { }}
            useFirebase={useRealtime}
          />
        </main>

        <aside className={`h-full transition-all duration-300 ${isUsersVisible ? 'w-80' : 'w-0'} hidden lg:block overflow-hidden border-l border-slate-200 dark:border-slate-700`}>
          <UserList users={usersInRoom.filter(u => u.id === currentUser.id || !blockedUserIds.includes(u.id))} currentUser={currentUser} onUserSelect={setViewingUser} onInitiateLogout={() => setLogoutModalOpen(true)} blockedUserIds={blockedUserIds} />
        </aside>
      </div>
    </div>
  );
};

export default ChatScreen;