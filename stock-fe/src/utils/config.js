// 就.env再包一層，做預設值更保險，可以對API做分類

export const API_URL =
  (process.env.REACT_APP_API_URL || "http://localhost:3002") + "/api";

export const IMAGE_URL =
  (process.env.REACT_APP_API_URL || "http://localhost:3002") + "/images";