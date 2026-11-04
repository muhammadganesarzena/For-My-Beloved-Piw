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
        "Aku cuma mau cerita sedikit tentang apa yang akhir-akhir ini lagi aku rasain. Jujur, belakangan ini aku lagi capek banget. Banyak hal yang ada di pikiran aku, banyak yang harus aku urusin, dan kadang semuanya datang barengan sampai aku sendiri bingung harus ngadepin yang mana dulu.",
        "Aku sadar mungkin akhir-akhir ini aku jadi agak beda. Mungkin aku lebih sering diam, jarang cerita, kurang perhatian, atau kadang kelihatan nggak semangat buat ngapa-ngapain. Aku tahu mungkin kamu juga ngerasain perubahan itu. Tapi aku mau kamu tahu kalau semua itu bukan karena kamu, apalagi karena aku udah nggak sayang sama kamu.",
      ],
    },
    {
      id: 2,
      paragraphs: [
        "Aku lagi banyak pikiran dan terkadang aku sendiri nggak tahu harus gimana. Ada hari-hari di mana aku cuma pengen diam, nggak mikirin apa-apa, dan punya waktu buat diri sendiri. Bukan karena aku nggak mau ngobrol sama kamu, tapi memang terkadang kepala aku lagi terlalu penuh buat mikirin hal lain.",
        "Maaf kalau tanpa sadar aku jadi bikin kamu ngerasa kurang diperhatikan, ngerasa aku menjauh, atau bahkan bikin kamu bertanya-tanya apa ada yang salah sama hubungan kita. Aku nggak pernah punya niat buat bikin kamu ngerasain hal seperti itu.",
      ],
    },
    {
      id: 3,
      paragraphs: [
        "Aku cuma pengen kamu ngerti kalau sekarang aku lagi berusaha ngadepin banyak hal. Aku juga nggak selalu bisa cerita semuanya, bukan karena aku nggak percaya sama kamu, tapi terkadang aku sendiri belum ngerti apa yang sebenarnya lagi aku rasain. Bahkan buat menjelaskan keadaan aku sendiri aja kadang susah.",
        "Aku nggak mau kamu mikir kalau aku udah bosan atau perasaan aku berubah. Sama sekali nggak. Aku masih sayang sama kamu, masih pengen sama kamu, dan masih mau jalanin hubungan ini. Cuma mungkin sekarang aku lagi nggak sebaik biasanya dalam nunjukin itu semua.",
      ],
    },
    {
      id: 4,
      paragraphs: [
        "Aku juga ngerti kalau kamu punya perasaan. Kamu juga butuh diperhatiin, ditemenin, dan disayang. Aku nggak mau terus-terusan menjadikan keadaan aku sebagai alasan kalau aku jadi kurang baik ke kamu. Aku bakal tetap berusaha buat memperbaiki itu, walaupun mungkin nggak bisa langsung berubah dalam waktu singkat.",
        "Tapi aku juga berharap kamu bisa sedikit sabar sama aku. Aku pengen bisa ngelewatin masa-masa ini tanpa harus merasa kalau aku kehilangan orang yang aku sayang cuma karena aku lagi nggak bisa jadi diri aku yang biasanya.",
        "Kadang aku cuma pengen dimengerti tanpa harus menjelaskan semuanya. Pengen punya waktu buat istirahat dari semua yang lagi ada di kepala aku, tanpa bikin kamu merasa kalau kamu adalah bagian dari masalah yang sedang aku hadapi. Karena kamu bukan masalahnya, sayang.",
      ],
    },
    {
      id: 5,
      paragraphs: [],
      emphasis:
        "I love you. Meskipun akhir-akhir ini aku mungkin jarang bilang, jarang nunjukin, atau nggak selalu bisa ngasih perhatian seperti biasanya, bukan berarti rasa sayang aku berkurang.",
    },
    {
      id: 6,
      paragraphs: [
        "Terima kasih karena masih ada dan masih mau ngerti aku. Maaf kalau akhir-akhir ini aku agak sulit dimengerti, maaf kalau aku belum bisa jadi pasangan yang baik seperti biasanya.",
        "Aku cuma lagi capek sama banyak hal dan masih berusaha buat ngebenerin semuanya satu per satu. Tapi satu hal yang perlu kamu tahu, aku nggak pernah punya niat buat nyerah sama hubungan kita.",
        "Aku sayang kamu, dan aku masih mau kamu ada di hidup aku. -zena",
      ],
    },
  ],
};
