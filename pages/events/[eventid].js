import { Fragment } from 'react';
import { getEventById, getFeaturedEvents} from '../../helpers/api-util';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

import Head from 'next/head';

function EventDetailPage(props){
    //no longer needed
    // const router = useRouter();
    // const eventId = router.query.eventid;

    const event = props.selectedEvent;
    
    if(!event){
        return (
            <div className='center'>
                    <p>Loading...</p>
            </div>
        )
    }
    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name='description'
                    content={event.description}
                />
            </Head>
            <EventSummary title={event.title}/>
            <EventLogistics 
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />

            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
};

export default EventDetailPage;

export async function getStaticProps(context){
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);
    
    if (!event) {
        return {
          notFound: true,
        };
      }
    
      return {
        props:{
            selectedEvent:event
        },
        revalidate: 30
    }
};

export async function getStaticPaths(){
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({params: {eventId:event.id}}))
    return {
        paths:paths,
        fallback:true
    }
    /*
    so we can set fall back to false letting Next.js know that if we try to load this 
    page for an unknown Id, it should show the 404 page.
    */
}