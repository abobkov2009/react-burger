import * as selectors from "./selectors";

describe("Тест перетаскивания компонентов", () => {
  beforeEach(() => {
    cy.intercept("GET", "/ingredients", { fixture: "ingredients.json" })
    cy.intercept("GET", "/api/auth/user", { fixture: "user.json" })
    cy.intercept("POST", "/api/orders", { fixture: "orders.json" })

    window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));
    window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"));
  });


  it("Перетащим в конструктор по одному ингредиенту каждого типа, а потом заменим булку", () => {
    cy.visit('/');

    cy.getBySel(selectors.burgerConstructorContainer).as('burgerConstructor')
    cy.getBySel(selectors.bunIngredientCard).first().as('bunIngredient')
    cy.getBySel(selectors.sauceIngredientCard).first().as('sauceIngredient')
    cy.getBySel(selectors.mainIngredientCard).first().as('mainIngredient')


    cy.getBySel(selectors.topBunInConstructor).first().as('topBun')
    cy.getBySel(selectors.bottomBunInConstructor).first().as('bottomBun')

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
    cy.getBySel(selectors.stuffingInConstructor)
      .its('length')
      .should('eq', 1);

    //В конструкторе теперь должен быть ингредиент с названием соуса
    cy.getBySel(selectors.stuffingInConstructor)
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
    cy.getBySel(selectors.stuffingInConstructor)
      .its('length')
      .should('eq', 2);

    //В конструкторе теперь должен быть ингредиент с названием начинки
    cy.getBySel(selectors.stuffingInConstructor)
      .last()
      .within(() => {
        cy.get('span').contains(main_name).should('exist');
      });

    //Найдем название второй булки
    cy.getBySel(selectors.bunIngredientCard).last().as('secondBun')
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
    cy.getBySel(selectors.submitOrderButton)
      .click();
    //Проверяем что модальное окно открыто
    cy.getBySel(selectors.modalContainer).should("be.visible");

    //Проверяем номер заказа
    cy.getBySel(selectors.orderNumber).should("be.visible");
    cy.getBySel(selectors.orderNumber)
      .invoke('text')
      .then((text) => { expect(text).to.equal("55204"); });

    //Закроем модальное окно с заказом
    cy.getBySel(selectors.modalCloseButton)
      .click();

    //Окно должно закрыться
    cy.getBySel(selectors.modalContainer).should("not.exist");
    //Конструктор должен очиститься
    cy.getBySel(selectors.stuffingInConstructor).should("not.exist");
    cy.get('@topBun').within(() => {
      cy.get('span').contains("Добавьте булку").should('exist');
    });
    cy.get('@bottomBun').within(() => {
      cy.get('span').contains("Добавьте булку").should('exist');
    });
  });

  it("Проверка модалки ингредиента", () => {
    cy.visit('/');

    cy.getBySel(selectors.bunIngredientCard).first().as('bunIngredient')

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
    cy.getBySel(selectors.modalContainer).should("be.visible");

    //Проверяем название ингредиента
    cy.getBySel(selectors.ingredientDetailsName)
      .should("be.visible")
      .invoke('text')
      .then((text) => { expect(text).to.equal(bun_name); });

    //Закроем модальное окно кнопкой
    cy.getBySel(selectors.modalCloseButton)
      .click();
    //Окно должно закрыться
    cy.getBySel(selectors.modalContainer).should("not.exist");

    //Нажмем на булку снова
    cy.get('@bunIngredient')
      .trigger("click");
    //Проверяем что модальное окно открыто
    cy.getBySel(selectors.modalContainer).should("be.visible");
    //Нажимаем Escape
    cy.get('body').type('{esc}');
    //Окно должно закрыться
    cy.getBySel(selectors.modalContainer).should("not.exist");

    //Нажмем на булку снова
    cy.get('@bunIngredient')
      .trigger("click");
    //Проверяем что модальное окно открыто
    cy.getBySel(selectors.modalContainer).should("be.visible");
    //Нажимаем куда-нибудь мимо модального окна
    cy.getBySel(selectors.modalOverlay)
      .trigger("click", { force: true });
    //Окно должно закрыться
    cy.getBySel(selectors.modalContainer).should("not.exist");

  });
});