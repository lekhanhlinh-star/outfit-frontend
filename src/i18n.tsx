// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
      translation: {
        welcome: 'Welcome',
        outfitOfTheDay: 'Outfit of the Day',
        start: 'Start',
        take_new_photo: "Take a new photo",
        select_Image: "Select Image",
        title_select_Image: "Select an Image or Take a New Photo",
        review_your_photo: "Review your photo",
        retry: "Retry",
        confirm: "Confirm",
        select_option: "Please choose one of the options below:",
        no_image_selected: "No image selected. Please go back and select an image.",
        select_occasion: "Please select an occasion:",
        select_feedback_style: "Please select a feedback style:",
        submission_error: "There was an error submitting your feedback: {{error}}",
        warning: "Please select an image, an option, and an occasion before submitting.",
        submitting: "Submitting",
        back_to_selection: "Back to Image Selection",
        wedding: "Wedding",
        dating: "Dating",
        outing: "Outing",
        bestie_gentle: "Bestie gentle",
        bestie_strict : "Bestie strict",
        fashionista_gentle: "Fashionista gentle",
        fashionista_strict: "Fashionista strict",
        submit_feedback: "Submit Feedback",
        back_to_image: "Back to Image Selection",
        feedback_audio: "Feedback Audio:",
        please_select_image_option_occasion: "Please select an image, an option, and an occasion.",
        feedback_results: "Feedback Results",
        back : "Back",
        please_choose: "Please choose the options below:", 
      },
    },
    zh: {
      translation: {
        welcome: '歡迎',
        outfitOfTheDay: '今日穿搭',
        start: '開始',
        take_new_photo: "拍攝新照片",
        select_Image: "選擇圖片",
        title_select_Image: "選擇圖片或拍攝新照片",
        select_option: "請選擇以下選項：",
        no_image_selected: "未選擇任何圖片。請返回並選擇圖片。",
        select_occasion: "請選擇一個場合：",
        select_feedback_style: "請選擇反饋風格：",
        submission_error: "提交反饋時出錯：{{error}}",
        warning: "請選擇一個圖片、一個選項和一個場合再提交。",
        submitting: "提交中",
        back_to_selection: "返回圖片選擇",
        wedding: "婚禮",
        dating: "約會",
        outing: "外出",
        review_your_photo: "審視您的照片",
        bestie_gentle: "摯友溫柔",
        bestie_strict: "摯友嚴格",
        fashionista_gentle: "時尚達人溫柔",
        fashionista_strict: "時尚達人嚴格",
        submit_feedback: "提交反饋",
        back_to_image:  "返回圖片選擇",
        feedback_audio: "反饋音頻",
        please_select_image_option_occasion: "請選擇圖片、選項和場合。",
        retry: "重試",
        confirm: "確認",
        feedback_results: "反饋結果",
        back : "返回",
        please_choose: "請選擇以下選項:", 
      },
    },
  };

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language if no language is detected
    lng: localStorage.getItem('i18nextLng') || 'en', // Load from localStorage
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;
