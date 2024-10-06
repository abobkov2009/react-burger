import * as selectors from "./selectors";

const localURL = "http://localhost:3000";

describe("Тест перетаскивания компонентов", () => {
  beforeEach(() => {
    cy.intercept("GET", "/ingredients", { fixture: "ingredients.json" })
    cy.intercept("GET", "/api/auth/user", { fixture: "user.json" })
    cy.intercept("POST", "/api/orders", { fixture: "orders.json" })

    window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));
    window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"));
  });


  it("Перетащим в конструктор по одному ингредиенту каждого типа, а потом заменим булку", () => {
    cy.visit(localURL);

    cy.get(selectors.burgerConstructorContainer).as('burgerConstructor')
    cy.get(selectors.bunIngredientCard).first().as('bunIngredient')
    cy.get(selectors.sauceIngredientCard).first().as('sauceIngredient')
    cy.get(selectors.mainIngredientCard).first().as('mainIngredient')


    cy.get(selectors.topBunInConstructor).first().as('topBun')
    cy.get(selectors.bottomBunInConstructor).first().as('bottomBun')

    //Найдем название первой булки
    let bun_name;
    cy.get('@bunIngredient')
      .find(selectors.nameInIngredientCard)
      .invoke('text')
      .then((text) => { bun_name = text; });
    //Перетащим булку в конструктор
    cy.get('@bunIngredient').trigger('dragstart');
    cy.get('@burgerConstructor').trigger('drop');

    //В конструкторе теперь должно быть 2 булки
    cy.get('@topBun').within(() => {
      cy.get('span').contains(bun_name).should('exist');
    });
    cy.get('@bottomBun').within(() => {
      cy.get('span').contains(bun_name).should('exist');
    });

    //Найдем название первого соуса
    let sauce_name;
    cy.get('@sauceIngredient')
      .find(selectors.nameInIngredientCard)
      .invoke('text')
      .then((text) => { sauce_name = text; });
    //Перетащим соус в конструктор
    cy.get('@sauceIngredient').trigger('dragstart');
    cy.get('@burgerConstructor').trigger('drop');

    //В конструкторе теперь должна быть 1 ингредиент
    cy.get(selectors.stuffingInConstructor)
      .its('length')
      .should('eq', 1);

    //В конструкторе теперь должен быть ингредиент с названием соуса
    cy.get(selectors.stuffingInConstructor)
      .first()
      .within(() => {
        cy.get('span').contains(sauce_name).should('exist');
      });

    //Найдем название первой начинки
    let main_name;
    cy.get('@mainIngredient')
      .find(selectors.nameInIngredientCard)
      .invoke('text')
      .then((text) => { main_name = text; });
    //Перетащим начинку в конструктор
    cy.get('@mainIngredient').trigger('dragstart');
    cy.get('@burgerConstructor').trigger('drop');
    //В конструкторе теперь должно быть 2 ингредиента
    cy.get(selectors.stuffingInConstructor)
      .its('length')
      .should('eq', 2);

    //В конструкторе теперь должен быть ингредиент с названием начинки
    cy.get(selectors.stuffingInConstructor)
      .last()
      .within(() => {
        cy.get('span').contains(main_name).should('exist');
      });

    //Найдем название второй булки
    cy.get(selectors.bunIngredientCard).last().as('secondBun')
    let second_bun_name;
    cy.get('@secondBun')
      .find(selectors.nameInIngredientCard)
      .invoke('text')
      .then((text) => { second_bun_name = text; });
    //Перетащим булку в конструктор
    cy.get('@secondBun').trigger('dragstart');
    cy.get('@burgerConstructor').trigger('drop');

    //В конструкторе теперь должна остаться только вторая булка
    cy.get('@topBun').within(() => {
      cy.get('span').contains(second_bun_name).should('exist');
    });
    cy.get('@bottomBun').within(() => {
      cy.get('span').contains(second_bun_name).should('exist');
    });

    //Нажмем на кнопку оформления заказа
    cy.get(selectors.submitOrderButton)
      .click();
    //Проверяем что модальное окно открыто
    cy.get(selectors.modalContainer).should("be.visible");

    //Проверяем номер заказа
    cy.get(selectors.orderNumber).should("be.visible");
    cy.get(selectors.orderNumber)
      .invoke('text')
      .then((text) => { expect(text).to.equal("55204"); });

    //Закроем модальное окно с заказом
    cy.get(selectors.modalCloseButton)
      .click();

    //Окно должно закрыться
    cy.get(selectors.modalContainer).should("not.exist");
    //Конструктор должен очиститься
    cy.get(selectors.stuffingInConstructor).should("not.exist");
    cy.get('@topBun').within(() => {
      cy.get('span').contains("Добавьте булку").should('exist');
    });
    cy.get('@bottomBun').within(() => {
      cy.get('span').contains("Добавьте булку").should('exist');
    });
  });

  it("Проверка модалки ингредиента", () => {
    cy.visit(localURL);

    cy.get(selectors.bunIngredientCard).first().as('bunIngredient')

    //Найдем название первой булки
    let bun_name;
    cy.get('@bunIngredient')
      .find(selectors.nameInIngredientCard)
      .invoke('text')
      .then((text) => { bun_name = text; });

    //Нажмем на неё
    cy.get('@bunIngredient')
      .trigger("click");

    //Проверяем что модальное окно открыто
    cy.get(selectors.modalContainer).should("be.visible");

    //Проверяем название ингредиента
    cy.get(selectors.ingredientDetailsName).should("be.visible");
    cy.get(selectors.ingredientDetailsName)
      .invoke('text')
      .then((text) => { expect(text).to.equal(bun_name); });

    //Закроем модальное окно кнопкой
    cy.get(selectors.modalCloseButton)
      .click();
    //Окно должно закрыться
    cy.get(selectors.modalContainer).should("not.exist");

    //Нажмем на булку снова
    cy.get('@bunIngredient')
      .trigger("click");
    //Проверяем что модальное окно открыто
    cy.get(selectors.modalContainer).should("be.visible");
    //Нажимаем Escape
    cy.get('body').type('{esc}');
    //Окно должно закрыться
    cy.get(selectors.modalContainer).should("not.exist");

    //Нажмем на булку снова
    cy.get('@bunIngredient')
      .trigger("click");
    //Проверяем что модальное окно открыто
    cy.get(selectors.modalContainer).should("be.visible");
    //Нажимаем куда-нибудь мимо модального окна
    cy.get(selectors.modalOverlay)
      .trigger("click", { force: true });
    //Окно должно закрыться
    cy.get(selectors.modalContainer).should("not.exist");

  });
});