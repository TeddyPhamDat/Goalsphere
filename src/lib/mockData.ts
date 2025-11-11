import { MatchItem, NewsItem, StandingItem } from "@/types";

export const news: NewsItem[] = [
  {
    id: "1",
    title: "Derby rực lửa: City hạ United 3-2",
    slug: "derby-ruc-lua-city-ha-united-3-2",
    thumbnail: "/images/news1.jpg",
    excerpt: "Trận derby Manchester kết thúc với kịch tính nghẹt thở...",
    content:
      "Trận đấu diễn ra với tốc độ cao ngay từ những phút đầu. City mở tỷ số sớm nhưng United nhanh chóng gỡ hòa...",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Real Madrid giữ vững ngôi đầu La Liga",
    slug: "real-madrid-giu-vung-ngoi-dau",
    thumbnail: "/images/news2.jpg",
    excerpt: "Los Blancos giành chiến thắng tối thiểu để tiếp tục dẫn đầu...",
    content:
      "Real Madrid kiểm soát trận đấu và có bàn thắng quyết định ở hiệp hai. Đối thủ phòng ngự kiên cường nhưng không đủ...",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "PSG thắng hủy diệt tại Ligue 1",
    slug: "psg-thang-huy-diet",
    thumbnail: "/images/news3.jpg",
    excerpt: "Mbappé lập cú đúp giúp PSG thắng đậm trên sân khách...",
    content:
      "PSG thể hiện sức mạnh tuyệt đối ở cả ba tuyến với lối chơi pressing tầm cao...",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Chelsea trở lại đường đua top 4",
    slug: "chelsea-tro-lai-top-4",
    thumbnail: "/images/news4.jpg",
    excerpt: "The Blues thi đấu bùng nổ với dàn sao trẻ...",
    content:
      "Chelsea cải thiện khả năng chuyển trạng thái và pressing, mang về 3 điểm quan trọng...",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Bayern bám đuổi ngôi đầu Bundesliga",
    slug: "bayern-bam-duoi",
    thumbnail: "/images/news5.jpg",
    excerpt: "Bayern thắng nhẹ để tiếp tục cuộc đua vô địch...",
    content:
      "Phong độ ổn định của hàng công giúp Bayern duy trì mạch thắng...",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Arsenal chiến thắng đầy cảm xúc",
    slug: "arsenal-chien-thang",
    thumbnail: "/images/news6.jpg",
    excerpt: "Pháo thủ ngược dòng ngoạn mục ở những phút cuối...",
    content:
      "Arsenal cho thấy bản lĩnh trong giai đoạn then chốt của mùa giải...",
    publishedAt: new Date().toISOString(),
  },
];

export const matches: MatchItem[] = [
  { id: "m1", home: "Man City", away: "Liverpool", league: "Premier League", kickoff: new Date(Date.now()+ 86400000).toISOString() },
  { id: "m2", home: "Arsenal", away: "Chelsea", league: "Premier League", kickoff: new Date(Date.now()+ 172800000).toISOString() },
  { id: "m3", home: "Real Madrid", away: "Barcelona", league: "La Liga", kickoff: new Date(Date.now()+ 259200000).toISOString() },
  { id: "m4", home: "PSG", away: "Marseille", league: "Ligue 1", kickoff: new Date(Date.now()+ 3600000*96).toISOString() },
  { id: "m5", home: "Bayern", away: "Dortmund", league: "Bundesliga", kickoff: new Date(Date.now()+ 3600000*120).toISOString() },
];

export const standings: StandingItem[] = Array.from({ length: 10 }).map((_, i) => ({
  position: i + 1,
  team: ["Man City","Arsenal","Liverpool","Chelsea","Tottenham","Newcastle","Man United","Brighton","Aston Villa","West Ham"][i],
  played: 28 + Math.floor(Math.random()*3),
  win: 18 - i + Math.floor(Math.random()*2),
  draw: 6 + Math.floor(Math.random()*3),
  loss: 4 + i,
  points: 70 - i*3,
}));
