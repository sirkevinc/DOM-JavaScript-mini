class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.element = element;
  }

  select() {
    // should use classList
    this.element.classList.add('Tabs__item-selected');
  }

  deselect() {
    // should use classList
    this.element.classList.remove('Tabs__item-selected');
  }
}

class TabLink {
  constructor(element) {
    this.element = element;// attach dom element to object
    this.tabItem = this.getTab(this.element.dataset.tab);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.tabItem);// reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem

  };

  select() {
    // select this link
    this.element.classList.add('Tabs__link-selected');
    // select the associated tab
    this.tabItem.select();
  }

  deselect() {
    // deselect this link
    this.element.classList.remove('Tabs__link-selected');
    // deselect the associated tab
    this.tabItem.deselect();
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.parentNode.parentNode.querySelector(`.Tabs__item[data-tab="${data}"]`);
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
        const linkOBJ = new TabLink(link);
        link.addEventListener('click', () => {
          this.updateActive(linkOBJ);
          linkOBJ.select();
        })
        return linkOBJ;
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select();
  }

  updateActive(newActive) {
    // deselect the old active link
    // assign the new active link
    this.activeLink.deselect();
    this.activeLink = newActive;
  }
}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
