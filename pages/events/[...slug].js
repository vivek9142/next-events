import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import useSWR from "swr";

import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

import Head from 'next/head'

function FilteredEventsPge(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-faf5c-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }
      console.log(events);
      setLoadedEvents(events);
    }
  }, [data]);

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description'
            content={`A list of Filtered Events`}
      />
    </Head>
  );

  if (!loadedEvents) {
    return (<Fragment>
      {pageHeadData}
      <p className="center">Loading...</p>
    </Fragment>);
  }
  
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  
  /*
  so inspite of copy pasting head content we can make a generic head content and
  copy it before every return stmt and take into account of every dependents in 
  the head content and paste it in every return stmt

  since we got n error filteredYear is undefined since router works such
  that it runs when the page was first rendered and if it doesn't have the path parameter 
  values, at this point, it then runs again and has access to them thereafter
  but not at the beginning. 

  so we'll make two head content in same component head.
  */

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description'
            content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter,Please adjust your values! </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No Events found for the choosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  
  
  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPge;
