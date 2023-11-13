export enum CategoryNames {
  politics = 'politics',
  sport = 'sport',
  tech = 'tech',
  fashion = 'fashion',
  other = 'other',
}

export interface Category {
  id: number;
  name: CategoryNames;
}
