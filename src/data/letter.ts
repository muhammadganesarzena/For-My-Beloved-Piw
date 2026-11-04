export interface LetterPageData {
  id: number;
  greeting?: string;
  paragraphs: string[];
  emphasis?: string;
}

export interface LetterData {
  label: string;
  signature: string;
  pages: LetterPageData[];
}

export const letter: LetterData = {
  label: "A LETTER FOR YOU",
  signature: "i love you piw -zena",
  pages: [
    {
      id: 1,
      greeting: "Sayang,",
      paragraphs: [
        "Aku mau kamu tahu kalau akhir-akhir ini aku lagi ada di titik yang cukup berat dalam hidup aku. Jujur, aku ngerasa capek banget. Ada banyak hal yang lagi aku pikirin, banyak tekanan yang harus aku hadapi, dan terkadang semuanya terasa terlalu berat sampai aku sendiri bingung harus mulai dari mana untuk menyelesaikannya.",
        "Aku tahu mungkin tanpa sadar sikap aku berubah. Mungkin aku jadi lebih diam, lebih sulit diajak bicara, kurang menunjukkan perhatian, atau bahkan terkadang terlihat seperti orang yang nggak punya energi untuk apa-apa. Tapi aku mau kamu tahu satu hal, aku sama sekali nggak bermaksud bikin kamu sedih. Aku juga nggak pernah punya niat untuk membuat kamu merasa nggak dicintai, nggak dihargai, atau merasa kalau kehadiran kamu sudah nggak sepenting dulu buat aku.",
      ],
    },
    {
      id: 2,
      paragraphs: [
        "Aku cuma sedang berusaha bertahan dengan semua hal yang sedang terjadi di hidup aku sekarang. Ada kalanya aku terlalu sibuk melawan isi kepala sendiri sampai aku lupa kalau ada orang yang juga perlu aku jaga perasaannya. Dan kalau selama ini kamu ikut merasakan dampak dari keadaan aku, aku benar-benar minta maaf.",
        "Bukan karena aku bosan sama kamu, bukan karena perasaan aku berubah, dan bukan karena aku sudah nggak ingin mengusahakan hubungan ini. Aku hanya sedang kehabisan energi untuk menghadapi banyak hal sekaligus. Bahkan terkadang, untuk terlihat baik-baik saja pun rasanya sulit.",
      ],
    },
    {
      id: 3,
      paragraphs: [
        "Aku nggak berharap kamu selalu mengerti semua yang sedang aku rasakan, karena aku tahu kamu juga punya perasaan, punya hari-hari yang berat, dan punya hal-hal yang mungkin juga ingin kamu ceritakan. Aku cuma berharap kamu nggak salah mengartikan keadaan aku sebagai kurangnya rasa sayang aku ke kamu.",
        "Aku masih orang yang sama, yang sayang sama kamu, yang masih ingin punya banyak cerita dan waktu bersama kamu. Hanya saja, sekarang aku sedang berada di fase ketika aku sendiri pun belum sepenuhnya tahu bagaimana caranya menenangkan diri sendiri.",
      ],
    },
    {
      id: 4,
      paragraphs: [
        "Kalau boleh jujur, aku juga ingin dimengerti tanpa harus selalu menjelaskan kenapa aku sedang nggak baik-baik saja. Aku ingin punya ruang untuk merasa lelah, tanpa membuat orang yang aku sayang merasa kalau dirinya adalah alasan dari kelelahan itu.",
        "Aku nggak mau menjadikan tekanan hidup aku sebagai alasan untuk mengabaikan perasaan kamu. Aku akan tetap berusaha memperbaiki apa yang perlu diperbaiki. Tapi aku juga berharap kamu bisa sedikit bersabar dengan aku selama aku mencoba melewati fase ini.",
      ],
    },
    {
      id: 5,
      paragraphs: [],
      emphasis:
        "I love you. Even on the days when I don't know how to show it properly, even when I'm tired, even when my mind is somewhere else, my feelings for you are still here.",
    },
    {
      id: 6,
      paragraphs: [
        "Terima kasih karena masih ada. Maaf kalau akhir-akhir ini aku belum bisa menjadi versi terbaik dari diri aku, termasuk sebagai pasangan kamu. Aku cuma sedang berusaha menemukan diri aku lagi di tengah semua hal yang terasa berantakan.",
        "Aku sayang kamu, dan aku nggak mau kamu meragukan itu hanya karena sekarang aku sedang tidak baik-baik saja.",
      ],
    },
  ],
};
