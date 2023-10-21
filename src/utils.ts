export const categoryIds: { [index: string]: number } = {
  index: 0,
  fashion: 3,
  technologies: 1,
  politics: 4,
  sport: 2,
};

export const categoryNames: { [index: string]: string } = {
  index: 'Главная',
  fashion: 'Мода',
  technologies: 'Технологии',
  politics: 'Политика',
  sport: 'Спорт',
};

export const beautifyDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};
