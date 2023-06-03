import AbstractView from '../framework/view/abstract-view.js';
import { FilterTypes, DEFAULT_FILTER_TYPE } from '../constants.js';

const getDisabledAttr = (filteredEvents, filterType) => filteredEvents.find((element) => element.type === filterType).count === 0 ? 'disabled' : '';
const getCheckedAttr = (filterType, currentFilterType) => filterType === currentFilterType ? 'checked' : '';

function createFiltersTemplate(filteredEvents, currentFilterType) {
  const filterList = Object.values(FilterTypes).map((filterType) => {

    const disabledAttr = getDisabledAttr(filteredEvents, filterType);
    const checkedAttr = getCheckedAttr(filterType, currentFilterType);

    return `<div class="trip-filters__filter">
              <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
              value="${filterType}" ${disabledAttr} ${checkedAttr}>
              <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
            </div>`;
  }).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterList}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends AbstractView {
  #currentFilterType = null;
  #filteredEvents = null;

  constructor(filteredEvents, currentFilterType = DEFAULT_FILTER_TYPE){
    super();
    this.#filteredEvents = filteredEvents;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFiltersTemplate(this.#filteredEvents, this.#currentFilterType);
  }
}
