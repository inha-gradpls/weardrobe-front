const DAY = 86400000;
const HOUR = 3600000;
const MINUTE = 60000;

export function tsToDeltaStr(ts: string) {
  const date = new Date(ts);
  const diff = new Date().getTime() - date.getTime();
  if (diff >= DAY) return `${Math.floor(diff / DAY)}일 전`;
  if (diff >= HOUR) return `${Math.floor(diff / HOUR)}시간 전`;
  if (diff >= MINUTE) return `${Math.floor(diff / MINUTE)}분 전`;
  return `방금전`;
}
