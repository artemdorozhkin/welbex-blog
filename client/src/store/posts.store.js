import { makeAutoObservable } from "mobx";

export default class PostsStore {
  constructor() {
    this._posts = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 20;
    makeAutoObservable(this);
  }

  setPosts(posts) {
    this._posts = posts;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setLimit(limit) {
    this._limit = limit;
  }

  get posts() {
    return this._posts;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
  get totalCount() {
    return this._totalCount;
  }
}
