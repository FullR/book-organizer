import {observable, computed, action} from "mobx";

export default class Store {
  @observable count = 0;

  @action increment(amount=1) {
    this.count += amount;
  }

  @action decrement(amount=1) {
    this.count -= amount;
  }
}
