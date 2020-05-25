import React from 'react';
import TourCard from '../components/TourCard';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import { fetchTourStartAsync } from '../redux/tour/tour-actions';
import Error404 from './Error404';
import { toast } from 'react-toastify';

class BookedTour extends React.Component {
  componentDidMount() {
    const { fetchTourStartAsync } = this.props;
    fetchTourStartAsync('/api/v1/bookings/my-booking');
    if (this.props.location.search.split('=')[1] === 'booking') {
      toast.success(
        "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.",
        {
          autoClose: 10000,
          position: 'top-center',
        }
      );
    }
  }

  render() {
    document.title = 'Natours | My Bookings';
    const { tours, isLoading } = this.props;
    if (isLoading) return <Spinner />;

    if (tours.length > 0) {
      return (
        <main className="main">
          <div className="card-container">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </main>
      );
    } else {
      return (
        <Error404
          msg="Tours not Booked yet"
          errmsg="Please book tour and come back later!"
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  tours: state.tours.tours,
  isLoading: state.tours.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTourStartAsync: (url) => dispatch(fetchTourStartAsync(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookedTour);
