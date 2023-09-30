import { categoryIds } from "../../utils";

import { Navigation } from "../Navigation/Navigation";

import { Articles } from "../Articles/Articles";

import React from "react";

import "./App.css";

import { ArticleItem } from "../ArticleItem/ArticleItem";

import { NewsAPI } from "../../types";

export const App = () => {
  const [articleId, setArticleId] = React.useState<number | null>(null);

  const [category, setCategory] = React.useState("index");

  const [articles, setArticles] = React.useState<NewsAPI>({
    items: [],
    categories: [],
    sources: []
  });

  const onNavClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setArticleId(null);

    const category = e.currentTarget.dataset.href;

    if (category) {
      setCategory(category);
    }
  };

  const onArticleClick = (id: number) => {
    setArticleId(id);
  };

  React.useEffect(() => {
    // @ts-ignore
    fetch("https://frontend.karpovcourses.net/api/v2/ru/news/" + categoryIds[category] || "")
      .then((response) => response.json())

      .then((response: NewsAPI) => {
        setArticles(response);
      });
  }, [category]);

  return (
    <React.Fragment>
      <header className='header'>
        <div className='container'>
          <Navigation
            placement='header'
            className='header__navigation'
            onNavClick={onNavClick}
            currentCategory={category}
          />
        </div>
      </header>

      <main>
        {articleId !== null ? (
          <ArticleItem
            id={articleId}
            categories={articles.categories}
            sources={articles.sources}
            onArticleClick={onArticleClick}
          />
        ) : (
          <Articles articles={articles} onArticleClick={onArticleClick} />
        )}
      </main>

      <footer className='footer'>
        <div className='container'>
          <Navigation
            placement='footer'
            onNavClick={onNavClick}
            currentCategory={category}
            className='footer__navigation'
          />

          <div className='footer__bottom'>
            <p className='footer__text'>
              Проект разработан{" "}
              <a href='https://tesvintsevDev.github.io' target='_blank' className='footer__link'>
                TES.inc{" "}
              </a>
              при поддержке{" "}
              <a href='https://karpov.courses/frontend' target='_blank' className='footer__link'>
                Karpov.Courses
              </a>
            </p>
            <p className='footer__copyright footer__text--gray'>© 2023</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
