import React from "react";
import { Route, Switch } from "react-router-dom";
import { Component404, PageWrapper } from "../components";
import {
  BacaKomik,
  DetailKomik,
  GenreKomik,
  Home,
  KomikPage,
  SearchKomik,
} from "../views";
const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <PageWrapper>
          <Home />
        </PageWrapper>
        {/* <Home /> */}
      </Route>

      <Route exact path="/komik/:page">
        <PageWrapper>
          <KomikPage
            title="Daftar Manga"
            endpoint="manga/page"
            keyword="all"
            reactPath="komik"
          />
        </PageWrapper>
      </Route>

      <Route exact path="/genre/:genre/:page">
        <PageWrapper>
          <GenreKomik />
        </PageWrapper>
      </Route>

      <Route exact path="/popular/:page">
        <PageWrapper>
          <KomikPage
            title="Manga Populer"
            endpoint="manga/popular"
            keyword="popular"
            reactPath="popular"
          />
        </PageWrapper>
      </Route>

      <Route exact path="/manhwa/:page">
        <PageWrapper>
          <KomikPage
            title="Daftar Manhwa"
            endpoint="manhwa"
            keyword="all"
            reactPath="manhwa"
          />
        </PageWrapper>
      </Route>

      <Route exact path="/manhua/:page">
        <PageWrapper>
          <KomikPage
            title="Daftar Manhua"
            endpoint="manhua"
            keyword="all"
            reactPath="manhua"
          />
        </PageWrapper>
      </Route>

      <Route exact path="/detail/:slug">
        <PageWrapper>
          <DetailKomik />
        </PageWrapper>
      </Route>
      <Route exact path="/read/:slug">
        <PageWrapper>
          <BacaKomik />
        </PageWrapper>
      </Route>

      <Route exact path="/search/:query">
        <PageWrapper>
          <SearchKomik />
        </PageWrapper>
      </Route>

      <Route path="*">
        <PageWrapper>
          <Component404 />
        </PageWrapper>
      </Route>
    </Switch>
  );
};

export default Router;
