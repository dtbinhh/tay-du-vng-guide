// Tây Du VNG Reference Data
// Last synced: 2026-11-27

export interface EventRound {
  round: number;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
}

export interface TrackedEvent {
  name: string;
  rounds: EventRound[];
}

export const EVENT_HISTORY: TrackedEvent[] = [
  {
    "name": "SA KIM KỲ NGỘ",
    "rounds": [
      {
        "round": 1,
        "start": "2026-10-11",
        "end": "2026-10-12"
      },
      {
        "round": 2,
        "start": "2026-11-04",
        "end": "2026-11-05"
      }
    ]
  },
  {
    "name": "KIM NGỌC MÃN ĐƯỜNG",
    "rounds": [
      {
        "round": 1,
        "start": "2026-10-05",
        "end": "2026-10-07"
      },
      {
        "round": 2,
        "start": "2026-11-06",
        "end": "2026-11-08"
      }
    ]
  },
  {
    "name": "HOÀN TRẢ TÍCH NẠP x THIÊN TỨ",
    "rounds": [
      {
        "round": 1,
        "start": "2026-09-20",
        "end": "2026-09-24"
      },
      {
        "round": 2,
        "start": "2026-10-25",
        "end": "2026-10-29"
      },
      {
        "round": 3,
        "start": "2026-11-23",
        "end": "2026-11-27"
      }
    ]
  },
  {
    "name": "TOÀN CƠ NGŨ HÀNH",
    "rounds": [
      {
        "round": 1,
        "start": "2026-11-05",
        "end": "2026-11-06"
      }
    ]
  },
  {
    "name": "NGẠO LAI THẦN THẠCH",
    "rounds": [
      {
        "round": 1,
        "start": "2026-10-10",
        "end": "2026-10-11"
      },
      {
        "round": 2,
        "start": "2026-11-16",
        "end": "2026-11-17"
      }
    ]
  },
  {
    "name": "TRÂN HƯU HIẾN BẢO",
    "rounds": [
      {
        "round": 1,
        "start": "2026-09-11",
        "end": "2026-09-12"
      },
      {
        "round": 2,
        "start": "2026-10-04",
        "end": "2026-10-05"
      },
      {
        "round": 3,
        "start": "2026-10-30",
        "end": "2026-10-31"
      },
      {
        "round": 4,
        "start": "2026-11-18",
        "end": "2026-11-19"
      }
    ]
  },
  {
    "name": "ĐẠI MẠC TẦM TRÂN",
    "rounds": [
      {
        "round": 1,
        "start": "2026-09-03",
        "end": "2026-09-06"
      },
      {
        "round": 2,
        "start": "2026-10-01",
        "end": "2026-10-03"
      },
      {
        "round": 3,
        "start": "2026-11-20",
        "end": "2026-11-22"
      }
    ]
  },
  {
    "name": "NHÃ TẬP KHAI THÁI",
    "rounds": [
      {
        "round": 1,
        "start": "2026-11-07",
        "end": "2026-11-09"
      }
    ]
  },
  {
    "name": "HOAN TỤ KIM TIÊU",
    "rounds": [
      {
        "round": 1,
        "start": "2026-06-26",
        "end": "2026-07-01"
      },
      {
        "round": 2,
        "start": "2026-11-28",
        "end": "2026-12-02"
      }
    ]
  },
  {
    "name": "QUỲNH TIÊU THỊNH HỘI",
    "rounds": [
      {
        "round": 1,
        "start": "2026-09-12",
        "end": "2026-09-14"
      },
      {
        "round": 2,
        "start": "2026-10-12",
        "end": "2026-10-14"
      }
    ]
  },
  {
    "name": "THÚY DÃ TẦM XUÂN",
    "rounds": [
      {
        "round": 1,
        "start": "2026-05-10",
        "end": "2026-05-15"
      }
    ]
  },
  {
    "name": "VẠN TƯỢNG THIÊN DIỄN",
    "rounds": [
      {
        "round": 1,
        "start": "2026-11-10",
        "end": "2026-11-12"
      }
    ]
  },
  {
    "name": "LÃM NGUYỆT",
    "rounds": [
      {
        "round": 1,
        "start": "2026-07-11",
        "end": "2026-07-15"
      },
      {
        "round": 2,
        "start": "2026-09-25",
        "end": "2026-09-28"
      }
    ]
  },
  {
    "name": "MẠNH HẠ HOAN CA",
    "rounds": [
      {
        "round": 1,
        "start": "2026-06-02",
        "end": "2026-06-07"
      },
      {
        "round": 2,
        "start": "2026-10-15",
        "end": "2026-10-19"
      }
    ]
  },
  {
    "name": "HỒ TÂN DU VIÊN",
    "rounds": [
      {
        "round": 1,
        "start": "2026-08-30",
        "end": "2026-09-06"
      }
    ]
  },
  {
    "name": "VÒNG QUAY LÂM LANG",
    "rounds": [
      {
        "round": 1,
        "start": "2026-11-09",
        "end": "2026-11-10"
      }
    ]
  },
  {
    "name": "TIÊN VỰC PHONG HỎA",
    "rounds": [
      {
        "round": 1,
        "start": "2026-09-30",
        "end": "2026-10-08"
      }
    ]
  },
  {
    "name": "SỰ KIỆN VƯỜN THỎ",
    "rounds": [
      {
        "round": 1,
        "start": "2026-08-17",
        "end": "2026-08-19"
      },
      {
        "round": 2,
        "start": "2026-10-26",
        "end": "2026-10-28"
      },
      {
        "round": 3,
        "start": "2026-11-23",
        "end": "2026-11-25"
      }
    ]
  },
  {
    "name": "LINH KỴ TẦM TUNG",
    "rounds": [
      {
        "round": 1,
        "start": "2026-09-08",
        "end": "2026-09-10"
      }
    ]
  },
  {
    "name": "Quay tướng kim",
    "rounds": [
      {
        "round": 3,
        "start": "2026-09-17",
        "end": "2026-09-19"
      },
      {
        "round": 2,
        "start": "2026-10-22",
        "end": "2026-10-24"
      },
      {
        "round": 1,
        "start": "2026-11-13",
        "end": "2026-11-15"
      }
    ]
  },
  {
    "name": "CÔN LÔN TIÊN CẢNH",
    "rounds": [
      {
        "round": 1,
        "start": "2026-04-23",
        "end": "2026-05-07"
      },
      {
        "round": 2,
        "start": "2026-08-18",
        "end": "2026-08-31"
      }
    ]
  },
  {
    "name": "THẤT TỊCH",
    "rounds": [
      {
        "round": 1,
        "start": "2026-10-06",
        "end": "2026-10-10"
      }
    ]
  },
  {
    "name": "Quỹ Linh Kỵ",
    "rounds": [
      {
        "round": 1,
        "start": "2026-10-05",
        "end": "2026-10-20"
      }
    ]
  },
  {
    "name": "Ev sinh nhật",
    "rounds": [
      {
        "round": 1,
        "start": "2026-11-15",
        "end": "2026-11-22"
      }
    ]
  },
  {
    "name": "ĐỈNH CAO ĐỐI QUYẾT",
    "rounds": [
      {
        "round": 1,
        "start": "2026-10-26",
        "end": "2026-11-25"
      }
    ]
  },
  {
    "name": "PHONG ĐÔ HUYỀN DIỆU",
    "rounds": [
      {
        "round": 1,
        "start": "2026-10-31",
        "end": "2026-11-03"
      }
    ]
  }
];

export interface LamLangFloor {
  floor: string;
  item1: string;
  item2: string;
  item3: string;
  limit: number;
  price: number;
  unlockCondition: string;
}

export interface LamLangEvent {
  title: string;
  floors: LamLangFloor[];
}

export const LAM_LANG_EVENTS: LamLangEvent[] = [
  {
    "title": "Ngạo Lai Thần Thạch",
    "floors": [
      {
        "floor": "Tầng 1",
        "item1": "Thiên Giác Hoàn *6",
        "item2": "Lưới Bắt Ma *10",
        "item3": "Sưu Thần Đồ *5",
        "limit": 1,
        "price": 100,
        "unlockCondition": "-"
      },
      {
        "floor": "Tầng 2",
        "item1": "Đá Tinh Luyện Hiếm *30",
        "item2": "Thiên Công Khắc Nhẫn *15",
        "item3": "Đá Bồi Dưỡng Pháp Bảo *3000",
        "limit": 1,
        "price": 150,
        "unlockCondition": "Đạt 100 Mở khóa Tầng 2"
      },
      {
        "floor": "Tầng 3",
        "item1": "Hồng Mông Giám *7",
        "item2": "Hoán Linh Bút *7",
        "item3": "Vé Chiêu Mộ Khung Vũ *7",
        "limit": 1,
        "price": 250,
        "unlockCondition": "Đạt 250 Mở khóa Tầng 3"
      },
      {
        "floor": "Tầng 4",
        "item1": "Rương chọn minh văn cam *1",
        "item2": "Rương Tự Chọn Sở Tải Thi Kinh *1",
        "item3": "Thiên Công Bảo Đồ *1",
        "limit": 1,
        "price": 300,
        "unlockCondition": "Đạt 500 Mở khóa Tầng 4"
      },
      {
        "floor": "Tầng 5",
        "item1": "Vô Tự Thiên Thư *1",
        "item2": "Túi Tự Chọn Bảo Thạch Bậc 6 *2",
        "item3": "Quà Kịch Trường *1",
        "limit": 1,
        "price": 500,
        "unlockCondition": "Đạt 800 Mở khóa Tầng 5"
      },
      {
        "floor": "Tầng 6",
        "item1": "Rương chọn minh văn đỏ *1",
        "item2": "Rương Tự Chọn Tướng Đỏ Giới Hạn Tám Chọn 1 *1",
        "item3": "Rương Tự Chọn Trang Bị Thượng Cổ *1",
        "limit": 1,
        "price": 1000,
        "unlockCondition": "Đạt 1300 Mở khóa Tầng 6"
      }
    ]
  },
  {
    "title": "Thỏ Thỏ Nhạc Viên",
    "floors": [
      {
        "floor": "Tầng 1",
        "item1": "Thiên Giác Hoàn *6",
        "item2": "Lưới Bắt Ma *10",
        "item3": "Sưu Thần Đồ *5",
        "limit": 1,
        "price": 100,
        "unlockCondition": "-"
      },
      {
        "floor": "Tầng 2",
        "item1": "Đá Tinh Luyện Hiếm *30",
        "item2": "Thiên Công Khắc Nhẫn *15",
        "item3": "Đá Bồi Dưỡng Pháp Bảo *3000",
        "limit": 1,
        "price": 150,
        "unlockCondition": "Đạt 100 Mở khóa Tầng 2"
      },
      {
        "floor": "Tầng 3",
        "item1": "Hồng Mông Giám *7",
        "item2": "Hoán Linh Bút *7",
        "item3": "Vé Chiêu Mộ Khung Vũ *7",
        "limit": 1,
        "price": 250,
        "unlockCondition": "Đạt 250 Mở khóa Tầng 3"
      },
      {
        "floor": "Tầng 4",
        "item1": "Rương Tự Chọn Tốt Điểm Phách Màu Đỏ *1",
        "item2": "Rương Tự Chọn Sở Tải Thi Kinh *1",
        "item3": "Thiên Công Bảo Đồ *1",
        "limit": 1,
        "price": 300,
        "unlockCondition": "Đạt 500 Mở khóa Tầng 4"
      },
      {
        "floor": "Tầng 5",
        "item1": "Vô Tự Thiên Thư *1",
        "item2": "Túi Tự Chọn Bảo Thạch Bậc 6 *2",
        "item3": "Quà Kịch Trường *1",
        "limit": 1,
        "price": 500,
        "unlockCondition": "Đạt 800 Mở khóa Tầng 5"
      },
      {
        "floor": "Tầng 6",
        "item1": "Thần Hồn Chọn 1 Trong 8 *1",
        "item2": "Rương Tự Chọn Tướng Đỏ Giới Hạn Tám Chọn 1 *1",
        "item3": "Rương Tự Chọn Trang Bị Thượng Cổ *1",
        "limit": 1,
        "price": 1000,
        "unlockCondition": "Đạt 1300 Mở khóa Tầng 6"
      }
    ]
  },
  {
    "title": "Lâm Lang Chuyển Bàn",
    "floors": [
      {
        "floor": "Tầng 1",
        "item1": "Thiên Giác Hoàn *6",
        "item2": "Lưới Bắt Ma *10",
        "item3": "Sưu Thần Đồ *5",
        "limit": 1,
        "price": 100,
        "unlockCondition": "-"
      },
      {
        "floor": "Tầng 2",
        "item1": "Đá Tinh Luyện Hiếm *30",
        "item2": "Thiên Công Khắc Nhẫn *15",
        "item3": "Đá Bồi Dưỡng Pháp Bảo *3000",
        "limit": 1,
        "price": 150,
        "unlockCondition": "Đạt 100 Mở khóa Tầng 2"
      },
      {
        "floor": "Tầng 3",
        "item1": "Hồng Mông Giám *7",
        "item2": "Hoán Linh Bút *7",
        "item3": "Vé Chiêu Mộ Khung Vũ *7",
        "limit": 1,
        "price": 250,
        "unlockCondition": "Đạt 250 Mở khóa Tầng 3"
      },
      {
        "floor": "Tầng 4",
        "item1": "Rương Tự Chọn Mệnh Cách Màu Cam *1",
        "item2": "Rương Tự Chọn Sở Từ Kinh Thi *1",
        "item3": "Thiên Công Bảo Đồ *1",
        "limit": 1,
        "price": 300,
        "unlockCondition": "Đạt 500 Mở khóa Tầng 4"
      },
      {
        "floor": "Tầng 5",
        "item1": "Vô Tự Thiên Thư *1",
        "item2": "Túi Tự Chọn Bảo Thạch Bậc 6 *2",
        "item3": "Quà Kịch Trường *1",
        "limit": 1,
        "price": 500,
        "unlockCondition": "Đạt 800 Mở khóa Tầng 5"
      },
      {
        "floor": "Tầng 6",
        "item1": "Rương Tự Chọn Mệnh Cách/Đồ Sách *1",
        "item2": "Rương Tự Chọn Tướng Đỏ Giới Hạn Tám Chọn 1 *1",
        "item3": "Rương Tự Chọn Trang Bị Thượng Cổ *1",
        "limit": 1,
        "price": 1000,
        "unlockCondition": "Đạt 1300 Mở khóa Tầng 6"
      }
    ]
  },
  {
    "title": "Linh Kỵ Nhạc Viên",
    "floors": [
      {
        "floor": "Tầng 1",
        "item1": "Thiên Giác Hoàn *6",
        "item2": "Lưới Bắt Ma *10",
        "item3": "Sưu Thần Đồ *5",
        "limit": 1,
        "price": 100,
        "unlockCondition": "-"
      },
      {
        "floor": "Tầng 2",
        "item1": "Đá Tinh Luyện Hiếm *30",
        "item2": "Thiên Công Khắc Nhẫn *15",
        "item3": "Đá Bồi Dưỡng Pháp Bảo *3000",
        "limit": 1,
        "price": 150,
        "unlockCondition": "Đạt 100 Mở khóa Tầng 2"
      },
      {
        "floor": "Tầng 3",
        "item1": "Hồng Mông Giám *7",
        "item2": "Hoán Linh Bút *7",
        "item3": "Vé Chiêu Mộ Khung Vũ *7",
        "limit": 1,
        "price": 250,
        "unlockCondition": "Đạt 250 Mở khóa Tầng 3"
      },
      {
        "floor": "Tầng 4",
        "item1": "Trang Bị Kỵ Cửu Thiên Chọn 1 Trong 2 *1",
        "item2": "Dãy Phạn Huyền Kim *1",
        "item3": "Thiên Công Bảo Đồ *1",
        "limit": 1,
        "price": 300,
        "unlockCondition": "Đạt 500 Mở khóa Tầng 4"
      },
      {
        "floor": "Tầng 5",
        "item1": "Trang Bị Kỵ Thái Hư Chọn 1 Trong 2 *1",
        "item2": "Chủ Chân Huyền Kim *1",
        "item3": "Cửu Diệu Thần Ngọc *1",
        "limit": 1,
        "price": 500,
        "unlockCondition": "Đạt 800 Mở khóa Tầng 5"
      },
      {
        "floor": "Tầng 6",
        "item1": "Tử Tiêu Thần Ngọc *1",
        "item2": "Rương Tự Chọn Tướng Đỏ Giới Hạn Tám Chọn 1 *1",
        "item3": "Rương Tự Chọn Trang Bị Thượng Cổ *1",
        "limit": 1,
        "price": 1000,
        "unlockCondition": "Đạt 1300 Mở khóa Tầng 6"
      }
    ]
  }
];

export interface DoiQuyetRank {
  rank: string;
  rankReward: string;
  points: number;
  seasonReward: number;
}

export const DOI_QUYET_RANKS: DoiQuyetRank[] = [
  {
    "rank": "Lục 1",
    "rankReward": "chọn tím thiên thư 10*",
    "points": 100,
    "seasonReward": 25
  },
  {
    "rank": "Lục 2",
    "rankReward": "chọn tím thiên thư 20*",
    "points": 200,
    "seasonReward": 50
  },
  {
    "rank": "Lục 3",
    "rankReward": "chọn tím thiên thư 30*",
    "points": 300,
    "seasonReward": 75
  },
  {
    "rank": "Lam 1",
    "rankReward": "chọn tím thiên thư 40*",
    "points": 400,
    "seasonReward": 100
  },
  {
    "rank": "Lam 2",
    "rankReward": "chọn tím thiên thư 60*",
    "points": 600,
    "seasonReward": 150
  },
  {
    "rank": "Lam 3",
    "rankReward": "chọn tím thiên thư 80*",
    "points": 800,
    "seasonReward": 200
  },
  {
    "rank": "Tím 1",
    "rankReward": "20m đỏ/ cam tt",
    "points": 1000,
    "seasonReward": 300
  },
  {
    "rank": "Tím 2",
    "rankReward": "40m đỏ/ cam tt",
    "points": 1200,
    "seasonReward": 400
  },
  {
    "rank": "Tím 3",
    "rankReward": "60m đỏ/ cam tt",
    "points": 1500,
    "seasonReward": 500
  },
  {
    "rank": "Cam 1",
    "rankReward": "30m cl / thiên thư",
    "points": 1800,
    "seasonReward": 600
  },
  {
    "rank": "Cam 2",
    "rankReward": "30m cl / thiên thư",
    "points": 2200,
    "seasonReward": 700
  },
  {
    "rank": "Cam 3",
    "rankReward": "30m cl / thiên thư",
    "points": 2600,
    "seasonReward": 800
  },
  {
    "rank": "Đỏ",
    "rankReward": "30m cl / thiên thư",
    "points": 3000,
    "seasonReward": 1000
  }
];

export interface KimTuongRecord {
  top: string;
  tickets: number;
  shards: number;
  bonusShards: number;
  points: number;
  totalShards: number;
  pointsPerShard: number;
  note: string;
}

export const KIM_TUONG_HISTORY: KimTuongRecord[] = [
  {
    "top": "145 + fre",
    "tickets": 21,
    "shards": 17,
    "bonusShards": 20,
    "points": 210,
    "totalShards": 37,
    "pointsPerShard": 5.68,
    "note": "> 30 vé"
  },
  {
    "top": "161**",
    "tickets": 20,
    "shards": 13,
    "bonusShards": 20,
    "points": 200,
    "totalShards": 33,
    "pointsPerShard": 6.06,
    "note": "> 37 vé"
  },
  {
    "top": "89*",
    "tickets": 27,
    "shards": 24,
    "bonusShards": 30,
    "points": 270,
    "totalShards": 54,
    "pointsPerShard": 5,
    "note": "> 27 vé"
  },
  {
    "top": "100.0",
    "tickets": 30,
    "shards": 24,
    "bonusShards": 30,
    "points": 300,
    "totalShards": 54,
    "pointsPerShard": 5.56,
    "note": "> 30 vé"
  },
  {
    "top": "94.0",
    "tickets": 32,
    "shards": 25,
    "bonusShards": 30,
    "points": 320,
    "totalShards": 55,
    "pointsPerShard": 5.82,
    "note": "> 32 vé"
  },
  {
    "top": "103 + fre",
    "tickets": 31,
    "shards": 28,
    "bonusShards": 20,
    "points": 310,
    "totalShards": 48,
    "pointsPerShard": 6.46,
    "note": "> 33 vé"
  },
  {
    "top": "148.0",
    "tickets": 18,
    "shards": 12,
    "bonusShards": 20,
    "points": 180,
    "totalShards": 32,
    "pointsPerShard": 5.63,
    "note": ""
  }
];

export interface HeroUpgradeRow {
  star: string;
  shards: number;
  kinhThi?: number;
  kinhThi2?: number;
  kinhThi3?: number;
  phoiUp?: number;
  phiLinhQuyet?: number;
  ky?: number;
  kyGioiHan?: number;
  note?: string;
}

export interface HeroUpgradeCategory {
  id: string;
  name: string;
  badge: string;
  color: 'red' | 'rose' | 'amber' | 'yellow' | 'purple' | 'cyan';
  summaryNote?: string;
  columns: { key: keyof HeroUpgradeRow; label: string }[];
  rows: HeroUpgradeRow[];
}

export const HERO_UPGRADE_CATEGORIES: HeroUpgradeCategory[] = [
  {
    id: 'do',
    name: 'Tướng Đỏ',
    badge: 'Đỏ',
    color: 'red',
    summaryNote: 'Tổng mảnh tướng Đỏ lên Hóa Thần: 2,640 mảnh',
    columns: [
      { key: 'star', label: 'Số sao' },
      { key: 'shards', label: 'Số mảnh' },
      { key: 'kinhThi', label: 'Kinh thi Phong' },
      { key: 'kinhThi2', label: 'Kinh thi Nhã' },
      { key: 'kinhThi3', label: 'Kinh thi Tụng' },
    ],
    rows: [
      { star: '1s', shards: 120, kinhThi: 4, kinhThi2: 4, kinhThi3: 4 },
      { star: '2s', shards: 240, kinhThi: 6, kinhThi2: 6, kinhThi3: 6 },
      { star: '3s', shards: 360, kinhThi: 10, kinhThi2: 10, kinhThi3: 10 },
    ],
  },
  {
    id: 'do-limit',
    name: 'Tướng Đỏ Limit',
    badge: 'Đỏ Limit',
    color: 'rose',
    summaryNote: 'Tổng mảnh tướng Đỏ Limit lên Hóa Thần: 3,120 mảnh',
    columns: [
      { key: 'star', label: 'Số sao' },
      { key: 'shards', label: 'Số mảnh' },
      { key: 'kinhThi', label: 'Kinh thi Phong' },
      { key: 'kinhThi2', label: 'Kinh thi Nhã' },
      { key: 'kinhThi3', label: 'Kinh thi Tụng' },
      { key: 'phoiUp', label: 'Phôi up' },
    ],
    rows: [
      { star: '1s', shards: 200, kinhThi: 6, kinhThi2: 6, kinhThi3: 4, phoiUp: 1 },
      { star: '2s', shards: 400, kinhThi: 9, kinhThi2: 6, kinhThi3: 9, phoiUp: 2 },
      { star: '3s', shards: 600, kinhThi: 8, kinhThi2: 12, kinhThi3: 12, phoiUp: 3 },
    ],
  },
  {
    id: 'tbt-do-limit',
    name: 'TBT Đỏ Limit',
    badge: 'TBT Đỏ',
    color: 'rose',
    columns: [
      { key: 'star', label: 'Số sao' },
      { key: 'shards', label: 'Số mảnh' },
      { key: 'kinhThi', label: 'Kinh thi' },
      { key: 'phoiUp', label: 'Phôi up' },
      { key: 'phiLinhQuyet', label: 'Phí linh quyết' },
    ],
    rows: [
      { star: '0s', shards: 0, kinhThi: 0, phoiUp: 0, phiLinhQuyet: 3 },
      { star: '1s', shards: 200, kinhThi: 16, phoiUp: 1, phiLinhQuyet: 1 },
      { star: '2s', shards: 400, kinhThi: 24, phoiUp: 2, phiLinhQuyet: 1 },
      { star: '3s', shards: 600, kinhThi: 32, phoiUp: 3, phiLinhQuyet: 1 },
    ],
  },
  {
    id: 'hoa-than',
    name: 'Hóa Thần',
    badge: 'Hóa Thần',
    color: 'amber',
    summaryNote: 'Đỏ lên Hóa Thần: 2,640 mảnh | Đỏ Limit lên Hóa Thần: 3,120 mảnh',
    columns: [
      { key: 'star', label: 'Số sao' },
      { key: 'shards', label: 'Số mảnh' },
      { key: 'kinhThi', label: 'Kinh thi' },
      { key: 'phoiUp', label: 'Phôi up' },
    ],
    rows: [
      { star: '0s', shards: 1200, kinhThi: 90, phoiUp: 3 },
      { star: '1s', shards: 0, kinhThi: 0, phoiUp: 2 },
      { star: '2s', shards: 0, kinhThi: 0, phoiUp: 2 },
      { star: '3s', shards: 0, kinhThi: 0, phoiUp: 3 },
      { star: '4s', shards: 0, kinhThi: 0, phoiUp: 3 },
      { star: '5s', shards: 0, kinhThi: 0, phoiUp: 4 },
      { star: 'Lục thức', shards: 720, kinhThi: 0, phoiUp: 4 },
    ],
  },
  {
    id: 'kim',
    name: 'Tướng Kim',
    badge: 'Kim',
    color: 'yellow',
    summaryNote: 'Tổng 0s → 5s: 1,600 mảnh cùng loại + Lục thức 1 & 2: 960 mảnh bất kỳ',
    columns: [
      { key: 'star', label: 'Số sao' },
      { key: 'shards', label: 'Số mảnh' },
      { key: 'note', label: 'Ghi chú' },
    ],
    rows: [
      { star: '0s', shards: 160, note: 'Cùng loại' },
      { star: '1s', shards: 160, note: 'Cùng loại' },
      { star: '2s', shards: 240, note: 'Cùng loại' },
      { star: '3s', shards: 320, note: 'Cùng loại' },
      { star: '4s', shards: 320, note: 'Cùng loại' },
      { star: '5s', shards: 400, note: 'Cùng loại' },
      { star: 'Lục thức 1', shards: 480, note: 'Bất kỳ' },
      { star: 'Lục thức 2', shards: 480, note: 'Bất kỳ' },
    ],
  },
  {
    id: 'tbt-kim',
    name: 'TBT Kim',
    badge: 'TBT Kim',
    color: 'yellow',
    summaryNote: 'Tổng 1s → 5s: 1,440 mảnh cùng loại + Lục thức 1 & 2: 960 mảnh bất kỳ (0s cần 4 Phí linh quyết)',
    columns: [
      { key: 'star', label: 'Số sao' },
      { key: 'shards', label: 'Số mảnh' },
      { key: 'note', label: 'Ghi chú' },
    ],
    rows: [
      { star: '0s', shards: 0, note: '4 Phí linh quyết' },
      { star: '1s', shards: 160, note: 'Cùng loại' },
      { star: '2s', shards: 240, note: 'Cùng loại' },
      { star: '3s', shards: 320, note: 'Cùng loại' },
      { star: '4s', shards: 320, note: 'Cùng loại' },
      { star: '5s', shards: 400, note: 'Cùng loại' },
      { star: 'Lục thức 1', shards: 480, note: 'Bất kỳ' },
      { star: 'Lục thức 2', shards: 480, note: 'Bất kỳ' },
    ],
  },
  {
    id: 'than-ma',
    name: 'Thần Ma',
    badge: 'Thần Ma',
    color: 'purple',
    summaryNote: 'Tổng 0s → 5s: 960 mảnh (800 từ 1s-5s + 160 mở 0s), 800 Kỹ, 1,120 Kỹ giới hạn | Full Lục thức 3: 3,040 mảnh / 1,280 Kỹ giới hạn',
    columns: [
      { key: 'star', label: 'Số sao' },
      { key: 'shards', label: 'Số mảnh' },
      { key: 'ky', label: 'Kỹ' },
      { key: 'kyGioiHan', label: 'Kỹ giới hạn' },
      { key: 'note', label: 'Ghi chú' },
    ],
    rows: [
      { star: '0s', shards: 160, ky: 0, kyGioiHan: 60, note: 'Thần ma' },
      { star: '1s', shards: 80, ky: 80, kyGioiHan: 100, note: 'Bất kỳ' },
      { star: '2s', shards: 120, ky: 120, kyGioiHan: 160 },
      { star: '3s', shards: 160, ky: 160, kyGioiHan: 220 },
      { star: '4s', shards: 200, ky: 200, kyGioiHan: 260 },
      { star: '5s', shards: 240, ky: 240, kyGioiHan: 320 },
      { star: 'Lục thức 1', shards: 480 },
      { star: 'Lục thức 2', shards: 480 },
      { star: 'Lục thức 3', shards: 480 },
    ],
  },
  {
    id: 'ung-than',
    name: 'Ứng Thần',
    badge: 'Ứng Thần',
    color: 'cyan',
    summaryNote: 'Tổng 0s → 5s: 1,600 mảnh',
    columns: [
      { key: 'star', label: 'Số sao' },
      { key: 'shards', label: 'Số mảnh' },
    ],
    rows: [
      { star: '0s', shards: 160 },
      { star: '1s', shards: 160 },
      { star: '2s', shards: 240 },
      { star: '3s', shards: 320 },
      { star: '4s', shards: 320 },
      { star: '5s', shards: 400 },
    ],
  },
];

export const PHAP_BAO_DATA = [
  { name: 'Pháp Bảo Đỏ', da: '1,291K', phapBao: 758, bac: '30,078K', color: 'red' as const },
  { name: 'Pháp Bảo Kim', da: '2,263K', phapBao: 596, bac: '30,078K', color: 'yellow' as const },
];

export const PHAP_BAO_MAIN_DO = [
  { stage: 'Giai đoạn 1', soTu: 24, soTuDetail: '4×6 = 24', kinhThi: 18 },
  { stage: 'Giai đoạn 2', soTu: 48, soTuDetail: '8×6 = 48', kinhThi: 24 },
  { stage: 'Giai đoạn 3', soTu: 72, soTuDetail: '12×6 = 72', kinhThi: 30 },
];

export const PHAP_BAO_MAIN_KIM = [
  { stage: 'Giai đoạn 1', soTu: 60, kinhThi: 40, phoiKim: 50 },
  { stage: 'Giai đoạn 2', soTu: 120, kinhThi: 60, phoiKim: 100 },
  { stage: 'Giai đoạn 3', soTu: 180, kinhThi: 80, phoiKim: 150 },
];

export const MO_HINH_TIERS = [
  { level: 'Cấp 0 → Cấp 1', cost: 0 },
  { level: 'Cấp 1 → Cấp 2', cost: 1 },
  { level: 'Cấp 2 → Cấp 3', cost: 2 },
  { level: 'Cấp 3 → Cấp 4', cost: 2 },
  { level: 'Cấp 4 → Cấp 5', cost: 2 },
  { level: 'Cấp 5 → Cấp 6', cost: 3 },
  { level: 'Cấp 6 → Cấp 7', cost: 3 },
  { level: 'Cấp 7 → Cấp 8', cost: 3 },
  { level: 'Cấp 8 → Cấp 9', cost: 4 },
  { level: 'Cấp 9 → Cấp 10', cost: 4 },
];

export const LUC_AN_TIERS = [
  { star: '0 Sao', shards: 120, label: 'Bản thể 120 Mảnh' },
  { star: '1 Sao', shards: 120, label: '120 Mảnh' },
  { star: '2 Sao', shards: 200, label: '200 Mảnh' },
  { star: '3 Sao', shards: 240, label: '240 Mảnh' },
  { star: '4 Sao', shards: 240, label: '240 Mảnh' },
  { star: '5 Sao', shards: 280, label: '280 Mảnh' },
];

export const LINH_KY_TIERS = [
  { stage: 'Thức tỉnh', shards: 120, detail: 'Bản thể 120 Mảnh', ngoc: 0 },
  { stage: 'Tích Nguyên', shards: 110, detail: '30+40+40 = 110 Mảnh', ngoc: 2 },
  { stage: 'Uẩn Linh', shards: 130, detail: '40+40+50 = 130 Mảnh', ngoc: 3 },
  { stage: 'Thoát Biến', shards: 160, detail: '50+50+60 = 160 Mảnh', ngoc: 4 },
  { stage: 'Hiển Thánh', shards: 200, detail: '60+60+80 = 200 Mảnh', ngoc: 5 },
];

export const TIEN_TANG_TIERS = [
  { star: 'Bản Thể', shards: 160, thach: 0, phase: 'nang-sao' as const },
  { star: '1 Sao', shards: 160, thach: 0, phase: 'nang-sao' as const },
  { star: '2 Sao', shards: 240, thach: 0, phase: 'nang-sao' as const },
  { star: '3 Sao', shards: 320, thach: 0, phase: 'nang-sao' as const },
  { star: '4 Sao', shards: 400, thach: 0, phase: 'nang-sao' as const },
  { star: '5 Sao', shards: 480, thach: 0, phase: 'nang-sao' as const },
  { star: '6 Sao (Thức Tỉnh Đỏ 1 Sao)', shards: 160, thach: 1, phase: 'thuc-tinh' as const },
  { star: '7 Sao (Thức Tỉnh Đỏ 2 Sao)', shards: 160, thach: 1, phase: 'thuc-tinh' as const },
  { star: '8 Sao (Thức Tỉnh Đỏ 3 Sao)', shards: 160, thach: 1, phase: 'thuc-tinh' as const },
  { star: '9 Sao (Thức Tỉnh Đỏ 4 Sao)', shards: 160, thach: 1, phase: 'thuc-tinh' as const },
  { star: '10 Sao (Thức Tỉnh Đỏ 5 Sao)', shards: 160, thach: 1, phase: 'thuc-tinh' as const },
];

export const TINH_HON_TIERS = [
  { stage: 'Tinh Hồn Thức Tỉnh', tinhPhach: 6, chuHonNghi: 3 },
  { stage: 'Thức Tỉnh 1 Sao', tinhPhach: 2, chuHonNghi: 1 },
  { stage: 'Thức Tỉnh 2 Sao', tinhPhach: 2, chuHonNghi: 1 },
  { stage: 'Thức Tỉnh 3 Sao', tinhPhach: 2, chuHonNghi: 1 },
  { stage: 'Thức Tỉnh 4 Sao', tinhPhach: 4, chuHonNghi: 2 },
  { stage: 'Thức Tỉnh 5 Sao', tinhPhach: 4, chuHonNghi: 2 },
];

export const CHIEN_LINH_TIERS = [
  { menhTinh: 'Bản Thể', mtShards: 120, tinhTran: '—', ttShards: 0, ttDetail: '—' },
  { menhTinh: 'Mệnh Tinh 1', mtShards: 120, tinhTran: 'Tinh Trận 1', ttShards: 120, ttDetail: '6×5 = 30×4 = 120 Mảnh' },
  { menhTinh: 'Mệnh Tinh 2', mtShards: 120, tinhTran: 'Tinh Trận 2', ttShards: 160, ttDetail: '8×5 = 40×4 = 160 Mảnh' },
  { menhTinh: 'Mệnh Tinh 3', mtShards: 120, tinhTran: 'Tinh Trận 3', ttShards: 200, ttDetail: '10×5 = 50×4 = 200 Mảnh' },
  { menhTinh: 'Mệnh Tinh 4', mtShards: 120, tinhTran: 'Tinh Trận 4', ttShards: 240, ttDetail: '12×5 = 60×4 = 240 Mảnh' },
  { menhTinh: 'Mệnh Tinh 5', mtShards: 120, tinhTran: 'Tinh Trận 5', ttShards: 240, ttDetail: '12×5 = 60×4 = 240 Mảnh' },
];

export interface ThienKyGroup {
  id: string;
  category: string;
  skillNames: string;
  color: 'amber' | 'red' | 'rose' | 'yellow';
  columns: { key: string; label: string }[];
  rows: Record<string, string | number>[];
}

export const THIEN_KY_GROUPS: ThienKyGroup[] = [
  {
    id: 'tk-cam',
    category: 'Thiên Kỹ Cam',
    skillNames: 'Thiên kỹ cam',
    color: 'amber',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'cungLoai', label: 'Tướng cùng loại' },
      { key: 'batKy', label: 'Tướng bất kỳ' },
      { key: 'tinhHoa', label: 'Tinh hoa thiên kỹ' },
    ],
    rows: [
      { star: '1s', cungLoai: 80, batKy: '320 mảnh cam', tinhHoa: 0 },
      { star: '2s', cungLoai: 80, batKy: 0, tinhHoa: 2000 },
      { star: '3s', cungLoai: 80, batKy: 0, tinhHoa: 5000 },
      { star: '4s', cungLoai: 80, batKy: 0, tinhHoa: 7400 },
      { star: '5s', cungLoai: 80, batKy: 0, tinhHoa: 14600 },
      { star: '6s', cungLoai: 80, batKy: 0, tinhHoa: 21800 },
    ],
  },
  {
    id: 'tk-do',
    category: 'Thiên Kỹ Đỏ',
    skillNames: 'Thiên kỹ đỏ',
    color: 'red',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'cungLoai', label: 'Tướng cùng loại' },
      { key: 'batKy', label: 'Tướng bất kỳ' },
      { key: 'tinhHoa', label: 'Tinh hoa thiên kỹ' },
    ],
    rows: [
      { star: '1s', cungLoai: 120, batKy: '320 mảnh cam', tinhHoa: 0 },
      { star: '2s', cungLoai: 120, batKy: 0, tinhHoa: 2400 },
      { star: '3s', cungLoai: 120, batKy: 0, tinhHoa: 6200 },
      { star: '4s', cungLoai: 120, batKy: 0, tinhHoa: 9200 },
      { star: '5s', cungLoai: 120, batKy: 0, tinhHoa: 18200 },
      { star: '6s', cungLoai: 120, batKy: 0, tinhHoa: 27200 },
    ],
  },
  {
    id: 'than-kich-cam-1',
    category: 'Thần Kích Cam',
    skillNames: 'Cổ linh tinh quái / Sắc tức thị không',
    color: 'amber',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'camCungLoai', label: 'Cam cùng loại' },
      { key: 'camBatKy', label: 'Cam bất kỳ' },
    ],
    rows: [
      { star: '1s', camCungLoai: 320, camBatKy: 320 },
      { star: '2s', camCungLoai: 320, camBatKy: 400 },
      { star: '3s', camCungLoai: 320, camBatKy: 960 },
      { star: '4s', camCungLoai: 320, camBatKy: 1440 },
      { star: '5s', camCungLoai: 320, camBatKy: 2880 },
      { star: '6s', camCungLoai: 320, camBatKy: 4320 },
    ],
  },
  {
    id: 'than-kich-cam-2',
    category: 'Thần Kích Cam',
    skillNames: 'Thủ hộ giới',
    color: 'amber',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'camCungLoai', label: 'Cam cùng loại' },
      { key: 'camBatKy', label: 'Cam bất kỳ' },
    ],
    rows: [
      { star: '1s', camCungLoai: 240, camBatKy: 320 },
      { star: '2s', camCungLoai: 240, camBatKy: 400 },
      { star: '3s', camCungLoai: 240, camBatKy: 960 },
      { star: '4s', camCungLoai: 240, camBatKy: 1440 },
      { star: '5s', camCungLoai: 240, camBatKy: 2880 },
      { star: '6s', camCungLoai: 240, camBatKy: 4320 },
    ],
  },
  {
    id: 'than-kich-mix-1',
    category: 'Thần Kích Đỏ Mix Cam',
    skillNames: 'Hỏa phụng liêu nguyên',
    color: 'rose',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'doCungLoai', label: 'Đỏ cùng loại' },
      { key: 'camCungLoai', label: 'Cam cùng loại' },
      { key: 'camBatKy', label: 'Cam bất kỳ' },
    ],
    rows: [
      { star: '1s', doCungLoai: 120, camCungLoai: 160, camBatKy: 320 },
      { star: '2s', doCungLoai: 120, camCungLoai: 160, camBatKy: 480 },
      { star: '3s', doCungLoai: 120, camCungLoai: 160, camBatKy: 1200 },
      { star: '4s', doCungLoai: 120, camCungLoai: 160, camBatKy: 1840 },
      { star: '5s', doCungLoai: 120, camCungLoai: 160, camBatKy: 3600 },
      { star: '6s', doCungLoai: 120, camCungLoai: 160, camBatKy: 5440 },
    ],
  },
  {
    id: 'than-kich-mix-2',
    category: 'Thần Kích Đỏ Mix Cam',
    skillNames: 'Trảm yêu trừ ma',
    color: 'rose',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'doCungLoai', label: 'Đỏ cùng loại' },
      { key: 'camCungLoai', label: 'Cam cùng loại' },
      { key: 'camBatKy', label: 'Cam bất kỳ' },
    ],
    rows: [
      { star: '1s', doCungLoai: 120, camCungLoai: 240, camBatKy: 320 },
      { star: '2s', doCungLoai: 120, camCungLoai: 240, camBatKy: 480 },
      { star: '3s', doCungLoai: 120, camCungLoai: 240, camBatKy: 1200 },
      { star: '4s', doCungLoai: 120, camCungLoai: 240, camBatKy: 1840 },
      { star: '5s', doCungLoai: 120, camCungLoai: 240, camBatKy: 3600 },
      { star: '6s', doCungLoai: 120, camCungLoai: 240, camBatKy: 5440 },
    ],
  },
  {
    id: 'than-kich-mix-3',
    category: 'Thần Kích Đỏ Mix Cam',
    skillNames: 'Tiên phát chế nhân / Cường giả',
    color: 'rose',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'doCungLoai', label: 'Đỏ cùng loại' },
      { key: 'camCungLoai', label: 'Cam cùng loại' },
      { key: 'camBatKy', label: 'Cam bất kỳ' },
    ],
    rows: [
      { star: '1s', doCungLoai: 480, camCungLoai: 0, camBatKy: 320 },
      { star: '2s', doCungLoai: 480, camCungLoai: 0, camBatKy: 480 },
      { star: '3s', doCungLoai: 480, camCungLoai: 0, camBatKy: 1200 },
      { star: '4s', doCungLoai: 480, camCungLoai: 0, camBatKy: 1840 },
      { star: '5s', doCungLoai: 480, camCungLoai: 0, camBatKy: 3600 },
      { star: '6s', doCungLoai: 480, camCungLoai: 0, camBatKy: 5440 },
    ],
  },
  {
    id: 'than-kich-do-1',
    category: 'Thần Kích Đỏ',
    skillNames: 'Chí âm chí dương / Cửu hoang ngự linh',
    color: 'red',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'doCungLoai', label: 'Đỏ cùng loại' },
      { key: 'doBatKy', label: 'Đỏ bất kỳ' },
    ],
    rows: [
      { star: '1s', doCungLoai: 480, doBatKy: 480 },
      { star: '2s', doCungLoai: 480, doBatKy: 600 },
      { star: '3s', doCungLoai: 480, doBatKy: 840 },
      { star: '4s', doCungLoai: 480, doBatKy: 1080 },
      { star: '5s', doCungLoai: 480, doBatKy: 1440 },
      { star: '6s', doCungLoai: 480, doBatKy: 1800 },
    ],
  },
  {
    id: 'than-kich-do-2',
    category: 'Thần Kích Đỏ',
    skillNames: 'Hồng liên sương hoa / Liên hoa long ảnh',
    color: 'red',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'doCungLoai', label: 'Đỏ cùng loại' },
      { key: 'doBatKy', label: 'Đỏ bất kỳ' },
    ],
    rows: [
      { star: '1s', doCungLoai: 240, doBatKy: 480 },
      { star: '2s', doCungLoai: 240, doBatKy: 600 },
      { star: '3s', doCungLoai: 240, doBatKy: 840 },
      { star: '4s', doCungLoai: 240, doBatKy: 1080 },
      { star: '5s', doCungLoai: 240, doBatKy: 1440 },
      { star: '6s', doCungLoai: 240, doBatKy: 1800 },
    ],
  },
  {
    id: 'than-kich-do-3',
    category: 'Thần Kích Đỏ',
    skillNames: 'Minh đồ thạch ngữ',
    color: 'red',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'doCungLoai', label: 'Đỏ cùng loại' },
      { key: 'doBatKy', label: 'Đỏ bất kỳ' },
    ],
    rows: [
      { star: '1s', doCungLoai: 360, doBatKy: 480 },
      { star: '2s', doCungLoai: 360, doBatKy: 600 },
      { star: '3s', doCungLoai: 360, doBatKy: 840 },
      { star: '4s', doCungLoai: 360, doBatKy: 1080 },
      { star: '5s', doCungLoai: 360, doBatKy: 1440 },
      { star: '6s', doCungLoai: 360, doBatKy: 1800 },
    ],
  },
  {
    id: 'than-kich-kim-do',
    category: 'Thần Kích Kim Mix Đỏ',
    skillNames: 'Càn khôn định hành / Âm dương nghịch mệnh',
    color: 'yellow',
    columns: [
      { key: 'star', label: 'Sao' },
      { key: 'kimBatKy', label: 'Kim bất kỳ' },
      { key: 'doBatKy', label: 'Đỏ bất kỳ' },
    ],
    rows: [
      { star: '1s', kimBatKy: 160, doBatKy: 480 },
      { star: '2s', kimBatKy: 160, doBatKy: 600 },
      { star: '3s', kimBatKy: 160, doBatKy: 840 },
      { star: '4s', kimBatKy: 160, doBatKy: 1080 },
      { star: '5s', kimBatKy: 160, doBatKy: 1440 },
      { star: '6s', kimBatKy: 160, doBatKy: 1800 },
    ],
  },
];

export const CUU_U_IMAGES = [
  { file: '/images/image13.jpg', title: 'Cửu U Mùa 1 - Ảnh 1' },
  { file: '/images/image4.jpg', title: 'Cửu U Mùa 1 - Ảnh 2' },
  { file: '/images/image15.jpg', title: 'Cửu U Mùa 1 - Ảnh 3' },
  { file: '/images/image16.jpg', title: 'Cửu U Mùa 1 - Ảnh 4' },
  { file: '/images/image7.jpg', title: 'Cửu U Mùa 1 - Ảnh 5' },
  { file: '/images/image6.jpg', title: 'Cửu U Mùa 1 - Ảnh 6' },
  { file: '/images/image11.jpg', title: 'Cửu U Mùa 1 - Ảnh 7' },
  { file: '/images/image8.jpg', title: 'Cửu U Mùa 1 - Ảnh 8' },
  { file: '/images/image10.jpg', title: 'Cửu U Mùa 1 - Ảnh 9' },
  { file: '/images/image5.jpg', title: 'Cửu U Mùa 1 - Ảnh 10' },
  { file: '/images/image9.png', title: 'Cửu U Mùa 1 - Tổng Quan' },
];

export const EV_SINH_NHAT_IMAGES = [
  { file: '/images/image14.jpg', title: 'Ev Sinh Nhật - Bảng 1' },
  { file: '/images/image12.jpg', title: 'Ev Sinh Nhật - Bảng 2' },
  { file: '/images/image17.jpg', title: 'Ev Sinh Nhật - Bảng 3' },
];

export interface HoanTuPack {
  lb: number;
  tickets: number;
  defaultQty: number;
}

export interface HoanTuKimTieuConfig {
  anhDang: {
    freeTickets: number;
    pack98Lb: number;
    pack98Tickets: number;
  };
  quaKimTieu: {
    daysTickets: number;
    bonus5DaysTickets: number;
    dauDo: number;
    totalLb: number;
  };
  tamVi: {
    caNhanTickets: number;
    caNhanManh: string;
    tongMonTickets: number;
    tongMonManh: string;
  };
  baoThiPacks: HoanTuPack[];
}

export const HOAN_TU_KIM_TIEU_DATA: HoanTuKimTieuConfig = {
  anhDang: {
    freeTickets: 30,
    pack98Lb: 98,
    pack98Tickets: 80,
  },
  quaKimTieu: {
    daysTickets: 15,
    bonus5DaysTickets: 5,
    dauDo: 15,
    totalLb: 30,
  },
  tamVi: {
    caNhanTickets: 32,
    caNhanManh: '15 mảnh kim năm tỵ',
    tongMonTickets: 42,
    tongMonManh: '25 mảnh kim năm tỵ',
  },
  baoThiPacks: [
    { lb: 6, tickets: 5, defaultQty: 1 },
    { lb: 30, tickets: 20, defaultQty: 1 },
    { lb: 98, tickets: 50, defaultQty: 2 },
    { lb: 198, tickets: 80, defaultQty: 3 },
    { lb: 328, tickets: 120, defaultQty: 3 },
    { lb: 648, tickets: 200, defaultQty: 0 },
  ],
};

export const MANH_HA_HOAN_TRA = [
  { moc: 0, xuDienVi: 0, xuPhuongLuu: 0 },
  { moc: 188, xuDienVi: 800, xuPhuongLuu: 100 },
  { moc: 388, xuDienVi: 1200, xuPhuongLuu: 150 },
  { moc: 888, xuDienVi: 2400, xuPhuongLuu: 300 },
  { moc: 1888, xuDienVi: 5600, xuPhuongLuu: 700 },
  { moc: 2888, xuDienVi: 5600, xuPhuongLuu: 700 },
  { moc: 3888, xuDienVi: 6400, xuPhuongLuu: 800 },
  { moc: 4888, xuDienVi: 6400, xuPhuongLuu: 800 },
  { moc: 5888, xuDienVi: 7200, xuPhuongLuu: 900 },
  { moc: 6888, xuDienVi: 7200, xuPhuongLuu: 900 },
  { moc: 7888, xuDienVi: 8000, xuPhuongLuu: 1000 },
  { moc: 8888, xuDienVi: 8000, xuPhuongLuu: 1000 },
];

export const MANH_HA_SAT_CANH = [
  { moc: 0, hat: 0, manh: 0, gia: 0, donVi: '-' },
  { moc: 100, hat: 1, manh: 5, gia: 0, donVi: 'Miễn phí' },
  { moc: 200, hat: 1, manh: 5, gia: 300, donVi: 'Vàng' },
  { moc: 400, hat: 1, manh: 5, gia: 30, donVi: 'Tiên ngọc' },
  { moc: 600, hat: 1, manh: 5, gia: 30, donVi: 'Tiên ngọc' },
  { moc: 800, hat: 2, manh: 10, gia: 30, donVi: 'Lục bảo' },
  { moc: 1000, hat: 2, manh: 10, gia: 30, donVi: 'Lục bảo' },
  { moc: 1500, hat: 2, manh: 10, gia: 30, donVi: 'Lục bảo' },
  { moc: 2000, hat: 2, manh: 10, gia: 30, donVi: 'Lục bảo' },
  { moc: 2500, hat: 2, manh: 20, gia: 30, donVi: 'Lục bảo' },
  { moc: 3000, hat: 2, manh: 20, gia: 30, donVi: 'Lục bảo' },
  { moc: 3500, hat: 2, manh: 30, gia: 30, donVi: 'Lục bảo' },
  { moc: 4000, hat: 2, manh: 30, gia: 30, donVi: 'Lục bảo' },
];
