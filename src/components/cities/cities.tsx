import Card from '../card/card';
import { OfferPreviewType } from '../../types/offer-preview';
import {CitiesLocation} from '../../common/const';
import { useState } from 'react';
import Map from '../map/map';

type CitiesProps = {
  offers: OfferPreviewType[];
}

function Cities({offers}: CitiesProps): JSX.Element {
  const [hoverOfferId, setHoverOfferId] = useState<
    OfferPreviewType['id'] | null
  >(null);
  const activeCity = CitiesLocation.Amsterdam;

  function handleCardHover(offerId: OfferPreviewType['id'] | null) {
    setHoverOfferId(offerId);
  }
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{ offers.length } places to stay in {activeCity.name}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
        Popular
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <Card
                key={offer.id}
                offer={offer}
                block="cities"
                onCardHover={handleCardHover}
              />))}
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              location={activeCity.location}
              block='cities'
              offers={offers}
              specialOfferId={hoverOfferId}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cities;
