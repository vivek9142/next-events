import {getFeaturedEvents} from '../helpers/api-util';
import EventList from "../components/events/event-list";

function HomePage(props){
    console.log(props.events);
    return (
        <div>
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