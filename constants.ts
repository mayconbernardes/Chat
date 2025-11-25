// FIX: Provide full implementation for constants.ts to resolve import errors and supply mock data.

// Base structure for rooms. Names and categories are now translation keys.
export const ROOM_STRUCTURE = [
  {
    categoryKey: 'category_general',
    rooms: [
      { id: 'r_general_global', nameKey: 'room_global', type: 'public', icon: '🌐' },
      { id: 'r_general_random', nameKey: 'room_random', type: 'public', icon: '🗣️' },
      { id: 'r_general_interests', nameKey: 'room_interests', type: 'public', icon: '🎯' },
      { id: 'r_general_newfriends', nameKey: 'room_newfriends', type: 'public', icon: '💬' },
    ],
  },
  {
    categoryKey: 'category_social',
    rooms: [
      { id: 'r_social_dating', nameKey: 'room_dating', type: 'public', icon: '💞' },
      { id: 'r_social_friendship', nameKey: 'room_friendship', type: 'public', icon: '🧑‍🤝‍🧑' },
      { id: 'r_social_flirt', nameKey: 'room_flirt', type: 'public', icon: '💬' },
      { id: 'r_social_lgbtq', nameKey: 'room_lgbtq', type: 'public', icon: '🏳️‍🌈' },
      { id: 'r_social_vents', nameKey: 'room_vents', type: 'public', icon: '💔' },
      { id: 'r_social_family', nameKey: 'room_family', type: 'public', icon: '👪' },
    ],
  },
  {
    categoryKey: 'category_adult',
    rooms: [
      { id: 'r_adult_general', nameKey: 'room_adult_general', type: 'public', icon: '🔞', ageGate: true },
      { id: 'r_adult_dating', nameKey: 'room_adult_dating', type: 'public', icon: '🔥', ageGate: true },
    ],
  },
  {
    categoryKey: 'category_hobbies',
    rooms: [
      { id: 'r_hobbies_games', nameKey: 'room_games', type: 'public', icon: '🕹️' },
      { id: 'r_hobbies_art', nameKey: 'room_art', type: 'public', icon: '🎨' },
      { id: 'r_hobbies_music', nameKey: 'room_music', type: 'public', icon: '🎵' },
      { id: 'r_hobbies_movies', nameKey: 'room_movies', type: 'public', icon: '🎬' },
      { id: 'r_hobbies_books', nameKey: 'room_books', type: 'public', icon: '📚' },
      { id: 'r_hobbies_tech', nameKey: 'room_tech', type: 'public', icon: '💻' },
    ],
  },
  {
    categoryKey: 'category_regions',
    rooms: [
      { id: 'r_lang_english', nameKey: 'room_english', type: 'public', icon: '🇺🇸' },
      { id: 'r_lang_portugues', nameKey: 'room_portuguese', type: 'public', icon: '🇧🇷' },
      { id: 'r_lang_espanol', nameKey: 'room_spanish', type: 'public', icon: '🇪🇸' },
      { id: 'r_lang_francais', nameKey: 'room_french', type: 'public', icon: '🇫🇷' },
      { id: 'r_region_latam', nameKey: 'room_latam', type: 'public', icon: '🌎' },
      { id: 'r_region_europe', nameKey: 'room_europe', type: 'public', icon: '🌍' },
      { id: 'r_region_asia', nameKey: 'room_asia', type: 'public', icon: '🌏' },
      { id: 'r_region_africa', nameKey: 'room_chatafrica', type: 'public', icon: '🌍' },
    ],
  },
  {
    categoryKey: 'category_knowledge',
    rooms: [
      { id: 'r_knowledge_philosophy', nameKey: 'room_philosophy', type: 'public', icon: '🤔' },
      { id: 'r_knowledge_politics', nameKey: 'room_politics', type: 'public', icon: '📰' },
      { id: 'r_knowledge_business', nameKey: 'room_business', type: 'public', icon: '💼' },
      { id: 'r_knowledge_science', nameKey: 'room_science', type: 'public', icon: '🔬' },
      { id: 'r_knowledge_ai', nameKey: 'room_ai', type: 'public', icon: '🤖' },
      { id: 'r_knowledge_entrepreneur', nameKey: 'room_entrepreneur', type: 'public', icon: '📈' },
    ],
  },
  {
    categoryKey: 'category_wellness',
    rooms: [
      { id: 'r_wellness_travel', nameKey: 'room_travel', type: 'public', icon: '✈️' },
      { id: 'r_wellness_food', nameKey: 'room_food', type: 'public', icon: '🍳' },
      { id: 'r_wellness_fitness', nameKey: 'room_fitness', type: 'public', icon: '🏋️' },
      { id: 'r_wellness_design', nameKey: 'room_design', type: 'public', icon: '🧑‍🎨' },
      { id: 'r_wellness_pets', nameKey: 'room_pets', type: 'public', icon: '🐶' },
      { id: 'r_wellness_fashion', nameKey: 'room_fashion', type: 'public', icon: '👗' },
    ],
  },
  {
    categoryKey: 'category_fun',
    rooms: [
      { id: 'r_fun_humor', nameKey: 'room_humor', type: 'public', icon: '😂' },
      { id: 'r_fun_onlinegames', nameKey: 'room_onlinegames', type: 'public', icon: '🎮' },
      { id: 'r_fun_puzzles', nameKey: 'room_puzzles', type: 'public', icon: '🧩' },
      { id: 'r_fun_spirituality', nameKey: 'room_spirituality', type: 'public', icon: '🔮' },
      { id: 'r_fun_karaoke', nameKey: 'room_karaoke', type: 'public', icon: '🎤' },
    ],
  },
] as const;

export const INTEREST_KEYS = [
  'interest_gaming', 'interest_coding', 'interest_hiking', 'interest_music', 'interest_movies', 'interest_cooking', 'interest_art', 'interest_sports',
  'interest_reading', 'interest_traveling', 'interest_photography', 'interest_yoga', 'interest_dancing', 'interest_writing',
  'interest_astronomy', 'interest_diy', 'interest_podcasts', 'interest_board_games', 'interest_volunteering',
  'interest_history', 'interest_gardening', 'interest_blogging', 'interest_vr', 'interest_cooking_competitions',
  'interest_history_buff', 'interest_classical_music', 'interest_stand_up', 'interest_creative_writing',
  'interest_urban_exploration', 'interest_homebrewing', 'interest_street_art', 'interest_calligraphy', 'interest_genealogy',
  'interest_astrology', 'interest_debate',
  'interest_fashion', 'interest_fitness', 'interest_entrepreneurship', 'interest_crypto', 'interest_stock_market',
  'interest_meditation', 'interest_mindfulness', 'interest_anime_manga', 'interest_cosplay', 'interest_esports',
  'interest_magic', 'interest_scuba_diving', 'interest_rock_climbing', 'interest_filmmaking', 'interest_thrifting',
  'interest_robotics', 'interest_graphic_design', 'interest_baking', 'interest_wine_tasting', 'interest_craft_beer'
];

export const COUNTRY_KEYS = [
  'country_afghanistan', 'country_albania', 'country_algeria', 'country_andorra', 'country_angola', 'country_antigua_and_barbuda', 'country_argentina', 'country_armenia', 'country_australia', 'country_austria', 'country_azerbaijan',
  'country_bahamas', 'country_bahrain', 'country_bangladesh', 'country_barbados', 'country_belarus', 'country_belgium', 'country_belize', 'country_benin', 'country_bhutan', 'country_bolivia', 'country_bosnia_and_herzegovina', 'country_botswana', 'country_brazil', 'country_brunei', 'country_bulgaria', 'country_burkina_faso', 'country_burundi',
  'country_cambodia', 'country_cameroon', 'country_canada', 'country_cape_verde', 'country_central_african_republic', 'country_chad', 'country_chile', 'country_china', 'country_colombia', 'country_comoros', 'country_congo_brazzaville', 'country_costa_rica', 'country_croatia', 'country_cuba', 'country_cyprus', 'country_czechia',
  'country_democratic_republic_of_congo', 'country_denmark', 'country_djibouti', 'country_dominica', 'country_dominican_republic',
  'country_ecuador', 'country_egypt', 'country_el_salvador', 'country_equatorial_guinea', 'country_eritrea', 'country_estonia', 'country_ethiopia',
  'country_fiji', 'country_finland', 'country_france',
  'country_gabon', 'country_gambia', 'country_georgia', 'country_germany', 'country_ghana', 'country_greece', 'country_grenada', 'country_guatemala', 'country_guinea', 'country_guinea_bissau', 'country_guyana',
  'country_haiti', 'country_honduras', 'country_hungary',
  'country_iceland', 'country_india', 'country_indonesia', 'country_iran', 'country_iraq', 'country_ireland', 'country_israel', 'country_italy', 'country_ivory_coast',
  'country_jamaica', 'country_japan', 'country_jordan',
  'country_kazakhstan', 'country_kenya', 'country_kiribati', 'country_kuwait', 'country_kyrgyzstan',
  'country_laos', 'country_latvia', 'country_lebanon', 'country_lesotho', 'country_liberia', 'country_libya', 'country_liechtenstein', 'country_lithuania', 'country_luxembourg',
  'country_madagascar', 'country_malawi', 'country_malaysia', 'country_maldives', 'country_mali', 'country_malta', 'country_marshall_islands', 'country_mauritania', 'country_mauritius', 'country_mexico', 'country_micronesia', 'country_moldova', 'country_monaco', 'country_mongolia', 'country_montenegro', 'country_morocco', 'country_mozambique', 'country_myanmar',
  'country_namibia', 'country_nauru', 'country_nepal', 'country_netherlands', 'country_new_zealand', 'country_nicaragua', 'country_niger', 'country_nigeria', 'country_north_korea', 'country_north_macedonia', 'country_norway',
  'country_oman',
  'country_pakistan', 'country_palau', 'country_palestine_state', 'country_panama', 'country_papua_new_guinea', 'country_paraguay', 'country_peru', 'country_philippines', 'country_poland', 'country_portugal',
  'country_qatar',
  'country_romania', 'country_russia', 'country_rwanda',
  'country_saint_kitts_and_nevis', 'country_saint_lucia', 'country_saint_vincent_and_the_grenadines', 'country_samoa', 'country_san_marino', 'country_sao_tome_and_principe', 'country_saudi_arabia', 'country_senegal', 'country_serbia', 'country_seychelles', 'country_sierra_leone', 'country_singapore', 'country_slovakia', 'country_slovenia', 'country_solomon_islands', 'country_somalia', 'country_south_africa', 'country_south_korea', 'country_south_sudan', 'country_spain', 'country_sri_lanka', 'country_sudan', 'country_sweden', 'country_switzerland', 'country_syria',
  'country_taiwan', 'country_tajikistan', 'country_tanzania', 'country_thailand', 'country_timor_leste', 'country_togo', 'country_tonga', 'country_trinidad_and_tobago', 'country_tunisia', 'country_turkey', 'country_turkmenistan', 'country_tuvalu',
  'country_uganda', 'country_ukraine', 'country_united_arab_emirates', 'country_united_kingdom', 'country_united_states_of_america', 'country_uruguay', 'country_uzbekistan',
  'country_vanuatu', 'country_vatican_city', 'country_venezuela', 'country_vietnam',
  'country_yemen',
  'country_zambia', 'country_zimbabwe'
];

export const LANGUAGE_KEYS = [
  'lang_afrikaans', 'lang_albanian', 'lang_amharic', 'lang_arabic', 'lang_armenian', 'lang_azerbaijani',
  'lang_basque', 'lang_belarusian', 'lang_bengali', 'lang_bosnian', 'lang_bulgarian', 'lang_burmese',
  'lang_catalan', 'lang_cebuano', 'lang_chichewa', 'lang_chinese_simplified', 'lang_chinese_traditional', 'lang_corsican', 'lang_croatian', 'lang_czech',
  'lang_danish', 'lang_dutch',
  'lang_english', 'lang_esperanto', 'lang_estonian',
  'lang_filipino', 'lang_finnish', 'lang_french', 'lang_frisian',
  'lang_galician', 'lang_georgian', 'lang_german', 'lang_greek', 'lang_gujarati',
  'lang_haitian_creole', 'lang_hausa', 'lang_hawaiian', 'lang_hebrew', 'lang_hindi', 'lang_hmong', 'lang_hungarian',
  'lang_icelandic', 'lang_igbo', 'lang_indonesian', 'lang_irish', 'lang_italian',
  'lang_japanese', 'lang_javanese',
  'lang_kannada', 'lang_kazakh', 'lang_khmer', 'lang_kinyarwanda', 'lang_korean', 'lang_kurdish_kurmanji', 'lang_kyrgyz',
  'lang_lao', 'lang_latin', 'lang_latvian', 'lang_lithuanian', 'lang_luxembourgish',
  'lang_macedonian', 'lang_malagasy', 'lang_malay', 'lang_malayalam', 'lang_maltese', 'lang_maori', 'lang_marathi', 'lang_mongolian',
  'lang_nepali', 'lang_norwegian',
  'lang_odia_oriya',
  'lang_pashto', 'lang_persian', 'lang_polish', 'lang_portuguese', 'lang_punjabi',
  'lang_romanian', 'lang_russian',
  'lang_samoan', 'lang_scots_gaelic', 'lang_serbian', 'lang_sesotho', 'lang_shona', 'lang_sindhi', 'lang_sinhala', 'lang_slovak', 'lang_slovenian', 'lang_somali', 'lang_spanish', 'lang_sundanese', 'lang_swahili', 'lang_swedish',
  'lang_tajik', 'lang_tamil', 'lang_tatar', 'lang_telugu', 'lang_thai', 'lang_turkish', 'lang_turkmen',
  'lang_ukrainian', 'lang_urdu', 'lang_uyghur', 'lang_uzbek',
  'lang_vietnamese',
  'lang_welsh',
  'lang_xhosa',
  'lang_yiddish', 'lang_yoruba',
  'lang_zulu'
];

export const MOCK_USERS_DATA = {
  names: ['Alex', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Jamie', 'Morgan', 'Skyler'],
  colors: [
    'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500',
    'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',
    'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'
  ]
};

// FIX: Add MOCK_MESSAGES to provide initial data for the chat screen.
export const MOCK_MESSAGES = [
  { id: 'm_1', userId: 'u_2', roomId: 'r_general_global', text: 'Hello everyone! Welcome to the global chat.', timestamp: Date.now() - 1000 * 60 * 15 },
  { id: 'm_2', userId: 'u_3', roomId: 'r_general_global', text: 'Hey there! Glad to be here.', timestamp: Date.now() - 1000 * 60 * 14, reactions: { '👍': ['u_2', 'u_4'], '🎉': ['u_5'] } },
  { id: 'm_3', userId: 'u_4', roomId: 'r_hobbies_games', text: 'Anyone up for a game of Among Us tonight?', timestamp: Date.now() - 1000 * 60 * 10 },
  { id: 'm_4', userId: 'u_5', roomId: 'r_hobbies_games', text: "I'm in! What time?", timestamp: Date.now() - 1000 * 60 * 9, reactions: { '🎮': ['u_4'] } },
  { id: 'm_5', userId: 'u_2', roomId: 'r_general_global', text: 'This chat app is pretty slick. I like the UI.', timestamp: Date.now() - 1000 * 60 * 5, reactions: { '❤️': ['u_3', 'u_6', 'u_7'] } },
  { id: 'm_6', userId: 'u_6', roomId: 'r_wellness_music', text: 'Any recommendations for a good study playlist?', timestamp: Date.now() - 1000 * 60 * 3 },
  { id: 'm_7', userId: 'u_7', roomId: 'r_wellness_music', text: 'Lofi hip hop radio on YouTube is my go-to.', timestamp: Date.now() - 1000 * 60 * 2, reactions: { '🎵': ['u_6'] }, replyToMessageId: 'm_6' },
  { id: 'm_8', userId: 'u_8', roomId: 'r_general_random', text: "If you could have any superpower, what would it be?", timestamp: Date.now() - 1000 * 60 * 1 },
];

export const REACTION_EMOJIS = [
  '👍', '❤️', '😂', '🎉', '🤔', '🙏', '🔥', '😢', '🤯', '💯',
  '👏', '🙌', '😮', '😡', '✅', '✨', '👀', '👋', '😎', '😴',
  '😭', '🥳', '💩', '👻', '💀', '👽', '🤖', '👑', '⭐', '🌈',
  '💡', '💰', '🎁', '🎈', '❌', '❓', '❗', '👌', '✌️', '🤞',
  '💔', '💕', '💖', '💗', '💓', '💞', '🌶️', '🚀', '🍿', '🎵',
  '🎲', '🎯', '🎳', '🎮', '🤮', '🥴', '🥺', '🥰', '🤩', '🥲',
  '😏', '🤪', '🤡', '🤗', '🤝', '💅', '💪', '🧠', '🌍', '🌹',
  '💊', '🗿', '🔔', '⚠️', '💸', '💎', '🔑', '🥇', '🏆'
];


// Emojis for the categorized emoji pickers.
export const EMOJI_CATEGORIES = [
  {
    name: 'emoji_category_smileys',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛',
      '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫',
      '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫',
      '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧',
      '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹',
      '😻', '😼', '😽', '🙀', '😿', '😾', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
      '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾',
      '🦵', '🦿', '🦶', '👣', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅', '👄', '👶', '🧒', '👦', '👧', '🧑',
      '👱', '👨', '🧔', '👨‍🦰', '👨‍🦱', '👨‍🦳', '👨‍🦲', '👩', '👩‍🦰', '🧑‍🦰', '👩‍🦱', '🧑‍🦱', '👩‍🦳', '🧑‍🦳', '👩‍🦲', '🧑‍🦲', '👱‍♀️', '👱‍♂️', '🧓', '👴', '👵',
      '🙍', '🙍‍♂️', '🙍‍♀️', '🙎', '🙎‍♂️', '🙎‍♀️', '🙅', '🙅‍♂️', '🙅‍♀️', '🙆', '🙆‍♂️', '🙆‍♀️', '💁', '💁‍♂️', '💁‍♀️', '🙋', '🙋‍♂️', '🙋‍♀️', '🧏', '🧏‍♂️', '🧏‍♀️',
      '🙇', '🙇‍♂️', '🙇‍♀️', '🤦', '🤦‍♂️', '🤦‍♀️', '🤷', '🤷‍♂️', '🤷‍♀️', '🧑‍⚕️', '👨‍⚕️', '👩‍⚕️', '🧑‍🎓', '👨‍🎓', '👩‍🎓', '🧑‍🏫', '👨‍🏫', '👩‍🏫', '🧑‍⚖️', '👨‍⚖️',
      '👩‍⚖️', '🧑‍🌾', '👨‍🌾', '👩‍🌾', '🧑‍🍳', '👨‍🍳', '👩‍🍳', '🧑‍🔧', '👨‍🔧', '👩‍🔧', '🧑‍🏭', '👨‍🏭', '👩‍🏭', '🧑‍💼', '👨‍💼', '👩‍💼', '🧑‍🔬', '👨‍🔬', '👩‍🔬',
      '🧑‍💻', '👨‍💻', '👩‍💻', '🧑‍🎤', '👨‍🎤', '👩‍🎤', '🧑‍🎨', '👨‍🎨', '👩‍🎨', '🧑‍✈️', '👨‍✈️', '👩‍✈️', '🧑‍🚀', '👨‍🚀', '👩‍🚀', '🧑‍🚒', '👨‍🚒', '👩‍🚒', '👮', '👮‍♂️',
      '👮‍♀️', '🕵️', '🕵️‍♂️', '🕵️‍♀️', '💂', '💂‍♂️', '💂‍♀️', '🥷', '👷', '👷‍♂️', '👷‍♀️', '🤴', '👸', '👳', '👳‍♂️', '👳‍♀️', '👲', '🧕', '🤵', '🤵‍♂️', '🤵‍♀️',
      '👰', '👰‍♂️', '👰‍♀️', '🤰', '🤱', '👩‍🍼', '👨‍🍼', '🧑‍🍼', '👼', '🎅', '🤶', '🧑‍🎄', '🦸', '🦸‍♂️', '🦸‍♀️', '🦹', '🦹‍♂️', '🦹‍♀️', '🧙', '🧙‍♂️', '🧙‍♀️',
      '🧚', '🧚‍♂️', '🧚‍♀️', '🧛', '🧛‍♂️', '🧛‍♀️', '🧜', '🧜‍♂️', '🧜‍♀️', '🧝', '🧝‍♂️', '🧝‍♀️', '🧞', '🧞‍♂️', '🧞‍♀️', '🧟', '🧟‍♂️', '🧟‍♀️', '💆', '💆‍♂️', '💆‍♀️',
      '💇', '💇‍♂️', '💇‍♀️', '🚶', '🚶‍♂️', '🚶‍♀️', '🧍', '🧍‍♂️', '🧍‍♀️', '🧎', '🧎‍♂️', '🧎‍♀️', '🧑‍🤝‍🧑', '👭', '👫', '👬', '💏', '👩‍❤️‍💋‍👨', '👨‍❤️‍💋‍👨',
      '👩‍❤️‍💋‍👩', '💑', '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩', '👪', '👨‍👩‍👦', '👨‍👩‍👧', '👨‍👩‍👧‍👦', '👨‍👩‍👦‍👦', '👨‍👩‍👧‍👧', '👨‍👨‍👦', '👨‍👨‍👧', '👨‍👨‍👧‍👦', '👨‍👨‍👦‍👦', '👨‍👨‍👧‍👧',
      '👩‍👩‍👦', '👩‍👩‍👧', '👩‍👩‍👧‍👦', '👩‍👩‍👦‍👦', '👩‍👩‍👧‍👧', '👨‍👦', '👨‍👦‍👦', '👨‍👧', '👨‍👧‍👦', '👨‍👧‍👧', '👩‍👦', '👩‍👦‍👦', '👩‍👧', '👩‍👧‍👦', '👩‍👧‍👧', '🗣️', '👤',
      '👥', '🫂'
    ]
  },
  {
    name: 'emoji_category_animals',
    emojis: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔',
      '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗',
      '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊',
      '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐',
      '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁',
      '🐀', '🐿️', '🦔', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄',
      '🐚', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒',
      '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '🪐', '💫', '⭐️', '🌟', '✨', '⚡️', '☄️', '💥', '🔥', '🌪️', '🌈', '☀️', '🌤️', '⛅️', '🌥️', '☁️',
      '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️', '☃️', '⛄️', '🌬️', '💨', '💧', '💦', '🌊', '🌫️'
    ]
  },
  {
    name: 'emoji_category_food',
    emojis: [
      '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝', '🍅', '🥥', '🥑', '🍆', '🥔', '🥕',
      '🌽', '🌶️', '🥒', '🥬', '🥦', '🧄', '🧅', '🍄', '🥜', '🌰', '🍞', '🥐', '🥖', '🥨', '🥯', '🥞', '🧇', '🧀', '🍖', '🍗', '🥩',
      '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🧈', '🧂', '🥫', '🍱',
      '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡', '🦀', '🦞', '🦐', '🦑', '🦪',
      '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯', '🍼', '🥛', '☕️', '🍵', '🍶', '🍾', '🍷',
      '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🥤', '🧋', '🧃', '🧉', '🧊', '🥢', '🍽️', '🍴', '🥄', '🔪', '🏺'
    ]
  },
  {
    name: 'emoji_category_activities',
    emojis: [
      '⚽️', '🏀', '🏈', '⚾️', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳️', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🏋️‍♂️', '🏋️‍♀️', '🤼', '🤼‍♂️', '🤼‍♀️', '🤸', '🤸‍♂️', '🤸‍♀️', '⛹️', '⛹️‍♂️', '⛹️‍♀️', '🤺', '🤾', '🤾‍♂️', '🤾‍♀️', '🏌️', '🏌️‍♂️', '🏌️‍♀️', '🏇', '🧘', '🧘‍♂️', '🧘‍♀️', '🏄', '🏄‍♂️', '🏄‍♀️', '🏊', '🏊‍♂️', '🏊‍♀️', '🤽', '🤽‍♂️', '🤽‍♀️', '🚣', '🚣‍♂️', '🚣‍♀️', '🧗', '🧗‍♂️', '🧗‍♀️', '🚵', '🚵‍♂️', '🚵‍♀️', '🚴', '🚴‍♂️', '🚴‍♀️', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹', '🤹‍♂️', '🤹‍♀️', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎲', '♟️', '🎯', '🎳', '🎮', '🎰', '🧩'
    ]
  },
  {
    name: 'emoji_category_travel',
    emojis: [
      '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️', '🛺', '🚨', '🚔', '🚍',
      '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬',
      '💺', '🚁', '🚟', '🛰️', '🚀', '🛸', '🛶', '⛵️', '🚤', '🛥️', '🛳️', '⛴️', '🚢', '⚓️', '⛽️', '🚧', '🚦', '🚥', '🛑', '🗿', '🗽',
      '🗼', '🏰', '🏯', '🏟️', '🎡', '🎢', '🎠', '⛲️', '⛱️', '🏖️', '🏝️', '🏜️', '🌋', '⛰️', '🏔️', '🗻', '🏕️', '⛺️', '🏠', '🏡',
      '🏘️', '🏚️', '🏗️', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛️', '⛪️', '🕌', '🕍', '🛕', '🕋',
      '⛩️', '🛤️', '🛣️', '🗾', '🗺️', '🌅', '🌄', '🌠', '🎇', '🎆', '🌇', '🌆', '🌃', '🌉', '🌁'
    ]
  },
  {
    name: 'emoji_category_objects',
    emojis: [
      '⌚️', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️',
      '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛️', '⏳', '📡', '🔋', '🔌', '💡',
      '🔦', '🕯️', '🧯', '🗑️', '🛢️', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🦯', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️',
      '🔩', '⚙️', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈',
      '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🧺', '🧻', '🚽', '🚰', '🚿', '🛁',
      '🛀', '🧼', '🪥', '🪒', '🧽', '🧴', '🛎️', '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️', '🛌', '🧸', '🖼️', '🛍️', '🛒', '🎁', '🎈',
      '🎏', '🎀', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📮', '📪', '📫', '📬', '📭', '📦', '🏷️', '📉',
      '📈', '📊', '📋', '📁', '📂', '🗂️', '📅', '📆', '🗒️', '🗓️', '📇', '🗃️', '🗳️', '🗄️', '📌', '📍', '📎', '🖇️', '📏', '📐',
      '✂️', '🗄️', '🔒', '🔓', '🔏', '🔐', '🔨', '🪓', '⛏️', '⚒️', '🛠️', '🗡️', '⚔️', '🔫', '🏹', '🛡️', '🔧',
      '🔩', '⚙️', '🗜️', '⚖️', '🦯', '🔗', '⛓️', '🧰', '🧲', '⚗️', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '💉', '🩸', '💊', '🩹', '🩺', '🚪',
      '🛗', '🪞', '🪟', '🛏️', '🛋️', '🪑', '🚽', '🪠', '🚿', '🛁', '🪤', '🪒', '🧴', '🧷', '🧹', '🧺', '🧻', '🧼', '🪣', '🧽', '🧯',
      '🛒', '🚬', '⚰️', '🪦', '⚱️', '🗿', '🪧'
    ]
  },
  {
    name: 'emoji_category_symbols',
    emojis: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️',
      '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈️', '♉️', '♊️', '♋️', '♌️', '♍️', '♎️', '♏️', '♐️', '♑️', '♒️', '♓️',
      '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚️', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹',
      '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕️', '🛑', '⛔️', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞',
      '📵', '🚭', '❗️', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯️', '💹', '❇️',
      '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿️', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '🚻',
      '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣',
      '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸️', '⏯️', '⏹️', '⏺️', '⏭️', '⏮️', '⏩', '⏪', '⏫', '⏬',
      '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄',
      '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '♾️', '💲', '💱', '™️', '©️', '®️', '👁️‍🗨️', '🔚', '🔙', '🔛', '🔝', '🔜', '✔️', '☑️',
      '🔘', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫️', '⚪️', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾️',
      '◽️', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛️', '⬜️', '🟫', '▪️', '▫️', '🔉', '🔊', '🔇', '📣', '📢', '🔔', '🔕',
      '🃏', '🀄️', '♠️', '♣️', '♥️', '♦️', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞',
      '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧', '🏳️', '🏴', '🏁', '🚩', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️'
    ]
  }
];

export const CHAT_BACKGROUNDS = [
  {
    id: 'default',
    nameKey: 'bg_default',
    light: '',
    dark: ''
  },
  {
    id: 'geometric',
    nameKey: 'bg_geometric',
    light: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cg fill='%23e0e7ff' fill-opacity='0.4'%3e%3cpolygon points='50 0 61 35 96 35 68 57 79 91 50 70 21 91 32 57 4 35 39 35'/%3e%3c/g%3e%3c/svg%3e",
    dark: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cg fill='%231e293b' fill-opacity='0.6'%3e%3cpolygon points='50 0 61 35 96 35 68 57 79 91 50 70 21 91 32 57 4 35 39 35'/%3e%3c/g%3e%3c/svg%3e"
  },
  {
    id: 'waves',
    nameKey: 'bg_waves',
    light: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cpath d='M0 50 Q 25 30, 50 50 T 100 50 V 100 H 0 Z' fill='%23dbeafe' fill-opacity='0.3'/%3e%3cpath d='M0 60 Q 25 40, 50 60 T 100 60 V 100 H 0 Z' fill='%23bfdbfe' fill-opacity='0.3'/%3e%3c/svg%3e",
    dark: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cpath d='M0 50 Q 25 30, 50 50 T 100 50 V 100 H 0 Z' fill='%230f172a' fill-opacity='0.5'/%3e%3cpath d='M0 60 Q 25 40, 50 60 T 100 60 V 100 H 0 Z' fill='%231e293b' fill-opacity='0.5'/%3e%3c/svg%3e"
  },
  {
    id: 'dots',
    nameKey: 'bg_dots',
    light: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e%3ccircle cx='2' cy='2' r='1.5' fill='%2393c5fd' fill-opacity='0.4'/%3e%3ccircle cx='12' cy='12' r='1.5' fill='%2360a5fa' fill-opacity='0.4'/%3e%3c/svg%3e",
    dark: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e%3ccircle cx='2' cy='2' r='1.5' fill='%23334155' fill-opacity='0.6'/%3e%3ccircle cx='12' cy='12' r='1.5' fill='%23475569' fill-opacity='0.6'/%3e%3c/svg%3e"
  },
  {
    id: 'hexagons',
    nameKey: 'bg_hexagons',
    light: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3e%3cg fill='%23c7d2fe' fill-opacity='0.3'%3e%3cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100'/%3e%3cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34'/%3e%3c/g%3e%3c/svg%3e",
    dark: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3e%3cg fill='%23334155' fill-opacity='0.4'%3e%3cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100'/%3e%3cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34'/%3e%3c/g%3e%3c/svg%3e"
  },
  {
    id: 'circuit',
    nameKey: 'bg_circuit',
    light: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cg fill='none' stroke='%2393c5fd' stroke-width='1' stroke-opacity='0.3'%3e%3cpath d='M10 10 L30 10 M30 10 L30 30 M30 30 L50 30 M70 10 L90 10 M70 10 L70 30'/%3e%3cpath d='M10 50 L30 50 M30 50 L30 70 M50 70 L70 70 M70 70 L70 90 M70 50 L90 50'/%3e%3ccircle cx='30' cy='10' r='3'/%3e%3ccircle cx='30' cy='30' r='3'/%3e%3ccircle cx='70' cy='10' r='3'/%3e%3ccircle cx='70' cy='70' r='3'/%3e%3c/g%3e%3c/svg%3e",
    dark: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cg fill='none' stroke='%23475569' stroke-width='1' stroke-opacity='0.5'%3e%3cpath d='M10 10 L30 10 M30 10 L30 30 M30 30 L50 30 M70 10 L90 10 M70 10 L70 30'/%3e%3cpath d='M10 50 L30 50 M30 50 L30 70 M50 70 L70 70 M70 70 L70 90 M70 50 L90 50'/%3e%3ccircle cx='30' cy='10' r='3'/%3e%3ccircle cx='30' cy='30' r='3'/%3e%3ccircle cx='70' cy='10' r='3'/%3e%3ccircle cx='70' cy='70' r='3'/%3e%3c/g%3e%3c/svg%3e"
  },
  {
    id: 'gradient',
    nameKey: 'bg_gradient',
    light: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cdefs%3e%3clinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' style='stop-color:%23dbeafe;stop-opacity:0.3'/%3e%3cstop offset='100%25' style='stop-color:%23e0e7ff;stop-opacity='0.3'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect width='100' height='100' fill='url(%23a)'/%3e%3c/svg%3e",
    dark: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cdefs%3e%3clinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' style='stop-color:%230f172a;stop-opacity:0.5'/%3e%3cstop offset='100%25' style='stop-color:%231e293b;stop-opacity:0.5'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect width='100' height='100' fill='url(%23a)'/%3e%3c/svg%3e"
  }
];

export const MOCK_ADS = [
  {
    id: 'ad1',
    image: 'https://placehold.co/300x150/0ea5e9/ffffff?text=SecureVPN',
    titleKey: 'ad_vpn_title',
    descriptionKey: 'ad_vpn_desc',
    link: 'https://example.com/vpn',
  },
  {
    id: 'ad2',
    image: 'https://placehold.co/300x150/f97316/ffffff?text=Aroma+Coffee',
    titleKey: 'ad_coffee_title',
    descriptionKey: 'ad_coffee_desc',
    link: 'https://example.com/coffee',
  },
  {
    id: 'ad3',
    image: 'https://placehold.co/300x150/8b5cf6/ffffff?text=TechGadgets',
    titleKey: 'ad_gadgets_title',
    descriptionKey: 'ad_gadgets_desc',
    link: 'https://example.com/gadgets',
  },
  {
    id: 'ad4',
    image: 'https://placehold.co/300x150/10b981/ffffff?text=EcoLife',
    titleKey: 'ad_eco_title',
    descriptionKey: 'ad_eco_desc',
    link: 'https://example.com/eco',
  },
  {
    id: 'ad5',
    image: 'https://placehold.co/300x150/f43f5e/ffffff?text=StreamMax',
    titleKey: 'ad_stream_title',
    descriptionKey: 'ad_stream_desc',
    link: 'https://example.com/stream',
  },
  {
    id: 'ad6',
    image: 'https://placehold.co/300x150/eab308/ffffff?text=LearnCode',
    titleKey: 'ad_learn_title',
    descriptionKey: 'ad_learn_desc',
    link: 'https://example.com/learn',
  },
];