import { CategoryNames } from './types';

export const categoryIds: Record<CategoryNames, number> = {
  sport: 2,
  tech: 1,
  fashion: 3,
  other: 5,
  politics: 4,
};

export const categoryTitles: Record<CategoryNames, string> = {
  fashion: 'Мода',
  tech: 'Технологии',
  sport: 'Спорт',
  other: 'Прочее',
  politics: 'Политика',
};

export const beautifyDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};
