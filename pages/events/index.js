import { Fragment } from 'react';
import { useRouter} from 'next/router'
import { getAllEvents} from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search.js';


function AllEvents(props){
    // const events = getAllEvents();
    const router = useRouter();
    const {events} = props;

    function findEventHandler(year,month){
        const fullPath = `events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventsSearch onSearch = {findEventHandler}/>
            <EventList items={events}/>
        </Fragment>
    )
}

export default AllEvents;

export async function getStaticProps(context){
    const events = await getAllEvents();

    return {
        props:{
            events:events
        },
        revalidate: 60
    }
}