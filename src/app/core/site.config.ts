export interface DayHours {
  day: string;
  short: string;
  open: number;
  close: number;
}

// Index matches Date#getDay(): 0 = Sunday.
export const HOURS: DayHours[] = [
  { day: 'Sunday', short: 'Sun', open: 11, close: 20 },
  { day: 'Monday', short: 'Mon', open: 11, close: 21 },
  { day: 'Tuesday', short: 'Tue', open: 11, close: 21 },
  { day: 'Wednesday', short: 'Wed', open: 11, close: 21 },
  { day: 'Thursday', short: 'Thu', open: 11, close: 21 },
  { day: 'Friday', short: 'Fri', open: 11, close: 22 },
  { day: 'Saturday', short: 'Sat', open: 11, close: 22 },
];

const ADDRESS_QUERY = encodeURIComponent("Tony's Pizza & Subs, 538 Turnersburg Hwy Suite D, Statesville, NC 28625");

export const SITE = {
  name: "Tony's Pizza & Subs",
  phone: '(704) 380-4544',
  phoneHref: 'tel:+17043804544',
  street: '538 Turnersburg Hwy, Suite D',
  cityLine: 'Statesville, NC 28625',
  timeZone: 'America/New_York',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`,
  // Set to a form-handling endpoint (Formspree, Netlify, own API) to deliver submissions.
  formEndpoint: '',
  order: {
    url: 'https://tonys-pizza-statesville.cloveronline.com/',
  },
};

export function formatHour(h: number): string {
  return `${h % 12 || 12} ${h < 12 ? 'AM' : 'PM'}`;
}
