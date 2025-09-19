import { setWorldConstructor, World } from "@cucumber/cucumber";
import { test as baseTest } from "@playwright/test";

class CustomWorld extends World {
  page: any;

  constructor({ attach, parameters }: any) {
    super({ attach, parameters });
    this.page = baseTest.page;
  }
}

setWorldConstructor(CustomWorld);
