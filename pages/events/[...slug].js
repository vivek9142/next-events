import { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";

import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPge(props) {
  const router = useRouter();

  // const filterData = router.query.slug;
  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter,Please adjust your values! </p>
        </ErrorAlert>
        <div className="center">
            <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  const filteredEvents = props.events;
  
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert><p>No Events found for the choosen filter!</p></ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);
  console.log(date);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPge;

export  async function getServerSideProps(context){
  const {params} = context;
  const filterData = params.slug;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;


  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    // if failed no need to return jsx instead return notfound:true but we can send error as
    //props
    return {
      props:{hasError : true}
      // notFound:true,
      //redirect: {
        // destination: '/error'
      // }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props:{
      events: filteredEvents,
      date:{
        month:numMonth,
        year:numYear
      }
    }
  }
}
