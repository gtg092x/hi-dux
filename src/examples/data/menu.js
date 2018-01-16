export const SANDWICHES = [
  {id: 'country', name: 'Country', color: '#60ba46', image: 'http://blogs.kcrw.com/goodfood/wp-content/uploads/2016/07/Howlin-Rays-Country-Fried-Chicken-Potato-Salad.jpg' },
  {id: 'mild', name: 'Mild', color: '#abbe39', image: 'http://blogs.kcrw.com/goodfood/wp-content/uploads/2016/07/Howlin-Rays-Chicken-Sandwich.jpg' },
  {id: 'medium', name: 'Medium', color: '#dfbc29', image: 'http://www.trbimg.com/img-5776a947/turbine/la-fo-gold-howlin-rays-photos-20160630-001' },
  {id: 'hot', name: 'Hot', color: '#f7a723', image: 'https://uz71pyzpz0-flywheel.netdna-ssl.com/wp-content/uploads/2016/11/howling-rays.jpg' },
  {id: 'xhot', name: 'X-Hot', color: '#f47523', image: 'http://theoffalo.com/wp-content/uploads/2015/07/howlinrays.jpg' },
  {id: 'howlin', name: 'Howlin!', color: '#ff1312', image: 'https://uz71pyzpz0-flywheel.netdna-ssl.com/wp-content/uploads/2016/11/howling-rays-4.jpg' },
];

export const DEFAULT_INVENTORY = SANDWICHES.reduce((memo, sand) => ({
  ...memo,
  [sand.id]: 5,
}), {});
