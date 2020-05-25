import React from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Error404 from './Error404';
import mapboxgl from 'mapbox-gl';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

class SingleTour extends React.Component {
  state = {
    tour: null,
    err: '',
    isFetching: true,
  };

  componentDidMount() {
    this.getTour(`${this.props.match.params.slug}`);
  }
  getTour = async (slug) => {
    const res = await axios({
      method: 'GET',
      url: `/overview/${slug}`,
      withCredentials: true,
    });

    if (res.data.data.data !== null) {
      this.setState({
        ...this.state,
        tour: res.data.data.data,
        isFetching: false,
      });
      this.displayMap(this.state.tour.locations);
    } else {
      this.setState({
        tour: null,
        err: 'There is no tour with that name',
        isFetching: false,
      });
    }
  };

  bookTour = async (e) => {
    e.target.textContent = 'Processing...';
    const { id: tourId } = this.state.tour;
    const stripe = await loadStripe(
      'pk_test_ULzmrcSKin5oGO6QuDsJ7X3u00OJ19Lm3h'
    );

    try {
      //get checkout session from api
      const session = await axios({
        method: 'GET',
        url: `/api/v1/bookings/checkout-session/${tourId}`,
        withCredentials: true,
      });

      //create checkout form + charge credit card
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  displayMap = (locations) => {
    if (locations)
      mapboxgl.accessToken =
        'pk.eyJ1IjoiaWFtc3V6ZWV0IiwiYSI6ImNrOXo2ZzcxajA0bXczbHBlamZ6ZTk2dzMifQ.V1v_-szCYZPBptnP0gFheA';

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/iamsuzeet/ck9z6m4dq0ct41ipcs66rx5xu',
      scrollZoom: false,
      // center: [-118.113491, 34.111745],
      // zoom: 10,
      // interactive: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
      //Create marker
      const el = document.createElement('div');
      el.className = 'marker';

      // Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      //Add popup
      new mapboxgl.Popup({
        offset: 30,
      })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

      //extend map bounds to include current location
      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  };

  headingBoxDetail = (content, icon) => {
    return (
      <div className="heading-box__detail">
        <svg className="heading-box__icon">
          <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
        </svg>
        <div className="span heading-box__text">{content}</div>
      </div>
    );
  };

  overviewBox = (label, data, icon) => {
    return (
      <div className="overview-box__detail">
        <svg className="overview-box__icon">
          <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
        </svg>
        <span className="overview-box__label">{label}</span>
        <span className="overview-box__text">{data}</span>
      </div>
    );
  };

  tourGuides = (photo, name, role) => {
    return (
      <div className="overview-box__detail" key={name}>
        <img
          src={`/img/users/${photo}`}
          alt={`${name}`}
          className="overview-box__img"
        />
        <span className="overview-box__label">{role.replace('-', ' ')}</span>
        <span className="overview-box__text">{name}</span>
      </div>
    );
  };

  pictureBox = (image, name, index) => {
    return (
      <div className="picture-box" key={index}>
        <img
          src={`/img/tours/${image}`}
          alt={`${name} ${index + 1}`}
          className="picture-box__img picture-box__img--1"
        />
      </div>
    );
  };

  reviewCard = (review, i) => {
    return (
      <div className="reviews__card" key={i}>
        <div className="reviews__avatar">
          <img
            src={`/img/users/${review.user.photo}`}
            alt={`${review.user.name}`}
            className="reviews__avatar-img"
          />
          <h6 className="reviews__user">{review.user.name}</h6>
        </div>
        <p className="reviews__text">{review.review}</p>
        <div className="review__rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              className={`reviews__star reviews__star--${
                review.rating >= star ? 'active' : 'inactive'
              }`}
              key={star}
            >
              <use xlinkHref="/img/icons.svg#icon-star"></use>
            </svg>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { tour, isFetching } = this.state;

    if (!isFetching && tour) {
      const date = new Date(tour.startDates[0]).toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
      });

      const paragraphs = tour.description.split('\n');
      return (
        <>
          <section className="section-header">
            <div className="header__hero">
              <div className="header__hero-overlay">&nbsp;</div>
              <img
                src={`/img/tours/${tour.imageCover}`}
                alt={tour.name}
                className="header__hero-img"
              />
            </div>
            <div className="heading-box">
              <h1 className="heading-primary">
                <span>{tour.name}</span>
              </h1>
              <div className="heading-box__group">
                {this.headingBoxDetail(`${tour.duration} days`, 'clock')}
                {this.headingBoxDetail(
                  tour.startLocation.description,
                  'map-pin'
                )}
              </div>
            </div>
          </section>
          <section className="section-description">
            <div className="overview-box">
              <div>
                <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                  {this.overviewBox('Next date', date, 'calendar')}
                  {this.overviewBox(
                    'Difficulty',
                    tour.difficulty,
                    'trending-up'
                  )}
                  {this.overviewBox(
                    'Participants',
                    `${tour.maxGroupSize} people`,
                    'user'
                  )}{' '}
                  {this.overviewBox(
                    'Rating',
                    `${tour.ratingsAverage} / 5`,
                    'star'
                  )}
                </div>

                <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">
                    Your tour guides
                  </h2>
                  {tour.guides.map((guide) =>
                    this.tourGuides(guide.photo, guide.name, guide.role)
                  )}
                </div>
              </div>
            </div>
            <div className="description-box">
              <h2 className="heading-secondary ma-bt-lg">About {tour.name}</h2>
              {paragraphs.map((p, i) => (
                <p className="description__text" key={i}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          <section className="section-pictures">
            {tour.images.map((image, i) =>
              this.pictureBox(image, tour.name, i)
            )}
          </section>

          <section className="section-map">
            <div id="map" ref={(el) => (this.mapContainer = el)}></div>
          </section>

          <section className="section-reviews">
            <div className="reviews">
              {tour.reviews.map((review, i) => this.reviewCard(review, i))}
            </div>
          </section>

          <section className="section-cta">
            <div className="cta">
              <div className="cta__img cta__img--logo">
                <img src="/img/logo-white.png" alt="Natours logo" />
              </div>
              <img
                src={`/img/tours/${tour.images[1]}`}
                alt={`${tour.name} pics`}
                className="cta__img cta__img--1"
              />
              <img
                src={`/img/tours/${tour.images[2]}`}
                alt={`${tour.name} pics`}
                className="cta__img cta__img--1"
              />
              <div className="cta__content">
                <h2 className="heading-secondary">What are you waiting for?</h2>
                <p className="cta__text">
                  {' '}
                  {tour.duration} days. 1 adventure. Infinite memories. Make it
                  yours today!
                </p>
                <button
                  onClick={this.bookTour}
                  className="btn btn--green span-all-row"
                >
                  Book tour now!
                </button>
              </div>
            </div>
          </section>
        </>
      );
    } else {
      return this.state.err ? <Error404 msg={this.state.err} /> : <Spinner />;
    }
  }
}

export default SingleTour;
