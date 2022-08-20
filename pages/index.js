import Head from 'next/head';

import {getFeaturedEvents} from '../helpers/api-util';
import EventList from "../components/events/event-list";

function HomePage(props){
    /*
    by Head you can inject title,meta tags into head section of 
    html page
    */
    return (
        <div>
            <Head>
                <title>NextJs Events</title>
                <meta name='description'
                    content='Find a lot of great events to evolve...'
                />
            </Head>
           <h1>The Home Page</h1> 
           <EventList items={props.events} />
        </div>
    )
};

export async function getStaticProps(){
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate:1800
    }
}

export default HomePage;