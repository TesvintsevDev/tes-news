import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './HomePage.css';
import { categoryIds } from '@features/categories/constants';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { Title } from '@components/Title/Title';
import { PartnerArticle } from '@features/partnersArticles/components/PartnerArticle/PartnerArticle';
import { fetchNews, fetchTrends } from '@features/articlesList/actions';
import { Dispatch } from '@app/store';
import { getNews, getTrends } from '@features/articlesList/selectors';
import { fetchCategoryArticles } from '@features/categoryArticles/actions';
import { getCategoryNews } from '@features/categoryArticles/selectors';
import { getCategories } from '@features/categories/selectors';
import { getSources } from '@features/sources/selectors';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { repeat } from '@app/utils';
import { useAdaptive } from '@app/hooks';

export const HomePage: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const articles = useSelector(getNews);
  const trendArticles = useSelector(getTrends);
  const techArticles = useSelector(getCategoryNews(categoryIds['tech']));
  const categories = useSelector(getCategories);
  const sources = useSelector(getSources);
  const [loading, setLoading] = useState(true);
  const { isDesktop, isMobile } = useAdaptive();

  React.useEffect(() => {
    setLoading(true);
    Promise.all([
      dispatch(fetchNews()),
      dispatch(fetchTrends()),
      dispatch(fetchCategoryArticles(categoryIds['tech'])),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="home-page">
        <div className="home-page__hero-link">
          <HeroSkeleton className="home-page__hero" hasText={true} />
        </div>
        <section className="container home-page__section">
          <Title Component="h2" className="home-page__title">
            В тренде
          </Title>
          <div className="grid">
            {repeat((i) => {
              return (
                <ArticleCardSkeleton
                  key={i}
                  className="home-page__trends-item"
                  hasImage={false}
                  hasDescription={false}
                />
              );
            }, 6)}
          </div>
        </section>
        <section className="container home-page__section">
          <Title Component="h2" className="home-page__title">
            Технологии
          </Title>
          <div className="grid">
            <section className="home-page__content">
              {repeat((i) => {
                return <ArticleCardSkeleton key={i} className="home-page__article-card" />;
              }, 4)}
            </section>
            <section className="home-page__sidebar">
              {repeat((i) => {
                return <SidebarArticleCardSkeleton key={i} className="home-page__sidebar-item" />;
              }, 2)}
            </section>
          </div>
        </section>
      </div>
    );
  }

  const firstArticle = articles[0];
  const mainArticles = isMobile ? articles.slice(1) : articles.slice(4);

  return (
    <div className="home-page">
      {firstArticle && (
        <Link className="home-page__hero-link" to={`/article/${firstArticle.id}`}>
          <Hero
            className="home-page__hero"
            image={firstArticle.image}
            title={firstArticle.title}
            text={firstArticle.description}
          />
        </Link>
      )}
      <section className="container home-page__section">
        <Title Component="h2" className="home-page__title">
          В тренде
        </Title>
        <div className="grid">
          {trendArticles.map(({ id, title, category_id, source_id, date }) => {
            const category = categories[category_id];
            const source = sources.find(({ id }) => source_id === id);

            return (
              <ArticleCard
                className="home-page__trends-item"
                id={id}
                title={title}
                key={id}
                category={category?.name}
                source={source?.name}
                date={date}
              />
            );
          })}
        </div>
      </section>
      <section className="container home-page__section">
        <Title Component="h2" className="home-page__title">
          Технологии
        </Title>
        <div className="grid">
          <section className="home-page__content">
            {techArticles.slice(2, 6).map((item) => {
              return (
                <ArticleCard
                  className="home-page__article-card"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  source={sources[item.source_id]?.name}
                  date={item.date}
                  image={item.image}
                />
              );
            })}
          </section>
          <section className="home-page__sidebar">
            {techArticles.slice(0, 2).map((item) => {
              return (
                <SidebarArticleCard
                  className="home-page__sidebar-item"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  source={sources[item.source_id]?.name}
                  date={item.date}
                  image={item.image}
                />
              );
            })}
          </section>
        </div>
      </section>
      <div className="home-page__promo">
        <PartnerArticle />
      </div>
      <section className="container grid home-page__section">
        <section className="home-page__content">
          {mainArticles.map((item) => {
            const source = sources.find(({ id }) => item.source_id === id);

            return (
              <ArticleCard
                className="home-page__article-card"
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                source={source?.name}
                date={item.date}
                image={item.image}
              />
            );
          })}
        </section>
        {isDesktop && (
          <section className="home-page__sidebar">
            {articles.slice(1, 4).map((item) => {
              const source = sources.find(({ id }) => item.source_id === id);

              return (
                <SidebarArticleCard
                  className="home-page__sidebar-item"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  source={source?.name || ''}
                  date={item.date}
                  image={item.image}
                />
              );
            })}
          </section>
        )}
      </section>
    </div>
  );
};