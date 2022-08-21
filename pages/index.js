import Head from 'next/head';

import {getFeaturedEvents} from '../helpers/api-util';
import EventList from "../components/events/event-list";

import NewsLetterRegistration from '../components/input/newsletter-registration';

function HomePage(props){
    
    return (
        <div>
            <Head>
                <title>NextJs Events</title>
                <meta name='description'
                    content='Find a lot of great events to evolve...'
                />
            </Head>
           <h1>The Home Page</h1> 
           <NewsLetterRegistration />
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